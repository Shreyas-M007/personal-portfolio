/**
 * SHREYAS M. CHANABASANNAVAR — PORTFOLIO ENGINE
 * 1. Starting Hero Preloader Animation (Eliot Besson Lottie loader)
 * 2. Lenis Momentum Smooth Scroll Engine
 * 3. Jesper Landberg Signature 3D Curved WebGL Cylinder Carousel & Perspective Grid Floor (Picture 1 Replica)
 * 4. Jesper Landberg Interactive Project Detail Sheet Modal (Picture 2 Replica)
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Starting Hero Preloader Animation (Eliot Besson)
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
  // 3. Projects Data (Shreyas M. Projects)
  // =========================================================================
  const projects = [
    {
      title: 'PaarakhMetric',
      tag1: 'Gemini Vision OCR',
      year: '2026',
      role: 'Full-Stack & AI',
      description: 'Statutory Packaging Compliance & Multi-modal Vision AI System. Ingests FMCG packaging imagery to cross-reference legal metrology compliance rules with Gemini Vision OCR in real time with high-precision bounding box extraction.',
      image: 'paarakh-metric-desktop.png',
      demoUrl: 'https://shreyas-m007.github.io/paarakhmetric/',
      codeUrl: 'https://github.com/Shreyas-M007/paarakhmetric'
    },
    {
      title: 'AgriMate',
      tag1: 'React 19 / AWS S3',
      year: '2026',
      role: 'AI & Data Eng',
      description: 'AI-assisted agricultural market intelligence platform designed for small and marginal farmers, powered by verified APMC mandi records for real-time price clarity, freight estimation, and crop forecasting.',
      image: 'agrimate-desktop.png',
      demoUrl: 'https://agrimate-web-647782045916-apsouth1.s3.ap-south-1.amazonaws.com/index.html#',
      codeUrl: 'https://github.com/Shreyas-M007/Agrimate'
    },
    {
      title: 'Drone Aero Lab',
      tag1: 'Three.js / WebGL',
      year: '2024',
      role: 'Physics Engine',
      description: 'Interactive Three.js 3D Aerodynamics Sandbox and Flight Physics Simulator. Configure quadcopter motor RPM, center of mass, rotor drag, and wind resistance in real-time procedural test environments.',
      image: 'drone-aero-desktop.png',
      demoUrl: 'https://drone-aero-engineering-lab.vercel.app/',
      codeUrl: 'https://github.com/Shreyas-M007/Drone-Aero-Engineering-Lab'
    },
    {
      title: 'Library Inventory',
      tag1: 'Python OOP',
      year: '2024',
      role: 'Backend Architecture',
      description: 'Scalable book ledger management system implemented with object-oriented Python, Streamlit interactive analytics, and multi-tenant catalog tracking with automated return auditing.',
      image: 'lib-management.png',
      demoUrl: 'https://lib-management-system.streamlit.app/',
      codeUrl: 'https://github.com/Shreyas-M007/library-management-system'
    },
    {
      title: 'Jan-Sathi',
      tag1: 'TypeScript / Next.js',
      year: '2025',
      role: 'Full-Stack Developer',
      description: 'Civic technology platform indexing government schemes, subsidies, and citizen welfare eligibility with TypeScript, high-performance cached API routes, and citizen-friendly verification flows.',
      image: 'jan-sathi-desktop.png',
      demoUrl: 'https://code-rouge-kappa.vercel.app/',
      codeUrl: 'https://github.com/Shreyas-M007/Jan-Sathi'
    }
  ];


  // =========================================================================
  // 4. Project Detail Modal Manager (Picture 2 Exact Match)
  // =========================================================================
  const modalEl = document.getElementById('jesper-project-modal');
  const modalCloseBtn = document.getElementById('jesper-modal-close');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalTag1 = document.getElementById('modal-pill-tag1');
  const modalYear = document.getElementById('modal-pill-year');
  const modalRole = document.getElementById('modal-pill-role');
  const modalDemoBtn = document.getElementById('modal-project-demo-btn');
  const modalCodeBtn = document.getElementById('modal-project-code-btn');
  const modalImg = document.getElementById('modal-project-img');

  function openProjectModal(proj) {
    if (!modalEl) return;
    if (modalTitle) modalTitle.textContent = proj.title;
    if (modalDesc) modalDesc.textContent = proj.description;
    if (modalTag1) modalTag1.textContent = proj.tag1;
    if (modalYear) modalYear.textContent = proj.year;
    if (modalRole) modalRole.textContent = proj.role;
    if (modalDemoBtn) modalDemoBtn.href = proj.demoUrl;
    if (modalCodeBtn) modalCodeBtn.href = proj.codeUrl;
    if (modalImg) {
      modalImg.src = proj.image;
      modalImg.alt = proj.title;
    }

    modalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Lock background scroll
    if (lenis) lenis.stop();

    // Trigger smooth fade in & scale in
    requestAnimationFrame(() => {
      modalEl.style.opacity = '1';
      const panel = modalEl.querySelector('.jesper_modal_panel');
      if (panel) {
        panel.style.transform = 'translateY(0) scale(1)';
      }
    });
  }

  function closeProjectModal() {
    if (!modalEl || modalEl.style.display === 'none') return;
    modalEl.style.opacity = '0';
    const panel = modalEl.querySelector('.jesper_modal_panel');
    if (panel) {
      panel.style.transform = 'translateY(24px) scale(0.97)';
    }

    setTimeout(() => {
      modalEl.style.display = 'none';
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }, 320);
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeProjectModal();
    });
  }

  if (modalEl) {
    modalEl.addEventListener('click', (e) => {
      // Close on clicking backdrop
      if (e.target === modalEl) {
        closeProjectModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });


  // =========================================================================
  // 5. Jesper Landberg Exact 3D Curved WebGL Cylinder Carousel (Picture 1)
  //    "IT SHOULD NOT MOVE UNTILL I DRAG IT" — Drag Only Physics
  // =========================================================================
  const container = document.getElementById('jesper-webgl-container');
  const canvas = document.getElementById('jesper-3d-canvas');

  if (container && canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || (window.innerHeight * 0.9);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 14.8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Perspective Grid Floor (Exact match to Picture 1)
    const grid = new THREE.GridHelper(70, 52, 0x383838, 0x161616);
    grid.position.y = -3.2;
    scene.add(grid);

    // Card Dimensions & Cylinder Geometry
    const cardWidth = 7.6;
    const cardHeight = 4.6;
    const cylinderRadius = 14.5;

    const cardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight, 32, 1);
    const posAttr = cardGeometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      // Parabolic cylindrical curvature along Z axis (Exact curvature from Picture 1)
      posAttr.setZ(i, -(x * x) / (2 * cylinderRadius));
    }
    cardGeometry.computeVertexNormals();

    // Helper to create card textures with project screenshot + bottom title & circular button (Picture 1)
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
          ctx.fillStyle = '#181818';
          ctx.fillRect(0, 0, cvs.width, cvs.height);
        }

        // Bottom dark vignette overlay (matches Picture 1)
        const grad = ctx.createLinearGradient(0, cvs.height - 180, 0, cvs.height);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.5, 'rgba(0,0,0,0.65)');
        grad.addColorStop(1, 'rgba(0,0,0,0.95)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, cvs.height - 180, cvs.width, 180);

        // Project Title in lower left (matches Picture 1)
        ctx.font = '600 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(proj.title, 40, cvs.height - 44);

        // Circular Arrow Button in lower right (Picture 1 exact circle arrow)
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
    const spacingAngle = 0.58; // Angular gap between cards
    let currentAngle = 0;
    let targetAngle = 0;
    let velocity = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragLastX = 0;
    let dragDistance = 0;

    // =========================================================================
    // DRAG ONLY INTERACTION — ZERO PASSIVE MOUSEMOVE ROTATION
    // "IT SHOULD NOT MOVE UNTILL I DRAG IT"
    // =========================================================================
    container.addEventListener('pointerdown', (e) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragLastX = e.clientX;
      dragDistance = 0;
      velocity = 0;
      container.style.cursor = 'grabbing';
      try {
        container.setPointerCapture(e.pointerId);
      } catch (_) {}
    });

    container.addEventListener('pointermove', (e) => {
      if (!isDragging) return; // STRICT GUARD: Only moves when dragging!
      const deltaX = e.clientX - dragLastX;
      dragLastX = e.clientX;
      dragDistance += Math.abs(deltaX);

      // Direct drag rotation
      const moveStep = deltaX * 0.0035;
      targetAngle += moveStep;
      currentAngle += moveStep;
      velocity = moveStep; // Momentum carry-over
    });

    function stopDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      container.style.cursor = 'grab';
      if (e && e.pointerId) {
        try {
          container.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }
    }

    container.addEventListener('pointerup', stopDrag);
    container.addEventListener('pointercancel', stopDrag);

    // =========================================================================
    // CLICK RAYCASTER — OPENS PICTURE 2 PROJECT DETAIL MODAL
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    const mousePos = new THREE.Vector2();

    container.addEventListener('click', (e) => {
      // If user was dragging, do not open modal
      if (dragDistance > 6) return;

      const rect = container.getBoundingClientRect();
      mousePos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mousePos.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mousePos, camera);
      const intersects = raycaster.intersectObjects(cardMeshes);

      if (intersects.length > 0) {
        const clickedCard = intersects[0].object;
        if (clickedCard.userData) {
          // Open Picture 2 Project Detail Modal
          openProjectModal(clickedCard.userData);
        }
      }
    });

    // =========================================================================
    // RENDER LOOP — Momentum friction & Cylindrical projection
    // =========================================================================
    function renderJesper3D() {
      requestAnimationFrame(renderJesper3D);

      // Natural drag inertia when released
      if (!isDragging) {
        if (Math.abs(velocity) > 0.0001) {
          currentAngle += velocity;
          velocity *= 0.94; // Smooth friction
        } else {
          velocity = 0;
        }
      }

      // Constrain rotation to keep projects within visible bounds
      const minAngle = -(projects.length - 1) * spacingAngle + 0.4;
      const maxAngle = 0.4;
      if (currentAngle < minAngle) {
        currentAngle += (minAngle - currentAngle) * 0.1;
        velocity = 0;
      } else if (currentAngle > maxAngle) {
        currentAngle += (maxAngle - currentAngle) * 0.1;
        velocity = 0;
      }

      // Position each card along the cylinder curve
      cardMeshes.forEach((mesh, i) => {
        const angle = i * spacingAngle + currentAngle;
        mesh.position.x = Math.sin(angle) * cylinderRadius;
        mesh.position.z = Math.cos(angle) * cylinderRadius - cylinderRadius;
        mesh.rotation.y = angle;
      });

      renderer.render(scene, camera);
    }
    renderJesper3D();

    // Resize handler
    window.addEventListener('resize', () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || (window.innerHeight * 0.9);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }


  // =========================================================================
  // 5. 3D Rotating Metallic Chrome S Emblem in Footer (Replacing Eliot Besson MP4)
  // =========================================================================
  function initFooter3DLogo() {
    const canvas = document.getElementById('footer-3d-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const container = canvas.parentElement;
    let width = container.clientWidth || 240;
    let height = container.clientHeight || 240;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Studio Lighting setup matching metallic dark chrome reflections
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(4, 6, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7ea8d8, 1.4);
    dirLight2.position.set(-5, -4, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.9, 10);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // Initial slanted aesthetic tilt
    logoGroup.rotation.x = -0.28;
    logoGroup.rotation.z = -0.18;

    // Dark Chrome PBR Material
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0x141416,
      metalness: 0.94,
      roughness: 0.18
    });

    // 1. Slanted Oval Ring Geometry
    const ringGeom = new THREE.TorusGeometry(1.68, 0.12, 32, 80);
    ringGeom.scale(0.85, 1.25, 1.0);
    const ringMesh = new THREE.Mesh(ringGeom, chromeMaterial);
    logoGroup.add(ringMesh);

    // 2. Beveled 3D "S" Emblem
    const sShape = new THREE.Shape();
    sShape.moveTo(0.96, 0.924);
    sShape.lineTo(0.396, 0.924);
    sShape.bezierCurveTo(0.36, 1.068, 0.276, 1.164, 0.108, 1.164);
    sShape.bezierCurveTo(-0.084, 1.164, -0.24, 1.044, -0.3, 0.876);
    sShape.bezierCurveTo(-0.36, 0.684, -0.276, 0.54, -0.036, 0.408);
    sShape.lineTo(0.324, 0.216);
    sShape.bezierCurveTo(0.732, -0.0, 0.924, -0.3, 0.804, -0.756);
    sShape.bezierCurveTo(0.684, -1.236, 0.24, -1.524, -0.3, -1.524);
    sShape.bezierCurveTo(-0.804, -1.524, -1.116, -1.26, -1.2, -0.804);
    sShape.lineTo(-0.636, -0.804);
    sShape.bezierCurveTo(-0.588, -1.02, -0.444, -1.116, -0.24, -1.116);
    sShape.bezierCurveTo(-0.036, -1.116, 0.156, -0.972, 0.228, -0.756);
    sShape.bezierCurveTo(0.3, -0.54, 0.204, -0.396, -0.06, -0.252);
    sShape.lineTo(-0.42, -0.06);
    sShape.bezierCurveTo(-0.828, 0.156, -0.996, 0.444, -0.876, 0.9);
    sShape.bezierCurveTo(-0.756, 1.38, -0.324, 1.596, 0.204, 1.596);
    sShape.bezierCurveTo(0.72, 1.596, 0.9, 1.284, 0.96, 0.924);
    sShape.closePath();

    const sGeom = new THREE.ExtrudeGeometry(sShape, {
      depth: 0.26,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.03,
      bevelSegments: 4
    });
    sGeom.center();
    const sMesh = new THREE.Mesh(sGeom, chromeMaterial);
    logoGroup.add(sMesh);

    // Mouse interactive tilt
    let targetRotX = -0.28;
    let targetRotZ = -0.18;
    window.addEventListener('mousemove', (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotX = -0.28 + normY * 0.2;
      targetRotZ = -0.18 + normX * 0.2;
    });

    let isVisible = true;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
      }, { threshold: 0.05 });
      observer.observe(canvas);
    }

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible) return;
      logoGroup.rotation.y += 0.015;
      logoGroup.rotation.x += (targetRotX - logoGroup.rotation.x) * 0.05;
      logoGroup.rotation.z += (targetRotZ - logoGroup.rotation.z) * 0.05;
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      width = container.clientWidth || 240;
      height = container.clientHeight || 240;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }
  initFooter3DLogo();

});