// Navbar responsive drawer logic (PROFESSIONAL REWRITE)
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.getElementById('navbarBurger');
  const drawer = document.getElementById('navbarDrawer');
  const overlay = document.getElementById('navbarOverlay');
  const drawerLinks = drawer ? drawer.querySelectorAll('a') : [];

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (burger && drawer && overlay) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
    overlay.addEventListener('click', closeDrawer);
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeDrawer();
      }
    });
  }
}); 