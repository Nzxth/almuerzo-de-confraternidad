/* El almuerzo comienza a las 13:00 de Perú (UTC−5), desde cualquier país. */
(() => {
  'use strict';

  function remainingTime(eventTime, now = Date.now()) {
    if (!Number.isFinite(eventTime) || !Number.isFinite(now)) return null;
    const totalSeconds = Math.max(0, Math.ceil((eventTime - now) / 1000));
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor(totalSeconds / 3600) % 24,
      minutes: Math.floor(totalSeconds / 60) % 60,
      seconds: totalSeconds % 60,
      isComplete: totalSeconds === 0
    };
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { remainingTime };
  }
  if (typeof document === 'undefined') return;

  const countdown = document.querySelector('[data-countdown]');
  if (!countdown) return;
  const eventTime = Date.parse(countdown.getAttribute('data-event-date'));
  if (!Number.isFinite(eventTime)) return; // Conserva la fecha y el texto estáticos.

  const fields = Object.fromEntries(
    ['days', 'hours', 'minutes', 'seconds'].map(unit => [
      unit, countdown.querySelector(`[data-countdown-${unit}]`)
    ])
  );
  if (Object.values(fields).some(field => !field)) return;
  const message = document.querySelector('[data-countdown-message]');
  let timer;

  function stopTimer() {
    if (timer !== undefined) clearInterval(timer);
    timer = undefined;
  }

  function update() {
    const remaining = remainingTime(eventTime);
    if (!remaining) {
      stopTimer();
      return false;
    }
    for (const [unit, field] of Object.entries(fields)) {
      const text = String(remaining[unit]).padStart(2, '0');
      if (field.textContent !== text) field.textContent = text;
    }
    countdown.dataset.state = remaining.isComplete ? 'arrived' : 'upcoming';
    if (remaining.isComplete) {
      if (message) message.textContent = '¡Llegó el día de compartir!';
      stopTimer();
    }
    return !remaining.isComplete;
  }

  function syncTimer() {
    stopTimer();
    if (document.hidden) return;
    if (update()) timer = setInterval(update, 1000);
  }

  document.addEventListener('visibilitychange', syncTimer);
  syncTimer();
})();
