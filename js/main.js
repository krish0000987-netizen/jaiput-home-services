/**
 * JAIPUR HOME SERVICE 93 - MASTER JAVASCRIPT ENGINE
 * Unobstructed 3-Second Hero Slideshow, Quick Service Booking & WhatsApp Dispatch
 */

document.addEventListener('DOMContentLoaded', () => {
  initFullBleedHeroSlider();
  initStickyHeader();
  initMobileMenu();
  initBeforeAfterSlider();
  initCounterAnimations();
  initBookingDateDefaults();
  initScrollTop();
});

/* ==========================================================================
   1. HERO SLIDESHOW (3-SECOND AUTO TRANSITION ENGINE)
   ========================================================================== */
const heroSlideServices = [
  { tag: "01 / 07", title: "Complete Home Deep Cleaning" },
  { tag: "02 / 07", title: "Sofa & Carpet Spa Shampooing" },
  { tag: "03 / 07", title: "Stone Polish & Marble Rubbing" },
  { tag: "04 / 07", title: "Bathroom Deep Sanitization" },
  { tag: "05 / 07", title: "Modular Kitchen Degreasing" },
  { tag: "06 / 07", title: "AC Service & Gas Refilling" },
  { tag: "07 / 07", title: "Royale House Painting" }
];

let fullSlideIndex = 0;
let fullSlideInterval = null;
const FULL_SLIDE_DURATION = 3000; // 3 seconds requirement

function initFullBleedHeroSlider() {
  const slides = document.querySelectorAll('#heroFullSlider .hero-full-slide');
  const dots = document.querySelectorAll('#heroDots .dot-btn');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const serviceTag = document.getElementById('heroServiceTag');
  const serviceTitle = document.getElementById('heroServiceTitle');
  const heroSection = document.getElementById('hero');

  if (!slides.length) return;

  function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    fullSlideIndex = index;

    // Toggle active slide
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });

    // Update dots & reset 3s progress bar animation
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
      const progress = dot.querySelector('.dot-progress');
      if (progress) {
        progress.style.animation = 'none';
        void progress.offsetWidth; // trigger reflow
        if (idx === index) {
          progress.style.animation = `slideTimer ${FULL_SLIDE_DURATION}ms linear forwards`;
        }
      }
    });

    // Smooth transition for active service label
    if (serviceTag && serviceTitle && heroSlideServices[index]) {
      serviceTag.textContent = heroSlideServices[index].tag;
      serviceTitle.style.opacity = '0';

      setTimeout(() => {
        serviceTitle.textContent = heroSlideServices[index].title;
        serviceTitle.style.transition = 'all 0.25s ease';
        serviceTitle.style.opacity = '1';
      }, 100);
    }
  }

  function nextSlide() {
    showSlide(fullSlideIndex + 1);
  }

  function prevSlide() {
    showSlide(fullSlideIndex - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    fullSlideInterval = setInterval(nextSlide, FULL_SLIDE_DURATION);
  }

  function stopAutoPlay() {
    if (fullSlideInterval) {
      clearInterval(fullSlideInterval);
      fullSlideInterval = null;
    }
  }

  // Controls
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoPlay();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAutoPlay();
    });
  });

  // Pause on hover
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoPlay);
    heroSection.addEventListener('mouseleave', startAutoPlay);
  }

  // Mobile Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;
  if (heroSection) {
    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        nextSlide();
        startAutoPlay();
      } else if (touchEndX - touchStartX > 45) {
        prevSlide();
        startAutoPlay();
      }
    }, { passive: true });
  }

  // Start with Slide 0
  showSlide(0);
  startAutoPlay();
}

/* ==========================================================================
   2. STICKY NAVBAR & MOBILE MENU
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* ==========================================================================
   3. QUICK SERVICE BOOKING SECTION DISPATCH
   ========================================================================== */
function initBookingDateDefaults() {
  const dateInput = document.getElementById('bookDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
  }
}

function handleSectionQuickBooking(e) {
  e.preventDefault();
  const name = document.getElementById('bookFullName').value.trim();
  const mobile = document.getElementById('bookMobile').value.trim();
  const service = document.getElementById('bookServiceSelect').value;
  const locality = document.getElementById('bookLocality').value.trim();
  const date = document.getElementById('bookDate').value;
  const slot = document.getElementById('bookSlot').value;
  const notes = document.getElementById('bookNotes').value.trim();

  const text = `*NEW SERVICE BOOKING - JAIPUR HOME SERVICE 93*%0A%0A` +
    `*Customer Name:* ${encodeURIComponent(name)}%0A` +
    `*Mobile Number:* ${encodeURIComponent(mobile)}%0A` +
    `*Service Requested:* ${encodeURIComponent(service)}%0A` +
    `*Jaipur Address/Area:* ${encodeURIComponent(locality)}%0A` +
    `*Preferred Date:* ${encodeURIComponent(date)}%0A` +
    `*Preferred Slot:* ${encodeURIComponent(slot)}%0A` +
    (notes ? `*Special Notes:* ${encodeURIComponent(notes)}%0A%0A` : `%0A`) +
    `Please confirm the technician visit at my location.`;

  window.open(`https://wa.me/918875198384?text=${text}`, '_blank');
}

/* ==========================================================================
   4. BEFORE & AFTER COMPARISON SLIDER ENGINE
   ========================================================================== */
const baData = {
  marble: {
    before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  },
  sofa: {
    before: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
  },
  bathroom: {
    before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  }
};

function initBeforeAfterSlider() {
  const container = document.getElementById('baContainer');
  const afterLayer = document.getElementById('baAfterLayer');
  const handle = document.getElementById('baHandle');

  if (!container || !afterLayer || !handle) return;

  let isDragging = false;

  function setPosition(xPos) {
    const rect = container.getBoundingClientRect();
    let x = xPos - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    const percent = (x / rect.width) * 100;
    afterLayer.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
  }

  // Mouse Events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setPosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Events
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    setPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

function switchBATab(key) {
  const data = baData[key];
  if (!data) return;

  const beforeImg = document.getElementById('baBeforeImg');
  const afterImg = document.getElementById('baAfterImg');
  const tabs = document.querySelectorAll('.ba-tab-btn');

  tabs.forEach(tab => {
    if (tab.getAttribute('onclick').includes(key)) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  if (beforeImg && afterImg) {
    beforeImg.src = data.before;
    afterImg.src = data.after;
  }
}

/* ==========================================================================
   5. STATS COUNTER ANIMATION
   ========================================================================== */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          if (target > 1000) {
            counter.textContent = `${target.toLocaleString('en-IN')}+`;
          } else if (target === 99) {
            counter.textContent = `99.4%`;
          } else if (target === 10) {
            counter.textContent = `10+ Yrs`;
          } else {
            counter.textContent = `${target}+`;
          }
        } else {
          if (target > 1000) {
            counter.textContent = `${Math.floor(current).toLocaleString('en-IN')}+`;
          } else {
            counter.textContent = `${Math.floor(current)}+`;
          }
        }
      }, stepTime);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runCounters();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-strip-section');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function toggleFaq(header) {
  const item = header.parentElement;
  const body = item.querySelector('.faq-body');
  const allItems = document.querySelectorAll('.faq-item');

  allItems.forEach(el => {
    if (el !== item) {
      el.classList.remove('active');
      const b = el.querySelector('.faq-body');
      if (b) b.style.maxHeight = null;
    }
  });

  if (item.classList.contains('active')) {
    item.classList.remove('active');
    body.style.maxHeight = null;
  } else {
    item.classList.add('active');
    body.style.maxHeight = `${body.scrollHeight + 30}px`;
  }
}

/* ==========================================================================
   7. MODAL POPUP & FORM SUBMISSIONS
   ========================================================================== */
function openBookingModal(serviceName) {
  const modal = document.getElementById('bookingModal');
  const serviceSelect = document.getElementById('modalService');
  if (modal) {
    modal.classList.add('active');
    if (serviceSelect && serviceName && serviceName !== 'General Inquiry') {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase())) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }
  }
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) modal.classList.remove('active');
}

// Close on outside click
window.addEventListener('click', (e) => {
  const modal = document.getElementById('bookingModal');
  if (e.target === modal) {
    closeBookingModal();
  }
});

function handleModalSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modalName').value.trim();
  const phone = document.getElementById('modalPhone').value.trim();
  const service = document.getElementById('modalService').value;
  const address = document.getElementById('modalAddress').value.trim();

  const text = `*SERVICE BOOKING REQUEST - JAIPUR HOME SERVICE 93*%0A%0A` +
    `*Name:* ${encodeURIComponent(name)}%0A` +
    `*Mobile:* ${encodeURIComponent(phone)}%0A` +
    `*Service:* ${encodeURIComponent(service)}%0A` +
    `*Address:* ${encodeURIComponent(address)}, Jaipur%0A%0A` +
    `Kindly arrange a team visit at the earliest.`;

  window.open(`https://wa.me/918875198384?text=${text}`, '_blank');
  closeBookingModal();
}

/* ==========================================================================
   8. SCROLL TO TOP UTILITY
   ========================================================================== */
function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
}
