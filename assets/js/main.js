/**
 * Credit Repair Service - Main Application Logic
 * Phase 1: Home 1 Page
 * Features: Dark/Light Mode, LTR/RTL Layout Toggle, Navbar Scroll Effects, Back to Top
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Themes, Page Loader, Layout Directions and Mobile Navigation
  initPageLoader();
  initTheme();
  initDirection();
  initNavbarScroll();
  initBackToTop();
  initMobileNav();
});

/* ==========================================================================
   PAGE PRELOADER SYSTEM
   ========================================================================== */
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  const hideLoader = () => {
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 350);
  };

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
    // Fallback safety timeout
    setTimeout(hideLoader, 1000);
  }
}

/* ==========================================================================
   THEME TOGGLE SYSTEM (LIGHT / DARK MODE)
   ========================================================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('credit_theme') || 'dark';
  
  applyTheme(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('credit_theme', newTheme);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-bs-theme', theme);
  
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  themeToggleBtns.forEach(btn => {
    if (theme === 'dark') {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
      btn.setAttribute('title', 'Switch to Light Mode');
    } else {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      btn.setAttribute('title', 'Switch to Dark Mode');
    }
  });
}

/* ==========================================================================
   DIRECTION TOGGLE SYSTEM (LTR / RTL)
   ========================================================================== */
function initDirection() {
  const dirToggleBtns = document.querySelectorAll('.dir-toggle-btn');
  const savedDir = localStorage.getItem('credit_dir') || 'ltr';

  applyDirection(savedDir);

  dirToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      applyDirection(newDir);
      localStorage.setItem('credit_dir', newDir);
    });
  });
}

function applyDirection(dir) {
  document.documentElement.setAttribute('dir', dir);
  
  const dirToggleBtns = document.querySelectorAll('.dir-toggle-btn');
  dirToggleBtns.forEach(btn => {
    const textSpan = btn.querySelector('.dir-label');
    if (textSpan) {
      textSpan.textContent = dir === 'ltr' ? 'RTL' : 'LTR';
    } else {
      btn.textContent = dir === 'ltr' ? '🌐 RTL' : '🌐 LTR';
    }
    btn.setAttribute('title', `Switch to ${dir === 'ltr' ? 'Right-to-Left' : 'Left-to-Right'} layout`);
  });
}

/* ==========================================================================
   NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.header-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   MOBILE NAVIGATION TOGGLE SYSTEM
   ========================================================================== */
function initMobileNav() {
  const togglers = document.querySelectorAll('.navbar-toggler, #mobile-nav-toggler');
  
  togglers.forEach(toggler => {
    toggler.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = toggler.getAttribute('data-bs-target') || '#navbarContent';
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      const isShow = targetEl.classList.contains('show');
      if (isShow) {
        targetEl.classList.remove('show');
        toggler.setAttribute('aria-expanded', 'false');
      } else {
        targetEl.classList.add('show');
        toggler.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close menu when a navigation link is clicked on mobile
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetEl = document.querySelector('#navbarContent');
      if (targetEl && targetEl.classList.contains('show')) {
        targetEl.classList.remove('show');
      }
    });
  });
}
