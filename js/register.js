// ========== REGISTRO WIZARD (JANUS IA) ========== //

document.addEventListener('DOMContentLoaded', function () {
  // Elementos
  const form = document.querySelector('.wizard-form');
  const steps = document.querySelectorAll('.wizard-step');
  const btnSubmit = form.querySelector('button[type="submit"]');

  // Estado del wizard
  let currentStep = 0;
  let stepsCompleted = [false, false, false, false, false, false];

  // Inicializar barra de pasos
  function renderSteps() {
    steps.forEach((step, idx) => {
      step.classList.remove('step-completed', 'step-active', 'step-pending', 'completed', 'active');
      // Estado visual: solo el paso actual es activo
      if (idx === currentStep) {
        step.classList.add('step-active');
        step.querySelector('.wizard-step-icon').textContent = idx + 1;
        step.querySelector('.wizard-step-label').style.fontWeight = '700';
      } else if (stepsCompleted[idx]) {
        step.classList.add('step-completed');
        step.querySelector('.wizard-step-icon').innerHTML = '<i class="fas fa-check"></i>';
        step.querySelector('.wizard-step-label').style.fontWeight = '500';
      } else {
        step.classList.add('step-pending');
        step.querySelector('.wizard-step-icon').textContent = idx + 1;
        step.querySelector('.wizard-step-label').style.fontWeight = '500';
      }
    });
  }

  // Validación de campos del paso 1
  function validateStep1() {
    let valid = true;
    const nombre = form.nombre.value.trim();
    const apellido = form.apellido.value.trim();
    const email = form.email.value.trim();
    const telefono = form.telefono.value.trim();

    // Reset errores
    form.querySelectorAll('input').forEach(input => {
      input.classList.remove('input-error');
    });

    if (!nombre) {
      valid = false;
      form.nombre.classList.add('input-error');
    }
    if (!apellido) {
      valid = false;
      form.apellido.classList.add('input-error');
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      valid = false;
      form.email.classList.add('input-error');
    }
    if (!telefono || telefono.length < 6) {
      valid = false;
      form.telefono.classList.add('input-error');
    }
    return valid;
  }

  // Manejar submit del paso 1
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateStep1()) {
      stepsCompleted[0] = true;
      currentStep = 1;
      renderSteps();
      // Redirigir al siguiente paso
      window.location.href = 'register-step2.html';
    } else {
      renderSteps();
    }
  });

  // Inicializar: solo el paso 1 activo
  renderSteps();

  // Prevenir navegación libre por los pasos
  steps.forEach((step, idx) => {
    step.addEventListener('click', function (e) {
      e.preventDefault();
      // Solo permitir retroceder a pasos ya completados
      if (idx < currentStep && stepsCompleted[idx]) {
        currentStep = idx;
        renderSteps();
      }
    });
  });
});

// ========== LÓGICA PASO 2: VERIFICAR CÓDIGO ==========
document.addEventListener('DOMContentLoaded', function () {
  const codeInputs = document.querySelectorAll('.code-input');
  const btnContinuar = document.getElementById('btnContinuar');
  const btnRegresar = document.getElementById('btnRegresar');
  const resendLink = document.querySelector('.resend-link');
  const codeError = document.getElementById('codeError');

  if (codeInputs.length === 6) {
    // Auto-avance y solo números
    codeInputs.forEach((input, idx) => {
      input.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value && idx < codeInputs.length - 1) {
          codeInputs[idx + 1].focus();
        }
        checkCodeComplete();
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !this.value && idx > 0) {
          codeInputs[idx - 1].focus();
        }
      });
    });

    function checkCodeComplete() {
      const code = Array.from(codeInputs).map(i => i.value).join('');
      
      if (code.length === 6 && /^[0-9]{6}$/.test(code)) {
        // Validar código automáticamente
        validateCode(code);
      } else {
        // Reset estado
        btnContinuar.disabled = true;
        btnContinuar.classList.add('btn-disabled');
        btnContinuar.classList.remove('btn-primary');
        hideError();
      }
    }

    function validateCode(code) {
      // Simular validación del código (en producción esto sería una llamada al servidor)
      // Por ahora, consideramos válido cualquier código que termine en '123'
      const isValid = code.endsWith('123');
      
      if (isValid) {
        // Código válido
        btnContinuar.disabled = false;
        btnContinuar.classList.remove('btn-disabled');
        btnContinuar.classList.add('btn-primary');
        hideError();
        
        // Auto-avanzar después de un breve delay
        setTimeout(() => {
          advanceToNextStep();
        }, 1000);
      } else {
        // Código inválido
        btnContinuar.disabled = true;
        btnContinuar.classList.add('btn-disabled');
        btnContinuar.classList.remove('btn-primary');
        showError();
        
        // Limpiar campos para nuevo intento
        setTimeout(() => {
          codeInputs.forEach(input => {
            input.value = '';
          });
          codeInputs[0].focus();
        }, 2000);
      }
    }

    function showError() {
      if (codeError) {
        codeError.style.display = 'flex';
        // Agregar shake animation
        codeError.style.animation = 'shake 0.5s ease-in-out';
      }
    }

    function hideError() {
      if (codeError) {
        codeError.style.display = 'none';
        codeError.style.animation = '';
      }
    }

    function advanceToNextStep() {
      // Aquí irías al siguiente paso del wizard
      console.log('Código válido, avanzando al siguiente paso...');
      // window.location.href = 'register-step3.html';
    }

    // Inicializar estado
    checkCodeComplete();
  }

  // Regresar al paso anterior
  if (btnRegresar) {
    btnRegresar.addEventListener('click', function () {
      window.location.href = 'register-step1.html';
    });
  }

  // Simular reenviar código
  if (resendLink) {
    resendLink.addEventListener('click', function (e) {
      e.preventDefault();
      resendLink.textContent = 'Código reenviado!';
      resendLink.style.pointerEvents = 'none';
      setTimeout(() => {
        resendLink.textContent = 'Reenviar código';
        resendLink.style.pointerEvents = '';
      }, 2500);
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const stepper = document.getElementById('wizardStepper');
  if (!stepper) return;
  const steps = stepper.querySelectorAll('.wizard-step');
  const currentStep = parseInt(document.body.getAttribute('data-step'), 10);

  steps.forEach((step, idx) => {
    const icon = step.querySelector('.wizard-step-icon');
    const label = step.querySelector('.wizard-step-label');
    // Limpia clases previas
    step.classList.remove('step-completed', 'step-active', 'step-pending');
    icon.innerHTML = (idx + 1).toString();

    if (idx + 1 < currentStep) {
      step.classList.add('step-completed');
      icon.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
      step.setAttribute('aria-label', `Paso ${idx + 1} completado: ${label.textContent}`);
    } else if (idx + 1 === currentStep) {
      step.classList.add('step-active');
      step.setAttribute('aria-label', `Paso ${idx + 1} activo: ${label.textContent}`);
    } else {
      step.classList.add('step-pending');
      step.setAttribute('aria-label', `Paso ${idx + 1} pendiente: ${label.textContent}`);
    }
  });
});

// Estilo para inputs con error
const style = document.createElement('style');
style.textContent = `
  .input-error {
    border-color: #ef4444 !important;
    background: #fff0f0 !important;
  }
`;
document.head.appendChild(style);

// ========== LÓGICA PASO 3: INFORMACIÓN DE LA EMPRESA ==========
document.addEventListener('DOMContentLoaded', function () {
  if (document.body.getAttribute('data-step') !== '3') return;

  const form = document.getElementById('empresaForm');
  const btnContinuar = document.getElementById('btnContinuar');
  
  const requiredFields = [
    'nombreEmpresa',
    'nitEmpresa',
    'direccionEmpresa',
    'departamentoEmpresa',
    'ciudadEmpresa',
    'telefonoEmpresa'
  ];

  let formSubmitted = false;

  function validateField(id) {
    const el = document.getElementById(id);
    if (!el) return true;

    if (formSubmitted && !el.value.trim()) {
      el.classList.add('input-error');
      return false;
    } else {
      el.classList.remove('input-error');
      return true;
    }
  }

  function checkFormValidity() {
    let allValid = true;
    requiredFields.forEach(id => {
      const el = document.getElementById(id);
      if (!el || !el.value.trim()) {
        allValid = false;
      }
      if (formSubmitted) {
        validateField(id);
      }
    });

    btnContinuar.disabled = !allValid;
    btnContinuar.classList.toggle('btn-disabled', !allValid);
    btnContinuar.classList.toggle('btn-primary', allValid);
  }

  form.addEventListener('input', checkFormValidity);
  form.addEventListener('change', checkFormValidity);

  document.getElementById('btnRegresar').onclick = function () {
    window.location.href = 'register-step2.html';
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    formSubmitted = true;
    
    checkFormValidity();

    if (!btnContinuar.disabled) {
      console.log('Formulario válido, continuando al siguiente paso.');
      window.location.href = 'register-step4.html';
    }
  });

  checkFormValidity();
});

// ========== LÓGICA PASO 4: SELECCIÓN DE SERVICIOS ==========
document.addEventListener('DOMContentLoaded', function () {
  if (document.body.getAttribute('data-step') !== '4') return;

  const form = document.getElementById('serviciosForm');
  const btnContinuar = document.getElementById('btnContinuar');
  const serviceCards = form.querySelectorAll('.service-card');

  function checkSelection() {
    const selectedServices = form.querySelectorAll('input[name="servicios"]:checked').length;
    if (selectedServices > 0) {
      btnContinuar.disabled = false;
      btnContinuar.classList.remove('btn-disabled');
      btnContinuar.classList.add('btn-primary');
    } else {
      btnContinuar.disabled = true;
      btnContinuar.classList.add('btn-disabled');
      btnContinuar.classList.remove('btn-primary');
    }
  }

  serviceCards.forEach(card => {
    card.addEventListener('click', function () {
      const checkbox = this.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;
      this.classList.toggle('selected', checkbox.checked);
      checkSelection();
    });
  });

  document.getElementById('btnRegresar').onclick = function () {
    window.location.href = 'register-step3.html';
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!btnContinuar.disabled) {
      window.location.href = 'register-step5.html';
    }
  });

  checkSelection();
});

// ========== LÓGICA PASO 5: RESUMEN DEL PLAN ==========
document.addEventListener('DOMContentLoaded', function () {
  if (document.body.getAttribute('data-step') !== '5') return;

  const services = {
    marketing: { name: "Marketing Inteligente", price: 25, icon: "fa-bullhorn" },
    facturacion: { name: "Facturación Electrónica", price: 20, icon: "fa-file-invoice-dollar" },
    agenda: { name: "Agenda y Recordatorios", price: 15, icon: "fa-calendar-alt" },
    chatbot: { name: "Chatbot Multicanal", price: 30, icon: "fa-comments" },
    reportes: { name: "Reportes de Productividad", price: 35, icon: "fa-chart-line" },
    crm: { name: "CRM Inteligente", price: 40, icon: "fa-users-cog" },
  };

  const selectedServices = JSON.parse(localStorage.getItem('selectedServices')) || ["marketing", "facturacion"];
  const servicesListContainer = document.querySelector(".plan-services-list");
  const subtotalEl = document.getElementById("summarySubtotal");
  const impuestosEl = document.getElementById("summaryImpuestos");
  const totalEl = document.getElementById("summaryTotal");
  const couponInput = document.getElementById("couponCode");
  const applyCouponBtn = document.getElementById("btnAplicarCupon");
  const couponMessageEl = document.getElementById("couponMessage");

  function renderServices() {
    let subtotal = 0;
    selectedServices.forEach(serviceKey => {
      const service = services[serviceKey];
      subtotal += service.price;
      const serviceElement = document.createElement("div");
      serviceElement.classList.add("service-item");
      serviceElement.innerHTML = `
        <div class="service-item-icon"><i class="fas ${service.icon}"></i></div>
        <div class="service-item-details">
          <div class="service-item-name">${service.name}</div>
          <div class="service-item-description">Descripción breve del servicio.</div>
        </div>
        <div class="service-item-price">${service.price}/mes</div>
      `;
      servicesListContainer.appendChild(serviceElement);
    });
    updateSummary(subtotal);
  }

  function updateSummary(subtotal, discount = 0) {
    const impuestos = subtotal * 0.19;
    const total = subtotal + impuestos - discount;
    subtotalEl.textContent = `${subtotal.toFixed(2)}`;
    impuestosEl.textContent = `${impuestos.toFixed(2)}`;
    totalEl.textContent = `${total.toFixed(2)}`;
  }

  applyCouponBtn.addEventListener("click", () => {
    const couponCode = couponInput.value.trim().toUpperCase();
    if (couponCode === "DESCUENTO20") {
      const subtotal = selectedServices.reduce((acc, key) => acc + services[key].price, 0);
      const discount = subtotal * 0.20;
      updateSummary(subtotal, discount);
      couponMessageEl.textContent = "Cupón aplicado con éxito!";
      couponMessageEl.style.color = "green";
    } else {
      couponMessageEl.textContent = "Cupón no válido";
      couponMessageEl.style.color = "red";
    }
  });

  document.getElementById('btnRegresar').onclick = function () {
    window.location.href = 'register-step4.html';
  };

  document.getElementById('btnContinuar').onclick = function () {
    window.location.href = 'register-step6.html';
  };

  renderServices();
}); 