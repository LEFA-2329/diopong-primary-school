/* Add only school-approved content. Dates use YYYY-MM-DD. */
const schoolNotices = [{
  category: "admissions",
  published: "2026-11-19",
  title: "2027 learner applications",
  body: "Late online applications for Grades R and 1 run from 19 to 30 November 2026. School staff can assist Monday to Friday, 07:30-14:00. Grades 2-7 apply using a manual form collected at school.",
  link: "/parents/#admissions",
}];
const schoolEvents = [{
  date: "2026-11-19",
  title: "Late online applications open",
  description: "For 2027 Grade R and Grade 1 learners.",
}, {
  date: "2026-11-30",
  title: "Late online applications close",
  description: "Closing date for 2027 Grade R and Grade 1 online applications.",
}];
(() => {
 const list=document.querySelector('#notice-list'),filter=document.querySelector('#notice-category');
 const text=(tag,value)=>{const n=document.createElement(tag);n.textContent=value;return n;};
 function renderNotices(){list.replaceChildren();const items=schoolNotices.filter(n=>filter.value==='all'||n.category===filter.value).sort((a,b)=>b.published.localeCompare(a.published));document.querySelector('#notice-empty').hidden=items.length>0;items.forEach(n=>{const card=document.createElement('article');card.className='learning-card';card.append(text('h3',n.title),text('p','Published: '+n.published),text('p',n.body));if(n.link){const link=text('a','Application steps and documents');link.href=n.link;link.className='text-link';card.append(link);}list.append(card);});}
 filter.addEventListener('change',renderNotices);renderNotices();
 const now=new Date(),parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Johannesburg',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);const part=name=>parts.find(x=>x.type===name).value;const today=`${part('year')}-${part('month')}-${part('day')}`;let month=new Date(Number(part('year')),Number(part('month'))-1,1);
 function renderCalendar(){document.querySelector('#calendar-month').textContent=month.toLocaleDateString('en-ZA',{month:'long',year:'numeric'});const body=document.querySelector('#calendar-days');body.replaceChildren();const offset=(month.getDay()+6)%7,days=new Date(month.getFullYear(),month.getMonth()+1,0).getDate();let row;for(let i=0;i<Math.ceil((offset+days)/7)*7;i++){if(i%7===0){row=document.createElement('tr');body.append(row);}const cell=document.createElement('td'),day=i-offset+1;if(day>0&&day<=days){const date=`${month.getFullYear()}-${String(month.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;cell.append(text('span',String(day)));if(date===today){cell.className='is-today';cell.setAttribute('aria-label',`${day}, today`);}schoolEvents.filter(e=>e.date===date).forEach(e=>cell.append(text('small',e.title)));}row.append(cell);}const prefix=`${month.getFullYear()}-${String(month.getMonth()+1).padStart(2,'0')}`;const events=schoolEvents.filter(e=>e.date.startsWith(prefix)).sort((a,b)=>a.date.localeCompare(b.date));document.querySelector('#event-status').textContent=events.length?`${events.length} published events this month`:'No school events have been published for this month.';const agenda=document.querySelector('#event-list');agenda.replaceChildren();events.forEach(e=>{const article=document.createElement('article');article.append(text('h3',e.title),text('p',e.date),text('p',e.description));agenda.append(article);});}
 document.querySelector('#previous-month').addEventListener('click',()=>{month=new Date(month.getFullYear(),month.getMonth()-1,1);renderCalendar();});document.querySelector('#next-month').addEventListener('click',()=>{month=new Date(month.getFullYear(),month.getMonth()+1,1);renderCalendar();});document.querySelector('#current-month').addEventListener('click',()=>{month=new Date(Number(part('year')),Number(part('month'))-1,1);renderCalendar();});renderCalendar();
})();
