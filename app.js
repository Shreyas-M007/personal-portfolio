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

// GSAP Interactive & Magnetic Button Effects
if (typeof gsap !== 'undefined') {
  // Detect if device supports touch/pointer coarse
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;

  // Query all buttons, action links, badges, icons, and hero actions
  const interactives = document.querySelectorAll(
    '.portfolio-links a, .message-btn, .cert-verify-btn, .soc-item a, .btn.main-action'
  );

  interactives.forEach(btn => {
    // Disable CSS transitions that conflict with GSAP transforms
    btn.style.transition = 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease';

    // Find internal icon or text span for parallax magnetic offset
    const inner = btn.querySelector('i, span') || btn;
    if (inner && inner !== btn) {
      inner.style.display = 'inline-block';
      inner.style.transition = 'none';
    }

    if (!isTouchDevice) {
      // --- DESKTOP ANIMATIONS (Magnetic Attraction + Scale Hover) ---
      
      // 1. Magnetic Pull on mousemove
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });

        if (inner && inner !== btn) {
          gsap.to(inner, {
            x: x * 0.25,
            y: y * 0.25,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      });

      // 2. Snap Back on mouseleave
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto"
        });

        if (inner && inner !== btn) {
          gsap.to(inner, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
            overwrite: "auto"
          });
        }
      });

      // 3. Elastic Scale-Down and Click FX (Water Waves vs Fire Sparks)
      btn.addEventListener('mousedown', (e) => {
        gsap.to(btn, {
          scale: 0.92,
          duration: 0.1,
          ease: "power2.out",
          overwrite: "auto"
        });
        triggerClickParticles(btn, e);
      });

      // 4. Elastic Scale-Up on release
      btn.addEventListener('mouseup', () => {
        gsap.to(btn, {
          scale: 1.05,
          duration: 0.4,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto"
        });
      });
      
    } else {
      // --- MOBILE TOUCH ANIMATIONS (No sticky hover locks, optimized performance) ---
      
      btn.addEventListener('touchstart', (e) => {
        gsap.to(btn, {
          scale: 0.94,
          duration: 0.1,
          ease: "power2.out",
          overwrite: "auto"
        });
        
        // Pass first touch coordinates for particles
        if (e.touches && e.touches[0]) {
          triggerClickParticles(btn, e.touches[0]);
        }
      }, { passive: true });

      btn.addEventListener('touchend', () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      }, { passive: true });

      btn.addEventListener('touchcancel', () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      }, { passive: true });
    }
  });
}

// Spawns ripple/ember elements (supports desktop mouse coordinates + mobile touch coordinates)
function triggerClickParticles(btn, event) {
  const rect = btn.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const isTouch = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);

  if (btn.classList.contains('message-btn')) {
    // Fire Ember sparks (optimized particles for mobile touch devices)
    const particleCount = isTouch ? 6 : 12;
    const colors = ['#ff3300', '#ff6600', '#ffcc00', '#ff9900'];
    
    for (let i = 0; i < particleCount; i++) {
      const ember = document.createElement('span');
      ember.className = 'fire-ember';
      ember.style.left = `${x}px`;
      ember.style.top = `${y}px`;
      ember.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      btn.appendChild(ember);

      const angle = Math.random() * Math.PI * 2;
      const distance = isTouch ? (15 + Math.random() * 30) : (25 + Math.random() * 55);

      gsap.to(ember, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: 0.1,
        opacity: 0,
        duration: isTouch ? (0.35 + Math.random() * 0.2) : (0.5 + Math.random() * 0.4),
        ease: "power2.out",
        onComplete: () => ember.remove()
      });
    }
  } else {
    // Water wave concentric rings (optimized delay & scale for mobile touch devices)
    const container = document.createElement('div');
    container.className = 'ripple-container';
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
    btn.appendChild(container);

    const waveCount = isTouch ? 2 : 3;
    for (let i = 0; i < waveCount; i++) {
      const wave = document.createElement('span');
      wave.className = `wave-ring wave-${i}`;
      container.appendChild(wave);

      gsap.fromTo(wave,
        { scale: 0, opacity: 0.65 - (i * 0.2) },
        {
          scale: 1.8 + (i * 0.6),
          opacity: 0,
          delay: i * 0.06,
          duration: isTouch ? 0.45 : (0.55 + (i * 0.12)),
          ease: "power2.out"
        }
      );
    }

    setTimeout(() => container.remove(), 1000);
  }
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
