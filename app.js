/**
 * SHREYAS M. CHANABASANNAVAR — V5.0
 * Pure Craft: Lenis Smooth Scroll + Jesper Landberg Drag Slider + Eliot Besson Modal
 */

// =========================================================================
// 1. Project Data Store for Eliot Besson Modal Drawer
// =========================================================================
const PROJECTS_DATA = {
  agrimate: {
    title: 'AgriMate',
    category: 'AI Agricultural Intelligence & Mandi Forecasting',
    tags: ['React 19', 'TypeScript', 'Node / Express', 'AWS S3', 'APMC API'],
    description: 'AI-assisted agricultural market intelligence platform designed for small and marginal farmers, powered by verified APMC mandi records for price clarity and crop forecasting. Features predictive price trend algorithms and multi-device responsive design.',
    image: 'https://api.microlink.io/?url=https%3A%2F%2Fagrimate-web-647782045916-apsouth1.s3.ap-south-1.amazonaws.com%2Findex.html&screenshot=true&embed=screenshot.url',
    demoUrl: 'https://agrimate-web-647782045916-apsouth1.s3.ap-south-1.amazonaws.com/index.html#',
    githubUrl: 'https://github.com/Shreyas-M007/Agrimate'
  },
  paarakhmetric: {
    title: 'PaarakhMetric',
    category: 'Legal Metrology & Computer Vision Inspection',
    tags: ['Gemini Vision', 'Firebase Firestore', 'TypeScript', 'PWA', 'OCR'],
    description: 'Mobile-first statutory compliance audit system for field inspectors. Employs Gemini multimodal vision OCR to analyze statutory packaging labels, flag non-compliant declarations in real time, and auto-generate legal digital seizure memos.',
    image: 'paarakh-metric-desktop.png',
    demoUrl: 'https://shreyas-m007.github.io/paarakhmetric/',
    githubUrl: 'https://github.com/Shreyas-M007/paarakhmetric'
  },
  dronelab: {
    title: 'Drone Aero Lab',
    category: '3D Aerodynamics & Flight Physics Simulation',
    tags: ['Three.js', 'Aerodynamics', 'Physics Engine', 'JavaScript'],
    description: 'A 3D flight assembler sandbox city featuring DJI drone configurations. Models aerodynamic lifting physics, payload weight adjustments, motor thrust velocity, air resistance, and drag factor calculations.',
    image: 'https://api.microlink.io/?url=https%3A%2F%2Fdrone-aero-engineering-lab.vercel.app&screenshot=true&embed=screenshot.url',
    demoUrl: 'https://drone-aero-engineering-lab.vercel.app',
    githubUrl: 'https://github.com/Shreyas-M007/Drone-Aero-Engineering-Lab'
  },
  library: {
    title: 'Library Inventory System',
    category: 'OOP Software Architecture & Automation',
    tags: ['Python', 'Streamlit', 'OOP Architecture', 'File I/O'],
    description: 'An automated borrower and book inventory tracker with real-time fine and penalty calculations. Built with robust object-oriented patterns, student records tracking, and interactive Streamlit analytics dashboards.',
    image: 'lib-management.png',
    demoUrl: 'https://lib-management-system.streamlit.app',
    githubUrl: 'https://github.com/Shreyas-M007/library-management-system'
  },
  jansathi: {
    title: 'Jan-Sathi',
    category: 'Public Welfare Eligibility Routing Portal',
    tags: ['TypeScript', 'Public Schemes API', 'CSS Grid', 'Schema Validation'],
    description: 'Citizen welfare matching portal routing government schemes to eligible applicants based on demographic, income, and regional criteria with strongly-typed field validation schemas.',
    image: 'https://api.microlink.io/?url=https%3A%2F%2Fcode-rouge-kappa.vercel.app&screenshot=true&embed=screenshot.url',
    demoUrl: 'https://code-rouge-kappa.vercel.app',
    githubUrl: 'https://github.com/Shreyas-M007/Jan-Sathi'
  }
};

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 2. Lenis Smooth Scroll (Eliot Besson Standard)
  // =========================================================================
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }


  // =========================================================================
  // 3. Minimal Cursor Tracker
  // =========================================================================
  const tracker = document.getElementById('cursor-tracker');
  const trackerText = tracker ? tracker.querySelector('.cursor-text') : null;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (tracker && !isTouchDevice) {
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
      tracker.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const jesperViewport = document.getElementById('jesper-viewport');
    if (jesperViewport) {
      jesperViewport.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-drag-mode');
        if (trackerText) trackerText.textContent = 'DRAG';
      });
      jesperViewport.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-drag-mode');
        if (trackerText) trackerText.textContent = '';
      });
    }
  }


  // =========================================================================
  // 4. Jesper Landberg Signature Projects Slider (Inertia + Velocity Skew)
  // =========================================================================
  const viewport = document.getElementById('jesper-viewport');
  const track = document.getElementById('jesper-track');
  const cards = document.querySelectorAll('.jesper-card');
  const counterEl = document.getElementById('slider-counter');

  if (viewport && track && cards.length > 0) {
    let currentX = 0;
    let targetX = 0;
    let prevX = 0;
    let isDown = false;
    let startX = 0;
    let dragDistance = 0;
    let maxScroll = 0;

    function calculateBounds() {
      const viewportWidth = viewport.offsetWidth;
      const trackWidth = track.scrollWidth;
      maxScroll = Math.max(0, trackWidth - viewportWidth + 60);
    }
    calculateBounds();
    window.addEventListener('resize', calculateBounds);

    viewport.addEventListener('pointerdown', (e) => {
      isDown = true;
      startX = e.clientX;
      dragDistance = 0;
      viewport.classList.add('is-dragging');
      viewport.setPointerCapture(e.pointerId);
    });

    viewport.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const deltaX = e.clientX - startX;
      startX = e.clientX;
      targetX += deltaX * 1.35;
      dragDistance += Math.abs(deltaX);

      // Resistance bounds
      if (targetX > 40) targetX = 40;
      if (targetX < -maxScroll - 40) targetX = -maxScroll - 40;
    });

    function releaseDrag(e) {
      if (!isDown) return;
      isDown = false;
      viewport.classList.remove('is-dragging');
      if (e && e.pointerId) {
        try { viewport.releasePointerCapture(e.pointerId); } catch (_) {}
      }

      if (targetX > 0) targetX = 0;
      if (targetX < -maxScroll) targetX = -maxScroll;
    }

    viewport.addEventListener('pointerup', releaseDrag);
    viewport.addEventListener('pointercancel', releaseDrag);

    // Mouse wheel horizontal translation over slider
    viewport.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        targetX -= e.deltaY * 0.95;
        if (targetX > 0) targetX = 0;
        if (targetX < -maxScroll) targetX = -maxScroll;
      }
    }, { passive: true });

    // Track card click suppression if dragging
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (dragDistance > 6) {
          e.stopPropagation();
          e.preventDefault();
        }
      });
    });

    // Inertia & Velocity-Skew Animation Loop
    function renderJesperSlider() {
      requestAnimationFrame(renderJesperSlider);

      currentX += (targetX - currentX) * 0.085;
      const velocity = currentX - prevX;
      prevX = currentX;

      // Dynamic velocity skew clamped to realistic range
      const skew = Math.max(-10, Math.min(10, -velocity * 0.12));
      track.style.transform = `translate3d(${currentX}px, 0, 0) skewX(${skew}deg)`;

      // Active slide indicator counter
      if (counterEl && cards.length > 0) {
        const cardWidth = cards[0].offsetWidth + 32;
        let activeIndex = Math.round(Math.abs(currentX) / cardWidth) + 1;
        activeIndex = Math.max(1, Math.min(cards.length, activeIndex));
        counterEl.textContent = `0${activeIndex} / 0${cards.length}`;
      }
    }
    renderJesperSlider();
  }


  // =========================================================================
  // 5. Eliot Besson Project Modal Functions (Global scope)
  // =========================================================================
  window.openProjectModal = function(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content-area');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="modal-project-header">
        <div class="modal-project-tags">
          ${data.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}
        </div>
        <h2 class="modal-project-title">${data.title}</h2>
        <p class="modal-project-desc">${data.description}</p>
      </div>

      <div class="modal-media-wrap">
        <img src="${data.image}" alt="${data.title}">
      </div>

      <div class="modal-actions">
        <a href="${data.demoUrl}" target="_blank" rel="noopener" class="modal-btn primary">
          <span>Open Live Project</span>
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <a href="${data.githubUrl}" target="_blank" rel="noopener" class="modal-btn secondary">
          <i class="fa-brands fa-github"></i>
          <span>View Source Code</span>
        </a>
      </div>
    `;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  };

  window.closeProjectModal = function() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  };

  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeProjectModal();
    }
  });

});
