document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mainTitle = document.getElementById('mainTitle');
  const contentArea = document.getElementById('contentArea');
  const categoryLinks = document.querySelectorAll('.nav-category-link[data-toggle="collapse"]');

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(event) {
    if (!sidebar || !mobileMenuToggle) return;
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target) || mobileMenuToggle === event.target;

    if (sidebar.classList.contains('open') && !isClickInsideSidebar && !isClickOnToggle) {
      sidebar.classList.remove('open');
    }
  });

  // Handle category collapse
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.dataset.target;
      const targetMenu = document.querySelector(targetId);

      if (targetMenu) {
        const isShown = targetMenu.classList.contains('show');
        this.classList.toggle('open', !isShown);
        targetMenu.classList.toggle('show', !isShown);
        if (!isShown) {
          targetMenu.style.maxHeight = targetMenu.scrollHeight + 'px';
        } else {
          targetMenu.style.maxHeight = '0px';
        }
      }
    });
  });

  // Initialize menus on load
  document.querySelectorAll('.nav-submenu.collapse').forEach(menu => {
    const link = document.querySelector(`[data-target="#${menu.id}"]`);
    if (menu.classList.contains('show')) {
      if (link) link.classList.add('open');
      menu.style.maxHeight = menu.scrollHeight + 'px';
    } else {
      if (link) link.classList.remove('open');
      menu.style.maxHeight = '0px';
    }
  });

  // --- Content Loading Logic ---
  function handleNavLinkClick(e) {
    if (this.dataset.toggle === 'collapse') return;
    e.preventDefault();

    document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');

    const moduleName = this.dataset.module;
    if (moduleName) {
      loadModule(moduleName); // This function is in dashboard-view.js
    }

    if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
    }
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', handleNavLinkClick);
  });
  
  // --- Set Initial Page State ---
  const firstLink = document.querySelector('.nav-menu .nav-item .nav-link:not(.nav-category-link)');
  if (firstLink) {
    firstLink.classList.add('active');
    const initialModuleName = firstLink.dataset.module || 'Bienvenido a Genesix';
    loadModule(initialModuleName);
  }
});