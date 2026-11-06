/* Generates a one-page PDF locally. Learner names are never stored or transmitted. */
(function (root) {
  'use strict';
  function drawCertificate(canvas, badge, details) {
    canvas.width = 1800; canvas.height = 1273;
    const ctx = canvas.getContext('2d');
    const green = '#174c2e', gold = '#b58a35';
    ctx.fillStyle = '#fffdf4'; ctx.fillRect(0, 0, 1800, 1273);
    ctx.strokeStyle = gold; ctx.lineWidth = 10; ctx.strokeRect(38, 38, 1724, 1197);
    ctx.lineWidth = 2; ctx.strokeRect(60, 60, 1680, 1153); ctx.strokeRect(77, 77, 1646, 1119);
    for (const [x, y] of [[95,95],[1705,95],[95,1178],[1705,1178]]) {
      ctx.save(); ctx.translate(x,y); ctx.fillStyle=gold;
      ctx.beginPath();ctx.moveTo(0,-14);ctx.lineTo(14,0);ctx.lineTo(0,14);ctx.lineTo(-14,0);ctx.closePath();ctx.fill();ctx.restore();
    }
    const scale = Math.min(160 / badge.width, 160 / badge.height);
    ctx.drawImage(badge, 900 - badge.width * scale / 2, 108, badge.width * scale, badge.height * scale);
    ctx.textAlign = 'center';
    function line(text, y, size, family='Georgia', color=green, maxWidth=1500) {
      ctx.fillStyle=color;let fontSize=size;
      do {ctx.font=`${fontSize}px ${family}`;if(ctx.measureText(text).width<=maxWidth)break;fontSize--;} while(fontSize>18);
      ctx.fillText(text,900,y);
    }
    const sepedi=details.language==='nso';
    line('DIOPONG PRIMARY SCHOOL', 330, 45, 'Arial');
    line('CERTIFICATE OF ACHIEVEMENT', 430, 65, 'Georgia', gold);
    if(sepedi) line('Setifikeiti sa katlego', 478, 30);
    line(sepedi?'Se se fiwa':'This certificate is presented to', 550, 29, 'Arial');
    line(`${details.name} ${details.surname}`, 650, 68, 'Georgia', green, 1450);
    ctx.strokeStyle=gold;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(280,680);ctx.lineTo(1520,680);ctx.stroke();
    line(sepedi?'ka go fetša dipotšišo tša go itlwaetša':'for completing the online practice quiz', 745, 32, 'Arial');
    const subject=details.subject==='maths'?(sepedi?'Dipalo':'Mathematics'):(sepedi?'Go bala':'Reading comprehension');
    line(`${sepedi?'Mphato wa':'Grade'} ${details.grade}  |  ${subject}`, 810, 38, 'Arial');
    line(`${sepedi?'Dipoelo':'Score'}: ${details.score} / ${details.total} (${Math.round(details.score/details.total*100)}%)`, 880, 37, 'Arial');
    line(`${sepedi?'Letšatšikgwedi':'Date'}: ${details.date}`, 960, 28, 'Arial');
    line('Education - The key to a brighter future', 1042, 29, 'Georgia', gold);
    line('Online learning hub recognition - not a formal school assessment or academic qualification.', 1120, 22, 'Arial', '#526052');
    line('diopong.lefamalatji.co.za', 1160, 22, 'Arial', '#526052');
    return canvas;
  }
  function pdfFromJPEG(jpeg, width, height) {
    const enc=new TextEncoder(),chunks=[];let length=0;const offsets=[0];
    const put=value=>{const bytes=typeof value==='string'?enc.encode(value):value;chunks.push(bytes);length+=bytes.length;};
    const object=(id,body)=>{offsets[id]=length;put(`${id} 0 obj\n${body}\nendobj\n`);};
    put('%PDF-1.4\n');
    object(1,'<< /Type /Catalog /Pages 2 0 R >>');
    object(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    object(3,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 841.89 595.28] /Resources << /XObject << /Certificate 4 0 R >> >> /Contents 5 0 R >>');
    offsets[4]=length;put(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);put(jpeg);put('\nendstream\nendobj\n');
    const content='q\n841.89 0 0 595.28 0 0 cm\n/Certificate Do\nQ\n';
    object(5,`<< /Length ${enc.encode(content).length} >>\nstream\n${content}endstream`);
    const xref=length;put('xref\n0 6\n0000000000 65535 f \n');for(let id=1;id<=5;id++)put(`${String(offsets[id]).padStart(10,'0')} 00000 n \n`);
    put(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
    const result=new Uint8Array(length);let pos=0;chunks.forEach(c=>{result.set(c,pos);pos+=c.length;});return result;
  }
  function isEligible(grade, answered, total) {return ['4','5','6','7'].includes(String(grade)) && total>0 && answered===total;}
  function addForm(container, details) {
    if(!isEligible(details.grade,details.answered,details.total))return;
    const sepedi=details.language==='nso',form=document.createElement('form');form.className='certificate-form';
    const title=document.createElement('h3');title.textContent=sepedi?'Taonelouta setifikeiti sa gago':'Download your achievement certificate';form.append(title);
    const note=document.createElement('p');note.textContent=sepedi?'Leina la gago le dirišwa mo poraosareng fela. Ga le bolokwe goba la romelwa.':'Your name is used only in this browser to generate the PDF. It is not saved or sent anywhere.';form.append(note);
    const fields={};
    for(const [key,labelText] of [['name',sepedi?'Leina':'Name'],['surname',sepedi?'Sefane':'Surname']]) {
      const label=document.createElement('label'),input=document.createElement('input');label.textContent=labelText;input.type='text';input.required=true;input.maxLength=40;input.autocomplete='off';input.id=`certificate-${key}`;label.htmlFor=input.id;label.append(input);form.append(label);fields[key]=input;
    }
    const button=document.createElement('button');button.type='submit';button.className='button primary';button.textContent=sepedi?'Taonelouta PDF':'Download certificate PDF';
    const status=document.createElement('p');status.setAttribute('role','status');form.append(button,status);container.append(form);
    form.addEventListener('submit',async event=>{
      event.preventDefault();const name=fields.name.value.trim().replace(/\s+/g,' '),surname=fields.surname.value.trim().replace(/\s+/g,' ');
      if(!name||!surname){status.textContent=sepedi?'Tlatša leina le sefane.':'Please enter both name and surname.';return;}
      button.disabled=true;status.textContent=sepedi?'PDF e a dirwa…':'Creating your PDF…';
      try {
        const badge=await new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('School badge could not load'));img.src='./school-crest.png';});
        const date=new Intl.DateTimeFormat('en-ZA',{timeZone:'Africa/Johannesburg',day:'numeric',month:'long',year:'numeric'}).format(new Date());
        const canvas=drawCertificate(document.createElement('canvas'),badge,{...details,name,surname,date});
        const encoded=canvas.toDataURL('image/jpeg',.95).split(',')[1],binary=atob(encoded),jpeg=Uint8Array.from(binary,c=>c.charCodeAt(0));
        const url=URL.createObjectURL(new Blob([pdfFromJPEG(jpeg,canvas.width,canvas.height)],{type:'application/pdf'}));
        const link=document.createElement('a');link.href=url;link.download=`Diopong-Grade-${details.grade}-${details.subject}-Achievement.pdf`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
        status.textContent=sepedi?'PDF e lokile. Lekola ditaonelouto tša gago.':'Your PDF is ready. Check your downloads.';
      }catch(error){status.textContent=sepedi?'PDF ga se ya dirwa. Lekola kgokagano gomme o leke gape.':'The PDF could not be created. Check your connection and try again.';}
      finally{button.disabled=false;}
    });
  }
  const api={drawCertificate,pdfFromJPEG,isEligible,addForm};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.SchoolCertificate=api;
})(typeof window!=='undefined'?window:globalThis);
