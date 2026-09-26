import { readFileSync } from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { createCitationRegistry,citationId } from './citations.mjs';
export { citationId };
export const readContent = (file) => JSON.parse(readFileSync(path.resolve('src/content',file),'utf8'));
export const chapters = readContent('chapters.json');
export const people = readContent('people.json');
export const media = readContent('media.json');
export const events = readContent('events.json');
export const sources = readContent('sources.json');
export const site = readContent('site.json');
export const rawNarrative = readFileSync(path.resolve('src/content/chronicle.md'),'utf8');
const tokens = marked.lexer(rawNarrative);
const sections=[];
let current={id:'introduction',title:'Introduction',blocks:[]};
let sectionIndex=0;
for(const token of tokens){
 if(token.type==='heading'&&token.depth===1) continue;
 if(token.type==='heading'&&token.depth===2){
   sections.push(current);
   const metadata=chapters[sectionIndex++];
   if(!metadata) throw new Error('Unmapped narrative heading: '+token.text);
   current={...metadata,title:token.text,blocks:[]};
 }else if(!['space','hr'].includes(token.type)){
   const index=current.blocks.length;
   current.blocks.push({index,id:`${current.id}-block-${index+1}`,token,html:marked.parser([token]),aliases:current.blockAnchors?.[index]||[]});
 }
}
sections.push(current);
if(sectionIndex!==chapters.length) throw new Error('Narrative and chapter map disagree.');
export const introduction=sections[0];
export const narrative=sections.slice(1);
export const originalBlocks=sections.flatMap(s=>s.blocks);
export const demandBlock=narrative.find(c=>c.id==='mobilization').blocks.find(b=>b.token.type==='list');
export const demandItems=demandBlock.token.items.map(item=>marked.parser(item.tokens));
export function extractQuote(chapterId,blockIndex,needle){
 const token=narrative.find(c=>c.id===chapterId).blocks[blockIndex].token;
 const found=(token.tokens||[]).find(t=>t.type==='strong'&&t.text.includes(needle));
 if(!found) throw new Error(`Quoted excerpt not found in ${chapterId}.`);
 return marked.parseInline(found.text);
}
export const firstResponseQuote=extractQuote('first-response',2,'consistently');
export const internationalQuote=extractQuote('international-support',1,'stand with');
const citationRegistry=createCitationRegistry(sources,chapters);
export const referencesFor=citationRegistry.forLocation;
export const publishedSources=citationRegistry.published;
export const sourceNumber=citationRegistry.number;

const unique=(list,label)=>{if(new Set(list).size!==list.length) throw new Error(`Duplicate ${label}.`);};
unique(events.map(e=>e.id),'event ID'); unique(people.map(p=>p.id),'person ID'); unique(sources.map(s=>s.id),'source ID');
for(const person of people){
 const chapter=narrative.find(c=>c.id===person.chapter);
 if(!chapter?.blocks[person.block]?.token.raw.includes(person.mention)) throw new Error(`Person mapping drift: ${person.name}`);
}
for(const source of sources){
 if(source.status==='available'&&!/^https?:\/\//.test(source.url||'')) throw new Error(`Available reference needs a real URL: ${source.id}`);
 for(const loc of source.locations) if(!narrative.find(c=>c.id===loc.chapter)?.blocks[loc.block]) throw new Error(`Reference location drift: ${source.id}`);
}
if(demandItems.length!==site.demands.length) throw new Error('Demand metadata does not match the narrative.');
