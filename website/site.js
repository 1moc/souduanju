(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function () {
    setOpen(!nav.classList.contains('is-open'));
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setOpen(false);
      if (nav.contains(document.activeElement)) toggle.focus();
    }
  });

  var releasePage = 'https://github.com/1moc/souduanju/releases/latest';
  var assetLinks = document.querySelectorAll('[data-asset]');
  if (assetLinks.length && typeof fetch === 'function') {
    fetch('https://api.github.com/repos/1moc/souduanju/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' }
    }).then(function (response) {
      if (!response.ok) throw new Error('release unavailable');
      return response.json();
    }).then(function (release) {
      var assets = Array.isArray(release.assets) ? release.assets : [];
      assetLinks.forEach(function (link) {
        var suffix = link.getAttribute('data-asset');
        var asset = assets.find(function (item) {
          return item && item.state === 'uploaded' && typeof item.name === 'string' && item.name.endsWith(suffix);
        });
        if (!asset || !asset.browser_download_url) return;
        link.href = asset.browser_download_url;
        var caption = link.querySelector('small');
        if (caption) caption.textContent = asset.name;
      });
    }).catch(function () {
      assetLinks.forEach(function (link) {
        if (!link.getAttribute('href')) link.href = releasePage;
      });
    });
  }

  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
