import {marked} from 'marked';

export function parseTimelineLine(originalLine){
 const match=originalLine.match(/^(?:-\s+)?(?:\*\*)?(\d{2}(?:–\d{2})?\s+(?:September|Eylül))(?:\*\*)?\s+—\s+(.+)$/u);
 if(!match)throw new Error(`Unrecognized timeline entry: ${originalLine}`);
 const [,dateLabel,text]=match;
 const dates=dateLabel.match(/\d+/g);
 return {dateLabel,text,start:`2026-09-${dates[0]}`,end:`2026-09-${dates[1]||dates[0]}`,language:dateLabel.includes('September')?'en':'tr',originalLine};
}

export const timelineHtml=text=>marked.parseInline(text);
