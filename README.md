# Genesis AI - Asistente Empresarial

Un asistente web empresarial basado en IA con diferentes servicios integrados y navegación funcional, desarrollado con HTML, CSS y JavaScript puro.

## 🚀 Características

### ✅ Funcionalidades Implementadas

- **Sistema de Login Simulado**: Autenticación con credenciales de demo
- **Dashboard Empresarial Moderno**: Vista principal con estadísticas y acciones rápidas
- **Navegación SPA**: Cambio de vistas sin recargar la página
- **Múltiples Servicios Integrados**:
  - 📅 **Agendar Citas**: Formulario completo para programar reuniones
  - 📊 **Consultar Informes**: Dashboard con métricas empresariales
  - 🔔 **Enviar Recordatorios**: Sistema de notificaciones programadas
  - 🤖 **Asistente IA**: Chat interactivo con respuestas inteligentes
  - 📋 **Historial de Tareas**: Registro de todas las actividades
  - 👤 **Perfil de Usuario**: Gestión de información personal

### 🎨 Diseño y UX

- **Diseño Moderno y Profesional**: Paleta de colores azules, grises y blancos
- **Responsive Design**: Optimizado para móviles y tablets
- **Animaciones Suaves**: Transiciones y efectos visuales
- **Tipografía Inter**: Fuente moderna y legible
- **Iconografía Font Awesome**: Iconos profesionales

### 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Flexbox, Grid, animaciones y diseño responsive
- **JavaScript ES6+**: Funcionalidad completa sin frameworks
- **LocalStorage**: Persistencia de sesión
- **Font Awesome**: Iconografía profesional

## 📁 Estructura del Proyecto

```
Genesis/
├── index.html          # Archivo principal
├── css/
│   └── styles.css      # Estilos completos
├── js/
│   └── app.js          # Lógica de la aplicación
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
   - Email: `admin@genesis.com`
   - Password: `123456`

## 🎯 Funcionalidades Detalladas

### 1. Sistema de Login
- Formulario de autenticación elegante
- Validación de credenciales
- Persistencia de sesión con LocalStorage
- Credenciales de demo incluidas

### 2. Dashboard Principal
- **Saludo personalizado** según la hora del día
- **Estadísticas en tiempo real**:
  - Citas programadas
  - Tareas pendientes
  - Productividad
  - Tiempo ahorrado
- **Acciones rápidas** para navegación directa

### 3. Agendar Citas
- Formulario completo con validación
- Selección de tipo de cita
- Configuración de fecha, hora y duración
- Gestión de participantes
- Integración con historial

### 4. Consultar Informes
- **Métricas empresariales**:
  - Ventas mensuales
  - Productividad del equipo
  - Clientes nuevos
  - Retención de clientes
- Diseño de tarjetas interactivas
- Datos simulados realistas

### 5. Enviar Recordatorios
- Sistema completo de programación
- Diferentes tipos de recordatorios
- Niveles de prioridad
- Configuración de repetición
- Gestión de destinatarios

### 6. Asistente IA
- **Chat interactivo** con respuestas inteligentes
- **Sugerencias rápidas** para consultas comunes
- **Respuestas contextuales** basadas en palabras clave
- **Historial de conversación** persistente
- **Interfaz moderna** tipo WhatsApp

### 7. Historial de Tareas
- **Registro completo** de todas las actividades
- **Filtros por tipo** de actividad
- **Diseño de tarjetas** con iconografía
- **Información temporal** de cada acción

### 8. Perfil de Usuario
- **Información personal** completa
- **Gestión de preferencias** con toggles
- **Diseño de tarjetas** profesional
- **Acciones de edición** simuladas

## 🎨 Paleta de Colores

```css
/* Colores principales */
Primary: #667eea → #764ba2 (Gradiente)
Secondary: #2c3e50 (Sidebar)
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
- **Desktop**: > 768px
- **Tablet**: 768px - 480px
- **Mobile**: < 480px

### Características Responsive
- Sidebar colapsable en móviles
- Grids adaptativos
- Formularios optimizados
- Navegación touch-friendly

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

- **Diseño**: Genesis AI Team
- **Desarrollo**: Frontend con tecnologías web estándar
- **Iconografía**: Font Awesome
- **Tipografía**: Inter (Google Fonts)

---

## 🎯 Demo en Vivo

Para ver el proyecto en acción:
1. Abre `index.html` en tu navegador
2. Usa las credenciales: `admin@genesis.com` / `123456`
3. Explora todas las funcionalidades

¡Disfruta explorando Genesis AI! 🚀 