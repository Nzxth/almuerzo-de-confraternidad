(() => {
  const cover = document.querySelector('#portada');
  const letter = document.querySelector('#inicio');
  const open = document.querySelector('#abrir-carta');
  const replay = document.querySelector('#volver-al-sobre');
  const motion = document.querySelector('#motion');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let fallback;
  const state = name => { document.body.dataset.letter = name; };

  function closeEnvelope(moveFocus) {
    clearTimeout(fallback);
    state('closed');
    letter.hidden = true;
    letter.inert = true;
    cover.hidden = false;
    cover.inert = false;
    if (moveFocus) {
      window.scrollTo({top: 0, behavior: 'instant'});
      open.focus({preventScroll: true});
    }
  }

  function finishOpening() {
    if (document.body.dataset.letter !== 'opening') return;
    clearTimeout(fallback);
    state('open');
    cover.hidden = true;
    letter.hidden = false;
    letter.inert = false;
    window.scrollTo({top: 0, behavior: 'instant'});
    document.querySelector('#title').focus({preventScroll: true});
  }

  function openEnvelope() {
    if (document.body.dataset.letter !== 'closed') return;
    cover.inert = true;
    letter.hidden = false;
    state('opening');
    if (document.body.classList.contains('paused')) {
      finishOpening();
      return;
    }
    // animationend sincroniza la lectura con la llegada del papel. El respaldo
    // evita dejar la invitación cerrada si un navegador cancela la animación.
    fallback = setTimeout(finishOpening, 2200);
  }

  cover.addEventListener('animationend', event => {
    if (event.target === cover && event.animationName === 'lift-cover') finishOpening();
  });
  open.addEventListener('click', openEnvelope);
  replay.addEventListener('click', () => closeEnvelope(true));
  function setMotion(paused) {
    document.documentElement.classList.toggle('motion-enabled', !paused);
    document.body.classList.toggle('paused', paused);
    motion.setAttribute('aria-pressed', String(paused));
    motion.innerHTML = paused ? 'Activar animación <span aria-hidden="true">▷</span>' : 'Pausar animación <span aria-hidden="true">Ⅱ</span>';
    if (paused) finishOpening();
  }
  motion.addEventListener('click', () => setMotion(!document.body.classList.contains('paused')));
  reduced.addEventListener('change', () => setMotion(reduced.matches));
  document.addEventListener('visibilitychange', () => { if (document.hidden) finishOpening(); });
  replay.hidden = false;
  motion.hidden = false;
  setMotion(reduced.matches);
  closeEnvelope(false);
})();
