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
  // 3. Projects Data (Shreyas M. Projects & Case Study Galleries)
  // =========================================================================
  const projects = [
    {
      id: 'paarakhmetric',
      title: 'PaarakhMetric',
      tag1: 'Gemini Vision OCR',
      year: '2026',
      role: 'Full-Stack & AI',
      description: 'Statutory Packaging Compliance & Multi-modal Vision AI System. Ingests FMCG packaging imagery to cross-reference legal metrology compliance rules with Gemini Vision OCR in real time with high-precision bounding box extraction.',
      image: 'paarakh-metric-desktop.png',
      gallery: [
        'paarakh-metric-desktop.png',
        'paarakh-metric-tablet.png',
        'paarakh-metric-mobile.png'
      ],
      demoUrl: 'https://shreyas-m007.github.io/paarakhmetric/',
      codeUrl: 'https://github.com/Shreyas-M007/paarakhmetric'
    },
    {
      id: 'agrimate',
      title: 'AgriMate',
      tag1: 'React 19 / AWS S3',
      year: '2026',
      role: 'AI & Data Eng',
      description: 'AI-assisted agricultural market intelligence platform designed for small and marginal farmers, powered by verified APMC mandi records for real-time price clarity, freight estimation, and crop forecasting.',
      image: 'agrimate-desktop.png',
      gallery: [
        'agrimate-desktop.png'
      ],
      demoUrl: 'https://agrimate-web-647782045916-apsouth1.s3.ap-south-1.amazonaws.com/index.html#',
      codeUrl: 'https://github.com/Shreyas-M007/Agrimate'
    },
    {
      id: 'drone-aero-lab',
      title: 'Drone Aero Lab',
      tag1: 'Three.js / WebGL',
      year: '2024',
      role: 'Physics Engine',
      description: 'Interactive Three.js 3D Aerodynamics Sandbox and Flight Physics Simulator. Configure quadcopter motor RPM, center of mass, rotor drag, and wind resistance in real-time procedural test environments.',
      image: 'drone-aero-desktop.png',
      gallery: [
        'drone-aero-desktop.png'
      ],
      demoUrl: 'https://drone-aero-engineering-lab.vercel.app/',
      codeUrl: 'https://github.com/Shreyas-M007/Drone-Aero-Engineering-Lab'
    },
    {
      id: 'library-inventory',
      title: 'Library Inventory',
      tag1: 'Python OOP',
      year: '2024',
      role: 'Backend Architecture',
      description: 'Scalable book ledger management system implemented with object-oriented Python, Streamlit interactive analytics, and multi-tenant catalog tracking with automated return auditing.',
      image: 'lib-management.png',
      gallery: [
        'lib-management.png',
        'lib-management-mobile.jpg'
      ],
      demoUrl: 'https://lib-management-system.streamlit.app/',
      codeUrl: 'https://github.com/Shreyas-M007/library-management-system'
    },
    {
      id: 'jan-sathi',
      title: 'Jan-Sathi',
      tag1: 'TypeScript / Next.js',
      year: '2025',
      role: 'Full-Stack Developer',
      description: 'Civic technology platform indexing government schemes, subsidies, and citizen welfare eligibility with TypeScript, high-performance cached API routes, and citizen-friendly verification flows.',
      image: 'jan-sathi-desktop.png',
      gallery: [
        'jan-sathi-desktop.png'
      ],
      demoUrl: 'https://code-rouge-kappa.vercel.app/',
      codeUrl: 'https://github.com/Shreyas-M007/Jan-Sathi'
    }
  ];

  // =========================================================================
  // 4. Project Detail Modal Sheet Manager (Picture 2 Exact Match)
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
  const modalGallery = document.getElementById('modal-project-gallery');
  const modalImg = document.getElementById('modal-project-img');

  function openProjectModal(proj) {
    if (!modalEl || !proj) return;
    if (modalTitle) modalTitle.textContent = proj.title;
    if (modalDesc) modalDesc.textContent = proj.description;
    if (modalTag1) modalTag1.textContent = proj.tag1;
    if (modalYear) modalYear.textContent = proj.year;
    if (modalRole) modalRole.textContent = proj.role;
    if (modalDemoBtn) modalDemoBtn.href = proj.demoUrl;
    if (modalCodeBtn) modalCodeBtn.href = proj.codeUrl;

    if (modalGallery) {
      modalGallery.innerHTML = '';
      const imgs = (proj.gallery && proj.gallery.length > 0) ? proj.gallery : [proj.image];
      imgs.forEach((src) => {
        const wrap = document.createElement('div');
        wrap.style.cssText = 'width: 100%; border-radius: 16px; overflow: hidden; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 10px 30px rgba(0,0,0,0.06); background: #f8f8f8;';
        const img = document.createElement('img');
        img.src = src;
        img.alt = proj.title;
        img.style.cssText = 'width: 100%; height: auto; display: block; object-fit: cover;';
        wrap.appendChild(img);
        modalGallery.appendChild(wrap);
      });
    } else if (modalImg) {
      modalImg.src = proj.image;
      modalImg.alt = proj.title;
    }

    modalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();

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
  // 5. Jesper Landberg Signature 3D Curved WebGL Cylinder Carousel & Grid Floor
  //    "IT SHOULD NOT MOVE UNTILL I DRAG IT" — Drag-Only Physics & Direct Click Open
  // =========================================================================
  const container = document.getElementById('jesper-webgl-container');
  const canvas = document.getElementById('jesper-3d-canvas');

  if (container && canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || (window.innerHeight * 0.92);

    // Jesper Landberg Exact Camera Configuration (53.4 deg FOV, Z = 41.18)
    const camera = new THREE.PerspectiveCamera(53.4, width / height, 0.1, 2000);
    camera.position.set(0, 0, 41.18);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Dynamic Frustum & Card Sizing (Jesper: s:h-[43.5svh], aspect 2048/1172)
    const fovRad = camera.fov * Math.PI / 180;
    const halfH = Math.tan(fovRad / 2) * camera.position.z;
    const frustumH = halfH * 2;
    const cardHeight = frustumH * 0.58; // Cards fill ~60-65% height
    const cardWidth = cardHeight * 1.74; // Aspect ratio ~1.74
    const cylinderRadius = 38.0;

    // Card Center & Floor Alignment (zero gap: floor meets bottom rim of cards)
    const cardCenterY = 1.0;
    const floorY = cardCenterY - (cardHeight / 2);

    // Perspective Grid Floor (Exact match to Jesper Picture 1)
    const gridFloor = new THREE.GridHelper(160, 64, 0x484848, 0x181818);
    gridFloor.position.set(0, floorY, 0);
    scene.add(gridFloor);

    // Curved Segmented Card Plane Geometry (Bent inward like cinema screen)
    const cardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight, 32, 12);
    const posAttr = cardGeometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      // Cylindrical parabolic curvature
      posAttr.setZ(i, -(x * x) / (2 * cylinderRadius));
    }
    cardGeometry.computeVertexNormals();
    cardGeometry.computeBoundingBox();
    cardGeometry.computeBoundingSphere();

    // Helper to generate high-res card canvas textures (Jesper Picture 1 replica)
    function createCardTexture(proj) {
      const cvs = document.createElement('canvas');
      cvs.width = 1600;
      cvs.height = 960;
      const ctx = cvs.getContext('2d');

      ctx.fillStyle = '#101010';
      ctx.fillRect(0, 0, cvs.width, cvs.height);

      const texture = new THREE.CanvasTexture(cvs);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      function drawCard(img) {
        if (img) {
          ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
        } else {
          ctx.fillStyle = '#181818';
          ctx.fillRect(0, 0, cvs.width, cvs.height);
        }

        // Bottom dark gradient vignette (matches Jesper Picture 1)
        const grad = ctx.createLinearGradient(0, cvs.height - 240, 0, cvs.height);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.45, 'rgba(0,0,0,0.6)');
        grad.addColorStop(1, 'rgba(0,0,0,0.92)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, cvs.height - 240, cvs.width, 240);

        // Project Title in lower left
        ctx.font = '600 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(proj.title, 52, cvs.height - 56);

        // Circular Arrow Button in lower right (Jesper Picture 1 circle arrow)
        const btnX = cvs.width - 80;
        const btnY = cvs.height - 72;
        const btnR = 30;

        ctx.beginPath();
        ctx.arc(btnX, btnY, btnR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.font = '30px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('→', btnX + 1, btnY);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';

        texture.needsUpdate = true;
      }

      const img = new Image();
      img.onload = () => drawCard(img);
      img.onerror = () => drawCard(null);
      img.src = proj.image;

      if (img.complete && img.naturalWidth > 0) {
        drawCard(img);
      }

      return texture;
    }

    // Build the 3D Cards and Mirror Reflections
    const cardMeshes = [];
    const reflMeshes = [];

    projects.forEach((proj) => {
      const texture = createCardTexture(proj);

      // Primary Card Mesh
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(cardGeometry, material);
      mesh.userData = proj;
      scene.add(mesh);
      cardMeshes.push(mesh);

      // Floor Reflection Mesh (Mirrored upside down under grid floor)
      const reflMat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.16
      });
      const reflMesh = new THREE.Mesh(cardGeometry, reflMat);
      reflMesh.scale.y = -1;
      scene.add(reflMesh);
      reflMeshes.push(reflMesh);
    });

    // Carousel Geometry & Angular Spacing
    const spacingAngle = 1.18; // Angular gap between cards
    let currentAngle = 0;
    let velocity = 0;
    let isDragging = false;
    let startPointerX = 0;
    let startPointerY = 0;
    let lastPointerX = 0;
    let startTime = 0;
    let dragTravel = 0;

    // Raycaster for clicking
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    // =========================================================================
    // STRICT DRAG-ONLY PHYSICS — ZERO PASSIVE MOUSEMOVE ROTATION
    // "IT SHOULD NOT MOVE UNTILL I DRAG IT"
    // =========================================================================
    container.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startPointerX = e.clientX;
      startPointerY = e.clientY;
      lastPointerX = e.clientX;
      startTime = Date.now();
      dragTravel = 0;
      velocity = 0;
      container.style.cursor = 'grabbing';
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return; // STRICT GUARD: No movement unless mouse is held down & dragged!
      const deltaX = e.clientX - lastPointerX;
      lastPointerX = e.clientX;
      const dist = Math.hypot(e.clientX - startPointerX, e.clientY - startPointerY);
      if (dist > dragTravel) dragTravel = dist;

      // Smooth horizontal drag
      const step = deltaX * 0.0016;
      currentAngle += step;
      velocity = step;
    });

    function endPointerInteraction(e) {
      if (!isDragging) return;
      isDragging = false;
      container.style.cursor = 'grab';

      const duration = Date.now() - startTime;
      const totalMoved = Math.hypot(e.clientX - startPointerX, e.clientY - startPointerY);

      // If user tapped or clicked without dragging (< 14px movement within 400ms)
      if (totalMoved < 14 && duration < 400) {
        const rect = canvas.getBoundingClientRect();
        mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouseCoord, camera);
        const hits = raycaster.intersectObjects(cardMeshes);
        if (hits.length > 0) {
          const topHit = hits[0].object;
          if (topHit && topHit.userData) {
            openProjectModal(topHit.userData);
          }
        }
      }
    }

    window.addEventListener('pointerup', endPointerInteraction);
    window.addEventListener('pointercancel', endPointerInteraction);

    // =========================================================================
    // RENDER LOOP — Momentum inertia & Cylindrical placement
    // =========================================================================
    function renderJesper3D() {
      requestAnimationFrame(renderJesper3D);

      // Natural drag inertia carry-over
      if (!isDragging) {
        if (Math.abs(velocity) > 0.00008) {
          currentAngle += velocity;
          velocity *= 0.94; // Smooth friction damping
        } else {
          velocity = 0;
        }
      }

      // Constrain angle bounds so user cannot spin endlessly past projects
      const minAngle = -(projects.length - 1) * spacingAngle + 0.35;
      const maxAngle = 0.35;
      if (currentAngle < minAngle) {
        currentAngle += (minAngle - currentAngle) * 0.12;
        velocity = 0;
      } else if (currentAngle > maxAngle) {
        currentAngle += (maxAngle - currentAngle) * 0.12;
        velocity = 0;
      }

      // Position each card and its floor reflection
      cardMeshes.forEach((mesh, i) => {
        const angle = i * spacingAngle + currentAngle;
        mesh.position.x = Math.sin(angle) * cylinderRadius;
        mesh.position.y = cardCenterY;
        mesh.position.z = Math.cos(angle) * cylinderRadius - cylinderRadius;
        mesh.rotation.y = angle;

        // Reflection plane directly under grid floor
        const rMesh = reflMeshes[i];
        if (rMesh) {
          rMesh.position.x = mesh.position.x;
          rMesh.position.y = floorY - (cardHeight / 2);
          rMesh.position.z = mesh.position.z;
          rMesh.rotation.y = mesh.rotation.y;
        }
      });

      renderer.render(scene, camera);
    }
    renderJesper3D();

    // Responsive Resize Handler
    window.addEventListener('resize', () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || (window.innerHeight * 0.92);
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