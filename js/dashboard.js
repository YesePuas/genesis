document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mainTitle = document.getElementById('mainTitle');
  const contentArea = document.getElementById('contentArea');
  const categoryLinks = document.querySelectorAll('.nav-category-link');

  // --- DATA SIMULATION ---
  // In a real application, this would come from the server
  const availableModules = {
    marketing: { name: "Módulo de Marketing", icon: "fa-bullhorn", slug: "marketing" },
    facturacion: { name: "Módulo de Facturación", icon: "fa-file-invoice-dollar", slug: "billing" },
    agenda: { name: "Módulo de Agenda", icon: "fa-calendar-alt", slug: "agenda" },
    chatbot: { name: "Módulo de Chatbot", icon: "fa-comments", slug: "chatbot" },
    reportes: { name: "Módulo de Reportes", icon: "fa-chart-line", slug: "reports" },
    crm: { name: "Módulo de CRM", icon: "fa-users-cog", slug: "crm" },
  };

  const userEnabledModules = ["marketing", "facturacion", "reportes"]; // Example

  function renderDynamicModules() {
    const placeholder = document.getElementById('dynamic-modules-placeholder');
    if (!placeholder) return;

    const fragment = document.createDocumentFragment();

    userEnabledModules.forEach(moduleKey => {
      const moduleData = availableModules[moduleKey];
      if (moduleData) {
        const li = document.createElement('li');
        li.className = 'nav-item';
        li.innerHTML = `
          <a href="#" class="nav-link" data-module="${moduleData.name}">
            <i class="nav-icon fas ${moduleData.icon}"></i>
            <span>${moduleData.name}</span>
          </a>
        `;
        fragment.appendChild(li);
      }
    });

    placeholder.after(fragment);
  }

  // Initial render of dynamic modules
  renderDynamicModules();

  // Re-select navLinks after dynamic creation
  const navLinks = document.querySelectorAll('.nav-link');

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
        this.classList.toggle('collapsed');
        if (targetMenu.style.maxHeight) {
          targetMenu.style.maxHeight = null;
        } else {
          targetMenu.style.maxHeight = targetMenu.scrollHeight + "px";
        }
      }
    });
  });

  function handleNavLinkClick(e) {
      e.preventDefault();

      // Deactivate all links
      document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));

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
  }

  // Attach event listeners to all nav links (static and dynamic)
  document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
  });


  // Set initial active link and content
  const firstLink = document.querySelector('.nav-menu .nav-item .nav-link');
  if(firstLink) {
    firstLink.classList.add('active');
    const initialModuleName = firstLink.dataset.module || 'Bienvenido a Genesix';
    mainTitle.textContent = initialModuleName;
    contentArea.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h2>${initialModuleName}</h2>
        </div>
        <div class="card-body">
          <p>Contenido para ${initialModuleName} irá aquí.</p>
        </div>
      </div>
    `;
  }
  
  // Initialize collapsible menus
  document.querySelectorAll('.nav-submenu.collapse:not(.show)').forEach(menu => {
      menu.style.maxHeight = '0px';
  });
   document.querySelectorAll('.nav-submenu.collapse.show').forEach(menu => {
      menu.style.maxHeight = menu.scrollHeight + 'px';
  });

});
