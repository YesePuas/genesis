// Elementos DOM
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const rememberMeCheckbox = document.getElementById('rememberMe');
const loginBtn = document.querySelector('.login-btn');
const googleBtn = document.querySelector('.google-btn');
const facebookBtn = document.querySelector('.facebook-btn');
const forgotPasswordLink = document.querySelector('.forgot-password');
const signupLink = document.querySelector('.signup-link a');

// Estado de la aplicación
let isPasswordVisible = false;
let isFormSubmitting = false;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setupFormValidation();
    loadSavedCredentials();
    addParticleEffect();
    addRippleEffect();
});

// Configurar event listeners
function setupEventListeners() {
    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
    
    // Form submission
    loginForm.addEventListener('submit', handleLoginSubmit);
    
    // Social login buttons
    googleBtn.addEventListener('click', handleGoogleLogin);
    facebookBtn.addEventListener('click', handleFacebookLogin);
    
    // Links
    forgotPasswordLink.addEventListener('click', handleForgotPassword);
    signupLink.addEventListener('click', handleSignup);
    
    // Input focus effects
    emailInput.addEventListener('focus', handleInputFocus);
    emailInput.addEventListener('blur', handleInputBlur);
    passwordInput.addEventListener('focus', handleInputFocus);
    passwordInput.addEventListener('blur', handleInputBlur);
    
    // Real-time validation
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Add hover effects for social buttons
    [googleBtn, facebookBtn].forEach(btn => {
        btn.addEventListener('mouseenter', addSocialButtonHover);
        btn.addEventListener('mouseleave', removeSocialButtonHover);
    });
    
    // Add typing effect to header
    addTypingEffect();
}

// Toggle password visibility with enhanced animation
function togglePasswordVisibility() {
    isPasswordVisible = !isPasswordVisible;
    
    // Add ripple effect
    addRippleToButton(togglePasswordBtn);
    
    const icon = togglePasswordBtn.querySelector('i');
    if (isPasswordVisible) {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        togglePasswordBtn.setAttribute('title', 'Ocultar contraseña');
        
        // Add success animation
        togglePasswordBtn.style.color = '#10b981';
        setTimeout(() => {
            togglePasswordBtn.style.color = '#9ca3af';
        }, 500);
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        togglePasswordBtn.setAttribute('title', 'Mostrar contraseña');
    }
}

// Handle login form submission with enhanced UX
function handleLoginSubmit(e) {
    e.preventDefault();
    
    if (isFormSubmitting) return;
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;
    
    // Add subtle shake animation if validation fails
    if (!validateForm(email, password)) {
        addShakeAnimation(loginForm);
        return;
    }
    
    // Simular proceso de login
    simulateLogin(email, password, rememberMe);
}

// Validar formulario completo con mejor feedback
function validateForm(email, password) {
    let isValid = true;
    
    // Validar email
    if (!email) {
        showFieldError(emailInput, 'El email es requerido');
        addShakeAnimation(emailInput);
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError(emailInput, 'Ingresa un email válido');
        addShakeAnimation(emailInput);
        isValid = false;
    } else {
        clearFieldError(emailInput);
        addSuccessAnimation(emailInput);
    }
    
    // Validar contraseña
    if (!password) {
        showFieldError(passwordInput, 'La contraseña es requerida');
        addShakeAnimation(passwordInput);
        isValid = false;
    } else if (password.length < 6) {
        showFieldError(passwordInput, 'La contraseña debe tener al menos 6 caracteres');
        addShakeAnimation(passwordInput);
        isValid = false;
    } else {
        clearFieldError(passwordInput);
        addSuccessAnimation(passwordInput);
    }
    
    return isValid;
}

// Validar email en tiempo real con mejor UX
function validateEmail() {
    const email = emailInput.value.trim();
    
    if (!email) {
        clearFieldError(emailInput);
        return;
    }
    
    if (!isValidEmail(email)) {
        showFieldError(emailInput, 'Ingresa un email válido');
    } else {
        clearFieldError(emailInput);
        addSuccessAnimation(emailInput);
    }
}

// Validar contraseña en tiempo real
function validatePassword() {
    const password = passwordInput.value;
    
    if (!password) {
        clearFieldError(passwordInput);
        return;
    }
    
    if (password.length < 6) {
        showFieldError(passwordInput, 'La contraseña debe tener al menos 6 caracteres');
    } else {
        clearFieldError(passwordInput);
        addSuccessAnimation(passwordInput);
    }
}

// Validar formato de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar error en campo con mejor animación
function showFieldError(input, message) {
    const wrapper = input.closest('.input-wrapper');
    const existingError = wrapper.querySelector('.field-error');
    
    if (existingError) {
        existingError.textContent = message;
        return;
    }
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc2626;
        font-size: 0.8rem;
        margin-top: 6px;
        display: flex;
        align-items: center;
        gap: 6px;
        animation: slideIn 0.3s ease;
    `;
    
    wrapper.appendChild(errorElement);
    input.style.borderColor = '#dc2626';
    
    // Add subtle shake
    addShakeAnimation(input);
}

// Limpiar error de campo
function clearFieldError(input) {
    const wrapper = input.closest('.input-wrapper');
    const errorElement = wrapper.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            errorElement.remove();
        }, 300);
    }
    
    input.style.borderColor = '#e5e7eb';
}

// Simular proceso de login con mejor UX
function simulateLogin(email, password, rememberMe) {
    isFormSubmitting = true;
    
    // Add loading animation
    loginBtn.classList.add('loading');
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
    
    // Add subtle pulse to card
    document.querySelector('.login-card').style.animation = 'pulse 2s ease-in-out';
    
    // Simular delay de red
    setTimeout(() => {
        // Credenciales de demo
        if (email === 'admin@genesix.com' && password === '123456') {
            // Guardar credenciales si "Recordarme" está marcado
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            // Show success animation
            addSuccessAnimation(loginBtn);
            showNotification('¡Inicio de sesión exitoso! 🎉', 'success');
            
            // Simular redirección con fade out
            setTimeout(() => {
                document.body.style.animation = 'fadeOut 0.5s ease';
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 500);
            }, 1500);
            
        } else {
            // Show error animation
            addShakeAnimation(loginForm);
            showNotification('Credenciales incorrectas. Usa: admin@genesix.com / 123456', 'error');
            
            // Restaurar botón
            loginBtn.classList.remove('loading');
            loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
            isFormSubmitting = false;
            
            // Remove pulse animation
            document.querySelector('.login-card').style.animation = '';
        }
    }, 2000);
}

// Handle Google login with enhanced feedback
function handleGoogleLogin() {
    addRippleToButton(googleBtn);
    showNotification('Inicio de sesión con Google (simulado)', 'info');
}

// Handle Facebook login with enhanced feedback
function handleFacebookLogin() {
    addRippleToButton(facebookBtn);
    showNotification('Inicio de sesión con Facebook (simulado)', 'info');
}

// Handle forgot password
function handleForgotPassword(e) {
    e.preventDefault();
    addRippleToButton(forgotPasswordLink);
    showNotification('Función de recuperación de contraseña (simulada)', 'info');
}

// Handle signup
function handleSignup(e) {
    e.preventDefault();
    addRippleToButton(signupLink);
    showNotification('Redirección a página de registro (simulada)', 'info');
}

// Input focus effects with enhanced animations
function handleInputFocus(e) {
    const wrapper = e.target.closest('.input-wrapper');
    wrapper.style.transform = 'scale(1.02)';
    wrapper.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
}

function handleInputBlur(e) {
    const wrapper = e.target.closest('.input-wrapper');
    wrapper.style.transform = 'scale(1)';
}

// Setup form validation
function setupFormValidation() {
    // Validar en tiempo real
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
}

// Load saved credentials
function loadSavedCredentials() {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
        addSuccessAnimation(emailInput);
    }
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%) scale(0.8);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 320px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    // Colores según tipo
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    }, 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%) scale(0.8)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 4000);
}

// Animation functions
function addShakeAnimation(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

function addSuccessAnimation(element) {
    element.style.animation = 'successPulse 0.6s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 600);
}

function addRippleToButton(button) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function addSocialButtonHover(event) {
    const button = event.target;
    button.style.transform = 'translateY(-3px) scale(1.02)';
}

function removeSocialButtonHover(event) {
    const button = event.target;
    button.style.transform = 'translateY(0) scale(1)';
}

// Add particle effect to background
function addParticleEffect() {
    const particles = document.createElement('div');
    particles.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: floatParticle ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particles.appendChild(particle);
    }
    
    document.body.appendChild(particles);
}

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('button, a');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            addRippleToButton(this);
        });
    });
}

// Add typing effect to header
function addTypingEffect() {
    const title = document.querySelector('.login-header h1');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 500);
}

// Keyboard shortcuts with enhanced feedback
document.addEventListener('keydown', function(e) {
    // Enter para enviar formulario
    if (e.key === 'Enter' && (e.target === emailInput || e.target === passwordInput)) {
        handleLoginSubmit(new Event('submit'));
    }
    
    // Ctrl/Cmd + Enter para login rápido
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        emailInput.value = 'admin@genesix.com';
        passwordInput.value = '123456';
        addSuccessAnimation(emailInput);
        addSuccessAnimation(passwordInput);
        handleLoginSubmit(new Event('submit'));
    }
});

// Auto-focus en email al cargar
window.addEventListener('load', function() {
    if (!emailInput.value) {
        setTimeout(() => {
            emailInput.focus();
        }, 800);
    }
});

// Scroll suave para los enlaces del navbar
const navbarLinks = document.querySelectorAll('.navbar-links a');
navbarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Compensa navbar fijo
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Resalta el enlace activo según la sección visible
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 80;
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navbarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes successPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes floatParticle {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
    
    @keyframes fadeOut {
        to { opacity: 0; }
    }
    
    @keyframes slideOut {
        to { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(style); 