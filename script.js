document.addEventListener('DOMContentLoaded', () => {
  
  const startBtn = document.getElementById('start-btn');
  const welcomeModal = document.getElementById('welcome-modal');
  const musicBtn = document.getElementById('music-btn');
  const bgMusic = document.getElementById('bg-music');
  let isPlaying = false;

  // FUNCIÓN PARA ABRIR LA INVITACIÓN E INICIAR AUDIO Y CONFETI
  startBtn.addEventListener('click', () => {
    welcomeModal.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => welcomeModal.remove(), 500);
    
    bgMusic.play().then(() => {
      isPlaying = true;
      musicBtn.classList.add('playing');
      musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }).catch(err => {
      console.log("Audio automático bloqueado por el navegador:", err);
    });

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  });

  // CONTROL MANUAL DE MÚSICA
  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      musicBtn.classList.remove('playing');
      musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
    } else {
      bgMusic.play().then(() => {
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      }).catch(err => {
        console.log("Error al reproducir audio:", err);
      });
    }
    isPlaying = !isPlaying;
  });

  // GENERADOR DE GLOBOS FLOTANTES
  const balloonContainer = document.getElementById('balloon-container');
  const colors = ['#ff3b30', '#4cd964', '#5ac8fa', '#007aff', '#ffcc00', '#ff9500'];

  function createBalloon() {
    if (!balloonContainer) return;
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomLeft = Math.random() * 100;
    const randomDuration = 7 + Math.random() * 7;
    const randomSize = 22 + Math.random() * 18;

    balloon.style.backgroundColor = randomColor;
    balloon.style.left = `${randomLeft}%`;
    balloon.style.animationDuration = `${randomDuration}s`;
    balloon.style.width = `${randomSize}px`;
    balloon.style.height = `${randomSize * 1.3}px`;

    balloonContainer.appendChild(balloon);

    setTimeout(() => {
      balloon.remove();
    }, randomDuration * 1000);
  }

  setInterval(createBalloon, 700);

  // CUENTA REGRESIVA
  const currentYear = new Date().getFullYear();
  let eventDate = new Date(`October 10, ${currentYear} 17:00:00`).getTime();

  if (new Date().getTime() > eventDate) {
    eventDate = new Date(`October 10, ${currentYear + 1} 17:00:00`).getTime();
  }

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      if (daysEl) daysEl.innerText = "00";
      if (hoursEl) hoursEl.innerText = "00";
      if (minutesEl) minutesEl.innerText = "00";
      if (secondsEl) secondsEl.innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.innerText = days < 10 ? `0${days}` : days;
    if (hoursEl) hoursEl.innerText = hours < 10 ? `0${hours}` : hours;
    if (minutesEl) minutesEl.innerText = minutes < 10 ? `0${minutes}` : minutes;
    if (secondsEl) secondsEl.innerText = seconds < 10 ? `0${seconds}` : seconds;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // GUARDAR EN CALENDARIO (.ICS)
  const addCalendarBtn = document.getElementById('add-calendar-btn');
  if (addCalendarBtn) {
    addCalendarBtn.addEventListener('click', () => {
      const title = "1er Cumpleaños de Jaziel Emiliano 🎈";
      const description = "¡Acompáñame a esta aventura! Cumpleaños número 1 de Jaziel Emiliano.";
      const location = "CDA CAMINO SIN NOMBRE, SAN MATEO TECALCO";
      
      const startDate = `${currentYear}1010T220000Z`;
      const endDate = `${currentYear}1011T020000Z`;

      const icsData = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Invitacion UP//Jaziel Emiliano//ES
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${startDate}
DTEND:${endDate}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'cumpleanos-jaziel-emiliano.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // CONFETI AL PRESIONAR CONFIRMAR ASISTENCIA
  const rsvpBtn = document.getElementById('rsvp-btn');
  if (rsvpBtn) {
    rsvpBtn.addEventListener('click', () => {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    });
  }

});