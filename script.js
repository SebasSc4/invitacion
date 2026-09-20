document.addEventListener('DOMContentLoaded', () => {
  
  const startBtn = document.getElementById('start-btn');
  const welcomeModal = document.getElementById('welcome-modal');
  const musicBtn = document.getElementById('music-btn');
  const bgMusic = document.getElementById('bg-music');
  let isPlaying = false;

  // FUNCIÓN PARA INICIAR MÚSICA AL ABRIR LA INVITACIÓN
  startBtn.addEventListener('click', () => {
    welcomeModal.classList.add('hidden');
    
    // Intenta reproducir la música inmediatamente al dar clic
    bgMusic.play().then(() => {
      isPlaying = true;
      musicBtn.classList.add('playing');
      musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }).catch(err => {
      console.log("No se pudo iniciar el audio automático:", err);
    });

    // Lanza confeti de bienvenida
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  });

  // BOTÓN FLOTANTE PARA PAUSAR / REPRODUCIR MÚSICA
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

  // GENERADOR DE GLOBOS FLOTANTES DE FONDO
  const balloonContainer = document.getElementById('balloon-container');
  const colors = ['#ff3b30', '#4cd964', '#5ac8fa', '#007aff', '#ffcc00', '#ff9500'];

  function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomLeft = Math.random() * 100;
    const randomDuration = 6 + Math.random() * 8;
    const randomSize = 20 + Math.random() * 20;

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

  setInterval(createBalloon, 600);

  // ANIMACIÓN DE LA CASA VOLADORA CON EL SCROLL
  const house = document.querySelector('.floating-house-wrapper');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const translateY = -(scrollY * 0.85); 
    const rotate = Math.sin(scrollY / 20) * 4; 

    if (house) {
      house.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
    }
  });

  // TEMPORIZADOR DE CUENTA REGRESIVA
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
      daysEl.innerText = "00";
      hoursEl.innerText = "00";
      minutesEl.innerText = "00";
      secondsEl.innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = days < 10 ? `0${days}` : days;
    hoursEl.innerText = hours < 10 ? `0${hours}` : hours;
    minutesEl.innerText = minutes < 10 ? `0${minutes}` : minutes;
    secondsEl.innerText = seconds < 10 ? `0${seconds}` : seconds;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // GENERAR EVENTO PARA CALENDARIO DE GOOGLE
  const addCalendarBtn = document.getElementById('add-calendar-btn');
  addCalendarBtn.addEventListener('click', () => {
    const title = encodeURIComponent("1er Cumpleaños de Jaziel Emiliano 🎈");
    const details = encodeURIComponent("¡Acompáñame a esta aventura! Cumpleaños número 1 de Jaziel Emiliano.");
    const location = encodeURIComponent("https://maps.app.goo.gl/5b2S71N1hycsWweD8");
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${currentYear}1010T220000Z/${currentYear}1011T020000Z&details=${details}&location=${location}`;
    
    window.open(calendarUrl, '_blank');
  });

  // CONFETI AL PRESIONAR BOTÓN DE WHATSAPP O PERSONAJES
  const rsvpBtn = document.querySelector('.btn-rsvp');
  rsvpBtn.addEventListener('click', () => {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  });

  document.querySelectorAll('.char-badge').forEach(badge => {
    badge.addEventListener('click', () => {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.8 }
        });
      }
    });
  });

});