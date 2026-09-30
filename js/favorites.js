// ============================================================
//  SHIFA DIRECTORY — favorites.js
//  Renders the saved/favourited doctors page
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  renderFavorites();
});

function renderFavorites() {
  const grid  = document.getElementById('favDoctorsGrid');
  const favIds = getFavorites();

  if (!favIds.length) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">💔</div>
        <h3>No Saved Doctors Yet</h3>
        <p>Tap the ❤️ button on any doctor's profile to save them here for quick access.</p>
        <a href="index.html" style="display:inline-block;margin-top:20px;padding:12px 28px;background:var(--primary);color:#fff;border-radius:100px;font-weight:700;text-decoration:none;">
          🔍 Find Doctors
        </a>
      </div>`;
    return;
  }

  const favDoctors = DOCTORS.filter(d => favIds.includes(d.id));

  grid.innerHTML = favDoctors.map(d => {
    const spec = getSpecialty(d.specialty_id);
    const city = getCity(d.city_id);
    const initials = d.name.split(' ').slice(0,2).map(n=>n[0]).join('');
    return `
      <div class="doctor-card" style="cursor:default;">
        <div class="doctor-photo-wrap">
          <div class="doctor-photo initials">${initials}</div>
          <div class="gender-icon ${d.gender==='Male'?'gender-m':'gender-f'}">
            ${d.gender==='Male'?'♂ Male':'♀ Female'}
          </div>
        </div>
        <div class="doctor-info">
          <p class="doctor-name"><a href="doctor.html?id=${d.id}" style="color:inherit;text-decoration:none;">${d.name}</a></p>
          <p class="doctor-specialty">${spec.icon||'🩺'} ${spec.name||'Specialist'}</p>
          <p class="doctor-quals">${d.qualifications||''}</p>
          <div class="doctor-meta">
            <span class="meta-item">🏥 <strong>${d.hospital_name}</strong></span>
            <span class="meta-item">📍 ${city.name||''}</span>
            <span class="meta-item">💼 <strong>${d.experience_years}+ yrs</strong></span>
          </div>
        </div>
        <div class="doctor-actions">
          <div class="fee-display">
            <p class="fee-label">Fee</p>
            <p class="fee-amount">PKR ${(d.fee||0).toLocaleString()} <span>/ visit</span></p>
          </div>
          <a href="doctor.html?id=${d.id}" class="btn-book" style="text-align:center;">View Profile</a>
          <button class="btn-fav active" onclick="removeFav(${d.id},this)" title="Remove">❤️</button>
        </div>
      </div>`;
  }).join('');
}

function removeFav(docId, btn) {
  toggleFavorite(docId);
  // Re-render the whole page after removal
  setTimeout(renderFavorites, 100);
}
