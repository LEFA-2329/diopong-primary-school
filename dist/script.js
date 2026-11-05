const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
if (menu && navigation) {
  const mobile = window.matchMedia('(max-width: 760px)');
  const backdrop = document.createElement('div');
  backdrop.className = 'menu-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'menu-close';
  close.textContent = 'Close menu ×';
  navigation.prepend(close);
  document.body.append(backdrop);
  let opened = false;
  function setMenu(open, restoreFocus = true) {
    opened = open && mobile.matches;
    menu.setAttribute('aria-expanded', String(opened));
    navigation.classList.toggle('open', opened);
    document.body.classList.toggle('menu-is-open', opened);
    backdrop.classList.toggle('visible', opened);
    if (mobile.matches) {
      navigation.inert = !opened;
      navigation.setAttribute('role', 'dialog');
      navigation.setAttribute('aria-label', 'School navigation');
      if (opened) navigation.setAttribute('aria-modal', 'true');
      else navigation.removeAttribute('aria-modal');
    } else {
      navigation.inert = false;
      navigation.removeAttribute('role');
      navigation.removeAttribute('aria-modal');
      navigation.setAttribute('aria-label', 'Main navigation');
    }
    if (opened) close.focus();
    else if (restoreFocus && mobile.matches) menu.focus();
  }
  menu.addEventListener('click', () => setMenu(!opened));
  close.addEventListener('click', () => setMenu(false));
  backdrop.addEventListener('click', () => setMenu(false));
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { if (opened) setMenu(false, false); }));
  document.addEventListener('keydown', event => {
    if (!opened) return;
    if (event.key === 'Escape') { event.preventDefault(); setMenu(false); }
    if (event.key === 'Tab') {
      const items = [...navigation.querySelectorAll('button, a[href]')];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  document.addEventListener('focusin', event => { if (opened && !navigation.contains(event.target)) close.focus(); });
  mobile.addEventListener('change', () => setMenu(false, false));
  setMenu(false, false);
}
const checks = [...document.querySelectorAll(".checklist input")];
function updateProgress() {
  const output = document.querySelector("#check-progress");
  if (output)
    output.textContent = `${checks.filter((input) => input.checked).length} of ${checks.length} preparation steps checked`;
}
checks.forEach((input) => input.addEventListener("change", updateProgress));
document.querySelector("#reset-checklist")?.addEventListener("click", () => {
  checks.forEach((input) => {
    input.checked = false;
  });
  updateProgress();
});
document
  .querySelector("#print-guide")
  ?.addEventListener("click", () => window.print());
const tabs = [...document.querySelectorAll("[data-activity]")];
tabs.forEach((button) =>
  button.addEventListener("click", () => {
    tabs.forEach((tab) => {
      const selected = tab === button;
      tab.setAttribute("aria-pressed", String(selected));
      tab.classList.toggle("active", selected);
      document.getElementById(tab.dataset.activity).hidden = !selected;
    });
  }),
);
