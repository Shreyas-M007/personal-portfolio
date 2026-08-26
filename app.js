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
