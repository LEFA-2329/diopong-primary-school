/* Browser-local activity selection and printable packs. No learner data is collected. */
(() => {
  const language = document.querySelector("#hub-language"),
    grade = document.querySelector("#hub-grade"),
    subject = document.querySelector("#hub-subject"),
    topic = document.querySelector("#hub-topic"),
    library = document.querySelector("#bilingual-library");
  const labels = {
    en: {
      title: "Learn in your language.",
      answer: "Answer or guidance",
      count: "activities",
      grade: "Grade",
      worksheet: "Practice worksheet",
      answers: "Answers and guidance",
      name: "Name (optional)",
      date: "Date",
      print: "Print / Save as PDF",
      note: "Supplementary practice. Work with an adult where needed. Sepedi translations await fluent teacher review.",
    },
    nso: {
      title: "Ithute ka polelo ya gago.",
      answer: "Karabo goba tlhahlo",
      count: "mešomo",
      grade: "Mphato wa",
      worksheet: "Letlakala la go itlwaetša",
      answers: "Dikarabo le tlhahlo",
      name: "Leina (ga se kgapeletšo)",
      date: "Letšatšikgwedi",
      print: "Gatiša / Boloka bjalo ka PDF",
      note: "Mošomo wa tlaleletšo. Šoma le motho yo mogolo ge go nyakega. Diphetolelo tša Sepedi di emetše tekolo ya morutiši.",
    },
  };
  const subjects = {
    maths: { en: "Maths", nso: "Dipalo" },
    languages: { en: "Languages", nso: "Maleme" },
    science: { en: "Science", nso: "Saense" },
    life: { en: "Life skills", nso: "Mabokgoni a bophelo" },
  };
  function selected() {
    return bilingualActivities.filter(
      (a) =>
        a.grade === grade.value &&
        (subject.value === "all" || a.subject === subject.value) &&
        (topic.value === "all" || activityTopics[a.title.en] === topic.value),
    );
  }
  function updateTopics() {
    const previous = topic.value;
    const available = [...new Set(bilingualActivities.filter(a => a.grade === grade.value && (subject.value === 'all' || a.subject === subject.value)).map(a => activityTopics[a.title.en]))];
    topic.replaceChildren();
    const all = document.createElement('option'); all.value = 'all'; all.textContent = language.value === 'nso' ? 'Dihlogo ka moka' : 'All topics'; topic.append(all);
    available.sort((a,b) => activityTopicLabels[a][language.value].localeCompare(activityTopicLabels[b][language.value])).forEach(key => {
      const option = document.createElement('option'); option.value = key; option.textContent = activityTopicLabels[key][language.value]; topic.append(option);
    });
    topic.value = available.includes(previous) ? previous : 'all';
  }
  function render() {
    const lang = language.value,
      l = labels[lang];
    library.lang = lang;
    library.replaceChildren();
    document.querySelector("#bilingual-title").textContent = l.title;
    document.querySelector("#bilingual-count").textContent =
      `${l.grade} ${grade.value}. ${selected().length} ${l.count}${topic.value === "all" ? "" : ". " + activityTopicLabels[topic.value][lang]}`;
    selected().forEach((a) => {
      const card = document.createElement("article");
      card.className = "learning-card";
      const tag = document.createElement("p");
      tag.className = "eyebrow";
      tag.textContent = subjects[a.subject][lang] + ". " + activityTopicLabels[activityTopics[a.title.en]][lang];
      const h = document.createElement("h3");
      h.textContent = a.title[lang];
      const p = document.createElement("p");
      p.textContent = a.task[lang];
      const d = document.createElement("details"),
        summary = document.createElement("summary"),
        answer = document.createElement("p");
      summary.textContent = l.answer;
      answer.textContent = a.answer[lang];
      d.append(summary, answer);
      card.append(tag, h, p, d);
      library.append(card);
    });
  }
  async function openPack(answers) {
    const status=document.querySelector('#hub-export-status');
    const buttons=[document.querySelector('#print-worksheet'),document.querySelector('#print-answers')];
    buttons.forEach(b=>b.disabled=true);status.textContent=language.value==='nso'?'Faele e a dirwa…':'Creating your file…';
    try { await WorksheetExport.download({items:selected(),grade:grade.value,language:language.value,answers,format:document.querySelector('#hub-format').value,topicLabel:topic.value==='all'?'':activityTopicLabels[topic.value][language.value]});status.textContent=language.value==='nso'?'Faele e lokile. Lekola ditaonelouto tša gago.':'Your file is ready. Check your downloads.'; }
    catch {status.textContent='The file could not be created. Please try again.';}
    finally {buttons.forEach(b=>b.disabled=false);}
  }
  document
    .querySelector("#print-worksheet")
    .addEventListener("click", () => openPack(false));
  document
    .querySelector("#print-answers")
    .addEventListener("click", () => openPack(true));
  [language, grade, subject].forEach((el) =>
    el.addEventListener("change", () => { updateTopics(); render(); }),
  );
  topic.addEventListener("change", render);
  updateTopics();
  render();
})();


