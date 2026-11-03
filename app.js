/**
 * SHREYAS M. CHANABASANNAVAR — PORTFOLIO JS V4.0
 * Architecture:
 * 1. Three.js Cosmic Canvas & Celestial 3D Core (Space Theme)
 * 2. Jesper Landberg Signature Projects Slider (Inertia + Velocity Skew)
 * 3. Eliot Besson Style Apple Floating Dock Navigation & Scrollspy
 * 4. Magnetic Custom Cursor
 * 5. Live IST Clock & One-Click Copy Handlers
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Live Bengaluru IST Clock
  // =========================================================================
  const clockElement = document.getElementById('live-ist-clock');
  function updateISTClock() {
    if (!clockElement) return;
    const now = new Date();
    // Format to Asia/Kolkata
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const timeString = new Intl.DateTimeFormat('en-GB', options).format(now);
    clockElement.textContent = `${timeString} IST`;
  }
  updateISTClock();
  setInterval(updateISTClock, 1000);


  // =========================================================================
  // 2. Custom Magnetic Cursor
  // =========================================================================
  const cursor = document.getElementById('custom-cursor');
  const cursorDot = cursor ? cursor.querySelector('.cursor-dot') : null;
  const cursorRing = cursor ? cursor.querySelector('.cursor-ring') : null;
  const cursorLabel = cursor ? cursor.querySelector('.cursor-label') : null;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isTouch = window.matchMedia('(pointer: coarse)').matches;

  if (cursor && !isTouch) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (cursorRing) {
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Dynamic Cursor Modes
    document.querySelectorAll('[data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const type = el.getAttribute('data-cursor');
        document.body.classList.remove('cursor-hover', 'cursor-drag', 'cursor-explore');

        if (type === 'drag') {
          document.body.classList.add('cursor-drag');
          if (cursorLabel) cursorLabel.textContent = 'DRAG';
        } else if (type === 'explore') {
          document.body.classList.add('cursor-explore');
          if (cursorLabel) cursorLabel.textContent = 'VIEW';
        } else if (type === 'pointer') {
          document.body.classList.add('cursor-hover');
        }
      });

      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover', 'cursor-drag', 'cursor-explore');
        if (cursorLabel) cursorLabel.textContent = '';
      });
    });
  }


  // =========================================================================
  // 3. Three.js Fullscreen Deep Space Starfield Canvas
  // =========================================================================
  const canvas = document.getElementById('space-canvas');
  if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Starfield Generation
    const starCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#00f2fe'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#cbd5e1')
    ];

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // Subtle cosmic parallax with mouse
    let targetRotX = 0;
    let targetRotY = 0;

    window.addEventListener('mousemove', (e) => {
      targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.18;
      targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.18;
    });

    let prevScrollY = window.scrollY;
    let scrollVelocity = 0;

    window.addEventListener('scroll', () => {
      const curScroll = window.scrollY;
      scrollVelocity = (curScroll - prevScrollY) * 0.05;
      prevScrollY = curScroll;
    }, { passive: true });

    function animateSpace() {
      requestAnimationFrame(animateSpace);

      starField.rotation.y += 0.0006;
      starField.rotation.x += (targetRotX - starField.rotation.x) * 0.05;
      starField.rotation.z += (targetRotY - starField.rotation.z) * 0.05;

      // React to scroll velocity
      scrollVelocity *= 0.92;
      starField.position.z += scrollVelocity;
      if (starField.position.z > 300) starField.position.z = -300;
      if (starField.position.z < -300) starField.position.z = 300;

      renderer.render(scene, camera);
    }
    animateSpace();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }


  // =========================================================================
  // 4. Interactive 3D Celestial Core (Hero Section)
  // =========================================================================
  const orbViewport = document.getElementById('hero-orb-viewport');
  if (orbViewport && typeof THREE !== 'undefined') {
    const orbScene = new THREE.Scene();
    const orbCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    orbCamera.position.z = 5.2;

    const orbRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    orbRenderer.setSize(180, 180);
    orbRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    orbViewport.appendChild(orbRenderer.domElement);

    // Inner Glowing Core
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    orbScene.add(coreMesh);

    // Outer Orbit Rings
    const ringGeo = new THREE.TorusGeometry(1.8, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.65
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    orbScene.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat.clone());
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.x = Math.PI / 6;
    orbScene.add(ringMesh2);

    let isDraggingOrb = false;
    let prevOrbX = 0;
    let prevOrbY = 0;
    let orbVelX = 0.01;
    let orbVelY = 0.008;

    orbViewport.addEventListener('pointerdown', (e) => {
      isDraggingOrb = true;
      prevOrbX = e.clientX;
      prevOrbY = e.clientY;
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDraggingOrb) return;
      const deltaX = e.clientX - prevOrbX;
      const deltaY = e.clientY - prevOrbY;
      orbVelY = deltaX * 0.008;
      orbVelX = deltaY * 0.008;
      prevOrbX = e.clientX;
      prevOrbY = e.clientY;
    });

    window.addEventListener('pointerup', () => {
      isDraggingOrb = false;
    });

    function animateOrb() {
      requestAnimationFrame(animateOrb);

      coreMesh.rotation.y += orbVelY;
      coreMesh.rotation.x += orbVelX;
      ringMesh1.rotation.z += 0.008;
      ringMesh2.rotation.z -= 0.006;

      if (!isDraggingOrb) {
        orbVelX += (0.005 - orbVelX) * 0.05;
        orbVelY += (0.008 - orbVelY) * 0.05;
      }

      orbRenderer.render(orbScene, orbCamera);
    }
    animateOrb();
  }


  // =========================================================================
  // 5. JESPER LANDBERG SIGNATURE PROJECTS SLIDER (Inertia + Velocity Skew)
  // =========================================================================
  const dragContainer = document.getElementById('projects-drag-container');
  const track = document.getElementById('projects-track');
  const slides = document.querySelectorAll('.project-slide');
  const progressBar = document.getElementById('slider-progress-bar');
  const currentNumEl = document.getElementById('slider-current-num');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');

  if (dragContainer && track && slides.length > 0) {
    let currentX = 0;
    let targetX = 0;
    let prevX = 0;
    let isDown = false;
    let startX = 0;
    let dragDistance = 0;
    let maxScroll = 0;

    function updateBounds() {
      const containerWidth = dragContainer.offsetWidth;
      const trackWidth = track.scrollWidth;
      maxScroll = Math.max(0, trackWidth - containerWidth + 60);
    }
    updateBounds();
    window.addEventListener('resize', updateBounds);

    // Mouse & Touch Pointer Listeners
    dragContainer.addEventListener('pointerdown', (e) => {
      isDown = true;
      startX = e.clientX;
      dragDistance = 0;
      dragContainer.classList.add('is-dragging');
      dragContainer.setPointerCapture(e.pointerId);
    });

    dragContainer.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const deltaX = e.clientX - startX;
      startX = e.clientX;
      targetX += deltaX * 1.35;
      dragDistance += Math.abs(deltaX);

      // Clamping with slight rubber-banding
      if (targetX > 50) targetX = 50;
      if (targetX < -maxScroll - 50) targetX = -maxScroll - 50;
    });

    function endDrag(e) {
      if (!isDown) return;
      isDown = false;
      dragContainer.classList.remove('is-dragging');
      if (e && e.pointerId) {
        try { dragContainer.releasePointerCapture(e.pointerId); } catch (_) {}
      }

      // Snap back if beyond bounds
      if (targetX > 0) targetX = 0;
      if (targetX < -maxScroll) targetX = -maxScroll;
    }

    dragContainer.addEventListener('pointerup', endDrag);
    dragContainer.addEventListener('pointercancel', endDrag);

    // Prevent accidental link clicking during drag gestures
    slides.forEach(slide => {
      const links = slide.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          if (dragDistance > 8) {
            e.preventDefault();
          }
        });
      });
    });

    // Mouse Wheel to Horizontal Translation
    dragContainer.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        targetX -= e.deltaY * 0.95;
        if (targetX > 0) targetX = 0;
        if (targetX < -maxScroll) targetX = -maxScroll;
      }
    }, { passive: true });

    // Slider Navigation Buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const slideWidth = slides[0].offsetWidth + 36;
        targetX += slideWidth;
        if (targetX > 0) targetX = 0;
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const slideWidth = slides[0].offsetWidth + 36;
        targetX -= slideWidth;
        if (targetX < -maxScroll) targetX = -maxScroll;
      });
    }

    // Animation Loop: Inertia + Velocity-Based Dynamic Skew
    function renderSlider() {
      requestAnimationFrame(renderSlider);

      // Lerp momentum physics
      currentX += (targetX - currentX) * 0.09;

      // Compute velocity for skew effect
      const velocity = currentX - prevX;
      prevX = currentX;

      // Clamp skew to realistic, smooth degree range [-12deg, 12deg]
      const skew = Math.max(-12, Math.min(12, -velocity * 0.14));

      track.style.transform = `translate3d(${currentX}px, 0, 0) skewX(${skew}deg)`;

      // Update Scrub Progress Bar
      if (progressBar && maxScroll > 0) {
        const progress = Math.max(0, Math.min(1, Math.abs(currentX) / maxScroll));
        progressBar.style.width = `${Math.max(20, progress * 100)}%`;
      }

      // Update Current Slide Index Counter
      if (currentNumEl && slides.length > 0) {
        const slideWidth = slides[0].offsetWidth + 36;
        let activeIdx = Math.round(Math.abs(currentX) / slideWidth) + 1;
        activeIdx = Math.max(1, Math.min(slides.length, activeIdx));
        currentNumEl.textContent = `0${activeIdx}`;
      }
    }
    renderSlider();
  }


  // =========================================================================
  // 6. Eliot Besson Apple-Style Floating Dock & Scrollspy
  // =========================================================================
  const dockItems = document.querySelectorAll('.dock-item');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let currentId = 'hero-section';
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    dockItems.forEach(item => {
      const href = item.getAttribute('href').replace('#', '');
      if (href === currentId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }, { passive: true });


  // =========================================================================
  // 7. One-Click Copy Email Handlers
  // =========================================================================
  const copyHeroBtn = document.getElementById('quick-copy-email-hero');
  const copyFooterBtn = document.getElementById('copy-email-footer-btn');
  const copyFeedback = document.getElementById('copy-feedback-text');

  function copyEmailToClipboard(btn, labelEl) {
    const email = 'shreyasm1200@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const originalText = labelEl ? labelEl.textContent : 'Copy Email';
      if (labelEl) labelEl.textContent = 'Copied!';
      btn.style.background = '#00f2fe';
      btn.style.color = '#07080c';

      setTimeout(() => {
        if (labelEl) labelEl.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
      }, 2000);
    }).catch(err => {
      console.warn('Clipboard write failed:', err);
    });
  }

  if (copyHeroBtn) {
    const label = copyHeroBtn.querySelector('.btn-copy-text');
    copyHeroBtn.addEventListener('click', () => copyEmailToClipboard(copyHeroBtn, label));
  }

  if (copyFooterBtn) {
    copyFooterBtn.addEventListener('click', () => copyEmailToClipboard(copyFooterBtn, copyFeedback));
  }


  // =========================================================================
  // 8. Contact Form Mailto Handler
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailtoUrl = `mailto:shreyasm1200@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
    });
  }

});
