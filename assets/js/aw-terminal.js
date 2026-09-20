/* Reusable animated terminal, used on docs pages.
   Respects prefers-reduced-motion: renders the full log instantly. */
(function () {
  function startWhenNearViewport(target, start, options) {
    if (!target) return;
    options = options || {};
    var started = false;
    var rootMargin = options.rootMargin || '220px 0px';
    var timeout = options.timeout || 1800;
    var observer = null;
    var fallbackTimer = null;

    function run() {
      if (started) return;
      started = true;
      window.clearTimeout(fallbackTimer);
      window.removeEventListener('scroll', check, { passive: true });
      window.removeEventListener('resize', check);
      if (observer) observer.disconnect();
      start();
    }

    function check() {
      var rect = target.getBoundingClientRect();
      var buffer = Math.max(window.innerHeight * 0.32, 220);
      if (rect.top < window.innerHeight + buffer && rect.bottom > -buffer) run();
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) run();
      }, { threshold: 0.01, rootMargin: rootMargin });
      observer.observe(target);
    }

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    requestAnimationFrame(check);
    fallbackTimer = window.setTimeout(run, timeout);
  }

  function initAwTerminal(bodyId, script) {
    var body = document.getElementById(bodyId);
    if (!body) return;
    var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var started = false;

    function addCursor() {
      var c = document.createElement('span');
      c.className = 'aw-cursor';
      body.appendChild(c);
      return c;
    }

    function typeCmd(text, done) {
      var line = document.createElement('span');
      line.className = 'aw-tline';
      line.innerHTML = '<span class="p">$ </span>';
      body.appendChild(line);
      var cursor = addCursor();
      var i = 0;
      var timer = setInterval(function () {
        line.innerHTML = '<span class="p">$ </span>' + text.slice(0, ++i);
        body.appendChild(cursor);
        if (i >= text.length) {
          clearInterval(timer);
          cursor.remove();
          setTimeout(done, 250);
        }
      }, 90);
    }

    function play(i) {
      if (i >= script.length) { addCursor(); return; }
      var step = script[i];
      if (step.t === 'cmd') {
        typeCmd(step.text, function () { play(i + 1); });
      } else if (step.t === 'gap') {
        var blank = document.createElement('span');
        blank.className = 'aw-tline';
        blank.innerHTML = '&nbsp;';
        body.appendChild(blank);
        setTimeout(function () { play(i + 1); }, 500);
      } else {
        var line = document.createElement('span');
        line.className = 'aw-tline';
        line.style.opacity = '0';
        line.innerHTML = step.html;
        body.appendChild(line);
        requestAnimationFrame(function () {
          line.style.transition = 'opacity 0.35s ease';
          line.style.opacity = '1';
        });
        setTimeout(function () { play(i + 1); }, step.delay || 420);
      }
    }

    if (REDUCED) {
      script.forEach(function (step) {
        if (step.t === 'gap') return;
        var line = document.createElement('span');
        line.className = 'aw-tline';
        line.innerHTML = step.t === 'cmd' ? '<span class="p">$ </span>' + step.text : step.html;
        body.appendChild(line);
      });
    } else {
      startWhenNearViewport(body, function () {
        if (!started) {
          started = true;
          play(0);
        }
      }, { rootMargin: '280px 0px', timeout: 1900 });
    }
  }

  window.initAwTerminal = initAwTerminal;
})();
