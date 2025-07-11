# Genesix AI - Asistente Empresarial

Un asistente web empresarial basado en IA con diferentes servicios integrados y navegación funcional, desarrollado con HTML, CSS y JavaScript puro.

## 🚀 Características

### ✅ Funcionalidades Implementadas

- **Navegación Responsive Premium**: Menú horizontal fijo y elegante en escritorio (≥1024px), menú hamburguesa y menú móvil UX-first en dispositivos móviles (≤1023px), ambos con estructura HTML separada y coherente.
- **Sistema de Login Simulado**: Autenticación con credenciales de demo
- **Dashboard Empresarial Moderno**: Vista principal con estadísticas y acciones rápidas
- **SPA-like Navigation**: Cambio de vistas sin recargar la página
- **Múltiples Servicios Integrados**:
  - 📅 **Agendar Citas**: Formulario completo para programar reuniones
  - 📊 **Consultar Informes**: Dashboard con métricas empresariales
  - 🔔 **Enviar Recordatorios**: Sistema de notificaciones programadas
  - 🤖 **Asistente IA**: Chat interactivo con respuestas inteligentes
  - 📋 **Historial de Tareas**: Registro de todas las actividades
  - 👤 **Perfil de Usuario**: Gestión de información personal

### 🎨 Diseño y UX

- **Diseño Moderno y Empresarial**: Paleta de colores azules, grises y blancos, con Inter como tipografía principal
- **Navbar horizontal en desktop**: Navegación clara, fija y profesional
- **Menú hamburguesa y móvil**: Overlay elegante, padding generoso, cierre accesible, botones grandes y bien espaciados
- **Botón "Solicita una demo" y hamburguesa medianos y responsivos**
- **Animaciones Suaves**: Transiciones y efectos visuales
- **Iconografía Font Awesome y SVG**: Iconos profesionales y accesibles

### 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Flexbox, Grid, animaciones y diseño responsive
- **JavaScript ES6+**: Funcionalidad completa sin frameworks
- **LocalStorage**: Persistencia de sesión
- **Font Awesome & SVG**: Iconografía profesional

## 📁 Estructura del Proyecto

```
Genesis/
├── index.html          # Landing page y navegación principal
├── login.html          # Página de login premium
├── css/
│   └── styles.css      # Estilos completos y responsivos
├── js/
│   └── app.js          # Lógica de la aplicación y menú responsive
└── README.md           # Documentación
```

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere instalación de dependencias

### Pasos para ejecutar

1. **Clonar o descargar** el proyecto
2. **Abrir** `index.html` en tu navegador
3. **Usar las credenciales de demo**:
   - Email: `admin@genesix.com`
   - Password: `123456`

## 🎯 Funcionalidades Detalladas

### 1. Navegación Responsive Empresarial
- **Navbar horizontal** en desktop/laptop (≥1024px): enlaces y botones alineados, jerarquía visual clara, coherencia de marca
- **Menú hamburguesa y móvil** en tablet/móvil (≤1023px): overlay elegante, menú vertical, cierre fácil, botones grandes y bien espaciados
- **Estructura HTML separada** para ambos menús, sin conflictos de visibilidad
- **Transiciones suaves** y experiencia UX premium

### 2. Sistema de Login
- Formulario de autenticación elegante y centrado
- Validación de credenciales
- Persistencia de sesión con LocalStorage
- Credenciales de demo incluidas

### 3. Dashboard Principal
- **Saludo personalizado** según la hora del día
- **Estadísticas en tiempo real**
- **Acciones rápidas** para navegación directa

### 4. Agendar Citas
- Formulario completo con validación
- Selección de tipo de cita
- Configuración de fecha, hora y duración
- Gestión de participantes
- Integración con historial

### 5. Consultar Informes
- **Métricas empresariales**
- Diseño de tarjetas interactivas
- Datos simulados realistas

### 6. Enviar Recordatorios
- Sistema completo de programación
- Diferentes tipos de recordatorios
- Niveles de prioridad
- Configuración de repetición
- Gestión de destinatarios

### 7. Asistente IA
- **Chat interactivo** con respuestas inteligentes
- **Sugerencias rápidas** para consultas comunes
- **Respuestas contextuales** basadas en palabras clave
- **Historial de conversación** persistente
- **Interfaz moderna** tipo WhatsApp

### 8. Historial de Tareas
- **Registro completo** de todas las actividades
- **Filtros por tipo** de actividad
- **Diseño de tarjetas** con iconografía
- **Información temporal** de cada acción

### 9. Perfil de Usuario
- **Información personal** completa
- **Gestión de preferencias** con toggles
- **Diseño de tarjetas** profesional
- **Acciones de edición** simuladas

## 🎨 Paleta de Colores

```css
/* Colores principales */
Primary: #2563eb, #143fa3 (azul corporativo)
Secondary: #2c3e50 (gris oscuro)
Success: #28a745
Error: #dc3545
Warning: #ffc107
Info: #17a2b8

/* Colores de fondo */
Background: #f8f9fa
White: #ffffff
Gray: #6c757d
```

## 📱 Responsive Design

### Breakpoints
- **Desktop**: ≥ 1024px (navbar horizontal)
- **Tablet**: 1023px - 768px (hamburguesa y menú móvil)
- **Mobile**: ≤ 767px (hamburguesa y menú móvil optimizados)

### Características Responsive
- Navbar horizontal solo en desktop
- Menú hamburguesa y móvil solo en tablet/móvil
- Grids y formularios adaptativos
- Navegación touch-friendly
- Botones y elementos de acción medianos y cómodos

## 🔧 Personalización

### Modificar Datos Simulados
Edita el objeto `mockData` en `js/app.js`:

```javascript
const mockData = {
    user: { /* datos del usuario */ },
    appointments: [ /* citas */ ],
    reminders: [ /* recordatorios */ ],
    history: [ /* historial */ ]
};
```

### Cambiar Respuestas del IA
Modifica el objeto `aiResponses` en `js/app.js`:

```javascript
const aiResponses = {
    greetings: [ /* saludos */ ],
    appointments: [ /* respuestas sobre citas */ ],
    // ... más categorías
};
```

### Personalizar Estilos
Los estilos están organizados por sección en `css/styles.css`:
- Variables CSS para colores
- Clases utilitarias
- Media queries para responsive
- Navbar y menú móvil diferenciados

## 🚀 Próximas Mejoras

### Funcionalidades Planificadas
- [ ] Integración con backend real
- [ ] Base de datos para persistencia
- [ ] API de IA real (OpenAI, etc.)
- [ ] Notificaciones push
- [ ] Exportación de informes
- [ ] Calendario integrado
- [ ] Sistema de roles y permisos

### Mejoras Técnicas
- [ ] PWA (Progressive Web App)
- [ ] Service Workers para offline
- [ ] Optimización de rendimiento
- [ ] Tests automatizados
- [ ] CI/CD pipeline

## 📄 Licencia

Este proyecto está desarrollado como demo y puede ser utilizado libremente para fines educativos y comerciales.

## 👥 Créditos

- **Diseño**: Genesix AI Team
- **Desarrollo**: Frontend con tecnologías web estándar
- **Iconografía**: Font Awesome & SVG
- **Tipografía**: Inter (Google Fonts)

---

## 🎯 Demo en Vivo

Para ver el proyecto en acción:
1. Abre `index.html` en tu navegador
2. Usa las credenciales: `admin@genesix.com` / `123456`
3. Explora todas las funcionalidades

¡Disfruta explorando Genesix AI! 🚀 