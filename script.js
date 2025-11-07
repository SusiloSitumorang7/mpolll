// ===== data =====
const STORY_PARTS = [
  "Semesta punya cara paling pelan tapi paling tepat untuk mempertemukan kita.",
  "Awalnya cuma obrolan biasa, tapi makin lama rasanya kok nyaman ya.",
  "Lalu aku mulai mengingat hal-hal kecil tentangmu. Dan dari situ aku tahu, aku ingin ini lama.",
  "Kalau nanti kamu baca ini lagi: iya, pada saat ini aku benar-benar sayang kamu."
];

const LOVE_NOTES = [
  "Kamu adalah rumah yang selalu ingin aku pulang.",
  "Semoga kamu selalu merasa cukup dicintai.",
  "Aku bangga pernah berjalan bersamamu.",
  "Kamu versi terindah dari kebetulan.",
  "Terima kasih sudah sabar.",
  "Kalau ada hari yang berat, ingat saja: aku di sini."
];

const GALLERY_IMAGES = [
  { src: "image/IMG-20251105-WA0017.jpg", alt: "Momen kita 1" },
  { src: "image/IMG-20251105-WA0009.jpg", alt: "Momen kita 2" },
  { src: "image/IMG-20251105-WA0010.jpg", alt: "Momen kita 3" },
  { src: "image/IMG-20251105-WA0011.jpg", alt: "Momen kita 4" },
  { src: "image/IMG-20251105-WA0012.jpg", alt: "Momen kita 5" },
  { src: "image/IMG-20251105-WA0013.jpg", alt: "Momen kita " },
  { src: "image/IMG-20251105-WA0014.jpg", alt: "Momen kita 3" },
  { src: "image/IMG-20251105-WA0015.jpg", alt: "Momen kita 4" },
  { src: "image/IMG-20251105-WA0016.jpg", alt: "Momen kita 1" },
  { src: "image/IMG-20251105-WA0017.jpg", alt: "Momen kita 2" },

];

// ===== render timeline story =====
const storyTimeline = document.getElementById("storyTimeline");
STORY_PARTS.forEach((text, index) => {
  const item = document.createElement("div");
  item.className = "timeline-item";
  item.innerHTML = `
    <div class="tl-dot"></div>
    <div class="tl-card">
      <div class="tl-step">bagian ${index + 1}</div>
      <p class="tl-text">${text}</p>
    </div>
  `;
  storyTimeline.appendChild(item);
});

// ===== render love notes =====
const notesGrid = document.getElementById("notesGrid");
LOVE_NOTES.forEach(note => {
  const card = document.createElement("div");
  card.className = "note-card";
  card.textContent = note;
  notesGrid.appendChild(card);
});

// ===== render gallery (2x) =====
const galleryTrack = document.getElementById("galleryTrack");
function addGallerySet() {
  GALLERY_IMAGES.forEach(img => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `
      <img src="${img.src}" alt="${img.alt}">
      <span>${img.alt}</span>
    `;
    galleryTrack.appendChild(item);
  });
}
addGallerySet();
addGallerySet(); // duplicate for seamless scroll


// ===== intersection observer =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll(
  ".timeline-item, .note-card, .final-content"
).forEach(el => observer.observe(el));

// ===== smooth scroll buttons =====
document.querySelectorAll("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-scroll");
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  });
});

// ===== music =====
const MUSIC_SRC = "audio/Sal Priadi - Kita usahakan rumah itu (Official Audio).mp3"; // ganti ke mp3 kamu
const audio = new Audio(MUSIC_SRC);
audio.loop = true;
let isPlaying = false;

const musicToggle = document.getElementById("musicToggle");
musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    musicToggle.textContent = "♫";
  } else {
    audio.play().catch(() => {});
    isPlaying = true;
    musicToggle.textContent = "❚❚";
  }
});

// ===== custom cursor =====
const customCursor = document.getElementById("customCursor");
document.addEventListener("mousemove", (e) => {
  customCursor.style.left = e.clientX + "px";
  customCursor.style.top = e.clientY + "px";
});
const activateCursor = () => customCursor.classList.add("cursor-active");
const deactivateCursor = () => customCursor.classList.remove("cursor-active");
document.querySelectorAll("button, .music-toggle, .scroll-hint").forEach(el => {
  el.addEventListener("mouseenter", activateCursor);
  el.addEventListener("mouseleave", deactivateCursor);
});
