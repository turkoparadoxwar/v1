import {chromium} from 'playwright';
import {writeFile,mkdir} from 'node:fs/promises';
const browser=await chromium.launch({headless:true});
try{
 const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,reducedMotion:'reduce'});
 const page=await context.newPage();
 await page.addInitScript(()=>{
  window.__readingMetrics={lcp:0,cls:0};
  new PerformanceObserver(list=>{for(const entry of list.getEntries())window.__readingMetrics.lcp=entry.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)window.__readingMetrics.cls+=entry.value;}).observe({type:'layout-shift',buffered:true});
 });
 const cdp=await context.newCDPSession(page);
 await cdp.send('Network.enable');
 await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:100,downloadThroughput:500000,uploadThroughput:125000,connectionType:'cellular4g'});
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 await page.goto(process.env.TEST_URL||'http://127.0.0.1:4321/',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 await page.waitForTimeout(1500);
 const metrics=await page.evaluate(()=>({profile:'390 × 844, DPR 2, cold cache, 4 Mbps download, 100 ms latency, 4× CPU slowdown',...window.__readingMetrics,transferBytes:performance.getEntriesByType('resource').reduce((n,e)=>n+e.transferSize,0)+performance.getEntriesByType('navigation')[0].transferSize,heroURL:document.querySelector('.hero img').currentSrc,resources:performance.getEntriesByType('resource').map(e=>({url:e.name,bytes:e.transferSize}))}));
 await mkdir('artifacts',{recursive:true});await writeFile('artifacts/performance.json',JSON.stringify(metrics,null,2));
 console.log(JSON.stringify(metrics,null,2));
}finally{await browser.close();}
