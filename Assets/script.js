/* =========================
   Scroll Reveal
   ========================= */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });
revealElements.forEach(el => revealObserver.observe(el));

/* =========================
   Floating Particles (Hero only)
   ========================= */
(function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return;
  const numberOfParticles = 28;
  for (let i = 0; i < numberOfParticles; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    const size = Math.random() * 6 + 3;
    p.style.width = `${size}px`; p.style.height = `${size}px`;
    p.style.opacity = (Math.random() * 0.5 + 0.2).toString();
    p.style.animationDuration = `${Math.random() * 10 + 6}s`;
    particlesContainer.appendChild(p);
  }
})();

/* =========================
   Tilt effect for elements with .tilt
   (mouse + touch; gentle)
   ========================= */
const tiltElements = document.querySelectorAll('.tilt');
tiltElements.forEach(card => {
  let frame;
  const update = (x, y, rect) => {
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => update(e.clientX - rect.left, e.clientY - rect.top, rect));
  });

  card.addEventListener('mouseleave', () => {
    cancelAnimationFrame(frame);
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  });

  // touch support
  card.addEventListener('touchmove', (e) => {
    if (!e.touches || e.touches.length === 0) return;
    const rect = card.getBoundingClientRect();
    const t = e.touches[0];
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => update(t.clientX - rect.left, t.clientY - rect.top, rect));
  }, { passive: true });

  card.addEventListener('touchend', () => {
    cancelAnimationFrame(frame);
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

/* =========================
   Theme Toggle
   ========================= */
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-theme');
  themeBtn.textContent = '☀️';
}
themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  if (body.classList.contains('dark-theme')) {
    themeBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    themeBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});

/* =========================
   Preloader hide
   ========================= */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (!pre) return;
  pre.style.opacity = '0';
  pre.style.transition = 'opacity 0.6s ease';
  setTimeout(() => pre.style.display = 'none', 650);
});
