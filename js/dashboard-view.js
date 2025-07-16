
const dashboardViewHTML = `
<section class="dashboard-content">
    <div class="kpi-grid">
        <div class="kpi-card kpi-agents">
            <h3>Agentes Activos</h3>
            <p class="kpi-value">6 <span class="kpi-total">/ 10</span></p>
        </div>
        <div class="kpi-card kpi-tasks">
            <h3>Tareas Hoy</h3>
            <p class="kpi-value">125</p>
            <p class="kpi-comparison">+5% vs ayer</p>
        </div>
        <div class="kpi-card kpi-alerts">
            <h3>Alertas Pendientes</h3>
            <p class="kpi-value">3</p>
        </div>
        <div class="kpi-card kpi-invoices">
            <h3>Facturas Procesadas</h3>
            <p class="kpi-value">1,280</p>
            <p class="kpi-period">Este mes</p>
        </div>
    </div>
    <div class="dashboard-main-grid">
        <div class="activity-feed-container">
            <h3>Actividad Reciente de Agentes</h3>
            <ul class="activity-feed-list">
                <li class="activity-feed-item">
                    <div class="activity-icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" class="activity-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <p><strong>InvoiceAgent:</strong> Procesó 50 facturas. <span class="time-stamp">Hace 10 min</span></p>
                </li>
                <li class="activity-feed-item">
                    <div class="activity-icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" class="activity-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                    </div>
                    <p><strong>ClientAgent:</strong> Resolvió 30 consultas vía WhatsApp. <span class="time-stamp">Hace 25 min</span></p>
                </li>
                <li class="activity-feed-item">
                    <div class="activity-icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" class="activity-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                    </div>
                    <p><strong>TaskAgent:</strong> Recordatorios enviados para 15 tareas. <span class="time-stamp">Hace 1 hora</span></p>
                </li>
                <li class="activity-feed-item">
                    <div class="activity-icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" class="activity-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6a6 6 0 016 6v1h-3M15 21a2 2 0 002-2v-.5a2 2 0 00-2-2.5h-3a2 2 0 00-2 2.5V19a2 2 0 002 2h3z" /></svg>
                    </div>
                    <p><strong>HRAgent:</strong> Aprobó 3 solicitudes de vacaciones. <span class="time-stamp">Hace 2 horas</span></p>
                </li>
            </ul>
        </div>
        <div class="performance-chart-container">
            <h3>Rendimiento General (Placeholder)</h3>
            <div class="chart-placeholder"><p>Gráfico de Rendimiento</p></div>
        </div>
    </div>
</section>
`;

const billingAgentViewHTML = `    <section id="invoice-agent" class="content-section">
      <div class="flex justify-right items-center mb-6 border-b pb-3">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-md transition-all flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
              Cargar Nueva Factura
          </button>
      </div>
      <div class="mb-6 flex space-x-4">
          <input type="text" placeholder="Buscar por proveedor o ID..." class="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
          <select class="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option>Filtrar por Estado</option>
              <option>Pendiente</option>
              <option>Aprobada</option>
              <option>Rechazada</option>
          </select>
      </div>
      <div class="bg-white p-2 rounded-xl shadow-lg overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
              <thead class="table-header">
                  <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID Factura</th>
                      <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Proveedor</th>
                      <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fecha Emisión</th>
                      <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Monto</th>
                      <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Estado</th>
                      <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
                  </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                  <tr class="table-row">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">FAC-2024-001</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Proveedor Alfa S.A.S</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2024-05-10</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">$1,250,000</td>
                      <td class="px-6 py-4 whitespace-nowrap"><span class="status-pill status-aprobada">Aprobada</span></td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a href="#" class="text-blue-600 hover:text-blue-800"><i class="fas fa-eye"></i></a>
                      </td>
                  </tr>
                  <tr class="table-row">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">FAC-2024-002</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Servicios Beta Ltda.</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2024-05-12</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">$870,000</td>
                      <td class="px-6 py-4 whitespace-nowrap"><span class="status-pill status-pendiente">Pendiente</span></td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a href="#" class="text-blue-600 hover:text-blue-800 mr-2"><i class="fas fa-search"></i></a>
                          <a href="#" class="text-red-600 hover:text-red-800"><i class="fas fa-times-circle"></i></a>
                      </td>
                  </tr>
                   <tr class="table-row">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">FAC-2024-003</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Insumos Gamma S.A.</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2024-05-09</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">$2,500,000</td>
                      <td class="px-6 py-4 whitespace-nowrap"><span class="status-pill status-rechazada">Rechazada</span></td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a href="#" class="text-blue-600 hover:text-blue-800"><i class="fas fa-info-circle"></i></a>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
       <div class="mt-6 bg-gray-50 p-6 rounded-xl shadow-md">
          <h3 class="text-lg font-semibold text-gray-700 mb-3">Facturas Pendientes de Aprobación (3)</h3>
          <p class="text-sm text-gray-600">Aquí iría una lista más detallada o un resumen de facturas que requieren acción.</p>
      </div>
  </section>`;

const clientAgentViewHTML = ` <section id="client-agent" class="content-section">
    <h2 class="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3">ClientAgent - Atención al Cliente</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-white p-4 rounded-xl shadow-lg text-center">
            <h3 class="font-semibold text-lg text-gray-700 mb-2">WhatsApp</h3>
            <div class="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.173.2-.297.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.47.074-.742.346-.274.273-1.057 1.027-1.057 2.502 0 1.475 1.079 2.902 1.23 3.099.152.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg> </div> <span class="status-pill status-aprobada">Activo</span>
        </div>
        <div class="bg-white p-4 rounded-xl shadow-lg text-center">
            <h3 class="font-semibold text-lg text-gray-700 mb-2">Webchat</h3>
            <div class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg> </div> <span class="status-pill status-aprobada">Activo</span>
        </div>
        <div class="bg-white p-4 rounded-xl shadow-lg text-center">
            <h3 class="font-semibold text-lg text-gray-700 mb-2">Email</h3>
            <div class="w-12 h-12 bg-gray-400 text-white rounded-full flex items-center justify-center mx-auto mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0e 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg> </div> <span class="status-pill status-rechazada">Inactivo</span>
        </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-semibold text-gray-700 mb-4">Conversaciones Recientes</h3>
            <ul class="space-y-3 max-h-96 overflow-y-auto">
                <li class="p-3 border rounded-lg hover:bg-gray-50">
                    <div class="flex justify-between items-center mb-1"> <span class="font-medium text-blue-600">Cliente
                            A</span> <span class="text-xs text-gray-500">Hace 5 min (WhatsApp)</span> </div>
                    <p class="text-sm text-gray-600 truncate">Quisiera saber el estado de mi pedido #12345...</p>
                </li>
                <li class="p-3 border rounded-lg hover:bg-gray-50">
                    <div class="flex justify-between items-center mb-1"> <span class="font-medium text-blue-600">Cliente
                            B</span> <span class="text-xs text-gray-500">Hace 15 min (Webchat)</span> </div>
                    <p class="text-sm text-gray-600 truncate">Tengo un problema con el producto recibido, ¿me pueden
                        ayudar?</p>
                </li>
                <li class="p-3 border rounded-lg hover:bg-gray-50">
                    <div class="flex justify-between items-center mb-1"> <span class="font-medium text-blue-600">Cliente
                            C</span> <span class="text-xs text-gray-500">Hace 1 hora (WhatsApp)</span> </div>
                    <p class="text-sm text-gray-600 truncate">¡Muchas gracias por la rápida solución!</p>
                </li>
            </ul>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-semibold text-gray-700 mb-4">Métricas Clave</h3>
            <div class="space-y-4">
                <div>
                    <div class="flex justify-between text-sm mb-1"><span>Tiempo Prom. Respuesta</span><span>2 min 30
                            seg</span></div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-green-500 h-2.5 rounded-full" style="width: 85%"></div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-between text-sm mb-1"><span>Tasa de Resolución</span><span>92%</span></div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-blue-500 h-2.5 rounded-full" style="width: 92%"></div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-between text-sm mb-1"><span>Satisfacción Cliente (CSAT)</span><span>4.5 /
                            5</span></div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-yellow-500 h-2.5 rounded-full" style="width: 90%"></div>
                    </div>
                </div>
            </div> <button
                class="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-md transition-all">
                Configurar Agente </button>
        </div>
    </div>
</section>`;