// Mobile menu. Without this script, phones show the links as a
// scrolling row instead, so every section stays reachable.
(function () {
  var header = document.querySelector('.nav');
  var button = header && header.querySelector('.menu-btn');
  var nav = header && header.querySelector('#site-nav');
  if (!button || !nav) return;
  document.documentElement.classList.add('has-menu');

  function setOpen(open, returnFocus) {
    header.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    button.querySelector('span').textContent = open ? 'Close' : 'Menu';
    document.documentElement.classList.toggle('menu-open', open);
    if (open) {
      var first = nav.querySelector('a');
      if (first) first.focus();
    } else if (returnFocus) {
      button.focus();
    }
  }

  button.addEventListener('click', function () {
    setOpen(!header.classList.contains('is-open'), true);
  });

  // A link closes the menu so an anchor jump lands where it should.
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false, false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('is-open')) setOpen(false, true);
  });

  document.addEventListener('click', function (e) {
    if (header.classList.contains('is-open') && !header.contains(e.target)) setOpen(false, false);
  });

  // Back to a wide window: the menu is just the link row again.
  window.matchMedia('(min-width: 861px)').addEventListener('change', function (m) {
    if (m.matches) setOpen(false, false);
  });
})();
