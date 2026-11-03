/**
 * SHREYAS M. CHANABASANNAVAR — PORTFOLIO ENGINE
 * 1. Starting Hero Preloader Animation (Eliot Besson Lottie loader)
 * 2. Lenis Momentum Smooth Scroll Engine
 * 3. Jesper Landberg Signature 3D Curved WebGL Cylinder Carousel & Perspective Grid Floor (Picture 2 Exact Match)
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Starting Hero Preloader Animation
  // =========================================================================
  const loaderEl = document.querySelector('.h-hero_loader');
  const loaderLottieEl = document.querySelector('.h-hero_loader-lottie');

  if (loaderLottieEl && typeof lottie !== 'undefined') {
    const lottiePath = loaderLottieEl.getAttribute('data-lottie-path') || 'https://cdn.prod.website-files.com/677fb4d34764579513f06df6/67d2e4a64cac3c5e7af06197_LogoMoves%20(1).json';
    try {
      const anim = lottie.loadAnimation({
        container: loaderLottieEl,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: lottiePath
      });

      const dismissLoader = () => {
        if (!loaderEl) return;
        if (typeof gsap !== 'undefined') {
          gsap.to(loaderEl, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
              loaderEl.style.display = 'none';
            }
          });
        } else {
          loaderEl.style.opacity = '0';
          setTimeout(() => { loaderEl.style.display = 'none'; }, 600);
        }
      };

      anim.addEventListener('complete', dismissLoader);
      setTimeout(dismissLoader, 1600); // Safety fallback timeout
    } catch (e) {
      if (loaderEl) loaderEl.style.display = 'none';
    }
  }

  // Ensure [data-hidden] elements are revealed unconditionally
  setTimeout(() => {
    document.querySelectorAll('[data-hidden]').forEach(el => {
      el.style.visibility = 'visible';
    });
  }, 100);


  // =========================================================================
  // 2. Lenis Smooth Momentum Scroll Engine (Eliot Besson)
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
  // 3. Jesper Landberg Exact 3D Curved WebGL Cylinder Carousel (Picture 2)
  // =========================================================================
  const container = document.getElementById('jesper-webgl-container');
  const canvas = document.getElementById('jesper-3d-canvas');
  const counterEl = document.getElementById('jesper-3d-counter');
  const hintEl = document.getElementById('active-project-hint');

  if (container && canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || (window.innerHeight * 0.85);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0.1, 14.8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Perspective Grid Floor (Exact match to Picture 2)
    const grid = new THREE.GridHelper(60, 48, 0x444444, 0x1c1c1c);
    grid.position.y = -3.2;
    scene.add(grid);

    // Projects Data (Shreyas M. Projects)
    const projects = [
      {
        title: 'PaarakhMetric',
        subtitle: 'Gemini Vision OCR • Firebase PWA • 2026',
        image: 'paarakh-metric-desktop.png',
        url: 'https://shreyas-m007.github.io/paarakhmetric/'
      },
      {
        title: 'AgriMate',
        subtitle: 'React 19 • AWS S3 • Mandi AI • 2026',
        image: 'agrimate-desktop.png',
        url: 'https://agrimate-web-647782045916-apsouth1.s3.ap-south-1.amazonaws.com/index.html#'
      },
      {
        title: 'Drone Aero Lab',
        subtitle: 'Three.js • Flight Physics • 2024',
        image: 'drone-aero-desktop.png',
        url: 'https://drone-aero-engineering-lab.vercel.app/'
      },
      {
        title: 'Library Inventory',
        subtitle: 'Python OOP • Streamlit • 2024',
        image: 'lib-management.png',
        url: 'https://lib-management-system.streamlit.app/'
      },
      {
        title: 'Jan-Sathi',
        subtitle: 'Govt Schemes API • TypeScript • 2025',
        image: 'jan-sathi-desktop.png',
        url: 'https://code-rouge-kappa.vercel.app/'
      }
    ];

    // Card Dimensions & Cylinder Geometry
    const cardWidth = 7.2;
    const cardHeight = 4.4;
    const cylinderRadius = 14.2;

    const cardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight, 32, 1);
    const posAttr = cardGeometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      // Cylindrical parabolic curvature along Z axis (Exact curvature from Picture 2)
      posAttr.setZ(i, -(x * x) / (2 * cylinderRadius));
    }
    cardGeometry.computeVertexNormals();

    // Helper to create card textures with project screenshot + bottom title & circular button (Picture 2)
    function createCardTexture(proj) {
      const cvs = document.createElement('canvas');
      cvs.width = 1024;
      cvs.height = 640;
      const ctx = cvs.getContext('2d');

      // Default dark fill
      ctx.fillStyle = '#111111';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      const texture = new THREE.CanvasTexture(cvs);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      function renderCanvas(img) {
        if (img) {
          ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
        } else {
          ctx.fillStyle = '#1c1c1c';
          ctx.fillRect(0, 0, cvs.width, cvs.height);
        }

        // Bottom dark vignette overlay (matches Picture 2)
        const grad = ctx.createLinearGradient(0, cvs.height - 180, 0, cvs.height);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.5, 'rgba(0,0,0,0.6)');
        grad.addColorStop(1, 'rgba(0,0,0,0.95)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, cvs.height - 180, cvs.width, 180);

        // Project Title in lower left (matches Picture 2)
        ctx.font = '600 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(proj.title, 40, cvs.height - 44);

        // Circular Arrow Button in lower right (Picture 2 exact circle arrow)
        const btnX = cvs.width - 58;
        const btnY = cvs.height - 52;
        const btnRadius = 22;

        ctx.beginPath();
        ctx.arc(btnX, btnY, btnRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // White arrow inside button
        ctx.font = '22px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('→', btnX + 1, btnY);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';

        texture.needsUpdate = true;
      }

      const img = new Image();
      img.onload = () => renderCanvas(img);
      img.onerror = () => renderCanvas(null);
      img.src = proj.image;

      if (img.complete && img.naturalWidth > 0) {
        renderCanvas(img);
      }

      return texture;
    }

    // Build the 3D Cards
    const cardMeshes = [];
    projects.forEach((proj) => {
      const texture = createCardTexture(proj);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(cardGeometry, material);
      mesh.userData = proj;
      scene.add(mesh);
      cardMeshes.push(mesh);
    });

    // Positioning along cylindrical carousel
    const spacingAngle = 0.56; // Angular gap between cards
    let currentAngle = 0;
    let targetAngle = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragDistance = 0;

    // --- MOUSE-MOVE ROTATION ("moves with mouse only") ---
    window.addEventListener('mousemove', (e) => {
      if (isDragging) return;
      // Normalized X from -0.5 to 0.5
      const normX = (e.clientX / window.innerWidth) - 0.5;
      targetAngle = -normX * 1.8;
    });

    // --- DRAG / POINTER SUPPORT ---
    container.addEventListener('pointerdown', (e) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragDistance = 0;
      container.style.cursor = 'grabbing';
      container.setPointerCapture(e.pointerId);
    });

    container.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartX;
      dragStartX = e.clientX;
      targetAngle += deltaX * 0.004;
      dragDistance += Math.abs(deltaX);
    });

    function stopDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      container.style.cursor = 'grab';
      if (e && e.pointerId) {
        try { container.releasePointerCapture(e.pointerId); } catch (_) {}
      }
    }

    container.addEventListener('pointerup', stopDrag);
    container.addEventListener('pointercancel', stopDrag);

    // --- WHEEL HORIZONTAL ROTATION ---
    container.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        targetAngle -= e.deltaY * 0.002;
      }
    }, { passive: true });

    // --- RAYCASTER FOR CLICKS ---
    const raycaster = new THREE.Raycaster();
    const mousePos = new THREE.Vector2();

    container.addEventListener('click', (e) => {
      if (dragDistance > 6) return; // Prevent click on drag

      const rect = container.getBoundingClientRect();
      mousePos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mousePos.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mousePos, camera);
      const intersects = raycaster.intersectObjects(cardMeshes);

      if (intersects.length > 0) {
        const clickedCard = intersects[0].object;
        if (clickedCard.userData && clickedCard.userData.url) {
          window.open(clickedCard.userData.url, '_blank', 'noopener');
        }
      }
    });

    // --- RENDER LOOP: Lerp Inertia & Cylindrical Projection ---
    function renderJesper3D() {
      requestAnimationFrame(renderJesper3D);

      // Smooth inertia
      currentAngle += (targetAngle - currentAngle) * 0.06;

      let closestIndex = 0;
      let minDistanceToCenter = 9999;

      cardMeshes.forEach((mesh, i) => {
        const angle = (i - 2) * spacingAngle + currentAngle;
        mesh.position.x = Math.sin(angle) * cylinderRadius;
        mesh.position.z = Math.cos(angle) * cylinderRadius - cylinderRadius;
        mesh.rotation.y = angle;

        const dist = Math.abs(mesh.position.x);
        if (dist < minDistanceToCenter) {
          minDistanceToCenter = dist;
          closestIndex = i;
        }
      });

      // Update Live Counter and Project Label
      if (counterEl) {
        counterEl.textContent = `0${closestIndex + 1} / 0${projects.length}`;
      }
      if (hintEl) {
        hintEl.textContent = `${projects[closestIndex].title} • ${projects[closestIndex].subtitle}`;
      }

      renderer.render(scene, camera);
    }
    renderJesper3D();

    // Resize handler
    window.addEventListener('resize', () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || (window.innerHeight * 0.85);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

});
