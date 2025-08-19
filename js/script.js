// ===== GLOBAL VARIABLES =====
let currentTheme = localStorage.getItem('theme') || 'light';
let typingIndex = 0;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseTime = 2000;
let isDeleting = false;
let currentTextIndex = 0;

// Typing texts array
const typingTexts = [
  'Fullstack Developer',
  'Mobile App Developer',
  'Web Developer',
  'Software Engineer'
];

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  initializeNavigation();
  initializeTypingAnimation();
  initializeScrollAnimations();
  initializeSkillsAnimation();
  initializeContactForm();
  initializeModals();
  initializeSmoothScrolling();
  initializeActiveNavigation();
});

// ===== THEME MANAGEMENT =====
function initializeTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  
  // Set initial theme
  body.setAttribute('data-theme', currentTheme);
  updateThemeIcon();
  
  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  updateThemeIcon();
  
  // Add transition effect
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
}

function updateThemeIcon() {
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
  }
}

// ===== NAVIGATION =====
function initializeNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Hamburger menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking on nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (hamburger && navMenu && 
        !hamburger.contains(e.target) && 
        !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', handleNavbarScroll);
}

function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.background = currentTheme === 'light' 
        ? 'rgba(255, 255, 255, 0.98)' 
        : 'rgba(26, 32, 44, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = currentTheme === 'light' 
        ? 'rgba(255, 255, 255, 0.95)' 
        : 'rgba(26, 32, 44, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  }
}

// ===== TYPING ANIMATION =====
function initializeTypingAnimation() {
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    typeText(typingElement);
  }
}

function typeText(element) {
  const currentText = typingTexts[currentTextIndex];
  
  if (isDeleting) {
    element.textContent = currentText.substring(0, typingIndex - 1);
    typingIndex--;
    
    if (typingIndex === 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
      setTimeout(() => typeText(element), 500);
      return;
    }
    
    setTimeout(() => typeText(element), deletingSpeed);
  } else {
    element.textContent = currentText.substring(0, typingIndex + 1);
    typingIndex++;
    
    if (typingIndex === currentText.length) {
      isDeleting = true;
      setTimeout(() => typeText(element), pauseTime);
      return;
    }
    
    setTimeout(() => typeText(element), typingSpeed);
  }
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-in-left, .slide-in-right'
  );
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// ===== SKILLS ANIMATION =====
function initializeSkillsAnimation() {
  const skillsSection = document.querySelector('.skills');
  if (!skillsSection) return;
  
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillsObserver.observe(skillsSection);
}

function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach((bar, index) => {
    const percentage = bar.getAttribute('data-percentage') || '0';
    
    setTimeout(() => {
      bar.style.width = percentage + '%';
      
      // Animate percentage counter
      const percentageElement = bar.parentElement.nextElementSibling;
      if (percentageElement && percentageElement.classList.contains('skill-percentage')) {
        animateCounter(percentageElement, 0, parseInt(percentage), 1500);
      }
    }, index * 200);
  });
}

function animateCounter(element, start, end, duration) {
  const startTime = performance.now();
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const current = Math.floor(start + (end - start) * easeOutCubic(progress));
    element.textContent = current + '%';
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// ===== CONTACT FORM =====
function initializeContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', handleFormSubmit);
  
  // Real-time validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('.btn-primary');
  const loadingBtn = form.querySelector('.btn-loading');
  
  // Validate all fields
  if (!validateForm(form)) {
    return;
  }
  
  // Show loading state
  submitBtn.style.display = 'none';
  loadingBtn.style.display = 'flex';
  
  // Simulate form submission (replace with actual EmailJS or backend integration)
  setTimeout(() => {
    // Reset form
    form.reset();
    
    // Hide loading state
    submitBtn.style.display = 'flex';
    loadingBtn.style.display = 'none';
    
    // Show success message
    showNotification('Pesan berhasil dikirim! Terima kasih atas pesan Anda.', 'success');
  }, 2000);
}

function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = '';
  
  // Clear previous errors
  clearFieldError(field);
  
  // Required field validation
  if (field.hasAttribute('required') && !value) {
    errorMessage = 'Field ini wajib diisi.';
    isValid = false;
  }
  
  // Email validation
  if (fieldName === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = 'Format email tidak valid.';
      isValid = false;
    }
  }
  
  // Name validation
  if (fieldName === 'name' && value) {
    if (value.length < 2) {
      errorMessage = 'Nama minimal 2 karakter.';
      isValid = false;
    }
  }
  
  // Message validation
  if (fieldName === 'message' && value) {
    if (value.length < 10) {
      errorMessage = 'Pesan minimal 10 karakter.';
      isValid = false;
    }
  }
  
  if (!isValid) {
    showFieldError(field, errorMessage);
  }
  
  return isValid;
}

function showFieldError(field, message) {
  field.classList.add('error');
  
  let errorElement = field.parentElement.querySelector('.error-message');
  if (!errorElement) {
    errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    field.parentElement.appendChild(errorElement);
  }
  
  errorElement.textContent = message;
}

function clearFieldError(field) {
  field.classList.remove('error');
  const errorElement = field.parentElement.querySelector('.error-message');
  if (errorElement) {
    errorElement.remove();
  }
}

// ===== MODALS =====
function initializeModals() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.modal');
  const modalCloses = document.querySelectorAll('.modal-close');
  
  // Open modal
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        openModal(modal);
      }
    });
  });
  
  // Close modal
  modalCloses.forEach(close => {
    close.addEventListener('click', () => {
      const modal = close.closest('.modal');
      if (modal) {
        closeModal(modal);
      }
    });
  });
  
  // Close modal on backdrop click
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });
  
  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });
}

function openModal(modal) {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const aboutSection = document.querySelector('.about');
      if (aboutSection) {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = aboutSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
}

// ===== ACTIVE NAVIGATION =====
function initializeActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        updateActiveNavLink(sectionId);
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

function updateActiveNavLink(sectionId) {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const href = link.getAttribute('href');
    if (href === `#${sectionId}`) {
      link.classList.add('active');
    }
  });
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => {
    notification.remove();
  });
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
    word-wrap: break-word;
  `;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    removeNotification(notification);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(notification);
  }, 5000);
}

function removeNotification(notification) {
  notification.style.transform = 'translateX(100%)';
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 300);
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Optimize scroll events
window.addEventListener('scroll', throttle(() => {
  handleNavbarScroll();
}, 16)); // ~60fps

// Optimize resize events
window.addEventListener('resize', debounce(() => {
  // Handle responsive adjustments if needed
}, 250));

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation for modals
document.addEventListener('keydown', (e) => {
  const activeModal = document.querySelector('.modal.active');
  if (activeModal && e.key === 'Tab') {
    trapFocus(activeModal, e);
  }
});

function trapFocus(modal, e) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  if (e.shiftKey) {
    if (document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
  } else {
    if (document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
  // You can add error reporting here
});

// ===== INITIALIZATION COMPLETE =====
console.log('Portfolio website initialized successfully!');

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    toggleTheme,
    showNotification,
    openModal,
    closeModal
  };
}