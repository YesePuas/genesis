// --- Constants & Global State ---
const fileUploader = document.getElementById('fileUploader');
const fileUploadArea = document.querySelector('.file-upload-area');
const plansGrid = document.getElementById('plansGrid');
const createPlanModal = document.getElementById('createPlanModal');
const postsViewModal = document.getElementById('postsViewModal');
const approvalModal = document.getElementById('approvalModal');

let currentPostToApprove = null;

// --- Helper Functions ---
function openModal(modal) {
    if (modal) modal.style.display = 'flex';
}

function closeModal(modal) {
    if (modal) modal.style.display = 'none';
}

// --- File Upload Logic ---
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

if (fileUploadArea) {
    fileUploadArea.addEventListener('click', () => fileUploader.click());
    fileUploadArea.addEventListener('dragover', (e) => e.preventDefault());
    fileUploadArea.addEventListener('dragleave', () => fileUploadArea.classList.remove('dragging'));
    fileUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadArea.classList.remove('dragging');
        handleFiles(e.dataTransfer.files);
    });
}
if (fileUploader) {
    fileUploader.addEventListener('change', (e) => handleFiles(e.target.files));
}

// --- Create Plan Logic ---
function addNewPlanCardToGrid(name, description, startDate, endDate) {
    if (!plansGrid) return;
    const addNewCard = document.getElementById('addNewPlanCard');
    if (!addNewCard) return;

    const planCard = document.createElement('div');
    planCard.className = 'plan-card card';
    
    const formattedStartDate = new Date(startDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    const formattedEndDate = new Date(endDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

    planCard.innerHTML = `
        <div class="card-body">
            <h3 class="plan-name">${name}</h3>
            <p class="plan-objective">${description}</p>
            <p class="plan-date"><i class="fas fa-calendar-alt"></i> ${formattedStartDate} - ${formattedEndDate}</p>
            <a href="#" class="btn btn-secondary view-posts-btn">Ver Posts</a>
        </div>
    `;
    plansGrid.insertBefore(planCard, addNewCard);
}

document.getElementById('createPlanForm')?.addEventListener('submit', (e) => {
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
    document.getElementById('createPlanForm').reset();
    closeModal(createPlanModal);
});

document.getElementById('createPlanBtn')?.addEventListener('click', () => openModal(createPlanModal));
document.getElementById('addNewPlanCard')?.addEventListener('click', () => openModal(createPlanModal));

// --- Posts View Logic ---
plansGrid?.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-posts-btn')) {
        e.preventDefault();
        const planName = e.target.closest('.plan-card').querySelector('.plan-name').textContent;
        document.getElementById('postsModalTitle').textContent = `Posts para: ${planName}`;
        openModal(postsViewModal);
    }
});

// --- Approval Logic ---
function updatePostStatus(status) {
    if (!currentPostToApprove) return;

    const statusBadge = currentPostToApprove.querySelector('.status-badge');
    const actionContainer = currentPostToApprove.querySelector('.post-actions');
    
    statusBadge.className = `status-badge status-${status}`;
    statusBadge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    
    currentPostToApprove.dataset.status = status;
    actionContainer.innerHTML = ''; // Remove button
    
    closeModal(approvalModal);
    currentPostToApprove = null;
}

postsViewModal?.querySelector('.posts-table-body')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('approve-post-btn')) {
        currentPostToApprove = e.target.closest('.post-item');
        const title = currentPostToApprove.querySelector('.post-title').textContent;
        const copy = currentPostToApprove.dataset.copy;

        document.getElementById('approvalPostTitle').textContent = title;
        document.getElementById('approvalPostCopy').textContent = copy;
        openModal(approvalModal);
    }
});

document.getElementById('confirmApprovalBtn')?.addEventListener('click', () => updatePostStatus('approved'));
document.getElementById('rejectApprovalBtn')?.addEventListener('click', () => updatePostStatus('rejected'));

// --- General Modal Close Logic ---
[createPlanModal, postsViewModal, approvalModal].forEach(modal => {
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-button')) {
                closeModal(modal);
            }
        });
    }
});
document.getElementById('cancelApprovalBtn')?.addEventListener('click', () => closeModal(approvalModal)); 