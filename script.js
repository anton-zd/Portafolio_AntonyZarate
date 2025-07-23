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
(function() {
  const programsContainer = document.querySelector('.skills-category.skills-programs');
  if (!programsContainer) return;

  const totalPrograms = programsContainer.querySelectorAll('.skill-card').length;
  const prevBtn = document.getElementById('programPrevBtn');
  const nextBtn = document.getElementById('programNextBtn');
  const pageButtons = programsContainer.querySelectorAll('.program-pagination-page');
  const programCards = programsContainer.querySelectorAll('.skill-card[data-program]');
  const filtersElement = document.querySelector('.skills-filters');

  let currentPage = 1;
  let programsPerPage = 6;
  let totalPages = Math.ceil(totalPrograms / programsPerPage);

  function showPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;

    const start = (page - 1) * programsPerPage;
    const end = start + programsPerPage;

    programCards.forEach((card, index) => {
      const isVisible = window.innerWidth > 700 || (index >= start && index < end);
      card.style.display = isVisible ? 'flex' : 'none';
    });

    updatePaginationUI();

    if (window.innerWidth <= 700 && filtersElement) {
      filtersElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function updatePaginationUI() {
    if (window.innerWidth > 700) {
      // Hide pagination on desktop
      const paginationWrapper = programsContainer.querySelector('.programs-pagination-wrapper');
      if (paginationWrapper) {
        paginationWrapper.style.display = 'none';
      }
      return;
    }
    
    const paginationWrapper = programsContainer.querySelector('.programs-pagination-wrapper');
    if (paginationWrapper) {
        paginationWrapper.style.display = 'flex';
    }

    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;

    pageButtons.forEach(btn => {
      const pageNum = parseInt(btn.dataset.page);
      btn.classList.toggle('active', pageNum === currentPage);
    });
  }

  function setupEventListeners() {
    if (prevBtn) {
      prevBtn.addEventListener('click', () => showPage(currentPage - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => showPage(currentPage + 1));
    }
    pageButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.dataset.page);
        showPage(page);
      });
    });
  }

  function init() {
    if (window.innerWidth <= 700) {
      showPage(1);
    } else {
      // On desktop, show all program cards
      programCards.forEach(card => card.style.display = 'flex');
    }
    updatePaginationUI();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 250);
  });

  const programsFilter = document.querySelector('.skills-filter[data-filter="programs"]');
  if (programsFilter) {
    programsFilter.addEventListener('click', () => {
      setTimeout(() => {
        currentPage = 1;
        init();
      }, 50);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    init();
  });

})();


// =================== CERTIFICATES PAGINATION (RESPONSIVE) ===================
(function() {
  const totalCerts = document.querySelectorAll('.skills-category.skills-certs .cert-card').length;
  const prevBtn = document.getElementById('certPrevBtn');
  const nextBtn = document.getElementById('certNextBtn');
  const pageButtons = document.querySelectorAll('.cert-pagination-page');
  const certCards = document.querySelectorAll('.cert-card[data-cert]');
  const certsCategory = document.querySelector('.skills-category.skills-certs');
  const skillsSection = document.getElementById('skills');

  let currentPage = 1;
  let certsPerPage;
  let totalPages;

  function updatePaginationVariables() {
    if (window.innerWidth <= 700) {
      // Mobile settings
      certsPerPage = 3;
      totalPages = Math.ceil(totalCerts / certsPerPage); // Should be 3
    } else {
      // Desktop settings
      certsPerPage = 6;
      totalPages = 2; // Hardcoded for desktop as per original logic
    }
  }

  function showPage(page) {
    // Ensure the view is up-to-date before showing a page
    updatePaginationVariables();
    if (page < 1 || page > totalPages) return;
    currentPage = page;

    const start = (page - 1) * certsPerPage;
    const end = start + certsPerPage;

    certCards.forEach((card, index) => {
      if (index >= start && index < end) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    updatePaginationUI();

    // Scroll to the top of the skills section for better UX
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function updatePaginationUI() {
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;

    pageButtons.forEach(btn => {
      const pageNum = parseInt(btn.dataset.page);
      // Hide buttons that are for pages beyond the total for the current view
      if (pageNum > totalPages) {
        btn.style.display = 'none';
      } else {
        btn.style.display = 'flex';
      }

      if (pageNum === currentPage) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function setupEventListeners() {
    if (prevBtn) {
      prevBtn.addEventListener('click', () => showPage(currentPage - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => showPage(currentPage + 1));
    }
    pageButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.dataset.page);
        showPage(page);
      });
    });
  }

  function init() {
      updatePaginationVariables();
      // Only show the first page if the category is visible
      if (getComputedStyle(certsCategory).display !== 'none') {
          showPage(1);
      } else {
          // If the category is hidden, hide all cards until it's shown
          certCards.forEach(card => card.style.display = 'none');
      }
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const isMobileBefore = certsPerPage === 3;
      updatePaginationVariables();
      const isMobileAfter = certsPerPage === 3;

      // Reset to page 1 if the layout changes between mobile/desktop
      if (isMobileBefore !== isMobileAfter) {
        currentPage = 1;
      }
      
      if (getComputedStyle(certsCategory).display !== 'none') {
        showPage(currentPage);
      } else {
        // On resize, if the category is not visible, ensure cards are hidden
        certCards.forEach(card => card.style.display = 'none');
      }
    }, 250);
  });

  // Re-check when the certificates filter is clicked
  const certsFilter = document.querySelector('.skills-filter[data-filter="certs"]');
  if (certsFilter) {
    certsFilter.addEventListener('click', () => {
      // Use a timeout to allow the browser to update the display style of the category
      setTimeout(() => {
        currentPage = 1; // Always reset to page 1 when filter is clicked
        init();
      }, 50);
    });
  }
  
  // Initial setup on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    // Hide all cards initially, let the logic show them based on view.
    certCards.forEach(card => card.style.display = 'none');
    init();
  });

})();