// Add any additional JavaScript functionality here
document.addEventListener('DOMContentLoaded', function() {
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);

  // Hamburger menu functionality
  function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    const overlay = document.querySelector(".menu-overlay");
    
    menu.classList.toggle("open");
    icon.classList.toggle("open");
    overlay.classList.toggle("open");
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = menu.classList.contains("open") ? "hidden" : "";
  }

  // Make toggleMenu function globally available
  window.toggleMenu = toggleMenu;

  // Close menu when clicking overlay
  overlay.addEventListener('click', function() {
    toggleMenu();
  });

  // Close menu when clicking a menu item
  const menuLinks = document.querySelectorAll('.menu-links a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      toggleMenu();
    });
  });

  // Close menu when pressing Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const menu = document.querySelector(".menu-links");
      if (menu.classList.contains("open")) {
        toggleMenu();
      }
    }
  });
})




