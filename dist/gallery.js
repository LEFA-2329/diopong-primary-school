(() => {
  const links = [...document.querySelectorAll('.campus-gallery a')];
  if (!links.length || typeof HTMLDialogElement === 'undefined' || !('showModal' in HTMLDialogElement.prototype)) return;
  const viewer = document.createElement('dialog');
  viewer.className = 'photo-viewer';
  viewer.setAttribute('aria-labelledby', 'photo-viewer-title');
  viewer.innerHTML = `<div class="photo-viewer-panel"><div class="photo-viewer-top"><h2 id="photo-viewer-title">Around Diopong</h2><button type="button" class="photo-close" aria-label="Close photo viewer">Close ×</button></div><div class="photo-stage" aria-busy="true"><img alt="" /><p class="photo-status" role="status">Loading photograph...</p></div><div class="photo-viewer-bottom"><button type="button" class="photo-prev" aria-label="Previous photograph">← Previous</button><p class="photo-caption" aria-live="polite" aria-atomic="true"></p><button type="button" class="photo-next" aria-label="Next photograph">Next →</button></div><p class="photo-keyboard">Use the arrow keys to browse. Press Escape to close.</p></div>`;
  document.body.append(viewer);
  const image = viewer.querySelector('img');
  const stage = viewer.querySelector('.photo-stage');
  const status = viewer.querySelector('.photo-status');
  const caption = viewer.querySelector('.photo-caption');
  const close = viewer.querySelector('.photo-close');
  let current = 0;
  let opener;
  function show(index) {
    current = (index + links.length) % links.length;
    const link = links[current];
    const label = link.closest('figure').querySelector('figcaption').textContent;
    stage.setAttribute('aria-busy', 'true');
    image.hidden = true;
    status.hidden = false;
    status.textContent = 'Loading photograph...';
    image.alt = link.querySelector('img').alt;
    caption.textContent = `${current + 1} of ${links.length}. ${label}`;
    image.src = link.href;
  }
  image.addEventListener('load', () => {
    stage.setAttribute('aria-busy', 'false');
    image.hidden = false;
    status.hidden = true;
  });
  image.addEventListener('error', () => {
    stage.setAttribute('aria-busy', 'false');
    status.hidden = false;
    status.textContent = 'This photograph could not load. Try the next photograph or close the viewer and try again.';
  });
  links.forEach((link, index) => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      show(index);
      viewer.showModal();
      document.body.classList.add('photo-viewer-open');
      close.focus();
    });
  });
  close.addEventListener('click', () => viewer.close());
  viewer.querySelector('.photo-prev').addEventListener('click', () => show(current - 1));
  viewer.querySelector('.photo-next').addEventListener('click', () => show(current + 1));
  viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  viewer.addEventListener('close', () => {
    document.body.classList.remove('photo-viewer-open');
    opener?.focus();
  });
})();
