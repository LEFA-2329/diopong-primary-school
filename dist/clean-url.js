(() => {
  const paths = new Map([
    ["/index.html", "/"],
    ...["school", "parents", "learning", "notices", "downloads", "contact", "privacy"]
      .flatMap((page) => [
        [`/${page}.html`, `/${page}/`],
        [`/${page}/index.html`, `/${page}/`],
      ]),
  ]);
  const destination = paths.get(window.location.pathname);
  if (!destination) return;
  window.location.replace(destination + window.location.search + window.location.hash);
})();
