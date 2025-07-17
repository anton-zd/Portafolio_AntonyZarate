// Responsive Navbar Toggle
const navbarToggle = document.getElementById('navbarToggle');
const navbarLinks = document.getElementById('navbarLinks');
const langToggle = document.getElementById('langToggle');
const modeToggle = document.getElementById('modeToggle');

navbarToggle.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
  navbarToggle.classList.toggle('open');
  navbarToggle.innerHTML = navbarToggle.classList.contains('open')
    ? "<i class='bx bx-x'></i>"
    : "<i class='bx bx-menu'></i>";
});

// Active link switching
navbarLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function(e) {
    navbarLinks.querySelectorAll('a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    if (window.innerWidth <= 700) {
      navbarLinks.classList.remove('active');
      navbarToggle.classList.remove('open');
      navbarToggle.innerHTML = "<i class='bx bx-menu'></i>";
    }
  });
});

// Language toggle: only change EN <-> ES, keep all text in Spanish
langToggle.addEventListener('click', function() {
  const langFlag = document.getElementById('langFlag');
  if (this.textContent.trim().endsWith('ENG')) {
    langFlag.src = 'assets/peru_icon.png';
    langFlag.alt = 'Peru';
    this.childNodes[1].nodeValue = 'ESP';
  } else {
    langFlag.src = 'assets/Skills_section/usa_icon.png';
    langFlag.alt = 'USA';
    this.childNodes[1].nodeValue = 'ENG';
  }
});

// Dark mode toggle: change label and icon only
modeToggle.addEventListener('click', function() {
  if (this.textContent.includes('Oscuro')) {
    this.innerHTML = "<i class='bx bx-sun'></i> Modo Claro";
  } else {
    this.innerHTML = "<i class='bx bx-moon'></i> Modo Oscuro";
  }
});

// Typing effect for the home section (optional, simple JS)
document.addEventListener('DOMContentLoaded', function() {
  const typing = document.querySelector('.home-typing');
  if (!typing) return;
  const texts = ["Estudiante de Ingeniería de Sistemas", "Proactivo y Enfocado en Resultados", "Comprometido con el Aprendizaje Continuo", "Habilidades de Trabajo en Equipo"];
  let idx = 0, char = 0, isDeleting = false;

  function type() {
    const current = texts[idx % texts.length];
    if (isDeleting) {
      char--;
    } else {
      char++;
    }
    typing.innerHTML = current.substring(0, char) + '<span class="typing-cursor">|</span>';
    if (!isDeleting && char === current.length) {
      setTimeout(() => isDeleting = true, 1200);
      setTimeout(type, 1200);
    } else if (isDeleting && char === 0) {
      isDeleting = false;
      idx++;
      setTimeout(type, 400);
    } else {
      setTimeout(type, isDeleting ? 40 : 90);
    }
  }
  type();
});

// --- Skills Section Filter Logic ---
const skillsFilters = document.querySelectorAll('.skills-filter');
const skillsCategories = document.querySelectorAll('.skills-category');

skillsFilters.forEach(btn => {
  btn.addEventListener('click', function() {
    skillsFilters.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.getAttribute('data-filter');
    skillsCategories.forEach(cat => {
      if (cat.classList.contains('skills-' + filter)) {
        cat.style.display = '';
      } else {
        cat.style.display = 'none';
      }
    });
  });
});

const contactTabBtn = document.getElementById('contactTabBtn');
const supportTabBtn = document.getElementById('supportTabBtn');
const contactContent = document.getElementById('contactContent');
const supportContent = document.getElementById('supportContent');

if (contactTabBtn && supportTabBtn && contactContent && supportContent) {
  contactTabBtn.addEventListener('click', function() {
    contactTabBtn.classList.add('active');
    supportTabBtn.classList.remove('active');
    contactContent.style.display = 'flex';
    supportContent.style.display = 'none';
  });

  supportTabBtn.addEventListener('click', function() {
    supportTabBtn.classList.add('active');
    contactTabBtn.classList.remove('active');
    contactContent.style.display = 'none';
    supportContent.style.display = 'flex';
  });
}

window.addEventListener('DOMContentLoaded', function() {
  const gmailCard = document.getElementById('gmailContactCard');
  const gmailEmail = document.getElementById('gmailEmail');
  const gmailEmailText = gmailEmail ? gmailEmail.querySelector('.gmail-email-text') : null;
  const gmailCopyIcon = document.getElementById('gmailCopyIcon');
  const email = 'antonijorge987@gmail.com';
  let timeoutId = null;

  function showCopied() {
    if (!gmailEmailText) return;
    gmailEmailText.textContent = 'Correo Copiado';
    gmailEmailText.classList.add('copied-animate');
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      gmailEmailText.textContent = email;
      gmailEmailText.classList.remove('copied-animate');
    }, 1800);
  }

  function copyEmail() {
    navigator.clipboard.writeText(email).then(showCopied);
  }

  if (gmailCard && gmailEmailText) {
    gmailCard.addEventListener('click', function(e) {
      copyEmail();
    });
  }
});

