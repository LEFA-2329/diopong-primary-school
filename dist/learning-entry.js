(() => {
  const entry = document.querySelector("#choose-grade");
  const buttons = [...entry.querySelectorAll("[data-grade]")];
  const resources = entry.querySelector(".grade-resources");
  const heading = entry.querySelector("#selected-grade");
  let selectedGrade;

  function applyGrade(selectId) {
    const select = document.getElementById(selectId);
    if (select.value === selectedGrade) return;
    select.value = selectedGrade;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedGrade = button.dataset.grade;
      buttons.forEach((option) => {
        option.setAttribute("aria-pressed", String(option === button));
      });
      resources.hidden = false;
      heading.textContent = `Grade ${selectedGrade} resources`;
    });
  });

  entry.querySelectorAll("[data-grade-select]").forEach((link) => {
    link.addEventListener("click", () => applyGrade(link.dataset.gradeSelect));
  });

  entry.hidden = false;
})();
