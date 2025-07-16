document.addEventListener('DOMContentLoaded', () => {

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
}); 