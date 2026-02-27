const jobForm = document.getElementById('job-form');
const jobCardsContainer = document.getElementById('jobCardsContainer');
const emptyState = document.getElementById('emptyState');
const jobCardTemplate = document.getElementById('jobCardTemplate');
const jobCardEditTemplate = document.getElementById('jobCardEditTemplate');

jobForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const jobData = {
        title: document.getElementById('jobTitle').value.trim(),
        company: document.getElementById('companyName').value.trim(),
        location: document.getElementById('location').value.trim(),
        type: document.getElementById('jobType').value,
        salary: document.getElementById('salary').value.trim(),
        experience: document.getElementById('experience').value.trim(),
        description: document.getElementById('description').value.trim()
    };

    const card = createJobCard(jobData);
    jobCardsContainer.insertBefore(card, jobCardsContainer.firstChild);
    emptyState.style.display = 'none';
    jobForm.reset();
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

function createJobCard(data) {
    const card = document.createElement('div');
    card.className = 'job-card';
    
    populateCardDisplay(card, data);
    attachCardEvents(card, data);
    
    return card;
}

function populateCardDisplay(card, data) {
    // Clone the display template
    const template = jobCardTemplate.content.cloneNode(true);

    // Populate with data (textContent is safe from XSS)
    template.querySelector('.job-title').textContent = data.title;
    template.querySelector('.job-type-badge').textContent = data.type;
    template.querySelector('.job-company span').textContent = data.company;
    template.querySelector('.job-location span').textContent = data.location;
    template.querySelector('.job-card-description').textContent = data.description;

    // Handle conditional salary display
    const salaryEl = template.querySelector('.job-salary');
    if (data.salary) {
        salaryEl.style.display = 'inline-flex';
        salaryEl.querySelector('span').textContent = data.salary;
    }

    // Handle conditional experience display
    const experienceEl = template.querySelector('.job-experience');
    if (data.experience) {
        experienceEl.style.display = 'inline-flex';
        experienceEl.querySelector('span').textContent = data.experience;
    }

    // Clear and append template to card
    card.innerHTML = '';
    card.appendChild(template);
}

function attachCardEvents(card, data) {
    const deleteBtn = card.querySelector('.btn-delete');
    const editBtn = card.querySelector('.btn-edit');

    deleteBtn.addEventListener('click', function () {
        card.classList.add('removing');
        card.addEventListener('animationend', function () {
            card.remove();
            if (!jobCardsContainer.querySelector('.job-card')) {
                emptyState.style.display = 'block';
            }
        });
    });

    editBtn.addEventListener('click', function () {
        enterEditMode(card, data);
    });
}

function enterEditMode(card, data) {
    card.classList.add('editing');

    // Clone the edit template
    const editTemplate = jobCardEditTemplate.content.cloneNode(true);

    // Populate form fields with current data
    editTemplate.querySelector('.edit-title').value = data.title;
    editTemplate.querySelector('.edit-company').value = data.company;
    editTemplate.querySelector('.edit-location').value = data.location;
    editTemplate.querySelector('.edit-type').value = data.type;
    editTemplate.querySelector('.edit-salary').value = data.salary;
    editTemplate.querySelector('.edit-experience').value = data.experience;
    editTemplate.querySelector('.edit-description').value = data.description;

    // Clear card and append edit template
    card.innerHTML = '';
    card.appendChild(editTemplate);

    // Attach save and cancel handlers
    const saveBtn = card.querySelector('.btn-save');
    const cancelBtn = card.querySelector('.btn-cancel');

    saveBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const updatedData = {
            title: card.querySelector('.edit-title').value.trim() || data.title,
            company: card.querySelector('.edit-company').value.trim() || data.company,
            location: card.querySelector('.edit-location').value.trim() || data.location,
            type: card.querySelector('.edit-type').value,
            salary: card.querySelector('.edit-salary').value.trim(),
            experience: card.querySelector('.edit-experience').value.trim(),
            description: card.querySelector('.edit-description').value.trim() || data.description
        };

        card.classList.remove('editing');
        populateCardDisplay(card, updatedData);
        attachCardEvents(card, updatedData);
    });

    cancelBtn.addEventListener('click', function () {
        card.classList.remove('editing');
        populateCardDisplay(card, data);
        attachCardEvents(card, data);
    });
}
