/* Nakłada branding z config.js na stronę (kolory, fonty, logo, nazwa). */
(function(){
  const C = window.QUIZ_CONFIG || {};
  const root = document.documentElement.style;
  const col = C.colors || {};
  Object.keys(col).forEach(k => root.setProperty('--' + k, col[k]));
  (C.answerColors || []).forEach((c, i) => root.setProperty('--a' + i, c));
  if (C.fonts){
    if (C.fonts.googleFontsUrl){
      const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = C.fonts.googleFontsUrl;
      document.head.appendChild(l);
    }
    if (C.fonts.heading) root.setProperty('--font-heading', C.fonts.heading);
    if (C.fonts.body) root.setProperty('--font-body', C.fonts.body);
    root.setProperty('--heading-style', C.fonts.headingStyle || 'normal');
  }
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-brand="name"]').forEach(n => n.textContent = C.eventName || 'QUIZ');
    document.querySelectorAll('[data-brand="tagline"]').forEach(n => n.textContent = C.tagline || '');
    document.querySelectorAll('[data-brand="logo"]').forEach(n => {
      if (C.logo){ n.src = C.logo; n.alt = C.eventName || ''; n.onerror = () => n.remove(); }
      else n.remove();
    });
    document.querySelectorAll('[data-brand="kv"]').forEach(n => {
      if (C.kv){ n.src = C.kv; n.onerror = () => n.remove(); } else n.remove();
    });
    document.title = (C.eventName || 'Quiz') + ' — ' + document.title;
  });
})();
