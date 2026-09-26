import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
await mkdir('public/fonts',{recursive:true});
const rules=[];
const ranges={latin:'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD','latin-ext':'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0300-0303,U+0305-0307,U+0309-0328,U+032A-036F,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF'};
for(const [slug,family,styles] of [['barlow-condensed','Barlow Condensed',[[600,'normal']]],['source-serif-4','Source Serif 4',[[400,'normal'],[600,'normal'],[400,'italic']]]]){
 for(const subset of ['latin','latin-ext']) for(const [weight,style] of styles){
   const filename=`${slug}-${subset}-${weight}-${style}.woff2`;
   await copyFile(`node_modules/@fontsource/${slug}/files/${filename}`,`public/fonts/${filename}`);
   rules.push(`@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};font-display:swap;src:url('./${filename}') format('woff2');unicode-range:${ranges[subset]};}`);
 }
 await copyFile(`node_modules/@fontsource/${slug}/LICENSE`,`public/fonts/${slug}-LICENSE.txt`);
}
await writeFile('public/fonts/fonts.css',rules.join('\n')+'\n');
// Mechanical crop/resize per the approved asset map; supplied originals stay intact.
await sharp('Media/Muratabigf.webp').extract({left:0,top:0,width:640,height:720}).webp({quality:95}).toFile('src/assets/images/people/muratabigf.webp');
await sharp('Media/MainArt.png').resize(1200,630,{fit:'contain',background:'#101214'}).png().toFile('src/assets/images/social/og-war.png');
console.log('Prepared licensed local fonts, approved frontal crop, and 1200 × 630 social image.');
