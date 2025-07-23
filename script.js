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
    // Remove active from all links
    navbarLinks.querySelectorAll('a').forEach(l => l.classList.remove('active'));
    // Add active to clicked link
    this.classList.add('active');
    // Optional: Close menu when a link is clicked (mobile UX)
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
    // Remove active from all
    skillsFilters.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    // Show only the selected category
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

// Contact section tab switching
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

// Gmail Copy-to-Clipboard and Animation
// Ensure this runs after DOM is loaded
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


// =================== MOBILE PROGRAMS PAGINATION ===================
let currentProgramsPage = 1;
const totalProgramsPages = 2;

function changeProgramsPage(direction) {
  const newPage = currentProgramsPage + direction;
  if (newPage >= 1 && newPage <= totalProgramsPages) {
    goToProgramsPage(newPage);
  }
}

function goToProgramsPage(pageNumber) {
  if (pageNumber < 1 || pageNumber > totalProgramsPages) return;
  
  // Hide current page
  const currentPageElement = document.querySelector('.programs-page.active');
  if (currentPageElement) {
    currentPageElement.classList.remove('active');
    currentPageElement.style.display = 'none';
  }
  
  // Show new page
  const newPageElement = document.querySelector(`.programs-page[data-page="${pageNumber}"]`);
  if (newPageElement) {
    newPageElement.classList.add('active');
    newPageElement.style.display = 'grid';
  }
  
  // Update pagination buttons
  currentProgramsPage = pageNumber;
  updateProgramsPaginationButtons();
}

function updateProgramsPaginationButtons() {
  // Update Previous/Next buttons
  const prevBtn = document.getElementById('programsPrevBtn');
  const nextBtn = document.getElementById('programsNextBtn');
  
  if (prevBtn) {
    prevBtn.disabled = currentProgramsPage === 1;
  }
  if (nextBtn) {
    nextBtn.disabled = currentProgramsPage === totalProgramsPages;
  }
  
  // Update number buttons
  const numberButtons = document.querySelectorAll('.mobile-pagination-number');
  numberButtons.forEach((btn, index) => {
    const pageNum = index + 1;
    if (pageNum === currentProgramsPage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  goToProgramsPage(1);
});

// =================== CERTIFICATES PAGINATION (DESKTOP) ===================
(function() {
  const certsPerPage = 6;
  const totalCerts = document.querySelectorAll('.skills-category.skills-certs .cert-card').length;
  const totalPages = Math.ceil(totalCerts / certsPerPage);
  let currentPage = 1;

  const prevBtn = document.getElementById('certPrevBtn');
  const nextBtn = document.getElementById('certNextBtn');
  const pageButtons = document.querySelectorAll('.cert-pagination-page');
  const certCards = document.querySelectorAll('.cert-card[data-cert]');

  function showPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;

    const start = (page - 1) * certsPerPage;
    const end = start + certsPerPage;

    // Hide all cards first
    certCards.forEach(card => {
      card.style.display = 'none';
    });

    // Show cards for the current page
    for (let i = start; i < end && i < totalCerts; i++) {
      if(certCards[i]) {
        certCards[i].style.display = 'flex';
      }
    }

    updatePaginationUI();

    // Prevent scroll jump by anchoring the view to the top of the skills filters
    const filtersElement = document.querySelector('.skills-filters');
    if (filtersElement) {
      setTimeout(() => {
        const rect = filtersElement.getBoundingClientRect();
        if (rect.top < 0 || rect.top > window.innerHeight) {
          filtersElement.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }, 0);
    }
  }

  function updatePaginationUI() {
    // Update prev/next buttons
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;

    // Update page number buttons
    pageButtons.forEach(btn => {
      if (parseInt(btn.dataset.page) === currentPage) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function setupEventListeners() {
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          showPage(currentPage - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          showPage(currentPage + 1);
        }
      });
    }

    pageButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.dataset.page);
        showPage(page);
      });
    });
  }

  // And only if the certificates category is visible (desktop)
  function init() {
      const certsCategory = document.querySelector('.skills-category.skills-certs');
      if (window.innerWidth > 700) {
          showPage(1);
      }
      
      // Also re-init on resize to handle view changes
      let resizeTimer;
      window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
              if (window.innerWidth > 700) {
                  if (getComputedStyle(certsCategory).display !== 'none') {
                      showPage(currentPage);
                  }
              } else {
                  certCards.forEach(card => card.style.display = 'flex');
              }
          }, 250);
      });
      
      // Re-check when filters are clicked
      const skillsFilters = document.querySelectorAll('.skills-filter[data-filter="certs"]');
      skillsFilters.forEach(filter => {
          filter.addEventListener('click', () => {
              setTimeout(() => {
                  if (getComputedStyle(certsCategory).display !== 'none' && window.innerWidth > 700) {
                      showPage(1);
                  }
              }, 50);
          });
      });
  }

  document.addEventListener('DOMContentLoaded', () => {
      setupEventListeners();
      init();
  });

})();