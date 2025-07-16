// --- View Switching ---
const plansSection = document.querySelector('.marketing-plans-section');
const planDetailView = document.getElementById('planDetailView');
const backToPlansBtn = document.getElementById('backToPlansBtn');
const plansGrid = document.getElementById('plansGrid');

if (plansGrid) {
    plansGrid.addEventListener('click', (e) => {
        // Check if a "Ver Posts" button or the card itself was clicked
        const target = e.target.closest('.plan-card');
        if (target && !target.classList.contains('add-new-plan-card')) {
            e.preventDefault();
            showPlanDetailView();
        }
    });
}

if (backToPlansBtn) {
    backToPlansBtn.addEventListener('click', () => {
        showPlansListView();
    });
}

function showPlanDetailView() {
    if(plansSection) plansSection.style.display = 'none';
    if(planDetailView) planDetailView.style.display = 'block';
    // In a real app, you would fetch and display data for the specific plan
}

function showPlansListView() {
    if(plansSection) plansSection.style.display = 'block';
    if(planDetailView) planDetailView.style.display = 'none';
}

// --- File Upload ---
const fileUploader = document.getElementById('fileUploader');
const fileUploadArea = document.querySelector('.file-upload-area');

if(fileUploadArea) {
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
        const files = e.dataTransfer.files;
        handleFiles(files);
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

    // Simple preview logic, can be expanded
    for (const file of files) {
        const fileElement = document.createElement('div');
        fileElement.textContent = `${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        preview.appendChild(fileElement);
    }
}

// --- Modal Logic ---
const createPlanModal = document.getElementById('createPlanModal');
const createPlanBtn = document.getElementById('createPlanBtn');
const addNewPlanCard = document.getElementById('addNewPlanCard');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const createPlanForm = document.getElementById('createPlanForm');

function openModal() {
    if(createPlanModal) createPlanModal.style.display = 'flex';
}

function closeModal() {
    if(createPlanModal) createPlanModal.style.display = 'none';
}

if(createPlanBtn) createPlanBtn.addEventListener('click', openModal);
if(addNewPlanCard) addNewPlanCard.addEventListener('click', openModal);
if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if(cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);

// Close modal if clicking on the overlay
if(createPlanModal) {
    createPlanModal.addEventListener('click', (e) => {
        if (e.target === createPlanModal) {
            closeModal();
        }
    });
}

if(createPlanForm) {
    createPlanForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const planName = document.getElementById('planNameInput').value;
        const planDescription = document.getElementById('planDescriptionInput').value;

        if (planName.trim() === '' || planDescription.trim() === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        addNewPlanCardToGrid(planName, planDescription);
        
        // Reset form and close modal
        createPlanForm.reset();
        closeModal();
    });
}

function addNewPlanCardToGrid(name, description) {
    const plansGrid = document.getElementById('plansGrid');
    const addNewCard = document.getElementById('addNewPlanCard');
    if (!plansGrid || !addNewCard) return;

    // Create the new plan card element
    const planCard = document.createElement('div');
    planCard.className = 'plan-card card';
    
    const today = new Date();
    const dateString = `Creado: ${today.getDate()} ${today.toLocaleString('es-ES', { month: 'short' })}, ${today.getFullYear()}`;

    planCard.innerHTML = `
        <div class="card-body">
            <h3 class="plan-name">${name}</h3>
            <p class="plan-objective">${description}</p>
            <p class="plan-date">${dateString}</p>
            <a href="#" class="btn btn-secondary">Ver Posts Generados</a>
        </div>
    `;

    // Insert the new card before the "Add New" card
    plansGrid.insertBefore(planCard, addNewCard);
} 