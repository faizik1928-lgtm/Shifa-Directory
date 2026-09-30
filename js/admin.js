// ============================================================
//  SHIFA DIRECTORY — admin.js
//  Admin panel: login, CRUD operations on local data
// ============================================================

const ADMIN_CREDS = { user: 'faiziworks', pass: 'shifa@directory321321' };
const SESSION_KEY = 'shifa_admin_session';

// We work with a mutable local copy
let localDoctors = JSON.parse(JSON.stringify(DOCTORS));

/* ── LOGIN ── */
document.getElementById('loginForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const user = document.getElementById('adminUser').value.trim();
  const pass = document.getElementById('adminPass').value.trim();

  if (user === ADMIN_CREDS.user && pass === ADMIN_CREDS.pass) {
    sessionStorage.setItem(SESSION_KEY, '1');
    showAdmin();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
});

document.getElementById('logoutBtn')?.addEventListener('click', () => {
  sessionStorage.removeItem(SESSION_KEY);
  location.reload();
});

function checkSession() {
  if (sessionStorage.getItem(SESSION_KEY)) showAdmin();
}

function showAdmin() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminDashboard').style.display = '';
  initAdmin();
}

/* ── SIDEBAR NAV ── */
function initAdmin() {
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.admin-nav-item').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.admin-section').forEach(x => x.classList.remove('active'));
      item.classList.add('active');
      document.getElementById('section-' + item.dataset.section)?.classList.add('active');
    });
  });

  renderDashboard();
  renderDoctorsTable();
  renderSpecialtiesTable();
  renderCitiesTable();
  initDoctorForm();
}

/* ── DASHBOARD ── */
function renderDashboard() {
  const total    = localDoctors.length;
  const active   = localDoctors.filter(d => d.is_active).length;
  const cities   = new Set(localDoctors.map(d => d.city_id)).size;
  const specialties = new Set(localDoctors.map(d => d.specialty_id)).size;

  document.getElementById('statsGrid').innerHTML = `
    <div class="stat-card"><span class="stat-icon">👨‍⚕️</span><div><p class="stat-value">${total}</p><p class="stat-label">Total Doctors</p></div></div>
    <div class="stat-card"><span class="stat-icon">✅</span><div><p class="stat-value">${active}</p><p class="stat-label">Active Listings</p></div></div>
    <div class="stat-card"><span class="stat-icon">🏙️</span><div><p class="stat-value">${cities}</p><p class="stat-label">Cities Covered</p></div></div>
    <div class="stat-card"><span class="stat-icon">🏷️</span><div><p class="stat-value">${specialties}</p><p class="stat-label">Specialties</p></div></div>
  `;

  const tbody = document.getElementById('recentDoctorsBody');
  const recent = localDoctors.slice(-5).reverse();
  tbody.innerHTML = recent.map(d => {
    const sp = getSpecialty(d.specialty_id);
    const ct = getCity(d.city_id);
    return `<tr>
      <td><strong>${d.name}</strong></td>
      <td>${sp.icon||''} ${sp.name||'—'}</td>
      <td>${ct.name||'—'}</td>
      <td>PKR ${(d.fee||0).toLocaleString()}</td>
      <td><span class="badge ${d.is_active?'badge-green':'badge-coral'}">${d.is_active?'Active':'Inactive'}</span></td>
    </tr>`;
  }).join('');
}

/* ── DOCTORS TABLE ── */
function renderDoctorsTable(filter = '') {
  const tbody = document.getElementById('doctorsTableBody');
  const list  = localDoctors.filter(d =>
    !filter ||
    d.name.toLowerCase().includes(filter) ||
    d.hospital_name.toLowerCase().includes(filter)
  );

  tbody.innerHTML = list.map(d => {
    const sp = getSpecialty(d.specialty_id);
    const ct = getCity(d.city_id);
    return `<tr>
      <td><strong>${d.name}</strong></td>
      <td>${sp.icon||''} ${sp.name||'—'}</td>
      <td>${ct.name||'—'}</td>
      <td>${d.hospital_name}</td>
      <td>PKR ${(d.fee||0).toLocaleString()}</td>
      <td>
        <label class="active-toggle" onclick="toggleActive(${d.id})">
          <input type="checkbox" ${d.is_active?'checked':''} readonly />
          <span class="toggle-track"></span>
          <span class="toggle-thumb"></span>
        </label>
      </td>
      <td>
        <div class="action-btns">
          <button class="btn-edit" onclick="editDoctor(${d.id})">✏️ Edit</button>
          <button class="btn-delete" onclick="deleteDoctor(${d.id})">🗑️ Delete</button>
        </div>
      </td>
    </tr>`;
  }).join('');

  if (!list.length) tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:24px">No doctors found</td></tr>';
}

document.getElementById('adminDocSearch')?.addEventListener('input', e => {
  renderDoctorsTable(e.target.value.toLowerCase().trim());
});

/* ── SPECIALTIES TABLE ── */
function renderSpecialtiesTable() {
  const tbody = document.getElementById('specialtiesTableBody');
  tbody.innerHTML = SPECIALTIES.map(s => {
    const count = localDoctors.filter(d => d.specialty_id === s.id).length;
    return `<tr>
      <td style="font-size:1.5rem">${s.icon}</td>
      <td><strong>${s.name}</strong></td>
      <td><code style="background:var(--bg);padding:2px 6px;border-radius:4px;font-size:0.78rem">${s.slug}</code></td>
      <td><span class="badge badge-teal">${count}</span></td>
    </tr>`;
  }).join('');
}

/* ── CITIES TABLE ── */
function renderCitiesTable() {
  const tbody = document.getElementById('citiesTableBody');
  tbody.innerHTML = CITIES.map(c => {
    const count = localDoctors.filter(d => d.city_id === c.id).length;
    return `<tr>
      <td><strong>${c.name}</strong></td>
      <td>${c.province}</td>
      <td><span class="badge badge-blue">${count}</span></td>
    </tr>`;
  }).join('');
}

/* ── TOGGLE ACTIVE ── */
function toggleActive(id) {
  const doc = localDoctors.find(d => d.id === id);
  if (doc) {
    doc.is_active = !doc.is_active;
    renderDoctorsTable();
    renderDashboard();
    showToast(`${doc.name} is now ${doc.is_active ? 'Active' : 'Inactive'}`, 'info');
  }
}

/* ── DELETE ── */
function deleteDoctor(id) {
  if (!confirm('Are you sure you want to delete this doctor?')) return;
  const idx = localDoctors.findIndex(d => d.id === id);
  if (idx !== -1) {
    const name = localDoctors[idx].name;
    localDoctors.splice(idx, 1);
    renderDoctorsTable();
    renderDashboard();
    showToast(`${name} deleted`, 'error');
  }
}

/* ── DOCTOR FORM ── */
let editingId = null;

function initDoctorForm() {
  // Populate specialty dropdown in form
  const specSel = document.getElementById('fSpecialty');
  SPECIALTIES.forEach(s => {
    const o = document.createElement('option');
    o.value = s.id;
    o.textContent = `${s.icon} ${s.name}`;
    specSel.appendChild(o);
  });

  // Populate city dropdown in form
  const citySel = document.getElementById('fCity');
  CITIES.forEach(c => {
    const o = document.createElement('option');
    o.value = c.id;
    o.textContent = c.name;
    citySel.appendChild(o);
  });

  document.getElementById('addDoctorBtn')?.addEventListener('click', () => openForm(null));
  document.getElementById('cancelFormBtn')?.addEventListener('click', closeForm);
  document.getElementById('saveFormBtn')?.addEventListener('click', saveDoctor);

  // Close modal on overlay click
  document.getElementById('doctorFormModal')?.addEventListener('click', e => {
    if (e.target.id === 'doctorFormModal') closeForm();
  });
}

function openForm(docId) {
  editingId = docId;
  const modal = document.getElementById('doctorFormModal');
  document.getElementById('formTitle').textContent = docId ? '✏️ Edit Doctor' : '➕ Add New Doctor';

  if (docId) {
    const d = localDoctors.find(x => x.id === docId);
    if (!d) return;
    document.getElementById('doctorId').value      = d.id;
    document.getElementById('fName').value         = d.name;
    document.getElementById('fGender').value       = d.gender;
    document.getElementById('fSpecialty').value    = d.specialty_id;
    document.getElementById('fCity').value         = d.city_id;
    document.getElementById('fQuals').value        = d.qualifications || '';
    document.getElementById('fExp').value          = d.experience_years;
    document.getElementById('fFee').value          = d.fee;
    document.getElementById('fHospital').value     = d.hospital_name;
    document.getElementById('fArea').value         = d.area || '';
    document.getElementById('fPhone').value        = d.phone || '';
    document.getElementById('fWhatsapp').value     = d.whatsapp || '';
    document.getElementById('fTimings').value      = d.timings || '';
    document.getElementById('fAddress').value      = d.address || '';
    document.getElementById('fAbout').value        = d.about || '';
    document.getElementById('fActive').checked     = d.is_active;
  } else {
    document.getElementById('doctorForm').reset();
    document.getElementById('fActive').checked = true;
  }

  modal.classList.add('open');
}

function editDoctor(id) { openForm(id); }

function closeForm() {
  document.getElementById('doctorFormModal').classList.remove('open');
  editingId = null;
}

function saveDoctor() {
  const name = document.getElementById('fName').value.trim();
  if (!name) { showToast('Name is required', 'error'); return; }

  const data = {
    name,
    gender:          document.getElementById('fGender').value,
    specialty_id:    Number(document.getElementById('fSpecialty').value),
    city_id:         Number(document.getElementById('fCity').value),
    qualifications:  document.getElementById('fQuals').value.trim(),
    experience_years: Number(document.getElementById('fExp').value),
    fee:             Number(document.getElementById('fFee').value),
    hospital_name:   document.getElementById('fHospital').value.trim(),
    area:            document.getElementById('fArea').value.trim(),
    phone:           document.getElementById('fPhone').value.trim(),
    whatsapp:        document.getElementById('fWhatsapp').value.trim(),
    timings:         document.getElementById('fTimings').value.trim(),
    address:         document.getElementById('fAddress').value.trim(),
    about:           document.getElementById('fAbout').value.trim(),
    is_active:       document.getElementById('fActive').checked,
    days_available:  ['Mon','Tue','Wed','Thu','Fri'],
    rating:          4.5,
    reviews:         0,
    photo:           null,
  };

  if (editingId) {
    const idx = localDoctors.findIndex(d => d.id === editingId);
    if (idx !== -1) {
      localDoctors[idx] = { ...localDoctors[idx], ...data };
      showToast(`${name} updated ✅`, 'success');
    }
  } else {
    const newId = Math.max(...localDoctors.map(d => d.id)) + 1;
    localDoctors.push({ id: newId, ...data });
    showToast(`${name} added ✅`, 'success');
  }

  closeForm();
  renderDoctorsTable();
  renderDashboard();
}

/* ── BOOT ── */
checkSession();
