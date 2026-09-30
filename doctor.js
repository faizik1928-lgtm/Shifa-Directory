// ============================================================
//  SHIFA DIRECTORY — doctor.js
//  Renders the full doctor profile page
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('id'));

  const doc = getDoctor(id);

  if (!doc) {
    document.getElementById('profileCard').innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:40px;">
        <p style="font-size:3rem">😕</p>
        <h2 style="margin:16px 0 8px">Doctor Not Found</h2>
        <p style="color:var(--muted)">The doctor you're looking for doesn't exist.</p>
        <a href="index.html" style="margin-top:16px;display:inline-block;color:var(--primary);font-weight:600;">← Back to Home</a>
      </div>`;
    return;
  }

  const spec  = getSpecialty(doc.specialty_id);
  const city  = getCity(doc.city_id);
  const fav   = isFavorite(doc.id);
  const initials = doc.name.split(' ').slice(0,2).map(n => n[0]).join('');

  /* ── Update page title & meta ── */
  document.title = `${doc.name} – ${spec.name} in ${city.name} | Shifa Directory`;
  document.querySelector('meta[name="description"]')?.setAttribute('content',
    `Book an appointment with ${doc.name}, ${spec.name} at ${doc.hospital_name} in ${city.name}. Fee: PKR ${doc.fee}.`);

  /* ── Breadcrumb ── */
  document.getElementById('breadSpecialty').textContent = spec.name || 'Doctors';
  document.getElementById('breadSpecialty').href = `results.html?specialty=${doc.specialty_id}`;
  document.getElementById('breadName').textContent = doc.name;

  /* ── Profile hero card ── */
  const photoUrl = typeof getDoctorPhotoUrl === 'function' ? getDoctorPhotoUrl(doc) : (doc.photo || '');
  document.getElementById('profileCard').innerHTML = `
    <div class="profile-photo">
      <img src="${photoUrl}" alt="${doc.name}" loading="lazy" onerror="this.onerror=null; this.parentElement.innerHTML='${initials}';" />
    </div>
    <div>
      <h1 class="profile-name">${doc.name}</h1>
      <p class="profile-specialty">${spec.icon || '🩺'} ${spec.name || 'Specialist'}</p>
      <p class="profile-quals">${doc.qualifications || ''}</p>
      <div class="profile-badges">
        <span class="badge badge-teal">💼 ${doc.experience_years}+ Years</span>
        <span class="badge badge-blue">${doc.gender === 'Male' ? '♂ Male' : '♀ Female'}</span>
        <span class="badge badge-green">📍 ${city.name}</span>
        ${doc.is_active ? '<span class="badge badge-green">✅ Accepting Patients</span>' : ''}
      </div>
      <div class="profile-rating">
        <span style="color:#f39c12;font-size:1rem">${'★'.repeat(Math.floor(doc.rating||5))}${'☆'.repeat(5-Math.floor(doc.rating||5))}</span>
        <strong>${doc.rating || 5}</strong>
        <span style="color:var(--muted)">(${doc.reviews || 0} reviews)</span>
      </div>
    </div>
    <div class="profile-cta">
      <div class="fee-big">
        <p class="label">Consultation Fee</p>
        <p class="amount">PKR ${(doc.fee || 0).toLocaleString()}</p>
      </div>
      ${doc.phone ? `<a href="tel:${doc.phone}" class="btn-call">📞 ${doc.phone}</a>` : ''}
      ${doc.whatsapp ? `<a href="https://wa.me/${doc.whatsapp}?text=Salam,%20I%20want%20to%20book%20an%20appointment%20with%20${encodeURIComponent(doc.name)}" target="_blank" class="btn-whatsapp">💬 WhatsApp</a>` : ''}
      <button class="btn-fav-big ${fav ? 'active' : ''}" id="favBigBtn" onclick="handleFavBigBtn(${doc.id})">
        ${fav ? '❤️ Saved' : '🤍 Save Doctor'}
      </button>
    </div>
  `;

  /* ── About ── */
  if (doc.about) {
    document.getElementById('aboutSection').style.display = '';
    document.getElementById('aboutText').textContent = doc.about;
  }

  /* ── Details grid ── */
  document.getElementById('detailsSection').style.display = '';
  document.getElementById('infoGrid').innerHTML = `
    <div class="info-item"><label>Hospital / Clinic</label><p>${doc.hospital_name}</p></div>
    <div class="info-item"><label>Specialty</label><p>${spec.name}</p></div>
    <div class="info-item"><label>Experience</label><p>${doc.experience_years}+ Years</p></div>
    <div class="info-item"><label>City</label><p>${city.name}, ${city.province}</p></div>
    <div class="info-item"><label>Area</label><p>${doc.area || '—'}</p></div>
    <div class="info-item"><label>Fee</label><p>PKR ${(doc.fee || 0).toLocaleString()}</p></div>
  `;

  /* ── Location ── */
  document.getElementById('locationSection').style.display = '';
  document.getElementById('locAddress').textContent = doc.address || `${doc.hospital_name}, ${city.name}`;
  document.getElementById('mapLink').href =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doc.address || doc.hospital_name + ' ' + city.name)}`;

  /* ── Timings ── */
  document.getElementById('timingsSection').style.display = '';
  const days = doc.days_available || [];
  const allDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  document.getElementById('timingsGrid').innerHTML =
    allDays.map(d => {
      const avail = days.includes(d);
      return `
        <div class="timing-row">
          <span style="font-weight:${avail ? '600' : '400'};color:${avail ? 'var(--text)' : 'var(--muted)'}">${d}</span>
          ${avail
            ? `<span style="font-weight:600;color:var(--primary)">${doc.timings || 'Available'}</span>`
            : `<span style="color:var(--muted);font-size:0.8rem">Closed</span>`
          }
        </div>`;
    }).join('');

  /* ── Contact ── */
  document.getElementById('contactSection').style.display = '';
  let contactHTML = '';
  if (doc.phone) {
    contactHTML += `
      <a href="tel:${doc.phone}" class="btn-call" style="justify-content:center">
        📞 Call: ${doc.phone}
      </a>`;
  }
  if (doc.whatsapp) {
    contactHTML += `
      <a href="https://wa.me/${doc.whatsapp}?text=Salam,%20I%20want%20to%20book%20an%20appointment%20with%20${encodeURIComponent(doc.name)}"
         target="_blank" class="btn-whatsapp" style="justify-content:center">
        💬 WhatsApp Chat
      </a>`;
  }
  document.getElementById('contactGrid').innerHTML = contactHTML;

  /* ── Similar Doctors ── */
  const similar = DOCTORS.filter(d =>
    d.id !== doc.id && d.specialty_id === doc.specialty_id && d.is_active
  ).slice(0, 3);

  if (similar.length) {
    document.getElementById('similarSection').style.display = '';
    document.getElementById('similarList').innerHTML = similar.map(d => {
      const sp = getSpecialty(d.specialty_id);
      const ct = getCity(d.city_id);
      return `
        <a href="doctor.html?id=${d.id}" style="display:flex;align-items:center;gap:12px;padding:10px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--bg);text-decoration:none;color:var(--text);transition:var(--transition);"
           onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
          <div style="width:44px;height:44px;border-radius:10px;background:var(--primary-light);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--primary);font-size:1rem;flex-shrink:0;">
            ${d.name.split(' ').slice(0,2).map(n=>n[0]).join('')}
          </div>
          <div>
            <p style="font-weight:600;font-size:0.88rem">${d.name}</p>
            <p style="font-size:0.75rem;color:var(--muted)">${sp.name} · ${ct.name}</p>
          </div>
        </a>`;
    }).join('');
  }
});

function handleFavBigBtn(docId) {
  const btn = document.getElementById('favBigBtn');
  const added = toggleFavorite(docId);
  btn.textContent = added ? '❤️ Saved' : '🤍 Save Doctor';
  btn.classList.toggle('active', added);
}
