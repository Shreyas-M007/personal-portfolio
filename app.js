/**
 * SHREYAS M. CHANABASANNAVAR — V6.0
 * Authentic Eliot Besson Performance Architecture
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Lenis Smooth Scroll (Eliot Besson Standard)
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      autoResize: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 2. Smooth Navigation Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetElement, { offset: -40, duration: 1.2 });
        } else {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 3. Custom Cursor Tracker (Eliot Besson Minimal Cursor)
  const cursor = document.getElementById('custom-cursor');
  const cursorText = document.getElementById('cursor-text');
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  if (cursor && !isTouch) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover interactions on project cards
    document.querySelectorAll('.work_card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-view');
        if (cursorText) cursorText.textContent = 'VIEW';
      });
      card.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-view');
        if (cursorText) cursorText.textContent = '';
      });
    });
  }

});
