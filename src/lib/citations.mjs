export function createCitationRegistry(records,chapters){
 const chapterOrder=new Map(chapters.map((chapter,index)=>[chapter.id,index]));
 const available=records.filter(record=>record.status==='available');
 for(const record of available){
  if(!/^https?:\/\//.test(record.url||''))throw new Error(`Available reference needs a real URL: ${record.id}`);
  if(!record.locations.length)throw new Error(`Available reference needs a citation location: ${record.id}`);
 }
 const firstLocation=record=>Math.min(...record.locations.map(loc=>(chapterOrder.get(loc.chapter)??10000)*10000+loc.block));
 const published=available.toSorted((a,b)=>firstLocation(a)-firstLocation(b));
 return {
  published,
  number:id=>published.findIndex(record=>record.id===id)+1,
  forLocation:(chapter,block)=>published.filter(record=>record.locations.some(loc=>loc.chapter===chapter&&loc.block===block))
 };
}
export const citationId=(sourceId,chapter,block)=>`citation-${sourceId}-${chapter}-${block}`;
