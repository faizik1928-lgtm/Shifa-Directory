// ============================================================
//  SHIFA DIRECTORY — app.js
//  Shared utilities: nav, emergency modal, favorites, toast
// ============================================================

/* ── FAVORITES (localStorage) ── */
const FAV_KEY = 'shifa_favorites';

function getFavorites() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
  catch { return []; }
}

function toggleFavorite(docId) {
  const favs = getFavorites();
  const idx = favs.indexOf(docId);
  if (idx === -1) { favs.push(docId); showToast(`Added to favorites ❤️`, 'success'); }
  else { favs.splice(idx, 1); showToast('Removed from favorites', 'info'); }
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  updateFavCount();
  return idx === -1;
}

function isFavorite(docId) { return getFavorites().includes(docId); }

function updateFavCount() {
  const count = getFavorites().length;
  document.querySelectorAll('#headerFavCount').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

/* ── TOAST ── */
let toastTimer;
function showToast(msg, type = 'info') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

const MALE_DOCTOR_PHOTOS = [
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=300&auto=format&fit=crop&q=80"
];

const FEMALE_DOCTOR_PHOTOS = [
  "https://images.unsplash.com/photo-1594824813566-88824278c1a5?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&auto=format&fit=crop&q=80"
];

function getDoctorPhotoUrl(doc) {
  if (doc.photo) return doc.photo;
  const list = doc.gender === 'Female' ? FEMALE_DOCTOR_PHOTOS : MALE_DOCTOR_PHOTOS;
  return list[(doc.id || 0) % list.length];
}

/* ── DOCTOR CARD HTML ── */
function doctorCardHTML(doc) {
  const spec = getSpecialty(doc.specialty_id);
  const city = getCity(doc.city_id);
  const fav  = isFavorite(doc.id);
  const initials = doc.name.split(' ').slice(0,2).map(n => n[0]).join('');
  const photoUrl = getDoctorPhotoUrl(doc);
  const stars = '⭐'.repeat(Math.round(doc.rating || 5));
  const daysHTML = (doc.days_available || []).map(d =>
    `<span class="day-chip">${d}</span>`
  ).join('');

  return `
  <a class="doctor-card" href="doctor.html?id=${doc.id}" id="doccard-${doc.id}">
    <div class="doctor-photo-wrap">
      <div class="doctor-photo">
        <img src="${photoUrl}" alt="${doc.name}" loading="lazy" onerror="this.onerror=null; this.parentElement.classList.add('initials'); this.parentElement.innerHTML='${initials}';" />
      </div>
      <div class="gender-icon ${doc.gender === 'Male' ? 'gender-m' : 'gender-f'}">
        ${doc.gender === 'Male' ? '♂ Male' : '♀ Female'}
      </div>
    </div>
    <div class="doctor-info">
      <p class="doctor-name">${doc.name}</p>
      <p class="doctor-specialty">${spec.icon || '🩺'} ${spec.name || 'Specialist'}</p>
      <p class="doctor-quals">${doc.qualifications || ''}</p>
      <div class="doctor-meta">
        <span class="meta-item">🏥 <strong>${doc.hospital_name}</strong></span>
        <span class="meta-item">📍 ${city.name || ''}</span>
        <span class="meta-item">🕐 ${doc.timings || 'Contact for timings'}</span>
        <span class="meta-item">💼 <strong>${doc.experience_years}+ yrs</strong></span>
      </div>
      <div class="rating-row">
        <span class="stars">${'★'.repeat(Math.floor(doc.rating || 5))}${'☆'.repeat(5 - Math.floor(doc.rating || 5))}</span>
        <span style="font-weight:700;color:var(--text)">${doc.rating || 5}</span>
        <span style="color:var(--muted)">(${doc.reviews || 0} reviews)</span>
      </div>
      <div class="doctor-days" style="margin-top:8px;">${daysHTML}</div>
    </div>
    <div class="doctor-actions">
      <div class="fee-display">
        <p class="fee-label">Consultation</p>
        <p class="fee-amount">PKR ${(doc.fee || 0).toLocaleString()} <span>/ visit</span></p>
      </div>
      <button class="btn-book" onclick="event.preventDefault();event.stopPropagation();window.open('tel:${doc.phone}','_self')">
        📞 Call Now
      </button>
      <button class="btn-fav ${fav ? 'active' : ''}" data-id="${doc.id}"
        onclick="event.preventDefault();event.stopPropagation();handleFavBtn(this,${doc.id})">
        ${fav ? '❤️' : '🤍'}
      </button>
    </div>
  </a>`;
}

function handleFavBtn(btn, docId) {
  const added = toggleFavorite(docId);
  btn.textContent = added ? '❤️' : '🤍';
  btn.classList.toggle('active', added);
}

/* ── EMERGENCY MODAL ── */
function initEmergency() {
  const btn   = document.getElementById('emergencyBtn');
  const modal = document.getElementById('emergencyModal');
  const close = document.getElementById('modalClose');
  const list  = document.getElementById('emergencyList');

  if (!btn || !modal) return;

  if (list) {
    list.innerHTML = EMERGENCY_NUMBERS.map(e => `
      <div class="emergency-item">
        <span>${e.name}</span>
        <a href="tel:${e.number}" class="emergency-call-btn">📞 ${e.number}</a>
      </div>
    `).join('');
  }

  btn.addEventListener('click', () => modal.classList.remove('hidden'));
  close?.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

/* ── NAV SEARCH ── */
function initNavSearch() {
  const input = document.getElementById('navSearch');
  const box   = document.getElementById('navSuggestions');
  if (!input || !box) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { box.classList.add('hidden'); return; }

    const matches = DOCTORS.filter(d =>
      d.name.toLowerCase().includes(q) ||
      (getSpecialty(d.specialty_id).name || '').toLowerCase().includes(q) ||
      d.hospital_name.toLowerCase().includes(q)
    ).slice(0, 6);

    if (!matches.length) { box.classList.add('hidden'); return; }

    box.classList.remove('hidden');
    box.innerHTML = matches.map(d => {
      const sp = getSpecialty(d.specialty_id);
      return `
        <div class="suggestion-item" onclick="location.href='doctor.html?id=${d.id}'">
          <span>${sp.icon || '🩺'}</span>
          <div>
            <p style="font-weight:600;font-size:0.88rem">${d.name}</p>
            <p style="font-size:0.75rem;color:var(--muted)">${sp.name} · ${getCity(d.city_id).name}</p>
          </div>
        </div>`;
    }).join('');
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !box.contains(e.target))
      box.classList.add('hidden');
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initEmergency();
  initNavSearch();
  updateFavCount();
});
