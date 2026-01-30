(function () {
  const openBtn = document.getElementById("openBtn");
  const bottomNav = document.getElementById("bottomNav");

  // nama tamu dari URL ?to=
  const params = new URLSearchParams(window.location.search);
  const to = params.get("to");
  const guestNameEl = document.getElementById("guestName");
  if (to && guestNameEl) guestNameEl.textContent = decodeURIComponent(to);

  function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) target.classList.add("active");

    document.querySelectorAll(".bottom-nav .nav-item").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.target === id);
    });
  }

  // countdown jalan sekali
  let countdownStarted = false;
  function startCountdown() {
    if (countdownStarted) return;
    countdownStarted = true;

    simplyCountdown(".simply-countdown", {
      year: 2026,
      month: 2,
      day: 14,
      hours: 9,
      minutes: 30,
      seconds: 0,
      words: {
        days: { singular: "hari", plural: "hari" },
        hours: { singular: "jam", plural: "jam" },
        minutes: { singular: "menit", plural: "menit" },
        seconds: { singular: "detik", plural: "detik" }
      },
      zeroPad: true
    });
  }

  // menu click
  document.querySelectorAll(".bottom-nav .nav-item").forEach(btn => {
    btn.addEventListener("click", () => showSection(btn.dataset.target));
  });

  // Open invitation
  if (openBtn) {
    openBtn.addEventListener("click", function () {
      if (bottomNav) bottomNav.classList.remove("hidden");
      showSection("informasi");
      startCountdown();
    });
  }

  document.getElementById("btnMaps").addEventListener("click", function () {
  window.open(
    "https://maps.google.com/?q=Regale+International+Convention+Centre",
    "_blank"
  );
});

function showSection(id){
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  document.querySelectorAll(".bottom-nav .nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.target === id);
  });
}

const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

const song = document.getElementById("song");
const audioBtn = document.getElementById("audioBtn");
const audioIcon = audioBtn.querySelector("i");

let isPlaying = false;

function showMusicButton(){
  audioBtn.classList.remove("hidden");
}

function playAudio(){
  song.volume = 0.1;
  song.play();
  isPlaying = true;

  audioBtn.classList.add("playing");
  audioIcon.classList.remove("bi-pause-circle");
  audioIcon.classList.add("bi-disc");
}

function pauseAudio(){
  song.pause();
  isPlaying = false;

  audioBtn.classList.remove("playing");
  audioIcon.classList.remove("bi-disc");
  audioIcon.classList.add("bi-pause-circle");
}

audioBtn.addEventListener("click", () => {
  if(isPlaying) pauseAudio();
  else playAudio();
});

/* Panggil ini saat user klik Open Invitation */
function onOpenInvite(){
  showMusicButton();
  playAudio();
}

document.getElementById("openBtn").addEventListener("click", () => {
  onOpenInvite();
});


})();
