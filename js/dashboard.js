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
  function loadModuleContent(moduleName, targetElement) {
    targetElement.innerHTML = '<div class="loading-spinner"></div>'; // Show a spinner
    mainTitle.textContent = moduleName;

    // Remove old module-specific scripts to avoid conflicts
    const oldScripts = document.querySelectorAll('[data-module-script]');
    oldScripts.forEach(script => script.remove());

    if (moduleName === 'Dashboard') {
      if (typeof dashboardViewHTML !== 'undefined') {
        targetElement.innerHTML = dashboardViewHTML;
      } else {
        // Fallback
      }
    } else if (moduleName === 'Agente de Facturación') {
      if (typeof billingAgentViewHTML !== 'undefined') {
        targetElement.innerHTML = billingAgentViewHTML;
      } else {
        // Fallback
      }
    } else if (moduleName === 'Agente de Clientes') {
      if (typeof clientAgentViewHTML !== 'undefined') {
        targetElement.innerHTML = clientAgentViewHTML;
      } else {
        // Fallback
      }
    } else if (moduleName === 'Agente de Marketing') {
        if (typeof marketingAgentViewHTML !== 'undefined') {
            targetElement.innerHTML = marketingAgentViewHTML;
            // Dynamically load the script for the marketing agent module
            const script = document.createElement('script');
            script.src = 'js/marketing-agent.js';
            script.setAttribute('data-module-script', 'true'); // Mark as a module script
            // Remove any old instances of the script before adding a new one
            const oldScript = document.querySelector('script[src="js/marketing-agent.js"]');
            if (oldScript) {
                oldScript.remove();
            }
            document.body.appendChild(script);
        } else {
            targetElement.innerHTML = `<div class="card"><div class="card-header"><h2>Error</h2></div><div class="card-body"><p>No se encontró la plantilla del Agente de Marketing.</p></div></div>`;
        }
    }
    else {
      targetElement.innerHTML = `<div class="card"><div class="card-header"><h2>${moduleName}</h2></div><div class="card-body"><p>Contenido para ${moduleName} irá aquí.</p></div></div>`;
    }
  }

  function handleNavLinkClick(e) {
    if (this.dataset.toggle === 'collapse') return;
    e.preventDefault();

    document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');

    const moduleName = this.dataset.module;
    if (moduleName) {
      loadModuleContent(moduleName, contentArea);
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
    loadModuleContent(initialModuleName, contentArea);
  }
});