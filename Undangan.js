(function () {
  const openBtn = document.getElementById("openBtn");
  const bottomNav = document.getElementById("bottomNav");

  // === LOGIKA NAMA TAMU (GABUNGAN LAMA & BARU) ===
  const params = new URLSearchParams(window.location.search);
  
  // 1. Ambil parameter
  const to = params.get("to");     // Format lama
  const nama = params.get("n");    // Format baru (Nama)
  const pronoun = params.get("p"); // Format baru (Sapaan)

  // 2. Ambil elemen HTML
  const guestNameEl = document.getElementById("guestName");
  const guestPronounEl = document.getElementById("guestPronoun");

  // 3. Logika Pengisian Nama
  // Prioritaskan ?n=, jika tidak ada cek ?to=
  if (guestNameEl) {
    if (nama) {
      guestNameEl.textContent = nama;
    } else if (to) {
      guestNameEl.textContent = decodeURIComponent(to);
    }
  }

  // 4. Logika Pengisian Sapaan (Pronoun)
  if (pronoun && guestPronounEl) {
    guestPronounEl.textContent = "Kepada " + pronoun;
  }
  // ===============================================

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

  // Open invitation & Music
  const song = document.getElementById("song");
  const audioBtn = document.getElementById("audioBtn");
  const audioIcon = audioBtn.querySelector("i");
  let isPlaying = false;

  function showMusicButton() {
    audioBtn.classList.remove("hidden");
  }

  function playAudio() {
    song.volume = 0.1;
    song.play();
    isPlaying = true;

    audioBtn.classList.add("playing");
    audioIcon.classList.remove("bi-pause-circle");
    audioIcon.classList.add("bi-disc");
  }

  function pauseAudio() {
    song.pause();
    isPlaying = false;

    audioBtn.classList.remove("playing");
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  }

  // Event Listener Tombol Musik
  audioBtn.addEventListener("click", () => {
    if (isPlaying) pauseAudio();
    else playAudio();
  });

  // Event Listener Tombol Buka Undangan
  if (openBtn) {
    openBtn.addEventListener("click", function () {
      if (bottomNav) bottomNav.classList.remove("hidden");
      showSection("informasi");
      startCountdown();
      
      // Jalankan musik
      showMusicButton();
      playAudio();
    });
  }

  // Event Listener Google Maps
  const btnMaps = document.getElementById("btnMaps");
  if (btnMaps) {
    btnMaps.addEventListener("click", function () {
      window.open(
        "https://maps.google.com/?q=Regale+International+Convention+Centre",
        "_blank"
      );
    });
  }

  // === LIGHTBOX GALLERY ===
  const galleryImages = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (lightbox && lightboxImg) {
    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

})();