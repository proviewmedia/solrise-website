// Cookie notice for Google Analytics. Analytics cookies stay off until the
// visitor accepts (Google consent mode); the choice is remembered on this
// device and can be changed from the "Cookie settings" link in the footer.
(function () {
  var KEY = 'solrise-analytics-consent';

  function choice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function save(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: value === 'granted' ? 'granted' : 'denied' });
    }
  }

  function showBanner() {
    if (document.getElementById('consent-banner')) return;
    var banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie notice');
    banner.innerHTML =
      '<p>We use Google Analytics cookies to see which pages are useful, if you allow it. ' +
      'The Solrise app itself has no tracking. <a href="' + privacyLink() + '">Privacy policy</a></p>' +
      '<div class="consent-actions">' +
      '<button type="button" class="btn ghost" data-choice="denied">Decline</button>' +
      '<button type="button" class="btn" data-choice="granted">Accept</button>' +
      '</div>';
    banner.addEventListener('click', function (event) {
      var value = event.target && event.target.getAttribute('data-choice');
      if (!value) return;
      save(value);
      banner.remove();
    });
    document.body.appendChild(banner);
  }

  function privacyLink() {
    return location.pathname.indexOf('/learn/') !== -1 ? '../privacy.html#website' : 'privacy.html#website';
  }

  function addSettingsLink() {
    var nav = document.querySelector('footer nav');
    if (!nav) return;
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = 'Cookie settings';
    link.addEventListener('click', function (event) {
      event.preventDefault();
      showBanner();
    });
    nav.appendChild(link);
  }

  addSettingsLink();
  if (!choice()) showBanner();
})();
