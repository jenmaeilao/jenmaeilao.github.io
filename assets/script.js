// ---- NAV: Active link + breadcrumb on scroll ----
const sections   = document.querySelectorAll('.section');
const navLinks   = document.querySelectorAll('.nav-link');
const breadcrumb = document.getElementById('nav-breadcrumb');
const navbar     = document.getElementById('navbar');

const sectionMeta = {
  home:      { num: '01', label: 'HOME' },
  about:     { num: '02', label: 'ABOUT' },
  portfolio: { num: '03', label: 'PORTFOLIO' },
  contact:   { num: '04', label: 'CONTACT' },
};

function updateNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      // Highlight nav link
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (active) active.classList.add('active');

      // Update breadcrumb
      const meta = sectionMeta[id];
      if (meta) breadcrumb.textContent = `${meta.num}. ${meta.label}`;
    }
  });

  // Navbar shadow on scroll
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav(); // run once on load

// ---- Smooth scroll on nav click (already handled by CSS scroll-behavior,
//      but this handles hash links more reliably cross-browser) ----
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ---- Scroll Reveal ----
const revealEls = document.querySelectorAll(
  '.skill-card, .work-card, .ach-card, .edu-item, .project-item, .info-card, .about-body p'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger by position
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));

// ---- Contact Form ----
(function() {
    emailjs.init("B5u5n_RRcwPP-pvWw"); // 
    console.log("✓ EmailJS initialized successfully");
})();

// ---- Contact Form ----
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault(); 
    console.log("Form submitted");

    if (typeof emailjs === 'undefined') {
      alert("Error: Hindi pa naglo-load ang EmailJS library sa HTML mo. Check your script tags!");
      console.error("EmailJS library not loaded");
      return;
    }

    console.log("Sending email with Service ID: service_g4btl0k, Template ID: template_zmghm4m");
    
    emailjs.sendForm('service_g4btl0k', 'template_zmghm4m', contactForm)
      .then(() => {
        console.log("✓ Email sent successfully!");
        formSuccess.classList.add('show');
        contactForm.reset();
        setTimeout(() => formSuccess.classList.remove('show'), 4000);
      }, (error) => {
        alert("EmailJS Error: " + JSON.stringify(error));
        console.error('Email sending failed:', error);
      });
  });
}