/**
 * Brittany Chiang v4 Fallback Controller
 * Dual-Engine Auto-Detection and Interactive Handlers
 * Exclusively customized for Shreyas M Chanabasannavar
 */
(function() {
  function activateV4Fallback() {
    if (document.documentElement.classList.contains('v4-active')) return;
    
    // If on a subpage that doesn't have the fallback container in DOM, redirect to root anchor
    var v4Container = document.getElementById('v4-fallback-container');
    if (!v4Container) {
      var path = window.location.pathname.replace(/\/+$/, '');
      if (path.indexOf('about') !== -1) {
        window.location.replace('/#about');
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
    if (document.body) {
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
      document.body.style.position = 'static';
      document.body.style.height = 'auto';
      document.body.style.minHeight = '100vh';
      document.body.style.backgroundColor = '#0a192f';
    }

    // Hide Nuxt / Three.js
    var glEl = document.querySelector('.gl');
    if (glEl) glEl.style.display = 'none';
    var nuxtEl = document.getElementById('__nuxt');
    if (nuxtEl) nuxtEl.style.display = 'none';

    if (v4Container) {
      v4Container.style.display = 'block';
      v4Container.style.visibility = 'visible';
    }
  }

  // 1. Force v4 via query string or hash
  if (window.location.search.indexOf('v4') !== -1 || window.location.hash.indexOf('v4') !== -1) {
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

  // 4. Watchdog: if after 2.5 seconds canvas is missing or WebGL failed silently, activate fallback
  setTimeout(function() {
    if (!document.documentElement.classList.contains('v4-active')) {
      var canvas = document.querySelector('.gl canvas');
      if (!canvas) {
        activateV4Fallback();
      }
    }
  }, 2500);

  // 5. Interactive Tabs for Certifications
  document.addEventListener('DOMContentLoaded', function() {
    var tabBtns = document.querySelectorAll('.v4-tab-btn');
    var tabPanels = document.querySelectorAll('.v4-tab-panel');

    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var targetId = btn.getAttribute('data-tab');
        
        tabBtns.forEach(function(b) { b.classList.remove('active'); });
        tabPanels.forEach(function(p) { p.classList.remove('active'); });

        btn.classList.add('active');
        var panel = document.getElementById(targetId);
        if (panel) {
          panel.classList.add('active');
        }
      });
    });

    // Re-verify on DOM ready in case body was not available earlier
    if (document.documentElement.classList.contains('v4-active')) {
      activateV4Fallback();
    }
  });

  // Export helper globally
  window.activateV4Fallback = activateV4Fallback;
})();
