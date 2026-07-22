/*
 * Project Cirrus — shared demo helpers (vanilla JS, no build step).
 * Wires the theme switcher, a forced reduced-motion toggle, and cross-links.
 */
(function () {
  const PAGES = [
    ['index.html', 'Overview'],
    ['ghost-text.html', 'A · Ghost text'],
    ['parameter-palette.html', 'B · Parameter palette'],
    ['resource-lookup.html', 'C · Resource lookup'],
    ['hint-line.html', 'D · Hint line'],
    ['passthrough.html', 'E · Passthrough'],
    ['degraded-plain.html', 'F · Degraded / plain'],
  ];

  window.CirrusDemo = {
    /** Build the shared top bar with title, theme + motion controls, and nav. */
    mount(opts) {
      const root = document.documentElement;
      root.setAttribute('data-theme', 'dark');

      const bar = document.createElement('div');
      bar.className = 'demo-topbar';
      bar.innerHTML = `
        <div>
          <h1 class="demo-title">Project Cirrus — ${opts.title}</h1>
          <p class="demo-sub">${opts.sub || ''}</p>
        </div>
        <div class="demo-controls">
          <label class="demo-nav">theme
            <select id="themeSel" aria-label="Theme">
              <option value="dark">dark</option>
              <option value="light">light</option>
              <option value="high-contrast">high-contrast</option>
            </select>
          </label>
          <button id="motionBtn" type="button" aria-pressed="false">reduce motion: off</button>
        </div>`;
      document.body.prepend(bar);

      const nav = document.createElement('nav');
      nav.className = 'demo-nav';
      nav.style.marginBottom = 'var(--spacing-lg)';
      nav.innerHTML =
        'demos: ' +
        PAGES.map(([href, label]) =>
          href === opts.current
            ? `<strong>${label}</strong>`
            : `<a href="${href}">${label}</a>`,
        ).join(' · ');
      bar.after(nav);

      const themeSel = document.getElementById('themeSel');
      themeSel.addEventListener('change', () =>
        root.setAttribute('data-theme', themeSel.value),
      );

      const motionBtn = document.getElementById('motionBtn');
      motionBtn.addEventListener('click', () => {
        const on = root.classList.toggle('force-reduced-motion');
        motionBtn.setAttribute('aria-pressed', String(on));
        motionBtn.textContent = `reduce motion: ${on ? 'on' : 'off'}`;
      });
    },
  };
})();
