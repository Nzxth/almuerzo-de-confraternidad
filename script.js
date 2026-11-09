document.querySelector('#save-date').addEventListener('click', () => {
  // Caraz, Perú: UTC-5. Se incluye solo el inicio, sin inventar una hora de cierre.
  const calendar = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Confraternidad//Invitacion//ES','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:almuerzo-20261220@invitacion.local','DTSTAMP:20261108T000000Z','DTSTART:20261220T180000Z','SUMMARY:Almuerzo de Confraternidad','LOCATION:Oro Andino Lodge\\, Caraz','DESCRIPTION:Un encuentro para celebrar la amistad y compartir recuerdos.','END:VEVENT','END:VCALENDAR',''].join('\r\n');
  const url = URL.createObjectURL(new Blob([calendar], {type:'text/calendar;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = 'almuerzo-de-confraternidad.ics'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  document.querySelector('#status').textContent = 'Invitación descargada. Abrí el archivo para añadirla a tu calendario.';
  setTimeout(() => { document.querySelector('#status').textContent = ''; }, 6500);
});
