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