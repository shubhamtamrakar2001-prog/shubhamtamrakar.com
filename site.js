(function () {
  var root = document.documentElement;

  function savedTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  // Dark / light toggle
  var box = document.getElementById('color-mode');
  var label = document.querySelector('.toggle-label');
  if (box) {
    box.checked = root.getAttribute('data-theme') === 'dark';
    box.addEventListener('change', function () {
      var theme = box.checked ? 'dark' : 'light';
      root.setAttribute('data-theme', theme);
      try { localStorage.setItem('theme', theme); } catch (e) {}
    });
    // Enable the knob animation only after first paint, so it doesn't slide on load
    if (label) setTimeout(function () { label.classList.add('has-transition'); }, 100);
  }

  // Follow the OS setting until the visitor picks a theme themselves
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  if (mq.addEventListener) {
    mq.addEventListener('change', function (e) {
      if (savedTheme()) return;
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      if (box) box.checked = e.matches;
    });
  }

  // "More" link on the intro (phones only)
  var more = document.querySelector('.intro-more');
  if (more) {
    more.addEventListener('click', function () {
      document.querySelector('.intro').classList.add('is-open');
    });
  }
})();
