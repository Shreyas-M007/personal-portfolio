/**
 * Brittany Chiang v4 Fallback Controller
 * Dual-Engine Auto-Detection, Scroll Animations, and Interactive Handlers
 * Exclusively customized for Shreyas M Chanabasannavar
 */
(function() {
  function initScrollReveal() {
    var revealElements = document.querySelectorAll('.v4-reveal');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(function(el) { el.classList.add('is-revealed'); });
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -20px 0px',
      threshold: 0.05
    });

    revealElements.forEach(function(el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 80 && rect.bottom > 0) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });
  }

  var nativeScrollEnabled = false;
  function enableNativeScroll() {
    if (nativeScrollEnabled) return;
    nativeScrollEnabled = true;

    // In Chrome/macOS, prevent any external scripts from blocking natural mousewheel or touch scrolling
    window.addEventListener('wheel', function(e) {
      e.stopImmediatePropagation();
    }, { capture: true, passive: true });

    window.addEventListener('touchmove', function(e) {
      e.stopImmediatePropagation();
    }, { capture: true, passive: true });
  }

  function activateV4Fallback() {
    // If on a subpage that doesn't have the fallback container in DOM, redirect to root anchor
    var v4Container = document.getElementById('v4-fallback-container');
    if (!v4Container) {
      var path = window.location.pathname.replace(/\/+$/, '');
      if (path.indexOf('about') !== -1) {
        window.location.replace('/#about');
        return;
      } else if (path.indexOf('education') !== -1 || path.indexOf('academic') !== -1) {
        window.location.replace('/#education');
        return;
      } else if (path.indexOf('certifications') !== -1) {
        window.location.replace('/#certifications');
        return;
      } else if (path.indexOf('project') !== -1 || path.indexOf('full') !== -1) {
        window.location.replace('/#work');
        return;
      } else if (path !== '') {
        window.location.replace('/');
        return;
      }
    }

    document.documentElement.classList.add('v4-active');
    document.documentElement.classList.remove('grabbable', 'grabbing');
    
    // Allow natural page scrolling
    document.documentElement.style.overflowY = 'auto';
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.position = 'static';
    document.documentElement.style.height = 'auto';
    document.documentElement.style.minHeight = '100%';

    if (document.body) {
      document.body.style.overflow = 'visible';
      document.body.style.overflowY = 'visible';
      document.body.style.overflowX = 'hidden';
      document.body.style.position = 'static';
      document.body.style.height = 'auto';
      document.body.style.minHeight = '100vh';
      document.body.style.touchAction = 'auto';
      document.body.style.backgroundColor = '#0a192f';
    }

    // Stop Nuxt/Three.js from intercepting wheel/touch events in Chrome
    enableNativeScroll();

    // Hide Nuxt / Three.js / Vue teleports
    var glEl = document.querySelector('.gl');
    if (glEl) glEl.style.display = 'none';
    var nuxtEl = document.getElementById('__nuxt');
    if (nuxtEl) nuxtEl.style.display = 'none';
    var teleportsEl = document.getElementById('teleports');
    if (teleportsEl) teleportsEl.style.display = 'none';

    // Guard against dynamically mounted teleports
    if (typeof MutationObserver !== 'undefined' && document.body) {
      var telObserver = new MutationObserver(function() {
        var tel = document.getElementById('teleports');
        if (tel) tel.style.display = 'none';
      });
      telObserver.observe(document.body, { childList: true });
    }

    if (v4Container) {
      v4Container.style.display = 'block';
      v4Container.style.visibility = 'visible';
    }

    // Preloader animation lifecycle (Brittany Chiang v4 entry sequence)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleLoaderTransition);
    } else {
      handleLoaderTransition();
    }

    initScrollReveal();
  }

  var loaderHandled = false;
  function handleLoaderTransition() {
    if (loaderHandled) return;
    var loader = document.getElementById('v4-loader');
    if (!loader) {
      if (document.readyState === 'loading') return;
      document.documentElement.classList.add('v4-loaded');
      return;
    }
    loaderHandled = true;

    // Brittany Chiang signature hexagon preloader sequence:
    // 0s-1.15s: Hexagon perimeter draws in teal #64ffda
    // 0.65s-1.1s: Monogram "S" fades in
    // 1.35s: Loader smoothly fades out and hero elements slide in
    setTimeout(function() {
      loader.classList.add('v4-loader-hidden');
      document.documentElement.classList.add('v4-loaded');
      setTimeout(function() {
        loader.style.display = 'none';
      }, 500);
    }, 1350);
  }

  // 1. Force v4 via pre-tagging, query string, hash, mobile, or Windows detection
  var ua = navigator.userAgent || '';
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
                 || (window.innerWidth <= 820)
                 || (navigator.maxTouchPoints > 1 && window.innerWidth <= 1024);
  var isWindows = /Windows|Win32|Win64/i.test(ua) || /Win/i.test(navigator.platform || '');

  if (document.documentElement.classList.contains('v4-active') || isMobile || isWindows || window.location.search.indexOf('v4') !== -1 || window.location.hash.indexOf('v4') !== -1) {
    activateV4Fallback();
  }

  // 2. Hardware / GPU capability check
  try {
    var c = document.createElement('canvas');
    var gl = c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl');
    if (!gl || gl.isContextLost()) {
      activateV4Fallback();
    } else {
      var w = gl.drawingBufferWidth;
      var h = gl.drawingBufferHeight;
      if (!w || !h || gl.isContextLost()) {
        activateV4Fallback();
      }
    }
  } catch (e) {
    activateV4Fallback();
  }

  // 3. Listen for WebGL context loss or unhandled shader errors
  window.addEventListener('webglcontextlost', function(e) {
    activateV4Fallback();
  }, true);

  window.addEventListener('error', function(e) {
    var msg = (e && e.message) ? e.message : '';
    if (msg.indexOf('WebGL') !== -1 || msg.indexOf('getContext') !== -1 || msg.indexOf('Shader') !== -1 || msg.indexOf('renderer') !== -1) {
      activateV4Fallback();
    }
  }, true);

  // 4. Watchdog: if after 1.2 seconds canvas is missing or WebGL failed silently, activate fallback
  setTimeout(function() {
    if (!document.documentElement.classList.contains('v4-active')) {
      var canvas = document.querySelector('.gl canvas');
      if (!canvas || canvas.width <= 0 || canvas.height <= 0) {
        activateV4Fallback();
      }
    }
  }, 1200);

  // 5. Scoped Interactive Tabs & DOM Ready Handlers
  function onDomReady() {
    if (document.documentElement.classList.contains('v4-active')) {
      activateV4Fallback();
      handleLoaderTransition();
      initScrollReveal();
    }

    // Isolate tabs by their container so Education and Certifications don't conflict
    var tabContainers = document.querySelectorAll('.v4-tabs-container');
    tabContainers.forEach(function(container) {
      var tabBtns = container.querySelectorAll('.v4-tab-btn');
      var tabPanels = container.querySelectorAll('.v4-tab-panel');

      tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var targetId = btn.getAttribute('data-tab');
          
          tabBtns.forEach(function(b) { b.classList.remove('active'); });
          tabPanels.forEach(function(p) { p.classList.remove('active'); });

          btn.classList.add('active');
          var panel = container.querySelector('#' + targetId);
          if (panel) {
            panel.classList.add('active');
          }
        });
      });
    });

    // Handle smooth scrolling for all anchor navigation links
    document.addEventListener('click', function(e) {
      if (!document.documentElement.classList.contains('v4-active')) return;
      var a = e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href');
      if (href && href.charAt(0) === '#' && href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      }
    });

    // Handle initial hash scroll if present
    if (window.location.hash) {
      setTimeout(function() {
        var target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          if (target.classList.contains('v4-reveal')) {
            target.classList.add('is-revealed');
          }
        }
      }, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onDomReady);
  } else {
    onDomReady();
  }

  window.addEventListener('load', function() {
    if (document.documentElement.classList.contains('v4-active')) {
      initScrollReveal();
    }
  });

  // Export helpers globally
  window.activateV4Fallback = activateV4Fallback;
  window.initScrollReveal = initScrollReveal;
})();
