// TDK CLI Website - Main JavaScript

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add active class to navigation based on scroll position
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Navbar background on scroll
function updateNavbar() {
  const navbar = document.querySelector('.navbar');
  if (window.pageYOffset > 50) {
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}

window.addEventListener('scroll', updateNavbar);

// Copy code blocks
function addCopyButtons() {
  document.querySelectorAll('pre').forEach(pre => {
    const button = document.createElement('button');
    button.className = 'btn btn-sm btn-outline-light';
    button.style.cssText = 'position: absolute; top: 0.5rem; right: 0.5rem; padding: 0.25rem 0.75rem; font-size: 0.75rem;';
    button.innerHTML = '<i class="bi bi-clipboard"></i>';
    button.setAttribute('aria-label', 'Copy to clipboard');
    
    button.addEventListener('click', () => {
      const code = pre.querySelector('code');
      const text = code ? code.innerText : pre.innerText;
      
      navigator.clipboard.writeText(text).then(() => {
        button.innerHTML = '<i class="bi bi-check"></i>';
        setTimeout(() => {
          button.innerHTML = '<i class="bi bi-clipboard"></i>';
        }, 2000);
      });
    });
    
    pre.style.position = 'relative';
    pre.appendChild(button);
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  addCopyButtons();
});

console.log('🚀 TDK CLI website loaded');
