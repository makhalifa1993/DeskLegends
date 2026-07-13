/* ==================== DESKLEGENDS — MAIN JS ==================== */

(function () {
  'use strict';

  /* -------------------- SMOOTH SCROLL -------------------- */
  document.querySelectorAll('[data-scroll]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    });
  });

  document.querySelectorAll('[data-scroll-target]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.querySelector(this.getAttribute('data-scroll-target'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* -------------------- NAVBAR SCROLL EFFECT -------------------- */
  var navbar = document.getElementById('navbar');
  var scrollY = 0;
  var ticking = false;

  function onScroll() {
    scrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(function () {
        if (scrollY > 60) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function updateParallax() {
    var glow1 = document.getElementById('heroGlow1');
    var glow2 = document.getElementById('heroGlow2');
    if (glow1) glow1.style.transform = 'translate(-50%, -50%) translateY(' + (scrollY * 0.15) + 'px)';
    if (glow2) glow2.style.transform = 'translate(-50%, -50%) translateY(' + (scrollY * 0.25) + 'px)';
  }

  /* -------------------- MOBILE MENU -------------------- */
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var menuOpen = false;

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    menuOpen = true;
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    menuOpen = false;
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    if (menuOpen) closeMobileMenu();
    else openMobileMenu();
  });

  /* -------------------- HERO STAGE SEQUENCE -------------------- */
  var stages = [
    document.getElementById('stage0'),
    document.getElementById('stage1'),
    document.getElementById('stage2'),
    document.getElementById('stage3'),
  ];
  var heroScroll = document.getElementById('heroScroll');
  var currentStage = 0;

  function showStage(index) {
    stages.forEach(function (s, i) {
      if (i === index) s.classList.add('active');
      else s.classList.remove('active');
    });
    currentStage = index;
  }

  // Start the sequence
  setTimeout(function () { showStage(1); }, 2000);
  setTimeout(function () {
    // Animate moment pills
    var pills = document.querySelectorAll('.hero-moment-pill');
    pills.forEach(function (pill, i) {
      setTimeout(function () {
        pill.classList.add('visible');
      }, i * 120);
    });
  }, 2600);
  setTimeout(function () { showStage(2); }, 5000);
  setTimeout(function () { showStage(3); }, 7500);

  /* -------------------- SCROLL REVEAL -------------------- */
  var revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
    });

    revealElements.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: just show everything
    revealElements.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* -------------------- CONFIGURATOR -------------------- */
  var configState = {
    story: 'Career Milestone',
    style: 'Classic',
    pose: 'Standing Proud',
  };

  var configStoryEl = document.getElementById('configStory');
  var configMetaEl = document.getElementById('configMeta');

  function updateConfigPreview() {
    configStoryEl.textContent = configState.story;
    configMetaEl.innerHTML = configState.style + ' &middot; ' + configState.pose;
  }

  document.querySelectorAll('[data-config-group]').forEach(function (group) {
    var groupType = group.getAttribute('data-config-group');
    var buttons = group.querySelectorAll('button');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        configState[groupType] = btn.getAttribute('data-value');
        updateConfigPreview();
      });
    });
  });

  /* -------------------- FAQ ACCORDION -------------------- */
  var faqButtons = document.querySelectorAll('[data-faq]');

  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.parentElement;
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(function (fi) {
        fi.classList.remove('open');
        fi.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Open first FAQ by default
  var firstFaq = document.querySelector('.faq-item');
  if (firstFaq) {
    firstFaq.classList.add('open');
    var firstAnswer = firstFaq.querySelector('.faq-answer');
    firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
  }

  /* -------------------- MILESTONE PILLS (FORM) -------------------- */
  var milestonePills = document.querySelectorAll('#milestonePills .form-pill');
  var selectedMilestone = '';

  milestonePills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      milestonePills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');
      selectedMilestone = pill.getAttribute('data-value');
    });
  });

  /* -------------------- COMMISSION FORM -------------------- */
  var form = document.getElementById('commissionForm');
  var successDiv = document.getElementById('commissionSuccess');
  var successText = document.getElementById('successText');
  var resetBtn = document.getElementById('resetForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nameInput = form.querySelector('[name="name"]');
    var name = nameInput ? nameInput.value : '';
    successText.textContent =
      'Thank you, ' + (name || 'friend') + ". We'll be in touch soon to begin crafting your collectible. Welcome to DeskLegends.";
    form.hidden = true;
    successDiv.hidden = false;
  });

  resetBtn.addEventListener('click', function () {
    form.reset();
    milestonePills.forEach(function (p) { p.classList.remove('active'); });
    selectedMilestone = '';
    form.hidden = false;
    successDiv.hidden = true;
  });

  /* -------------------- FOOTER YEAR -------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
