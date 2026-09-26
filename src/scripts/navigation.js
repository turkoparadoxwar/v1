const links=[...document.querySelectorAll('[data-chapter-link]')];
const sections=[...document.querySelectorAll('[data-section]')];
const current=document.querySelector('.mobile-current');
const contents=document.querySelector('.mobile-contents');
let pending=false;
function update(){
 pending=false;
 const threshold=window.innerWidth<800?100:100;
 let selected=sections[0];
 for(const section of sections){if(section.getBoundingClientRect().top<=threshold) selected=section;else break;}
 if(!selected)return;
 const chapter=selected.closest('.chapter')||selected;
 for(const link of links){if(link.dataset.chapterLink===chapter.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}
 if(current)current.textContent=selected.dataset.navLabel||'The chronicle';
}
function schedule(){if(!pending){pending=true;requestAnimationFrame(update);}}
window.addEventListener('scroll',schedule,{passive:true});
window.addEventListener('resize',schedule,{passive:true});
update();
contents?.addEventListener('click',event=>{
 const link=event.target.closest('a[href^="#"]');
 if(!link)return;
 contents.open=false;
 const target=document.getElementById(link.hash.slice(1));
 if(target){target.setAttribute('tabindex','-1');requestAnimationFrame(()=>target.focus({preventScroll:true}));target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true});}
});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&contents?.open){contents.open=false;contents.querySelector('summary')?.focus();}});
