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

  // 1. Para sa Active Links at Breadcrumbs (Yung luma mong logic)
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (active) active.classList.add('active');

      const meta = sectionMeta[id];
      if (meta) breadcrumb.textContent = `${meta.num}. ${meta.label}`;
    }
  });

  // 2. CAPSULE TOGGLE TRIGGER
  // Kapag lumampas sa 60px ang scroll ng user, automatic magmo-morph into a capsule
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Siguraduhing naka-event listener ito sa scroll
window.addEventListener('scroll', updateNav, { passive: true });
updateNav(); // Patakbuhin minsan pagka-load ng page

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
    // 1. UNAHIN AGAD ITO para harangan ang pag-refresh at pagbabago ng URL!
    e.preventDefault(); 

    // Safe check kung nakakabit ba ang EmailJS library sa HTML mo
    if (typeof emailjs === 'undefined') {
      alert("Error: Hindi pa naglo-load ang EmailJS library sa HTML mo.");
      return;
    }

    // 2. Ipadala ang form data (Siguraduhing tama ang iyong IDs at Public Key sa taas)
    emailjs.sendForm('service_g4btl0k', 'template_zmghm4m', contactForm)
      .then((response) => {
        // Lalabas ito kapag natanggap ng EmailJS ang mensahe mo
        alert("SUCCESS! Natanggap ng EmailJS ang form mo.");
        formSuccess.classList.add('show');
        contactForm.reset();
        setTimeout(() => formSuccess.classList.remove('show'), 4000);
      }, (error) => {
        // Lalabas ito kapag may maling ID o configuration sa EmailJS
        alert("EmailJS Error: " + JSON.stringify(error));
        console.log('FAILED...', error);
      });
  });
}