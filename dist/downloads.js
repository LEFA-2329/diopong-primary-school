(() => {
 const grade=document.querySelector('#download-grade'),language=document.querySelector('#download-language'),subject=document.querySelector('#download-subject');
 const selected=()=>bilingualActivities.filter(a=>a.grade===grade.value&&(subject.value==='all'||a.subject===subject.value));
 function update(){document.querySelector('#pack-description').textContent=`Grade ${grade.value} · ${language.value==='en'?'English':'Sepedi'} · ${selected().length} activities in this pack`;}
 async function download(answers){const status=document.querySelector('#download-export-status'),buttons=[document.querySelector('#download-worksheet'),document.querySelector('#download-memo')];buttons.forEach(b=>b.disabled=true);status.textContent='Creating your file…';try{await WorksheetExport.download({items:selected(),grade:grade.value,language:language.value,answers,format:document.querySelector('#download-format').value});status.textContent='Your file is ready. Check your downloads.';}catch{status.textContent='The file could not be created. Please try again.';}finally{buttons.forEach(b=>b.disabled=false);}}
 [grade,language,subject].forEach(x=>x.addEventListener('change',update));document.querySelector('#download-worksheet').addEventListener('click',()=>download(false));document.querySelector('#download-memo').addEventListener('click',()=>download(true));update();
})();

