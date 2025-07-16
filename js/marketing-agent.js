const fileUploader = document.getElementById('fileUploader');
const fileUploadArea = document.querySelector('.file-upload-area');
const plansGrid = document.getElementById('plansGrid');

// --- File Upload Logic ---
if (fileUploadArea) {
    fileUploadArea.addEventListener('click', () => fileUploader.click());

    fileUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadArea.classList.add('dragging');
    });

    fileUploadArea.addEventListener('dragleave', () => {
        fileUploadArea.classList.remove('dragging');
    });

    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadArea.classList.remove('dragging');
        handleFiles(e.dataTransfer.files);
    });
}

if (fileUploader) {
    fileUploader.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
}

function handleFiles(files) {
    const preview = document.getElementById('uploadedFilesPreview');
    if (!preview) return;
    for (const file of files) {
        const fileElement = document.createElement('div');
        fileElement.className = 'uploaded-file-item';
        fileElement.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        preview.appendChild(fileElement);
    }
}

// --- Create Plan Modal Logic ---
const createPlanModal = document.getElementById('createPlanModal');
const createPlanBtn = document.getElementById('createPlanBtn');
const addNewPlanCard = document.getElementById('addNewPlanCard');
const closeCreateModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const createPlanForm = document.getElementById('createPlanForm');

function openCreateModal() {
    if (createPlanModal) createPlanModal.style.display = 'flex';
}

function closeCreateModal() {
    if (createPlanModal) createPlanModal.style.display = 'none';
}

if (createPlanBtn) createPlanBtn.addEventListener('click', openCreateModal);
if (addNewPlanCard) addNewPlanCard.addEventListener('click', openCreateModal);
if (closeCreateModalBtn) closeCreateModalBtn.addEventListener('click', closeCreateModal);
if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeCreateModal);

if (createPlanModal) {
    createPlanModal.addEventListener('click', (e) => {
        if (e.target === createPlanModal) {
            closeCreateModal();
        }
    });
}

if (createPlanForm) {
    createPlanForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const planName = document.getElementById('planNameInput').value;
        const planDescription = document.getElementById('planDescriptionInput').value;
        const startDate = document.getElementById('planStartDate').value;
        const endDate = document.getElementById('planEndDate').value;

        if (!planName.trim() || !planDescription.trim() || !startDate || !endDate) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        addNewPlanCardToGrid(planName, planDescription, startDate, endDate);
        
        createPlanForm.reset();
        closeCreateModal();
    });
}

function addNewPlanCardToGrid(name, description, startDate, endDate) {
    if (!plansGrid) return;
    const addNewCard = document.getElementById('addNewPlanCard');
    if (!addNewCard) return;

    const planCard = document.createElement('div');
    planCard.className = 'plan-card card';
    
    const formattedStartDate = new Date(startDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    const formattedEndDate = new Date(endDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    const dateString = `${formattedStartDate} - ${formattedEndDate}`;

    planCard.innerHTML = `
        <div class="card-body">
            <h3 class="plan-name">${name}</h3>
            <p class="plan-objective">${description}</p>
            <p class="plan-date"><i class="fas fa-calendar-alt"></i> ${dateString}</p>
            <a href="#" class="btn btn-secondary view-posts-btn">Ver Posts Generados</a>
        </div>
    `;

    plansGrid.insertBefore(planCard, addNewCard);
}


// --- Posts View Modal Logic ---
const postsViewModal = document.getElementById('postsViewModal');
const closePostsModalBtn = document.getElementById('closePostsModalBtn');
const postsModalTitle = document.getElementById('postsModalTitle');

function openPostsModal(planName) {
    if (postsModalTitle) postsModalTitle.textContent = `Posts para: ${planName}`;
    if (postsViewModal) postsViewModal.style.display = 'flex';
}

function closePostsModal() {
    if (postsViewModal) postsViewModal.style.display = 'none';
}

if(plansGrid) {
    plansGrid.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('view-posts-btn')) {
            e.preventDefault();
            const planCard = target.closest('.plan-card');
            const planName = planCard.querySelector('.plan-name').textContent;
            openPostsModal(planName);
        }
    });
}

if (closePostsModalBtn) closePostsModalBtn.addEventListener('click', closePostsModal);

if (postsViewModal) {
    postsViewModal.addEventListener('click', (e) => {
        if (e.target === postsViewModal || e.target.classList.contains('close-button')) {
            closePostsModal();
        }
    });
} 