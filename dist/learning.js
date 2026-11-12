const library = document.querySelector("#activity-library");
const activities = [
  [
    "Reading",
    "start",
    "Picture detective",
    "10 minutes",
    "Choose a picture from a book. Name five things you can see. Describe two colours. Tell a short story about what might happen next.",
    "Ask: what in the picture helped you decide?",
  ],
  [
    "Reading",
    "grow",
    "Story reteller",
    "15 minutes",
    "Read a short story together. Write or draw what happened at the beginning, middle and end. Give the story a new title.",
    "Explain why your title fits.",
  ],
  [
    "Writing",
    "start",
    "My five favourite things",
    "10 minutes",
    "Draw five things you like. Add a word or label below each one. Say a sentence about each drawing.",
    "Use your home language or English.",
  ],
  [
    "Writing",
    "challenge",
    "A letter to tomorrow",
    "20 minutes",
    "Write a short letter to your future self. Include something you enjoy learning, a goal and a question. Read it aloud and check capital letters and full stops.",
    "Add reasons using the word because.",
  ],
  [
    "Maths",
    "start",
    "Count and sort",
    "10 minutes",
    "With an adult, collect ten large safe objects. Sort them by colour or shape. Count each group. Which group has more?",
    "Small objects are not suitable for young children.",
  ],
  [
    "Maths",
    "grow",
    "Make a number",
    "15 minutes",
    "Choose a number up to 20. Find three different ways to make it using addition. Write each number sentence and check it with counters.",
    "For 8, you could start with 5 + 3.",
  ],
  [
    "Maths",
    "challenge",
    "Plan a pretend shop",
    "20 minutes",
    "Make a price list: apple R4, pencil R3, notebook R12. Work out the cost of two apples and one pencil. How much change from R20?",
    "Answer: R11 total, R9 change. Explain your steps.",
  ],
  [
    "Science",
    "start",
    "Weather watcher",
    "10 minutes",
    "Look outside from a safe place. Draw the sky. Is it sunny, cloudy, rainy or windy? Repeat tomorrow and compare.",
    "Do not look directly at the sun.",
  ],
  [
    "Science",
    "grow",
    "Float or sink?",
    "15 minutes",
    "With an adult, predict whether a leaf, cork and small spoon will float in a shallow bowl of water. Test one at a time and record what happened.",
    "Adult supervision throughout. Empty the bowl afterwards.",
  ],
  [
    "Science",
    "challenge",
    "Shadow investigator",
    "20 minutes",
    "With an adult, mark the end of a shadow in the morning and again later. Compare its length and direction. Draw what changed.",
    "Stay in a safe area and never look at the sun.",
  ],
  [
    "Life skills",
    "start",
    "Name that feeling",
    "10 minutes",
    "Draw faces showing happy, worried and excited. Talk about a time you felt each one. Name a trusted adult you can talk to.",
    "There are no wrong feelings. Listen kindly.",
  ],
  [
    "Life skills",
    "grow",
    "A kind plan",
    "15 minutes",
    "Think of three ways to help at home or school. Choose one safe action, do it with permission and describe how it helped.",
    "Never share private details online.",
  ],
  [
    "Creative arts",
    "start",
    "Shape collage",
    "15 minutes",
    "Draw circles, squares and triangles on scrap paper. Arrange them into a house, animal or imaginary place. Colour and describe your work.",
    "Ask an adult for help if using scissors.",
  ],
  [
    "Creative arts",
    "grow",
    "Rhythm maker",
    "10 minutes",
    "Clap a four-beat pattern. Ask someone to copy it. Swap roles, then add a gentle tap or a pause.",
    "Can you write the pattern using dots and spaces?",
  ],
  [
    "Writing",
    "grow",
    "Word collector",
    "15 minutes",
    "Choose five familiar objects. Write their names in a language you know. Add another language with help from an adult. Use two words in sentences.",
    "Check spelling together.",
  ],
  [
    "Maths",
    "challenge",
    "Pattern puzzle",
    "10 minutes",
    "Continue: 3, 6, 9, __, __. Then 2, 4, 8, __, __. Describe the rule for each pattern. Create a pattern for someone else.",
    "Answers: 12, 15; then 16, 32.",
  ],
];
if (library) {
  const levels = {
    start: "Getting started",
    grow: "Growing skills",
    challenge: "A little challenge",
  };
  [...gradeActivities, ...activities].forEach(
    ([subject, level, title, time, instructions, prompt, grade]) => {
      const card = document.createElement("article");
      card.className = "learning-card";
      card.dataset.level = level;
      card.dataset.grade = grade ? String(grade) : "general";
      card.dataset.search =
        `${subject} ${title} ${instructions} ${grade ? "grade " + grade : "general"}`.toLowerCase();
      const tag = document.createElement("p");
      tag.className = "eyebrow";
      tag.textContent = `${grade ? "Grade " + grade + " . " : "General . "}${subject}`;
      const heading = document.createElement("h3");
      heading.textContent = title;
      const meta = document.createElement("p");
      meta.className = "activity-meta";
      meta.textContent = `${levels[level]} . ${time}`;
      const text = document.createElement("p");
      text.textContent = instructions;
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = "Tip or answer";
      const tip = document.createElement("p");
      tip.textContent = prompt;
      details.append(summary, tip);
      card.append(tag, heading, meta, text, details);
      library.append(card);
    },
  );
  function filter() {
    let count = 0;
    const query = document
      .querySelector("#activity-search")
      .value.trim()
      .toLowerCase();
    const level = document.querySelector("#level-filter").value;
    const grade = document.querySelector("#grade-filter").value;
    library.querySelectorAll("article").forEach((card) => {
      card.hidden = !(
        card.dataset.search.includes(query) &&
        (level === "all" || level === card.dataset.level) &&
        (grade === "all" || grade === card.dataset.grade)
      );
      if (!card.hidden) count++;
    });
    document.querySelector("#resource-count").textContent =
      `${count} activities available`;
    document.querySelector("#empty-results").hidden = count > 0;
  }
  document.querySelector("#activity-search").addEventListener("input", filter);
  document.querySelector("#level-filter").addEventListener("change", filter);
  document.querySelector("#grade-filter").addEventListener("change", filter);
  filter();
  let a = 3,
    b = 4,
    expected = 7,
    correct = 0,
    total = 0,
    answered = false;
  const answer = document.querySelector("#math-answer"),
    feedback = document.querySelector("#math-feedback");
  function next() {
    const range = Number(document.querySelector("#difficulty").value);
    const op = document.querySelector("#operation").value;
    a = Math.floor(Math.random() * (range + 1));
    b = Math.floor(Math.random() * (range + 1));
    if (op === "subtract" && b > a) [a, b] = [b, a];
    expected = op === "add" ? a + b : op === "subtract" ? a - b : a * b;
    document.querySelector("#math-question").textContent =
      `What is ${a} ${op === "add" ? "+" : op === "subtract" ? "−" : "×"} ${b}?`;
    answer.value = "";
    answered = false;
    feedback.textContent = "Take your time. You can count it out.";
  }
  document.querySelector("#math-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!answer.value.trim()) return;
    if (answered) {
      feedback.textContent = "Choose Next question to continue.";
      return;
    }
    total++;
    if (Number(answer.value) === expected) {
      correct++;
      feedback.textContent = `Correct! The answer is ${expected}. Well done.`;
    } else {
      feedback.textContent = `Good effort. The answer is ${expected}. Use objects or equal groups to work it out, then try another question.`;
    }
    answered = true;
    document.querySelector("#math-score").textContent =
      `${correct} correct out of ${total} answered this session`;
  });
  document.querySelector("#new-sum").addEventListener("click", () => {
    next();
    answer.focus();
  });
  ["operation", "difficulty"].forEach((id) =>
    document.getElementById(id).addEventListener("change", next),
  );
  document
    .querySelector("#reading-quiz")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      const score =
        Number(data.get("seed") === "bean") +
        Number(data.get("quality") === "patient");
      document.querySelector("#reading-feedback").textContent =
        `${score} of 2 correct. Lebo planted a bean. She showed patience by caring for it while she waited for the shoot. Read the story again to find the clues.`;
    });
}
