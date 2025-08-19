// Modern Portfolio JavaScript - Interactive Features

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons first
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Initialize all features
  initializeTheme();
  initializeNavigation();
  initializeAnimations();
  initializeTypingEffect();
  initializeContactForm();
  initializeScrollEffects();
  initializeMobileMenu();
  initializeScrollToTop();
  initializeParallax();
  initializeProgressBars();
  initializeCounters();
  initializeLazyLoading();
  initializeDynamicContent();
});

// Theme Management
function initializeTheme() {
  const themeToggle = document.querySelector(".theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Get saved theme or use system preference
  const currentTheme =
    localStorage.getItem("theme") ||
    (prefersDarkScheme.matches ? "dark" : "light");

  // Apply initial theme
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener("click", function (e) {
      e.preventDefault();
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      // Add smooth transition
      document.documentElement.style.transition = "all 0.3s ease";

      // Apply new theme
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      updateThemeIcon(newTheme);

      // Remove transition after animation
      setTimeout(() => {
        document.documentElement.style.transition = "";
      }, 300);
    });
  } else {
    console.warn("Theme toggle button not found");
  }

  // Listen for system theme changes
  prefersDarkScheme.addEventListener("change", function (e) {
    if (!localStorage.getItem("theme")) {
      const newTheme = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      updateThemeIcon(newTheme);
    }
  });
}

function updateThemeIcon(theme) {
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    // Add accessibility attributes
    themeToggle.setAttribute(
      "aria-label",
      `Switch to ${theme === "dark" ? "light" : "dark"} theme`
    );
    themeToggle.setAttribute(
      "title",
      `Switch to ${theme === "dark" ? "light" : "dark"} theme`
    );

    // Get the single theme icon
    const themeIcon = document.getElementById("theme-icon");

    if (themeIcon) {
      // Change icon type based on theme
      if (theme === "dark") {
        // Dark theme: show sun icon (to switch to light)
        themeIcon.setAttribute("data-lucide", "sun");
        // Set sun icon color to white directly
        themeIcon.style.color = "white";
      } else {
        // Light theme: show moon icon (to switch to dark)
        themeIcon.setAttribute("data-lucide", "moon");
        // Reset color to use CSS variable
        themeIcon.style.color = "";
      }

      // Re-initialize Lucide icons to update the icon
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    }
  }
}

// Navigation Management
function initializeNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });

  // Update active navigation link on scroll
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });

    // Update header background on scroll
    updateHeaderBackground();
  });
}

function updateHeaderBackground() {
  const header = document.querySelector(".navbar");
  if (!header) return;

  const scrollPosition = window.scrollY;
  const theme = document.documentElement.getAttribute("data-theme");

  // Remove inline styles to let CSS variables handle theming
  header.style.background = "";
  header.style.backdropFilter = "";
  header.style.boxShadow = "";

  // Add scrolled class for styling
  if (scrollPosition > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Mobile Menu Management
function initializeMobileMenu() {
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.contains("active");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    });
  }
}

function openMobileMenu() {
  const navMenu = document.querySelector(".nav-menu");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");

  navMenu.classList.add("active");
  mobileToggle.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  const navMenu = document.querySelector(".nav-menu");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");

  navMenu.classList.remove("active");
  mobileToggle.classList.remove("active");
  document.body.style.overflow = "";
}

// Typing Effect
function initializeTypingEffect() {
  const typingElement = document.querySelector(".typing-text");
  if (!typingElement) return;

  const texts = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Problem Solver",
    "Tech Enthusiast",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before next text
    }

    setTimeout(typeText, typingSpeed);
  }

  typeText();
}

// Scroll Animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observe elements with scroll-animate class
  const animateElements = document.querySelectorAll(".scroll-animate");
  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // Add scroll-animate class to various elements
  const elementsToAnimate = [
    ".section-header",
    ".skill-card",
    ".project-card",
    ".timeline-item",
    ".contact-card",
    ".about-text",
    ".stats-grid .stat-item",
  ];

  elementsToAnimate.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      element.classList.add("scroll-animate");
      element.style.animationDelay = `${index * 0.1}s`;
      observer.observe(element);
    });
  });
}

// Contact Form Management
function initializeContactForm() {
  const contactForm = document.querySelector(".contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Validate form
    if (validateForm(formObject)) {
      submitForm(formObject);
    }
  });

  // Real-time validation
  const formInputs = contactForm.querySelectorAll("input, textarea, select");
  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      clearFieldError(this);
    });
  });
}

function validateForm(data) {
  let isValid = true;

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    showFieldError("name", "Name must be at least 2 characters long");
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    showFieldError("email", "Please enter a valid email address");
    isValid = false;
  }

  // Subject validation
  if (!data.subject || data.subject.trim().length < 5) {
    showFieldError("subject", "Subject must be at least 5 characters long");
    isValid = false;
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    showFieldError("message", "Message must be at least 10 characters long");
    isValid = false;
  }

  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;

  switch (fieldName) {
    case "name":
      if (value.length < 2) {
        showFieldError(fieldName, "Name must be at least 2 characters long");
        return false;
      }
      break;
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(fieldName, "Please enter a valid email address");
        return false;
      }
      break;
    case "subject":
      if (value.length < 5) {
        showFieldError(fieldName, "Subject must be at least 5 characters long");
        return false;
      }
      break;
    case "message":
      if (value.length < 10) {
        showFieldError(
          fieldName,
          "Message must be at least 10 characters long"
        );
        return false;
      }
      break;
  }

  clearFieldError(field);
  return true;
}

function showFieldError(fieldName, message) {
  const field = document.querySelector(`[name="${fieldName}"]`);
  const errorElement = field.parentNode.querySelector(".error-message");

  field.classList.add("error");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

function clearFieldError(field) {
  const errorElement = field.parentNode.querySelector(".error-message");

  field.classList.remove("error");
  if (errorElement) {
    errorElement.style.display = "none";
  }
}

// EmailJS Configuration
// SETUP INSTRUCTIONS:
// 1. Buat akun di https://www.emailjs.com/
// 2. Buat email service (Gmail, Outlook, dll)
// 3. Buat email template dengan variabel: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Ganti nilai di bawah dengan konfigurasi EmailJS Anda:
const EMAILJS_CONFIG = {
  serviceID: "aryy_service", // Ganti dengan Service ID dari EmailJS
  templateID: "aryy_template", // Ganti dengan Template ID dari EmailJS
  userID: "0hU2MTdGg_xk5Xm58", // Ganti dengan User ID dari EmailJS
};

function submitForm(data) {
  const submitButton = document.querySelector(".contact-form .btn-primary");
  const originalText = submitButton.innerHTML;

  // Validasi konfigurasi EmailJS
  if (
    EMAILJS_CONFIG.serviceID === "aryy_service" ||
    EMAILJS_CONFIG.templateID === "aryy_template" ||
    EMAILJS_CONFIG.userID === "0hU2MTdGg_xk5Xm58"
  ) {
    showNotification(
      "EmailJS belum dikonfigurasi. Silakan setup EmailJS terlebih dahulu.",
      "error"
    );
    return;
  }

  // Show loading state
  submitButton.innerHTML = '<span class="spinner"></span> Sending...';
  submitButton.disabled = true;

  // Prepare template parameters
  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    subject: data.subject,
    message: data.message,
  };

  // Send email using EmailJS
  emailjs
    .send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID,
      templateParams,
      EMAILJS_CONFIG.userID
    )
    .then(function (response) {
      console.log("Email sent successfully:", response);

      // Reset form
      document.querySelector(".contact-form").reset();

      // Show success message
      showNotification(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
    })
    .catch(function (error) {
      console.error("Email sending failed:", error);

      // Show error message
      showNotification(
        "Failed to send message. Please try again or contact me directly.",
        "error"
      );
    })
    .finally(function () {
      // Reset button state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    });
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Auto hide after 5 seconds
  setTimeout(() => {
    hideNotification(notification);
  }, 5000);

  // Close button event
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      hideNotification(notification);
    });
}

function hideNotification(notification) {
  notification.classList.remove("show");
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// Scroll Effects
function initializeScrollEffects() {
  let ticking = false;

  function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Parallax effect for hero section
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);
}

// Scroll to Top Button
function initializeScrollToTop() {
  const scrollToTopBtn = document.querySelector(".scroll-to-top");
  if (!scrollToTopBtn) return;

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.display = "flex";
      scrollToTopBtn.style.opacity = "1";
    } else {
      scrollToTopBtn.style.opacity = "0";
      setTimeout(() => {
        if (window.pageYOffset <= 300) {
          scrollToTopBtn.style.display = "none";
        }
      }, 300);
    }
  });

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Parallax Effects
function initializeParallax() {
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  if (parallaxElements.length === 0) return;

  function updateParallax() {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((element) => {
      const rate = scrolled * (element.dataset.parallax || 0.5);
      element.style.transform = `translateY(${rate}px)`;
    });
  }

  window.addEventListener("scroll", updateParallax);
}

// Progress Bars Animation
function initializeProgressBars() {
  const progressBars = document.querySelectorAll(".skill-progress");

  const progressObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const percentage = progressBar.dataset.percentage || 0;

          setTimeout(() => {
            progressBar.style.width = `${percentage}%`;
          }, 200);

          progressObserver.unobserve(progressBar);
        }
      });
    },
    { threshold: 0.5 }
  );

  progressBars.forEach((bar) => {
    progressObserver.observe(bar);
  });
}

// Counter Animation
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number");

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.count || counter.textContent);
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

// Lazy Loading for Images
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });
}

// Utility Functions
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
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Error Handling
window.addEventListener("error", function (e) {
  console.error("JavaScript Error:", e.error);
});

// Performance Monitoring
if ("performance" in window) {
  window.addEventListener("load", function () {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0];
      console.log(
        "Page Load Time:",
        perfData.loadEventEnd - perfData.loadEventStart,
        "ms"
      );
    }, 0);
  });
}

// Dynamic Content Loading
function initializeDynamicContent() {
  loadProjects();
  loadExperience();
  loadSkills();
}

// Load Projects from JSON
async function loadProjects() {
  try {
    const response = await fetch("./data/projects.json");
    const projects = await response.json();
    renderProjects(projects);
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

function renderProjects(projects) {
  const projectsGrid = document.querySelector(".projects-grid");
  if (!projectsGrid) return;

  projectsGrid.innerHTML = "";

  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";
    projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${
      project.title
    }" loading="lazy">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${
                          project.demoUrl || project.demo_url || "#"
                        }" class="project-link" aria-label="View live demo" target="_blank">
                            <i data-lucide="external-link"></i>
                        </a>
                        <a href="${
                          project.githubUrl || project.github_url || "#"
                        }" class="project-link" aria-label="View source code" target="_blank">
                            <i data-lucide="github"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <div class="project-category">${project.category}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies
                      .map((tech) => `<span class="tech-tag">${tech}</span>`)
                      .join("")}
                </div>
            </div>
        `;

    // Add click event listener to open modal
    projectCard.addEventListener("click", () => {
      openProjectModal(project);
    });

    projectsGrid.appendChild(projectCard);
  });

  // Re-initialize Lucide icons for new content
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// Load Experience from JSON
async function loadExperience() {
  try {
    const response = await fetch("./data/experience.json");
    const experiences = await response.json();
    renderExperience(experiences);
  } catch (error) {
    console.error("Error loading experience:", error);
  }
}

function renderExperience(experiences) {
  const timeline = document.querySelector(".timeline");
  if (!timeline) return;

  timeline.innerHTML = "";

  experiences.forEach((exp) => {
    const timelineItem = document.createElement("div");
    timelineItem.className = "timeline-item";
    timelineItem.innerHTML = `
            <div class="timeline-marker">
                <div class="timeline-icon">
                    <i data-lucide="${exp.icon}"></i>
                </div>
            </div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <h3 class="timeline-title">${exp.title}</h3>
                    <span class="timeline-badge ${exp.type}">${exp.badge}</span>
                </div>
                <div class="timeline-meta">
                    <span class="timeline-company">${exp.company}</span>
                    <span class="timeline-period">${exp.period}</span>
                </div>
                <p class="timeline-description">${exp.description}</p>
                ${
                  exp.achievements
                    ? `
                    <ul class="timeline-achievements">
                        ${exp.achievements
                          .map((achievement) => `<li>${achievement}</li>`)
                          .join("")}
                    </ul>
                `
                    : ""
                }
                ${
                  exp.skills
                    ? `
                    <div class="timeline-skills">
                        ${exp.skills
                          .map(
                            (skill) => `<span class="skill-tag">${skill}</span>`
                          )
                          .join("")}
                    </div>
                `
                    : ""
                }
            </div>
        `;
    timeline.appendChild(timelineItem);
  });

  // Re-initialize Lucide icons for new content
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// Load Skills from JSON
async function loadSkills() {
  try {
    const response = await fetch("./data/skills.json");
    const skills = await response.json();
    renderSkills(skills);
  } catch (error) {
    console.error("Error loading skills:", error);
  }
}

function renderSkills(skills) {
  const skillsGrid = document.querySelector(".skills-grid");
  if (!skillsGrid) return;

  skillsGrid.innerHTML = "";

  skills.forEach((skill) => {
    const skillCard = document.createElement("div");
    skillCard.className = "skill-card";
    skillCard.innerHTML = `
            <div class="skill-icon">
                <i data-lucide="${skill.icon}"></i>
            </div>
            <h3 class="skill-title">${skill.title}</h3>
            <p class="skill-description">${skill.description}</p>
            <div class="skill-tags">
                ${skill.technologies
                  .map((tech) => `<span class="skill-tag">${tech}</span>`)
                  .join("")}
            </div>
        `;
    skillsGrid.appendChild(skillCard);
  });

  // Re-initialize Lucide icons for new content
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// Project Modal Functions
function openProjectModal(project) {
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const modalTags = document.getElementById("modal-tags");
  const modalDemo = document.getElementById("modal-demo");
  const modalGithub = document.getElementById("modal-github");

  if (!modal) return;

  // Populate modal content
  modalTitle.textContent = project.title;
  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalDescription.textContent = project.description;

  // Clear and populate tags
  modalTags.innerHTML = "";
  project.technologies.forEach((tech) => {
    const tag = document.createElement("span");
    tag.className = "tech-tag";
    tag.textContent = tech;
    modalTags.appendChild(tag);
  });

  // Set links
  modalDemo.href = project.demoUrl || project.demo_url || "#";
  modalGithub.href = project.githubUrl || project.github_url || "#";

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Re-initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Close modal when clicking outside
document.addEventListener("click", function (e) {
  const modal = document.getElementById("project-modal");
  if (e.target === modal) {
    closeProjectModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeProjectModal();
  }
});

// Export functions for external use
window.PortfolioJS = {
  showNotification,
  updateThemeIcon,
  validateForm,
  debounce,
  throttle,
  loadProjects,
  loadExperience,
  loadSkills,
  openProjectModal,
  closeProjectModal,
};
