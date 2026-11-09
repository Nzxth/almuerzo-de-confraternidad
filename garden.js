/* Dibujos locales: grabado de olivo, hojas sueltas y polvo de oro. */
(() => {
  const scene = document.querySelector('.garden');
  if (!scene) return;

  // Los símbolos se dibujan una sola vez; los demás elementos solo los reutilizan.
  const defs = `<svg class="garden-defs" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs>
    <linearGradient id="garden-olive" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#bcc29a"/><stop offset=".42" stop-color="#849264"/><stop offset=".49" stop-color="#738257"/><stop offset="1" stop-color="#354c41"/>
    </linearGradient>
    <linearGradient id="garden-gold" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#e7d6ad"/><stop offset=".44" stop-color="#b59d65"/><stop offset=".5" stop-color="#ac8c51"/><stop offset="1" stop-color="#776744"/>
    </linearGradient>
    <g id="garden-blade">
      <path d="M0 0C6-5 7-15 4-28C-3-22-8-8 0 0Z" stroke="#c6bb91" stroke-width=".52"/>
      <path d="M0 1Q-1-10 3.8-26M.1-6l-3-4m3.4.8 4-5M1.1-14l-2-3.8m3 0 2.5-3" fill="none" stroke="#d2c798" stroke-width=".48" stroke-linecap="round"/>
    </g>
    <symbol id="garden-leaf" viewBox="-16 -32 32 36"><use href="#garden-blade" fill="url(#garden-olive)"/></symbol>
    <symbol id="garden-gilded" viewBox="-16 -32 32 36"><use href="#garden-blade" fill="url(#garden-gold)"/></symbol>
    <symbol id="garden-ash" viewBox="0 0 12 12"><circle cx="6" cy="6" r="2.8" fill="currentColor"/><circle cx="6" cy="6" r="5" fill="currentColor" opacity=".10"/></symbol>
    <symbol id="garden-grain" viewBox="0 0 16 16"><path d="M6 14C3 12 4 8 6 6S11 3 13 2C12 6 10 11 6 14Z" fill="url(#garden-gold)" stroke="#cbb682" stroke-width=".5"/></symbol>
  </defs></svg>`;

  // Ramas asimétricas: cada par parte del tallo, como en una lámina botánica.
  const pairs = [
    [33,58,-48,1.5,88,1.7], [56,114,-39,1.65,94,1.65],
    [70,168,-38,1.55,90,1.6], [97,228,-29,1.55,99,1.46],
    [127,270,-28,1.48,112,1.4], [150,301,-22,1.20,110,1.22],
    [91,78,-25,1.2,98,1.43], [126,100,-16,1.3,107,1.29],
    [163,113,-10,1.21,110,1.12], [201,116,0,1.08,108,1.10],
    [29,207,-69,1.22,52,1.18], [18,251,-82,1.16,54,1.12],
    [14,288,-91,1,52,.93], [211,73,0,1.04,99,.94], [240,65,12,.97,101,.91]
  ];
  const foliage = pairs.map(([x,y,a,sz,b,t],i) => {
    const tone = i % 7 === 5 ? 'garden-gold' : 'garden-olive';
    return `<g transform="translate(${x} ${y})" fill="url(#${tone})"><use href="#garden-blade" transform="rotate(${a}) scale(${sz})"/><use href="#garden-blade" transform="rotate(${b}) scale(${t})"/></g>`;
  }).join('');
  const bough = `<g id="garden-bough-art">
    <g fill="none" stroke="#b9a578" stroke-linecap="round"><path d="M-14-15C22 19 48 79 61 135S100 243 152 303L175 327" stroke-width="2.1"/>
    <path d="M18 33C67 60 91 87 131 101S202 119 235 114M62 138C42 161 21 220 15 278L13 308M151 110Q181 81 210 74T260 57" stroke-width="1.35"/>
    <path d="M96 226Q113 215 118 195m-3 12 15-6m-65-61q-19-1-26-16m7 10-17 2M153 109q11-2 17-15" stroke-width=".9"/></g>
    ${foliage}
    <g fill="url(#garden-gold)" stroke="#cbb583" stroke-width=".7"><ellipse cx="119" cy="191" rx="3.8" ry="5.5" transform="rotate(22 119 191)"/><ellipse cx="133" cy="199" rx="4.8" ry="3.5" transform="rotate(-26 133 199)"/><ellipse cx="37" cy="121" rx="3.6" ry="5" transform="rotate(-33 37 121)"/><ellipse cx="27" cy="136" rx="4.7" ry="3"/></g>
  </g>`;
  const boughs = `<svg class="garden-bough garden-bough-north" aria-hidden="true" viewBox="0 0 266 336">${bough}</svg>
    <svg class="garden-bough garden-bough-south" aria-hidden="true" viewBox="0 0 266 336"><use href="#garden-bough-art"/></svg>`;

  // Una distribución de fases preestablecida evita ráfagas al entrar y no necesita un bucle JS.
  const kinds = ['leaf','ash','gilded','ash','grain','leaf','ash','gilded'];
  const count = 28;
  const particles = Array.from({length:count}, (_,i) => {
    const type = kinds[i % kinds.length];
    const x = (4 + i * 38.197) % 99;
    const phase = (.09 + i * .61803) % 1;
    const span = 12 + (i * 7) % 14;
    const w = type === 'ash' ? 3 + i % 4 : type === 'grain' ? 10 + i % 5 : 18 + (i * 5) % 15;
    const alpha = type === 'ash' ? .52 + (i % 4) * .07 : .43 + (i % 5) * .058;
    const vars = `--x:${x.toFixed(1)}%;--still-y:${(phase*100).toFixed(1)}%;--w:${w}px;--alpha:${alpha.toFixed(2)};--fall:${span}s;--progress:-${(span*phase).toFixed(2)}s;--rock:${(3.2+i%6*.49).toFixed(2)}s;--wind:${(i%3-1)*22}px;--sway:${6+i%13}px;--tilt:${i*49%230-110}deg`;
    return `<span class="garden-particle ${i<14?'':'extra'} ${i%7===1?'silver':'pollen'}" style="${vars}"><svg aria-hidden="true" viewBox="0 0 32 32"><use href="#garden-${type}" width="32" height="32"/></svg></span>`;
  }).join('');
  scene.innerHTML = defs + boughs + particles;
  const matchVisibility = () => scene.toggleAttribute('data-still', document.hidden);
  matchVisibility();
  document.addEventListener('visibilitychange', matchVisibility);
})();
