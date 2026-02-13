const jobForm = document.getElementById('job-form');
const jobCardsContainer = document.getElementById('jobCardsContainer');
const emptyState = document.getElementById('emptyState');

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
    card.innerHTML = buildCardHTML(data);
    attachCardEvents(card, data);
    return card;
}

function buildCardHTML(data) {
    return `
        <div class="job-card-header">
            <h3>${escapeHTML(data.title)}</h3>
            <span class="job-type-badge">${escapeHTML(data.type)}</span>
        </div>
        <div class="job-card-meta">
            <span><i class="fa-solid fa-building"></i> ${escapeHTML(data.company)}</span>
            <span><i class="fa-solid fa-location-dot"></i> ${escapeHTML(data.location)}</span>
            ${data.salary ? `<span><i class="fa-solid fa-indian-rupee-sign"></i> ${escapeHTML(data.salary)}</span>` : ''}
            ${data.experience ? `<span><i class="fa-solid fa-clock"></i> ${escapeHTML(data.experience)}</span>` : ''}
        </div>
        <div class="job-card-description">${escapeHTML(data.description)}</div>
        <div class="job-card-actions">
            <button class="btn-edit"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn-delete"><i class="fa-solid fa-trash-can"></i> Delete</button>
        </div>
    `;
}

function attachCardEvents(card, data) {
    card.querySelector('.btn-delete').addEventListener('click', function () {
        card.classList.add('removing');
        card.addEventListener('animationend', function () {
            card.remove();
            if (!jobCardsContainer.querySelector('.job-card')) {
                emptyState.style.display = 'block';
            }
        });
    });

    card.querySelector('.btn-edit').addEventListener('click', function () {
        enterEditMode(card, data);
    });
}

function enterEditMode(card, data) {
    card.classList.add('editing');
    card.innerHTML = `
        <div class="form-group">
            <label>Job Title</label>
            <input type="text" class="edit-input" id="editTitle" value="${escapeAttr(data.title)}">
        </div>
        <div class="form-group">
            <label>Company Name</label>
            <input type="text" class="edit-input" id="editCompany" value="${escapeAttr(data.company)}">
        </div>
        <div class="form-group">
            <label>Location</label>
            <input type="text" class="edit-input" id="editLocation" value="${escapeAttr(data.location)}">
        </div>
        <div class="form-group">
            <label>Job Type</label>
            <select class="edit-select" id="editType">
                <option value="Full-time" ${data.type === 'Full-time' ? 'selected' : ''}>Full-time</option>
                <option value="Part-time" ${data.type === 'Part-time' ? 'selected' : ''}>Part-time</option>
                <option value="Contract" ${data.type === 'Contract' ? 'selected' : ''}>Contract</option>
                <option value="Internship" ${data.type === 'Internship' ? 'selected' : ''}>Internship</option>
                <option value="Remote" ${data.type === 'Remote' ? 'selected' : ''}>Remote</option>
            </select>
        </div>
        <div class="form-group">
            <label>Salary Range</label>
            <input type="text" class="edit-input" id="editSalary" value="${escapeAttr(data.salary)}">
        </div>
        <div class="form-group">
            <label>Experience</label>
            <input type="text" class="edit-input" id="editExperience" value="${escapeAttr(data.experience)}">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="edit-textarea" id="editDescription" rows="3">${escapeHTML(data.description)}</textarea>
        </div>
        <div class="job-card-actions">
            <button class="btn-save"><i class="fa-solid fa-check"></i> Save</button>
            <button class="btn-cancel"><i class="fa-solid fa-xmark"></i> Cancel</button>
        </div>
    `;

    card.querySelector('.btn-save').addEventListener('click', function () {
        const updatedData = {
            title: card.querySelector('#editTitle').value.trim() || data.title,
            company: card.querySelector('#editCompany').value.trim() || data.company,
            location: card.querySelector('#editLocation').value.trim() || data.location,
            type: card.querySelector('#editType').value,
            salary: card.querySelector('#editSalary').value.trim(),
            experience: card.querySelector('#editExperience').value.trim(),
            description: card.querySelector('#editDescription').value.trim() || data.description
        };
        card.classList.remove('editing');
        card.innerHTML = buildCardHTML(updatedData);
        attachCardEvents(card, updatedData);
    });

    card.querySelector('.btn-cancel').addEventListener('click', function () {
        card.classList.remove('editing');
        card.innerHTML = buildCardHTML(data);
        attachCardEvents(card, data);
    });
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function escapeAttr(str) {
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
