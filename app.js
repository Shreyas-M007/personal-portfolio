// Particles Canvas Background Animation
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;
let mouse = { x: null, y: null, radius: 100 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 90) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - dist / 90)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    if (mouse.x !== null) {
      const dx = particles[i].x - mouse.x;
      const dy = particles[i].y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(171, 71, 188, ${0.12 * (1 - dist / mouse.radius)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawBackground);
}
drawBackground();

// Typing Loop Effect
const typingElement = document.getElementById('typing-text');
const rolesList = [
  "solving puzzles",
  "building with Python",
  "designing web layout projects",
  "learning artificial intelligence"
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

// Active Link Highlight on Scroll
const scrollSections = document.querySelectorAll('section');
const headerLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let activeId = '';
  
  scrollSections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 110) {
      activeId = section.getAttribute('id');
    }
  });

  headerLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === activeId) {
      link.classList.add('active');
    }
  });
});

// Mobile Hamburger Navigation Drawer
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileDropdown = document.getElementById('mobile-nav');

menuBtn.addEventListener('click', () => {
  if (mobileDropdown.style.display === 'flex') {
    mobileDropdown.style.display = 'none';
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  } else {
    mobileDropdown.style.display = 'flex';
    menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileDropdown.style.display = 'none';
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Clipboard Helper to Copy Email Addresses
function copyEmailAddress(email, button) {
  navigator.clipboard.writeText(email).then(() => {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-check"></i>';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.classList.remove('copied');
    }, 1800);
  }).catch(err => {
    console.error('Copy failed: ', err);
  });
}

// 3D Dashboard Card Flip handler
function toggleFlip(cardContainer, event) {
  if (event && (event.target.closest('a') || event.target.closest('.btn-social'))) {
    return;
  }
  if (cardContainer) {
    cardContainer.classList.toggle('flipped');
  }
}
