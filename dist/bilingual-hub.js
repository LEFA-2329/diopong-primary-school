/* Browser-local activity selection and printable packs. No learner data is collected. */
(() => {
  const language = document.querySelector("#hub-language"),
    grade = document.querySelector("#hub-grade"),
    subject = document.querySelector("#hub-subject"),
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
        (subject.value === "all" || a.subject === subject.value),
    );
  }
  function render() {
    const lang = language.value,
      l = labels[lang];
    library.lang = lang;
    library.replaceChildren();
    document.querySelector("#bilingual-title").textContent = l.title;
    document.querySelector("#bilingual-count").textContent =
      `${l.grade} ${grade.value} · ${selected().length} ${l.count}`;
    selected().forEach((a) => {
      const card = document.createElement("article");
      card.className = "learning-card";
      const tag = document.createElement("p");
      tag.className = "eyebrow";
      tag.textContent = subjects[a.subject][lang];
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
  const escape = (s) =>
    s.replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  function pack(answers) {
    const lang = language.value,
      l = labels[lang];
    return `<!doctype html><html lang="${lang}"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escape(l.grade)} ${grade.value} — ${escape(answers ? l.answers : l.worksheet)}</title><style>body{font:17px/1.7 Arial;max-width:800px;margin:40px auto;padding:20px;color:#174c2e}h1{font:36px Georgia}article{break-inside:avoid;border-top:1px solid #bbb;padding:20px 0}.space{height:100px;border-bottom:1px dotted #aaa}button{padding:12px;cursor:pointer}@media print{button{display:none}body{margin:0;color:#000}}</style><body><p>Diopong Primary School</p><h1>${escape(l.grade)} ${grade.value}: ${escape(answers ? l.answers : l.worksheet)}</h1><p>${escape(l.note)}</p>${answers ? "" : `<p>${escape(l.name)}: __________________ &nbsp; ${escape(l.date)}: __________</p>`}<button onclick="window.print()">${escape(l.print)}</button>${selected()
      .map(
        (a, i) =>
          `<article><h2>${i + 1}. ${escape(a.title[lang])}</h2><p>${escape(a.task[lang])}</p>${answers ? `<p><strong>${escape(l.answer)}:</strong> ${escape(a.answer[lang])}</p>` : '<div class="space"></div>'}</article>`,
      )
      .join("")}</body></html>`;
  }
  function openPack(answers) {
    const blob = new Blob([pack(answers)], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Diopong-Grade-${grade.value}-${language.value}-${answers ? "answers" : "worksheet"}.html`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  document
    .querySelector("#print-worksheet")
    .addEventListener("click", () => openPack(false));
  document
    .querySelector("#print-answers")
    .addEventListener("click", () => openPack(true));
  [language, grade, subject].forEach((el) =>
    el.addEventListener("change", render),
  );
  render();
})();
