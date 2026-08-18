/**
 * JAIPUR HOME SERVICE - MASTER JAVASCRIPT ENGINE
 * Mobile-First, Slideshow Navigation Arrows, Authentic Before/After Slider & WhatsApp Dispatch
 */

document.addEventListener('DOMContentLoaded', () => {
  initFullBleedHeroSlider();
  initStickyHeader();
  initMobileMenu();
  initBeforeAfterSlider();
  initCounterAnimations();
  initBookingDateDefaults();
  initScrollTop();
  initRakhiPopup();
});

/* ==========================================================================
   1. HERO SLIDESHOW (3-SECOND AUTO TRANSITION + ARROW NAVIGATION)
   ========================================================================== */
const heroSlideServices = [
  { tag: "01 / 07", title: "Home Deep Clean" },
  { tag: "02 / 07", title: "Sofa & Carpet Spa" },
  { tag: "03 / 07", title: "Marble Rubbing" },
  { tag: "04 / 07", title: "Bathroom Clean" },
  { tag: "05 / 07", title: "Kitchen Degrease" },
  { tag: "06 / 07", title: "AC Repair & Clean" },
  { tag: "07 / 07", title: "House Painting" }
];

let fullSlideIndex = 0;
let fullSlideInterval = null;
const FULL_SLIDE_DURATION = 3000;

function showSlide(index) {
  const slides = document.querySelectorAll('#heroFullSlider .hero-full-slide');
  const dots = document.querySelectorAll('#heroDots .dot-btn');
  const serviceTag = document.getElementById('heroServiceTag');
  const serviceTitle = document.getElementById('heroServiceTitle');

  if (!slides.length) return;

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  fullSlideIndex = index;

  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
    const progress = dot.querySelector('.dot-progress');
    if (progress) {
      progress.style.animation = 'none';
      void progress.offsetWidth;
      if (idx === index) {
        progress.style.animation = `slideTimer ${FULL_SLIDE_DURATION}ms linear forwards`;
      }
    }
  });

  if (serviceTag && serviceTitle && heroSlideServices[index]) {
    serviceTag.textContent = heroSlideServices[index].tag;
    serviceTitle.style.opacity = '0';

    setTimeout(() => {
      serviceTitle.textContent = heroSlideServices[index].title;
      serviceTitle.style.transition = 'opacity 0.2s ease';
      serviceTitle.style.opacity = '1';
    }, 80);
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

// Global functions for inline mini mobile arrow buttons
window.triggerHeroPrev = function() {
  prevSlide();
  startAutoPlay();
};

window.triggerHeroNext = function() {
  nextSlide();
  startAutoPlay();
};

function initFullBleedHeroSlider() {
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const dots = document.querySelectorAll('#heroDots .dot-btn');
  const heroSection = document.getElementById('hero');

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

  // Mobile Touch Swipe
  let touchStartX = 0;
  let touchEndX = 0;
  if (heroSection) {
    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 40) {
        nextSlide();
        startAutoPlay();
      } else if (touchEndX - touchStartX > 40) {
        prevSlide();
        startAutoPlay();
      }
    }, { passive: true });
  }

  showSlide(0);
  startAutoPlay();
}

/* ==========================================================================
   2. STICKY NAVBAR & MOBILE MENU
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
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
   3. QUICK SERVICE BOOKING DISPATCH
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

  const text = `*NEW SERVICE BOOKING - JAIPUR HOME SERVICE*%0A%0A` +
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
   4. AUTHENTIC BEFORE & AFTER CLIP-PATH SLIDER
   ========================================================================== */
const baData = {
  marble: {
    before: 'images/ba-marble-before.jpg',
    after: 'images/ba-marble-after.jpg'
  },
  sofa: {
    before: 'images/ba-sofa-before.jpg',
    after: 'images/ba-sofa-after.jpg'
  },
  bathroom: {
    before: 'images/ba-bathroom-before.jpg',
    after: 'images/ba-bathroom-after.jpg'
  }
};

function initBeforeAfterSlider() {
  const container = document.getElementById('baContainer');
  if (!container) return;

  let isDragging = false;

  function updatePosition(clientX) {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    container.style.setProperty('--ba-pos', `${percent}%`);
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updatePosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updatePosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updatePosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Set initial position
  container.style.setProperty('--ba-pos', '50%');
}

function switchBATab(key) {
  const data = baData[key];
  if (!data) return;

  const beforeImg = document.getElementById('baBeforeImg');
  const afterImg = document.getElementById('baAfterImg');
  const container = document.getElementById('baContainer');
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
    if (container) {
      container.style.setProperty('--ba-pos', '50%');
    }
  }
}

/* ==========================================================================
   5. STATS COUNTER
   ========================================================================== */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800;
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
  }, { threshold: 0.2 });

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
    body.style.maxHeight = `${body.scrollHeight + 20}px`;
  }
}

/* ==========================================================================
   7. MODAL POPUP
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

window.addEventListener('click', (e) => {
  const bookingModal = document.getElementById('bookingModal');
  if (e.target === bookingModal) {
    closeBookingModal();
  }
  const rakhiModal = document.getElementById('rakhiModal');
  if (e.target === rakhiModal) {
    closeRakhiModal();
  }
});

function handleModalSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modalName').value.trim();
  const phone = document.getElementById('modalPhone').value.trim();
  const service = document.getElementById('modalService').value;
  const address = document.getElementById('modalAddress').value.trim();

  const text = `*SERVICE BOOKING REQUEST - JAIPUR HOME SERVICE*%0A%0A` +
    `*Name:* ${encodeURIComponent(name)}%0A` +
    `*Mobile:* ${encodeURIComponent(phone)}%0A` +
    `*Service:* ${encodeURIComponent(service)}%0A` +
    `*Address:* ${encodeURIComponent(address)}, Jaipur%0A%0A` +
    `Kindly arrange a team visit at the earliest.`;

  window.open(`https://wa.me/918875198384?text=${text}`, '_blank');
  closeBookingModal();
}

/* ==========================================================================
   8. SCROLL TO TOP
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

/* ==========================================================================
   9. RAKHI OFFER POPUP MODAL
   ========================================================================== */
function initRakhiPopup() {
  const rakhiModal = document.getElementById('rakhiModal');
  if (!rakhiModal) return;

  // Show after 1.5 seconds delay if not already shown this session
  if (!sessionStorage.getItem('rakhiPopupShown')) {
    setTimeout(() => {
      rakhiModal.classList.add('active');
      sessionStorage.setItem('rakhiPopupShown', 'true');
    }, 1500);
  }
}

window.closeRakhiModal = function() {
  const modal = document.getElementById('rakhiModal');
  if (modal) modal.classList.remove('active');
};

window.switchRakhiLang = function(lang) {
  const img = document.getElementById('rakhiImg');
  const btn = document.getElementById('rakhiBtn');
  const btnEn = document.getElementById('rakhiBtnEn');
  const btnHi = document.getElementById('rakhiBtnHi');
  if (!img || !btn || !btnEn || !btnHi) return;

  if (lang === 'en') {
    img.src = 'images/rakhi-offer-en.jpg';
    btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Book Rakhi Offer on WhatsApp';
    btn.href = 'https://wa.me/918875198384?text=Hi%20Jaipur%20Home%20Service,%20I%20want%20to%20avail%20the%20Raksha%20Bandhan%20Special%20Offer.';
    btnEn.classList.add('active');
    btnHi.classList.remove('active');
  } else {
    img.src = 'images/rakhi-offer-hi.jpg';
    btn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> WhatsApp पर बुक करें';
    btn.href = 'https://wa.me/918875198384?text=Hi%20Jaipur%20Home%20Service,%20I%20want%20to%20avail%20the%20Rakhi%20Special%20Offer%20(Hindi).';
    btnHi.classList.add('active');
    btnEn.classList.remove('active');
  }
};
