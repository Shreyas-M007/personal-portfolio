/**
 * SHREYAS M. CHANABASANNAVAR
 * Jesper Landberg Dynamic Mouse-Move Slider + Eliot Besson Lenis Motion
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Lenis Smooth Scroll Engine (Eliot Besson)
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

  // Smooth Scroll on Navigation Anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

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
  // 2. Jesper Landberg Dynamic Mouse-Move & Texture Feelable Slider
  // =========================================================================
  const stage = document.getElementById('jesper-stage');
  const track = document.getElementById('jesper-track');
  const cards = document.querySelectorAll('.jesper_card_item');
  const counterEl = document.getElementById('jesper-live-counter');

  if (stage && track && cards.length > 0) {
    let currentX = 0;
    let targetX = 0;
    let prevX = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragDistance = 0;
    let maxScroll = 0;

    function recalculateBounds() {
      const stageWidth = stage.offsetWidth;
      const trackWidth = track.scrollWidth;
      maxScroll = Math.max(0, trackWidth - stageWidth + 80);
    }
    recalculateBounds();
    window.addEventListener('resize', recalculateBounds);

    // --- MOUSE-MOVE NAVIGATION (Slides with mouse position across screen) ---
    stage.addEventListener('mousemove', (e) => {
      if (isDragging) return;
      const rect = stage.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width; // 0.0 to 1.0
      targetX = -relativeX * maxScroll;
    });

    // --- DRAG / POINTER NAVIGATION ---
    stage.addEventListener('pointerdown', (e) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragDistance = 0;
      stage.classList.add('is-dragging');
      stage.setPointerCapture(e.pointerId);
    });

    stage.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartX;
      dragStartX = e.clientX;
      targetX += deltaX * 1.4;
      dragDistance += Math.abs(deltaX);

      // Boundaries with rubber-banding
      if (targetX > 40) targetX = 40;
      if (targetX < -maxScroll - 40) targetX = -maxScroll - 40;
    });

    function stopDragging(e) {
      if (!isDragging) return;
      isDragging = false;
      stage.classList.remove('is-dragging');
      if (e && e.pointerId) {
        try { stage.releasePointerCapture(e.pointerId); } catch (_) {}
      }

      if (targetX > 0) targetX = 0;
      if (targetX < -maxScroll) targetX = -maxScroll;
    }

    stage.addEventListener('pointerup', stopDragging);
    stage.addEventListener('pointercancel', stopDragging);

    // Suppress link click if dragged
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (dragDistance > 8) {
          e.preventDefault();
        }
      });

      // Tactile 3D Tilt / Texture Parallax on hover
      const surface = card.querySelector('.jesper_card_surface');
      if (surface) {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (-(y - centerY) / centerY) * 6;
          const rotateY = ((x - centerX) / centerX) * 6;

          surface.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
          surface.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
      }
    });

    // --- MOUSE WHEEL TRANSLATION ---
    stage.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        targetX -= e.deltaY * 0.95;
        if (targetX > 0) targetX = 0;
        if (targetX < -maxScroll) targetX = -maxScroll;
      }
    }, { passive: true });

    // --- ANIMATION LOOP: Inertia + Velocity-Based Skew Distortion ---
    function animateJesperSlider() {
      requestAnimationFrame(animateJesperSlider);

      currentX += (targetX - currentX) * 0.085;
      const velocity = currentX - prevX;
      prevX = currentX;

      // Dynamic velocity skew
      const skew = Math.max(-12, Math.min(12, -velocity * 0.15));
      track.style.transform = `translate3d(${currentX}px, 0, 0) skewX(${skew}deg)`;

      // Active Counter Update
      if (counterEl && cards.length > 0) {
        const cardWidth = cards[0].offsetWidth + 40;
        let activeIdx = Math.round(Math.abs(currentX) / cardWidth) + 1;
        activeIdx = Math.max(1, Math.min(cards.length, activeIdx));
        counterEl.textContent = `0${activeIdx} / 0${cards.length}`;
      }
    }
    animateJesperSlider();
  }

});
