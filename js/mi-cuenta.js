function initializeMyAccount() {
    const accountContainer = document.querySelector('.account-container');
    if (!accountContainer) return;

    // --- Tab Navigation ---
    const tabs = accountContainer.querySelectorAll('.tab-link');
    const contents = accountContainer.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active'));
            contents.forEach(item => item.classList.remove('active'));

            tab.classList.add('active');
            const targetContent = document.getElementById(tab.dataset.tab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // --- Editable Cards Logic ---
    const feedbackMessage = document.getElementById('feedback-message');
    const editableCards = accountContainer.querySelectorAll('.card-editable');

    editableCards.forEach(card => {
        const editButton = card.querySelector('.btn-edit');
        const cancelButton = card.querySelector('.btn-cancel');
        const form = card.querySelector('form');
        const formActions = card.querySelector('.form-actions');
        const inputs = form ? form.querySelectorAll('input.form-control') : [];
        const logoEditButton = card.querySelector('.btn-edit-logo');

        let originalValues = {};

        if (editButton) {
            editButton.addEventListener('click', () => {
                card.classList.add('is-editing');
                if(formActions) formActions.style.display = 'flex';
                if (logoEditButton) logoEditButton.style.display = 'block';

                if (inputs.length > 0) {
                    inputs.forEach(input => {
                        originalValues[input.id] = input.value;
                        if (input.id !== 'tenant-domain') {
                            input.readOnly = false;
                        }
                    });
                }
            });
        }

        if (cancelButton) {
            cancelButton.addEventListener('click', () => {
                card.classList.remove('is-editing');
            if(formActions) formActions.style.display = 'none';
            if (logoEditButton) logoEditButton.style.display = 'none';

                if (inputs.length > 0) {
                    inputs.forEach(input => {
                        input.value = originalValues[input.id];
                    input.readOnly = true;
                });
                }
            });
        }
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showFeedback('Cambios guardados con éxito.', 'success');
                
                card.classList.remove('is-editing');
                if(formActions) formActions.style.display = 'none';
                if (logoEditButton) logoEditButton.style.display = 'none';
                if (inputs.length > 0) {
                    inputs.forEach(input => input.readOnly = true);
                }
            });
        }
    });

    // --- Logo Upload specific logic ---
    const logoUploadInput = document.getElementById('logo-upload-input');
    const logoEditBtn = document.querySelector('.btn-edit-logo');
    if (logoEditBtn) {
        logoEditBtn.addEventListener('click', () => logoUploadInput.click());
    }

    if (logoUploadInput) {
        logoUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const validTypes = ['image/jpeg', 'image/png'];
                if (!validTypes.includes(file.type)) {
                    showFeedback('Formato de archivo no válido. Use PNG o JPG.', 'error');
                    return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('logo-preview-img').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- Feedback Message Logic ---
    function showFeedback(message, type = 'success') {
        if (!feedbackMessage) return;
        feedbackMessage.textContent = message;
        feedbackMessage.className = `feedback-message ${type} show`;
        setTimeout(() => {
            feedbackMessage.classList.remove('show');
        }, 3000);
    }
} 