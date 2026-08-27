// Mobile Hamburg Toggle Overlay Nav Handler
const toggleBtn = document.getElementById('toggle');
const overlayMenu = document.getElementById('overlay');
const menuItems = document.querySelectorAll('.overlay-menu a');

if (toggleBtn && overlayMenu) {
  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    overlayMenu.classList.toggle('open');
    document.body.classList.toggle('noScroll');
  });

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      overlayMenu.classList.remove('open');
      document.body.classList.remove('noScroll');
    });
  });
}

// Typing Loop Animation in Hero Header
const typingElement = document.getElementById('typing-text');
const rolesList = [
  "solving puzzles",
  "building with Python",
  "learning artificial intelligence",
  "designing web layouts"
];
let currentRoleIndex = 0;
let characterIndex = 0;
let isErasing = false;
let duration = 90;

function handleTyping() {
  const fullText = rolesList[currentRoleIndex];

  if (isErasing) {
    typingElement.textContent = fullText.substring(0, characterIndex - 1);
    characterIndex--;
    duration = 45;
  } else {
    typingElement.textContent = fullText.substring(0, characterIndex + 1);
    characterIndex++;
    duration = 90;
  }

  if (!isErasing && characterIndex === fullText.length) {
    isErasing = true;
    duration = 1800;
  } else if (isErasing && characterIndex === 0) {
    isErasing = false;
    currentRoleIndex = (currentRoleIndex + 1) % rolesList.length;
    duration = 400;
  }

  setTimeout(handleTyping, duration);
}

if (typingElement) {
  handleTyping();
}

// Floating Form Label Wrapper Focus/Blur Handlers
const formInputs = document.querySelectorAll('.contact-input');

formInputs.forEach(input => {
  const wrapper = input.parentElement;

  // Initialize input state on load (in case browser auto-fills values)
  if (input.value.trim() !== '') {
    wrapper.classList.add('is-completed');
  }

  input.addEventListener('focus', () => {
    wrapper.classList.add('is-active');
    wrapper.classList.add('is-completed');
  });

  input.addEventListener('blur', () => {
    wrapper.classList.remove('is-active');
    if (input.value.trim() === '') {
      wrapper.classList.remove('is-completed');
    }
  });

  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      wrapper.classList.add('is-completed');
    }
  });
});

// Scrollspy for Right Dot Navigation Active Highlighting
const sections = document.querySelectorAll('section');
const dotNav = document.getElementById('dot-nav');
const dotLinks = document.querySelectorAll('#dot-nav a');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let currentSectionId = '';

  // 1. Hide dot navigation on the intro cover panel
  if (scrollTop > window.innerHeight * 0.4) {
    dotNav.classList.add('active');
  } else {
    dotNav.classList.remove('active');
  }

  // 2. Scan which section coordinates overlap user viewport
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollTop >= sectionTop - window.innerHeight * 0.4) {
      currentSectionId = section.getAttribute('id');
    }
  });

  // 3. Highlight corresponding dot link
  dotLinks.forEach(link => {
    const targetId = link.getAttribute('href').slice(1);
    if (targetId === currentSectionId) {
      link.classList.add('is-selected');
    } else {
      link.classList.remove('is-selected');
    }
  });
});

// Contact Form Submission handler (mailto redirect)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUri = `mailto:shreyasm1200@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Redirect to default mail client
    window.location.href = mailtoUri;
  });
}

// GSAP Interactive Button Effects: Real Sea Waves & Fire Flames
if (typeof gsap !== 'undefined') {
  
  // 1. Water Wave Buttons (Demo/Code links, Badge verification links, Social links, Hero CTA)
  const waveButtons = document.querySelectorAll(
    '.portfolio-links a, .cert-verify-btn, .soc-item a, .btn.main-action'
  );

  waveButtons.forEach(btn => {
    // Override conflicting CSS transitions
    btn.style.transition = 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease';

    let waveWrap = null;
    let waveTimeline = null;

    btn.addEventListener('mouseenter', () => {
      // Create SVG wave overlays
      waveWrap = document.createElement('div');
      waveWrap.className = 'liquid-wave-wrap';
      waveWrap.innerHTML = `
        <svg class="liquid-wave" viewBox="0 0 120 28" preserveAspectRatio="none">
          <path d="M0 15 Q 30 0, 60 15 T 120 15 L 120 28 L 0 28 Z"></path>
        </svg>
        <svg class="liquid-wave liquid-wave-2" viewBox="0 0 120 28" preserveAspectRatio="none">
          <path d="M0 18 Q 25 5, 55 18 T 120 18 L 120 28 L 0 28 Z"></path>
        </svg>
      `;
      btn.appendChild(waveWrap);

      // Animate wave rising
      gsap.to(waveWrap, { bottom: '0%', duration: 0.5, ease: "power2.out" });

      // Animate sloshing wave movement
      const wave1 = waveWrap.querySelector('.liquid-wave');
      const wave2 = waveWrap.querySelector('.liquid-wave-2');
      
      waveTimeline = gsap.timeline({ repeat: -1 });
      waveTimeline.to(wave1, { x: '-50%', duration: 1.5, ease: "none" }, 0);
      waveTimeline.to(wave2, { x: '0%', duration: 2.2, ease: "none" }, 0);
      
      // Scale button slightly on hover
      gsap.to(btn, { scale: 1.05, duration: 0.3 });
    });

    btn.addEventListener('mouseleave', () => {
      if (waveWrap) {
        const currentWrap = waveWrap;
        gsap.to(currentWrap, {
          bottom: '-110%',
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => currentWrap.remove()
        });
        waveWrap = null;
      }
      if (waveTimeline) {
        waveTimeline.kill();
      }
      gsap.to(btn, { scale: 1, duration: 0.4, ease: "power2.out" });
    });

    btn.addEventListener('mousedown', () => {
      if (waveWrap) {
        // Splashing wave surge on click!
        gsap.to(waveWrap, {
          bottom: '20%',
          backgroundColor: 'rgba(100, 255, 218, 0.45)',
          duration: 0.15,
          ease: "power1.out",
          yoyo: true,
          repeat: 1
        });
      }
      gsap.to(btn, { scale: 0.92, duration: 0.1 });
    });

    btn.addEventListener('mouseup', () => {
      gsap.to(btn, { scale: 1.05, duration: 0.3 });
    });
  });

  // 2. Fire Button (Send Message submit button)
  const fireButtons = document.querySelectorAll('.message-btn');

  fireButtons.forEach(btn => {
    btn.style.transition = 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease';

    let fireWrap = null;
    let flameInterval = null;

    function spawnFlame() {
      if (!fireWrap) return;
      
      const particle = document.createElement('div');
      particle.className = 'fire-flame-particle';
      
      // Random bottom position
      const x = Math.random() * btn.offsetWidth;
      particle.style.left = `${x}px`;
      
      // Random size
      const size = 6 + Math.random() * 12;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Flame color transition
      const colors = ['#ff3c00', '#ff6a00', '#ffb300', '#ffea00'];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      fireWrap.appendChild(particle);

      // Animate flame rising and flickering
      gsap.to(particle, {
        y: -btn.offsetHeight - 10,
        x: `+=${-15 + Math.random() * 30}`,
        scale: 0.1,
        opacity: 0,
        rotation: -45 + (-30 + Math.random() * 60),
        duration: 0.6 + Math.random() * 0.4,
        ease: "power1.out",
        onComplete: () => particle.remove()
      });
    }

    btn.addEventListener('mouseenter', () => {
      fireWrap = document.createElement('div');
      fireWrap.className = 'fire-flame-wrap';
      btn.appendChild(fireWrap);

      // Spawn flames continuously
      flameInterval = setInterval(spawnFlame, 60);
      
      // Glow and expand button
      gsap.to(btn, {
        scale: 1.05,
        boxShadow: "0 0 15px rgba(255, 68, 0, 0.4)",
        borderColor: "#ff3c00",
        color: "#ffaa00",
        duration: 0.3
      });
    });

    btn.addEventListener('mouseleave', () => {
      if (flameInterval) {
        clearInterval(flameInterval);
      }
      if (fireWrap) {
        const currentWrap = fireWrap;
        gsap.to(currentWrap, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => currentWrap.remove()
        });
        fireWrap = null;
      }
      gsap.to(btn, {
        scale: 1,
        boxShadow: "none",
        borderColor: "var(--cyan)",
        color: "var(--cyan)",
        duration: 0.3
      });
    });

    btn.addEventListener('mousedown', () => {
      // Big fire flare on click!
      if (fireWrap) {
        for (let i = 0; i < 20; i++) {
          setTimeout(spawnFlame, i * 15);
        }
      }
      gsap.to(btn, {
        scale: 0.92,
        boxShadow: "0 0 25px rgba(255, 68, 0, 0.8)",
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    });

    btn.addEventListener('mouseup', () => {
      gsap.to(btn, { scale: 1.05, duration: 0.3 });
    });
  });
}

// Global dynamic certificate switcher function (bind to window)
window.switchCertificate = function(index) {
  const navItems = document.querySelectorAll('.cert-nav-item');
  const cards = document.querySelectorAll('.cert-display-card');

  // Deactivate all
  navItems.forEach(item => item.classList.remove('active'));
  cards.forEach(card => {
    card.classList.remove('active');
    card.style.opacity = 0;
    card.style.pointerEvents = 'none';
  });

  // Activate selected nav item
  if (navItems[index]) {
    navItems[index].classList.add('active');
  }

  const targetCard = document.getElementById(`cert-card-${index}`);
  if (targetCard) {
    targetCard.classList.add('active');
    // Smooth GSAP slide up + fade-in swap transition
    gsap.fromTo(targetCard,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", onComplete: () => {
        targetCard.style.pointerEvents = 'auto';
      }}
    );
  }
};
