document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mainTitle = document.getElementById('mainTitle');
  const contentArea = document.getElementById('contentArea');
  const navLinks = document.querySelectorAll('.nav-link');
  const categoryLinks = document.querySelectorAll('.nav-category-link');

  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(event) {
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
        targetMenu.classList.toggle('show');
        this.classList.toggle('collapsed');
      }
    });
  });

  // Handle navigation clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      // Deactivate all links
      navLinks.forEach(nav => nav.classList.remove('active'));

      // Activate the clicked link
      this.classList.add('active');

      const moduleName = this.dataset.module;
      if (moduleName) {
        mainTitle.textContent = moduleName;
        contentArea.innerHTML = `
          <div class="card">
            <div class="card-header">
              <h2>${moduleName}</h2>
            </div>
            <div class="card-body">
              <p>Contenido para ${moduleName} irá aquí.</p>
            </div>
          </div>
        `;
      }

      // Close sidebar on mobile after click
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
      }
    });
  });

  // Set initial active link
  const firstLink = document.querySelector('.nav-menu .nav-item .nav-link');
  if(firstLink) {
    firstLink.classList.add('active');
    mainTitle.textContent = firstLink.dataset.module || 'Bienvenido a Genesix';
    contentArea.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h2>${firstLink.dataset.module || 'Bienvenido'}</h2>
        </div>
        <div class="card-body">
          <p>Contenido para ${firstLink.dataset.module || 'el módulo de bienvenida'} irá aquí.</p>
        </div>
      </div>
    `;
  }
});
