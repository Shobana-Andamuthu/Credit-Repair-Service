/**
 * Credit Repair Service - Auth Script (Login & Register)
 * Handles Password Visibility Toggle, Login/Register Mode Swap, Form Validation, and Theme/RTL toggles.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggles();
  initAuthModeSwitcher();
  initAuthFormValidation();
});

/* Password Eye Visibility Toggle */
function initPasswordToggles() {
  const toggleBtns = document.querySelectorAll('.password-toggle-btn');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = btn.previousElementSibling || btn.parentElement.querySelector('input');
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
        btn.setAttribute('aria-label', 'Hide password');
      } else {
        input.type = 'password';
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
        btn.setAttribute('aria-label', 'Show password');
      }
    });
  });
}

/* Switcher between Login and Register Views */
function initAuthModeSwitcher() {
  const container = document.getElementById('auth-split-container');
  const toggleLinks = document.querySelectorAll('.auth-view-toggle');
  const heroPanel = document.getElementById('auth-hero-panel');
  const heroBadge = document.getElementById('hero-badge-text');
  const heroTitle = document.getElementById('hero-title-text');
  const heroDesc = document.getElementById('hero-desc-text');

  const loginForm = document.getElementById('login-form-view');
  const registerForm = document.getElementById('register-form-view');

  if (!container || !loginForm || !registerForm) return;

  // Check URL hash (#register or #login)
  if (window.location.hash === '#register') {
    switchToRegister();
  }

  toggleLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetMode = link.getAttribute('data-target-mode');
      if (targetMode === 'register') {
        switchToRegister();
      } else {
        switchToLogin();
      }
    });
  });

  function switchToRegister() {
    container.classList.add('mode-register');
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';

    if (heroPanel) {
      heroPanel.style.backgroundImage = "url('assets/images/auth/register-hero.jpg')";
    }
    if (heroBadge) heroBadge.textContent = "⚡ FREE 30-DAY DISPUTE AUDIT";
    if (heroTitle) heroTitle.textContent = "Start your credit transformation today.";
    if (heroDesc) heroDesc.textContent = "Join over 10,000+ clients restoring their credit scores and unlocking financial freedom.";
    window.location.hash = 'register';
  }

  function switchToLogin() {
    container.classList.remove('mode-register');
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';

    if (heroPanel) {
      heroPanel.style.backgroundImage = "url('assets/images/auth/login-hero.jpg')";
    }
    if (heroBadge) heroBadge.textContent = "🔒 10,000+ ACTIVE CLIENTS SECURED";
    if (heroTitle) heroTitle.textContent = "Your dashboard is exactly where you left it.";
    if (heroDesc) heroDesc.textContent = "Log in to track dispute progress, view real-time bureau status updates, and download personalized action plans.";
    window.location.hash = 'login';
  }
}

/* Form Validation & Submission Handler */
function initAuthFormValidation() {
  const loginForm = document.getElementById('login-form-element');
  const registerForm = document.getElementById('register-form-element');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('#login-email').value.trim();
      const password = loginForm.querySelector('#login-password').value.trim();

      if (!email || !password) {
        alert('Please fill in both email and password fields.');
        return;
      }

      // Simulate successful login and redirect to client dashboard
      const btn = loginForm.querySelector('button[type="submit"]');
      btn.innerHTML = `Logging in... <span class="spinner-border spinner-border-sm ms-2"></span>`;
      btn.disabled = true;

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 700);
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = registerForm.querySelector('#reg-fullname').value.trim();
      const email = registerForm.querySelector('#reg-email').value.trim();
      const password = registerForm.querySelector('#reg-password').value.trim();

      if (!name || !email || !password) {
        alert('Please fill in all required registration fields.');
        return;
      }

      const btn = registerForm.querySelector('button[type="submit"]');
      btn.innerHTML = `Creating Account... <span class="spinner-border spinner-border-sm ms-2"></span>`;
      btn.disabled = true;

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 700);
    });
  }
}
