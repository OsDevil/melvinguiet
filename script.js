(function () {

  // ── COPY TO CLIPBOARD ──
  document.querySelectorAll('[data-copy]').forEach(function (el) {
    el.addEventListener('click', function () {
      var text = el.dataset.copy;
      var msg  = el.dataset.toast || 'Copié !';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () { showToast(msg); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(msg);
      }
    });
  });

  // ── VIDEO MODAL ──
  var modal  = document.getElementById('video-modal');
  var iframe = document.getElementById('modal-iframe');

  document.querySelectorAll('[data-video]').forEach(function (el) {
    el.addEventListener('click', function () { openVideo(el.dataset.video); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVideo(el.dataset.video); }
    });
  });

  function openVideo(id) {
    iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    iframe.src = '';
    document.body.style.overflow = '';
  }

  document.querySelector('.modal-overlay').addEventListener('click', closeModal);
  document.querySelector('.modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // ── TOAST ──
  var toastTimer;
  function showToast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.remove('hidden', 'fade-out');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.classList.add('fade-out');
      setTimeout(function () { t.classList.add('hidden'); }, 320);
    }, 2000);
  }

  // ── AUTO-HIDE NAV ON MOBILE SCROLL ──
  var nav = document.querySelector('.top-nav');
  var lastY = 0;
  window.addEventListener('scroll', function () {
    if (window.innerWidth >= 768) {
      nav.classList.remove('nav-hidden');
      return;
    }
    var y = window.scrollY;
    if (y > lastY && y > 60) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastY = y;
  }, { passive: true });

})();
