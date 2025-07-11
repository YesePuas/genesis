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

// Estilo para inputs con error
const style = document.createElement('style');
style.textContent = `
  .input-error {
    border-color: #ef4444 !important;
    background: #fff0f0 !important;
  }
`;
document.head.appendChild(style); 