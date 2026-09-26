import assert from 'node:assert/strict';
import { readFile, readdir, stat, access, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { parseHTML } from 'linkedom';
import { existsSync } from 'node:fs';
import { originalBlocks, narrative, events, people, media, sources, site } from '../src/lib/content.mjs';
import { timelineHtml } from '../src/lib/timeline.mjs';
const root=process.cwd();
if(existsSync('.env'))process.loadEnvFile('.env');
const dist=path.join(root,'dist');
async function walk(dir){return(await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat();}
const files=await walk(dist);
assert.deepEqual(files.filter(f=>f.endsWith('.html')).map(f=>path.relative(dist,f)),['index.html'],'Exactly one reader-facing HTML page');
const html=await readFile(path.join(dist,'index.html'),'utf8');
const {document}=parseHTML(html);
assert.equal(document.querySelectorAll('h1').length,1,'One H1');
const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
assert.equal(new Set(ids).size,ids.length,'No duplicate anchor IDs');
for(const link of document.querySelectorAll('a[href^="#"]')) assert(ids.includes(decodeURIComponent(link.getAttribute('href').slice(1))),`Broken fragment: ${link.getAttribute('href')}`);
assert.equal(document.querySelectorAll('[data-event-id]').length,43,'All 43 events rendered');
const originalTimeline=(await readFile('archive/Timeline.txt','utf8')).trim().split(/\r?\n/);
assert.deepEqual(events.map(e=>e.originalLine),originalTimeline,'Exact original timeline, in order');
for(const event of events){
 const row=document.getElementById(event.id);
 assert(row,`Missing event ${event.id}`);
 const expectedEvent=parseHTML(`<span>${timelineHtml(event.text)}</span>`).document.querySelector('span').textContent;
 assert.equal(row.querySelector('.event-text').textContent,expectedEvent,'Approved English entry preserved');
 assert.equal(row.querySelector('.event-text').getAttribute('lang'),'en','English chronology language');
 assert(!row.closest('details,[hidden],dialog'),'No hidden main chronology');
}
const normalized=s=>s.replace(/\s+/g,' ').trim();
const archived=await readFile('archive/The Turko–Paradox War.md');
assert.deepEqual(await readFile('src/content/chronicle.md'),archived,'Publication prose matches preserved original byte-for-byte');
assert.equal(document.querySelectorAll('[data-original]').length,originalBlocks.length,'All narrative blocks rendered exactly once');
for(const block of originalBlocks){
 const element=document.querySelector(`[data-original="${block.id}"]`);
 assert(element,`Missing original block ${block.id}`);
 const clone=element.cloneNode(true);
 for(const extra of clone.querySelectorAll('[data-editorial]'))extra.remove();
 const expected=parseHTML(`<div id="expected">${block.html}</div>`).document.getElementById('expected');
 // Separate block boundaries before normalizing; browser textContent omits separators between adjacent list items.
 const plain=node=>[...node.childNodes].map(n=>n.nodeType===1?`${n.textContent} `:n.textContent).join('');
 assert.equal(normalized(plain(clone)),normalized(plain(expected)),`Changed original block ${block.id}`);
}
assert.deepEqual([...document.querySelectorAll('[data-original-heading]')].map(h=>h.textContent),narrative.map(c=>c.title),'All eleven original section headings');
for(const person of people)assert(document.getElementById(`person-${person.id}`),`Missing person anchor ${person.name}`);
for(const asset of media.filter(m=>m.id!=='main-art'))assert(document.querySelector(`[data-portrait="${asset.id}"] img`),`Missing required portrait ${asset.id}`);
assert(!html.includes('GE_Ataturk'),'Reserved fantasy artwork not published');
assert.equal(document.querySelectorAll('#three-demands ol>li').length,3);
assert.equal(document.querySelectorAll('#demands-ledger>ol>li').length,3);
for(const demand of site.demands)assert(document.getElementById(demand.id),`Missing demand ${demand.id}`);
assert.equal(sources.length,13,'All documentary record groups retained');
assert(!html.includes('SOURCE LINK PENDING'),'No obsolete source placeholders');
assert(!document.querySelector('.publication-record,#publication-title'),'Publication Record removed');
assert(document.querySelector('#image-credits-title'),'Image Credits retained');
for(const s of sources){
 assert.equal(s.status,'available','All supplied documentary records are linked');
 const record=document.getElementById(`reference-${s.id}`);
 assert(record,`Missing documentary record ${s.id}`);
 assert(s.links.length>0,`Missing source links ${s.id}`);
 for(const link of s.links){
  assert.equal(new URL(link.url).protocol,'https:','Valid HTTPS source URL');
  assert([...record.querySelectorAll('a')].some(a=>a.getAttribute('href')===link.url&&a.textContent.includes(link.label)),`Missing descriptive source link ${link.url}`);
 }
}
const base=(process.env.BASE_PATH||'/').replace(/\/$/,'');
const urls=[];
for(const el of document.querySelectorAll('[src],link[href],a[href]')){
 const value=el.getAttribute('src')||el.getAttribute('href');
 if(value&&!/^(https?:|mailto:|data:|#)/.test(value))urls.push(value);
}
for(const el of document.querySelectorAll('[srcset]'))for(const candidate of el.getAttribute('srcset').split(','))urls.push(candidate.trim().split(/\s+/)[0]);
for(const url of new Set(urls)){
 let local=decodeURIComponent(url.split(/[?#]/)[0]);
 if(local.startsWith('/')){
   assert(!base||local.startsWith(`${base}/`),`Wrong project base path: ${url}`);
   local=local.slice(base.length).replace(/^\//,'');
 }
 assert(local&&!local.includes('..'),`Unexpected asset path: ${url}`);
 await access(path.join(dist,local));
}
assert(!files.some(f=>/[\\/](archive|docs|Media|Documents)[\\/]/.test(path.relative(dist,f))),'No private project documents deployed');
const origin=process.env.SITE_URL;
if(origin){
 const canonical=new URL(`${base}/`,origin).href;
 assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute('href'),canonical);
 const og=document.querySelector('meta[property="og:image"]')?.getAttribute('content');
 assert(og&&og.startsWith(new URL(origin).origin),'Absolute real-origin social image');
 await access(path.join(dist,new URL(og).pathname.slice(base.length).replace(/^\//,'')));
 await access(path.join(dist,'sitemap.xml'));
}else{
 assert(!document.querySelector('link[rel="canonical"]'),'No invented canonical URL');
 assert(!document.querySelector('meta[property="og:url"]'),'No invented public URL');
}
const imageFiles=files.filter(f=>/\.(avif|webp|jpg)$/.test(f));
assert(imageFiles.length>=8,'Optimized image derivatives exist');
const scripts=files.filter(f=>f.endsWith('.js'));
const inlineJsBytes=[...document.querySelectorAll('script:not([src])')].filter(s=>s.getAttribute('type')!=='application/ld+json').reduce((n,s)=>n+Buffer.byteLength(s.textContent),0);
const jsBytes=(await Promise.all(scripts.map(async f=>(await stat(f)).size))).reduce((a,b)=>a+b,inlineJsBytes);
assert(jsBytes<20000,'Minimal client-side JavaScript budget');
const report={htmlPages:1,narrativeSections:narrative.length,narrativeBlocks:originalBlocks.length,visibleEvents:events.length,requiredPortraits:6,stableIds:ids.length,localAssetURLs:new Set(urls).size,optimizedImages:imageFiles.length,clientJavaScriptBytes:jsBytes,canonicalConfigured:!!origin,pendingSourceRecords:sources.filter(s=>s.status==='pending').length};
await mkdir('artifacts',{recursive:true});
await writeFile('artifacts/build-verification.json',JSON.stringify(report,null,2));
console.log('Production verification passed:',JSON.stringify(report,null,2));
