/**
 * SHREYAS M. CHANABASANNAVAR
 * Full Architecture: Eliot Besson Editorial Motion + Jesper Landberg Velocity-Skew Project Slider
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Lenis Smooth Scroll (Eliot Besson Engine)
  // =========================================================================
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

  // Smooth Scroll on Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -30, duration: 1.2 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });


  // =========================================================================
  // 2. Jesper Landberg Signature Projects Slider (Inertia + Velocity Skew)
  // =========================================================================
  const viewport = document.getElementById('jesper-slider-viewport');
  const track = document.getElementById('jesper-slider-track');
  const cards = document.querySelectorAll('.jesper_card');
  const counterEl = document.getElementById('jesper-live-counter');

  if (viewport && track && cards.length > 0) {
    let currentX = 0;
    let targetX = 0;
    let prevX = 0;
    let isDown = false;
    let startX = 0;
    let dragDist = 0;
    let maxScroll = 0;

    function updateBounds() {
      const vWidth = viewport.offsetWidth;
      const tWidth = track.scrollWidth;
      maxScroll = Math.max(0, tWidth - vWidth + 60);
    }
    updateBounds();
    window.addEventListener('resize', updateBounds);

    viewport.addEventListener('pointerdown', (e) => {
      isDown = true;
      startX = e.clientX;
      dragDist = 0;
      viewport.classList.add('is-dragging');
      viewport.setPointerCapture(e.pointerId);
    });

    viewport.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const deltaX = e.clientX - startX;
      startX = e.clientX;
      targetX += deltaX * 1.35;
      dragDist += Math.abs(deltaX);

      // Boundaries with subtle elastic bounce
      if (targetX > 40) targetX = 40;
      if (targetX < -maxScroll - 40) targetX = -maxScroll - 40;
    });

    function stopDrag(e) {
      if (!isDown) return;
      isDown = false;
      viewport.classList.remove('is-dragging');
      if (e && e.pointerId) {
        try { viewport.releasePointerCapture(e.pointerId); } catch (_) {}
      }

      if (targetX > 0) targetX = 0;
      if (targetX < -maxScroll) targetX = -maxScroll;
    }

    viewport.addEventListener('pointerup', stopDrag);
    viewport.addEventListener('pointercancel', stopDrag);

    // Suppress accidental link clicks while dragging
    cards.forEach(card => {
      const links = card.querySelectorAll('a');
      links.forEach(l => {
        l.addEventListener('click', (e) => {
          if (dragDist > 6) {
            e.preventDefault();
          }
        });
      });
    });

    // Translate Mouse Wheel to Horizontal Drag Momentum
    viewport.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        targetX -= e.deltaY * 0.95;
        if (targetX > 0) targetX = 0;
        if (targetX < -maxScroll) targetX = -maxScroll;
      }
    }, { passive: true });

    // Inertia & Dynamic Velocity Skew Animation Loop
    function renderJesperSlider() {
      requestAnimationFrame(renderJesperSlider);

      currentX += (targetX - currentX) * 0.085;
      const velocity = currentX - prevX;
      prevX = currentX;

      // Clamped skew distortion
      const skew = Math.max(-12, Math.min(12, -velocity * 0.14));
      track.style.transform = `translate3d(${currentX}px, 0, 0) skewX(${skew}deg)`;

      // Active slide indicator counter
      if (counterEl && cards.length > 0) {
        const cardWidth = cards[0].offsetWidth + 36;
        let activeIdx = Math.round(Math.abs(currentX) / cardWidth) + 1;
        activeIdx = Math.max(1, Math.min(cards.length, activeIdx));
        counterEl.textContent = `0${activeIdx} / 0${cards.length}`;
      }
    }
    renderJesperSlider();
  }

});
