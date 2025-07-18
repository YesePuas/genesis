function initializeMyAccount() {
    const accountContainer = document.querySelector('.account-container');
    if (!accountContainer) return;

    // --- Location Data ---
    const locations = {
        CO: {
            name: "Colombia",
            prefix: "+57",
            departments: {
                CUN: { name: "Cundinamarca", cities: { BOG: "Bogotá D.C." } },
                ANT: { name: "Antioquia", cities: { MED: "Medellín" } }
            }
        },
        MX: {
            name: "México",
            prefix: "+52",
            departments: {
                JAL: { name: "Jalisco", cities: { GDL: "Guadalajara" } },
                NLE: { name: "Nuevo León", cities: { MTY: "Monterrey" } }
            }
        },
        US: {
            name: "Estados Unidos",
            prefix: "+1",
            departments: {
                CA: { name: "California", cities: { LAX: "Los Angeles" } },
                FL: { name: "Florida", cities: { MIA: "Miami" } }
            }
        }
    };

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
    const paymentMethodCard = document.getElementById('payment-method-card');


    if (paymentMethodCard) {
        const editButton = paymentMethodCard.querySelector('.btn-edit');
        const cardActions = paymentMethodCard.querySelectorAll('.card-actions');
        let isEditing = false;

        editButton.addEventListener('click', () => {
            isEditing = !isEditing;
            cardActions.forEach(actions => {
                actions.style.display = isEditing ? 'flex' : 'none';
            });
            // Optional: change edit button text/icon
            editButton.innerHTML = isEditing ? '<i class="fas fa-times"></i>' : '<i class="fas fa-pencil-alt"></i>';
        });
    }


    editableCards.forEach(card => {
        const editButton = card.querySelector('.btn-edit');
        const cancelButton = card.querySelector('.btn-cancel');
        const form = card.querySelector('form');
        const formActions = card.querySelector('.form-actions');
        const inputsAndSelects = form ? form.querySelectorAll('input.form-control, select.form-control') : [];
        const logoEditButton = card.querySelector('.btn-edit-logo');

        let originalValues = {};

        if (editButton) {
            editButton.addEventListener('click', () => {
                card.classList.add('is-editing');
                if(formActions) formActions.style.display = 'flex';
                if (logoEditButton) logoEditButton.style.display = 'block';

                inputsAndSelects.forEach(input => {
                    originalValues[input.id] = input.value;
                     if (input.tagName.toLowerCase() === 'select') {
                        const selectedOption = input.querySelector(`option[value="${input.value}"]`);
                        originalValues[`${input.id}-text`] = selectedOption ? selectedOption.textContent : input.value;
                        input.disabled = false;
                    } else if (input.id !== 'tenant-domain' && input.id !== 'phone-prefix') {
                        input.readOnly = false;
                    }
                });
                
                // Directly populate dropdowns and restore original selection
                populateDepartments();
                departmentSelect.value = originalValues['tenant-department'] || "";

                populateCities();
                citySelect.value = originalValues['tenant-city'] || "";
            });
        }

        if (cancelButton) {
            cancelButton.addEventListener('click', () => {
                card.classList.remove('is-editing');
                if(formActions) formActions.style.display = 'none';
                if (logoEditButton) logoEditButton.style.display = 'none';

                inputsAndSelects.forEach(input => {
                    input.value = originalValues[input.id];
                    if (input.tagName.toLowerCase() === 'select') {
                        input.disabled = true;
                        // For DYNAMIC dropdowns, reset their content to the display state.
                        // The static Country dropdown is left alone to preserve its options.
                        if (input.id === 'tenant-department' || input.id === 'tenant-city') {
                            const originalText = originalValues[`${input.id}-text`] || 'Selecciona...';
                            input.innerHTML = `<option value="${input.value}">${originalText}</option>`;
                        }
                    } else {
                        input.readOnly = true;
                    }
                });
            });
        }
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showFeedback('Cambios guardados con éxito.', 'success');
                
                card.classList.remove('is-editing');
                if(formActions) formActions.style.display = 'none';
                if (logoEditButton) logoEditButton.style.display = 'none';
                inputsAndSelects.forEach(input => {
                     if (input.tagName.toLowerCase() === 'select') {
                        input.disabled = true;
                    } else {
                        input.readOnly = true;
                    }
                });
            });
        }
    });

    // --- Dynamic Location Logic ---
    const countrySelect = document.getElementById('tenant-country');
    const departmentSelect = document.getElementById('tenant-department');
    const citySelect = document.getElementById('tenant-city');
    const phonePrefixInput = document.getElementById('phone-prefix');

    function populateDepartments() {
        const countryCode = countrySelect.value;
        departmentSelect.innerHTML = '<option value="">Selecciona un departamento</option>';
        citySelect.innerHTML = '<option value="">Selecciona una ciudad</option>';
        
        if (countryCode && locations[countryCode]) {
            const countryData = locations[countryCode];
            phonePrefixInput.value = countryData.prefix;
            
            for (const depCode in countryData.departments) {
                const option = document.createElement('option');
                option.value = depCode;
                option.textContent = countryData.departments[depCode].name;
                departmentSelect.appendChild(option);
            }
        }
    }

    function populateCities() {
        const countryCode = countrySelect.value;
        const depCode = departmentSelect.value;
        citySelect.innerHTML = '<option value="">Selecciona una ciudad</option>';

        if (countryCode && depCode && locations[countryCode].departments[depCode]) {
            const depData = locations[countryCode].departments[depCode];
            for (const cityCode in depData.cities) {
                const option = document.createElement('option');
                option.value = cityCode;
                option.textContent = depData.cities[cityCode];
                citySelect.appendChild(option);
            }
        }
    }

    countrySelect.addEventListener('change', populateDepartments);
    departmentSelect.addEventListener('change', populateCities);


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