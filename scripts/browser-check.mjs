import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const url=process.env.TEST_URL||'http://127.0.0.1:4321/';
await mkdir('artifacts/browser',{recursive:true});
const browser=await chromium.launch({headless:true});
const report={url,viewports:[],noJavaScript:null,accessibility:[],errors:[],screenshots:[]};
try{
 for(const width of [1440,1024,768,390,320]){
  const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  const failures=[];
  page.on('response',r=>{if(r.status()>=400)failures.push(`${r.status()} ${r.url()}`);});
  await page.goto(url,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const overflow=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1&&getComputedStyle(e).position!=='fixed').slice(0,10).map(e=>({tag:e.tagName,class:e.className,width:e.getBoundingClientRect().width}))}));
  const visibleEvents=await page.locator('[data-event-id]').evaluateAll(elements=>elements.filter(e=>e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('details:not([open]),[hidden],dialog')).length);
  const anchors=await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a=>a.hash));
  report.viewports.push({width,overflow,visibleEvents,brokenAnchors:anchors,failedRequests:failures});
  assert.equal(visibleEvents,43,`${width}: visible chronology`);
  assert.equal(anchors.length,0,`${width}: all anchors resolve`);
  assert(overflow.document<=width,`${width}: horizontal overflow ${JSON.stringify(overflow)}`);
  assert.equal(failures.length,0,`${width}: failed requests`);
  if([1440,390,320].includes(width)){
   const shot=`artifacts/browser/opening-${width}.png`;
   await page.screenshot({path:shot});report.screenshots.push(shot);
  }
  if(width===1440||width===390){
   for(const [name,anchor] of [['conflict','conflict-at-a-glance'],['timeline','timeline'],['demands','three-demands'],['response','second-response'],['aftermath','demands-ledger'],['sources','sources'],['credits','image-credits-title']]){
    await page.locator(`#${anchor}`).scrollIntoViewIfNeeded();
    await page.evaluate(id=>document.getElementById(id).scrollIntoView({block:'start',behavior:'instant'}),anchor);
    const shot=`artifacts/browser/${name}-${width}.png`;
    await page.screenshot({path:shot});report.screenshots.push(shot);
   }
   const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   report.accessibility.push({width,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  }
  if(width===390){
   await page.locator('#origins').scrollIntoViewIfNeeded();
   await page.locator('.mobile-contents summary').click();
   assert(await page.locator('.mobile-contents').getAttribute('open')!==null,'Contents opens');
   await page.keyboard.press('Escape');
   assert(await page.locator('.mobile-contents').getAttribute('open')===null,'Escape closes Contents');
   await page.locator('.mobile-contents summary').click();
   await page.locator('.mobile-contents a[href="#aftermath"]').click();
   assert.equal(new URL(page.url()).hash,'#aftermath','Mobile Contents uses same-page fragment');
   assert.equal(await page.evaluate(()=>document.activeElement.id),'aftermath','Mobile navigation moves focus');
  }
  if(width===1440){
   await page.goto(url,{waitUntil:'networkidle'});
   await page.keyboard.press('Tab');
   assert.equal(await page.evaluate(()=>document.activeElement.className),'skip-link','Skip link is first keyboard stop');
   await page.keyboard.press('Enter');
   assert.equal(new URL(page.url()).hash,'#chronicle','Skip link targets the chronicle');
   await page.emulateMedia({media:'print'});
   assert.equal(await page.locator('[data-event-id]').count(),43);
   const hidden=await page.locator('[data-event-id]').evaluateAll(es=>es.filter(e=>getComputedStyle(e).display==='none').length);
   assert.equal(hidden,0,'Print includes the chronology');
   await page.pdf({path:'artifacts/browser/print-review.pdf',format:'A4',printBackground:true});
  }
  await context.close();
 }
 const context=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:false});
 const page=await context.newPage();
 await page.goto(url,{waitUntil:'networkidle'});
 const count=await page.locator('[data-event-id]').count();
 const paragraphs=await page.locator('[data-original]').count();
 assert.equal(count,43);assert.equal(paragraphs,65);
 await page.locator('.masthead a[href="#timeline"]').click();
 assert.equal(new URL(page.url()).hash,'#timeline');
 await page.locator('.date-overview a').last().click();
 assert.equal(new URL(page.url()).hash,'#timeline-2026-09-26');
 report.noJavaScript={events:count,narrativeBlocks:paragraphs,nativeAnchorNavigation:true};
 await context.close();
 assert.equal(report.errors.length,0,'No browser runtime errors');
 await writeFile('artifacts/browser/report.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
 assert.equal(report.accessibility.reduce((n,r)=>n+r.violations.length,0),0,'Accessibility violations require review');
}finally{
 await writeFile('artifacts/browser/report.json',JSON.stringify(report,null,2));
 await browser.close();
}
