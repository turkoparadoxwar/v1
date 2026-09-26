import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {narrative,events,people,site,originalBlocks} from '../src/lib/content.mjs';
import {createCitationRegistry,citationId} from '../src/lib/citations.mjs';
import {parseTimelineLine} from '../src/lib/timeline.mjs';

test('the publication preserves the supplied narrative, including all 11 headings and 65 blocks',async()=>{
 assert.deepEqual(await readFile('src/content/chronicle.md'),await readFile('archive/The Turko–Paradox War.md'));
 assert.deepEqual(await readFile('archive/The Turko–Paradox War.md'),await readFile('Documents/The Turko–Paradox War.md'));
 assert.equal(narrative.length,11);assert.equal(originalBlocks.length,65);
 assert.equal(narrative.find(c=>c.id==='mobilization').blocks.find(b=>b.token.type==='list').token.items.length,3);
});
test('all 43 approved English entries preserve wording, ordering, date ranges, and the Turkish archival record',async()=>{
 const lines=(await readFile('archive/Timeline.txt','utf8')).trim().split(/\r?\n/);
 assert.equal(events.length,43);
 assert.deepEqual(events.map(e=>e.originalLine),lines);
 const parsed=lines.map(parseTimelineLine);
 assert.deepEqual(events.map(e=>({start:e.start,end:e.end,text:e.text,language:e.language})),parsed.map(e=>({start:e.start,end:e.end,text:e.text,language:e.language})));
 assert(events.every(e=>e.language==='en'));
 assert.deepEqual(await readFile('archive/Timeline.txt'),await readFile('Documents/Timeline.txt'));
 const original=(await readFile('archive/Timeline.tr.original.txt','utf8')).trim().split(/\r?\n/);
 assert.deepEqual(events.map(e=>e.originalTurkish.originalLine),original);
 assert.equal(events.at(-1).start,'2026-09-26');
 assert.equal(site.narrativeAsOf,'2026-09-25');
});
test('people and events have real same-page narrative destinations',()=>{
 const ids=new Set(['three-demands','september-26',...narrative.map(c=>c.id),...originalBlocks.flatMap(b=>[b.id,...b.aliases])]);
 for(const event of events)assert(ids.has(event.target),event.target);
 assert.equal(people.filter(p=>p.image).length,6);
});
test('pending sources never masquerade as numbered citations',()=>{
 const registry=createCitationRegistry([{id:'pending',status:'pending',url:null,locations:[{chapter:'origins',block:0}]}],[{id:'origins'}]);
 assert.equal(registry.published.length,0);assert.deepEqual(registry.forLocation('origins',0),[]);
 assert.throws(()=>createCitationRegistry([{id:'invalid',status:'available',url:null,locations:[]}],[]),/real URL/);
});
test('numbering follows first appearance; repeated citations keep unique backlink IDs',()=>{
 // Test-only URLs; these records are never part of the publication content.
 const records=[{id:'later',status:'available',url:'https://example.org/later',locations:[{chapter:'response',block:2}]},{id:'earlier',status:'available',url:'https://example.org/earlier',locations:[{chapter:'origins',block:0},{chapter:'response',block:2}]}];
 const registry=createCitationRegistry(records,[{id:'origins'},{id:'response'}]);
 assert.equal(registry.number('earlier'),1);assert.equal(registry.number('later'),2);
 assert.equal(registry.forLocation('response',2).length,2);
 assert.notEqual(citationId('earlier','origins',0),citationId('earlier','response',2));
 assert.equal(records[0].id,'later','Registry does not mutate stored source ordering');
});
