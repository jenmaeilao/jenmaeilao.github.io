const projects = {
  lakbaylokal: {
    title: 'LakbayLokal',
    badge: 'Web App',
    badgeClass: 'web-design',
    desc: 'LakbayLokal is a Philippine travel booking platform that allows users to discover local destinations, book hotels, and create personalized travel itineraries — all in one place. Built as a capstone project using PHP and MySQL.',
    features: [
      'Browse and search Philippine travel destinations',
      'Hotel booking with availability and pricing',
      'Personalized itinerary builder per destination',
      'User authentication (register, login, sessions)',
      'Admin dashboard for managing destinations and bookings',
    ],
    images: ['assets/img/lakbaylokal/lakbaylokal.png', 'assets/img/lakbaylokal/destinations.png', 'assets/img/lakbaylokal/hotels.png', 'assets/img/lakbaylokal/hotel-view.png'],
    placeholderLabels: ['Home Page', 'Destinations', 'Hotel View', 'Itinerary', 'Booking'],
    placeholderIcon: 'fa-map-location-dot',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap 5'],
    github: 'https://github.com/lakbaylokal/LakbayLokal',
    demo: null,
  },
  tagpo: {
    title: 'Tagpo',
    badge: 'Web App',
    badgeClass: 'web-design',
    desc: 'Tagpo is an event venue booking system that lets users browse and reserve venues for specific events. It features an intuitive booking flow with add-ons, event type filtering, and an admin management panel.',
    features: [
      'Venue listing with filters by event type',
      'Add-on selection during booking (catering, equipment, etc.)',
      'Cart and booking management per user',
      'Payment recording and booking history',
      'Review and ratings system for venues',
    ],
    images: ['assets/img/tagpo/tagpo.png', 'assets/img/tagpo/venues.png', 'assets/img/tagpo/venue-detail.png', 'assets/img/tagpo/cart.png', 'assets/img/tagpo/booking-summary.png'],
    placeholderLabels: ['Landing Page', 'Venue List', 'Venue Detail', 'Book a Venue', 'Booking Summary'],
    placeholderIcon: 'fa-calendar-check',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap 5'],
    github: 'https://github.com/NWJSZ/Tagpo',
    demo: null,
  },
  yawnzzn: {
    title: 'Yawnzzn',
    badge: 'Web + Python',
    badgeClass: 'python',
    desc: 'Yawnzzn is a fashion-themed e-commerce website built with Python and SQLite3. It features a product catalog, cart system, and responsive design — combining aesthetic design with functional backend development.',
    features: [
      'Fashion product catalog with categories',
      'Shopping cart and checkout flow',
      'SQLite3 database for product and order management',
      'Responsive desktop and mobile layout',
      'User account and order history',
    ],
    images: ['assets/img/yawnzzn/yawnzzn.png', 'assets/img/yawnzzn/spotlight.png', 'assets/img/yawnzzn/products.png', 'assets/img/yawnzzn/product-detail.png'],
    placeholderLabels: ['Home', 'Shop', 'Product Page', 'Cart', 'Checkout'],
    placeholderIcon: 'fa-shirt',
    tags: ['HTML', 'CSS', 'Python', 'SQLite3', 'Flask'],
    github: 'https://github.com/jenmaeilao/yawnzzn',
    demo: null,
  },
};

// Modal Logic
let currentSlide = 0;
let totalSlides = 0;

function openModal(id) {
  const p = projects[id];
  if (!p) return;

  // Badge
  const badge = document.getElementById('modalBadge');
  badge.textContent = p.badge;
  badge.className = `modal-project-badge ${p.badgeClass}`;

  // Title + desc
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent = p.desc;

  // Features
  const featList = document.getElementById('modalFeatures');
  featList.innerHTML = p.features.map(f => `<li>${f}</li>`).join('');

  // Tags
  document.getElementById('modalTags').innerHTML =
    p.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // Links
  let linksHTML = '';
  if (p.github) linksHTML += `<a href="${p.github}" target="_blank" class="modal-link github"><i class="fa-brands fa-github"></i> GitHub</a>`;
  if (p.demo) linksHTML += `<a href="${p.demo}" target="_blank" class="modal-link demo"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>`;
  if (!p.github && !p.demo) linksHTML = `<span style="font-size:12px;color:var(--light-text);">Links coming soon!</span>`;
  document.getElementById('modalLinks').innerHTML = linksHTML;

  // Gallery slides
  const gallery = document.getElementById('modalGallery');
  gallery.querySelectorAll('.gallery-slide').forEach(s => s.remove());

  totalSlides = p.images.length;
  p.images.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = `gallery-slide${i === 0 ? ' active' : ''}`;

    if (src) {
      slide.innerHTML = `<img src="${src}" alt="${p.title} screenshot ${i + 1}">`;
    } else {
      slide.innerHTML = `
            <div class="gallery-placeholder">
              <i class="fa-solid ${p.placeholderIcon}"></i>
              <div class="slide-num">0${i + 1}</div>
              <p>${p.placeholderLabels[i] || 'Screenshot ' + (i + 1)}</p>
            </div>`;
    }
    gallery.insertBefore(slide, gallery.querySelector('.gallery-prev'));
  });

  // Dots
  const dots = document.getElementById('galleryDots');
  dots.innerHTML = p.images.map((_, i) =>
    `<button class="gallery-dot${i === 0 ? ' active' : ''}" onclick="goToSlide(${i})"></button>`
  ).join('');

  currentSlide = 0;

  // Show modal
  document.getElementById('projectModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('projectModal').classList.remove('open');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('projectModal')) closeModal();
}

function slideGallery(dir) {
  goToSlide((currentSlide + dir + totalSlides) % totalSlides);
}

function goToSlide(n) {
  const slides = document.querySelectorAll('.gallery-slide');
  const dots = document.querySelectorAll('.gallery-dot');
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

// Close on ESC
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Active link + breadcrumb on scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const breadcrumb = document.getElementById('nav-breadcrumb');
const navbar = document.getElementById('navbar');

const sectionMeta = {
  home:      { num: '01', label: 'HOME' },
  about:     { num: '02', label: 'ABOUT' },
  portfolio: { num: '03', label: 'PORTFOLIO' },
  works:     { num: '04', label: 'WORKS' },
  contact:   { num: '05', label: 'CONTACT' },
};

function updateNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop, height = sec.offsetHeight, id = sec.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (active) active.classList.add('active');
      const meta = sectionMeta[id];
      if (meta) breadcrumb.textContent = `${meta.num}. ${meta.label}`;
    }
  });
  navbar.classList.toggle('scrolled', window.scrollY > 10);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

navLinks.forEach(link => {
  if (!link.dataset.section) return;

  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Scroll Reveal
const revealEls = document.querySelectorAll(
  '.skill-card, .work-card, .ach-card, .edu-item, .project-item, .info-card, .about-body p'
);
revealEls.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));