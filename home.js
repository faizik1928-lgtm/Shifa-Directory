// ============================================================
//  SHIFA DIRECTORY — app.js  (Home page logic)
//  Builds city cards, specialty cards, hero search
// ============================================================
// (app.js is loaded first and handles shared utilities)

document.addEventListener('DOMContentLoaded', () => {

  /* ── Populate hero dropdowns ── */
  const citySelect      = document.getElementById('heroCity');
  const specialtySelect = document.getElementById('heroSpecialty');

  if (citySelect) {
    CITIES.forEach(c => {
      const o = document.createElement('option');
      o.value = c.id;
      o.textContent = c.name;
      citySelect.appendChild(o);
    });
  }

  if (specialtySelect) {
    SPECIALTIES.forEach(s => {
      const o = document.createElement('option');
      o.value = s.id;
      o.textContent = `${s.icon} ${s.name}`;
      specialtySelect.appendChild(o);
    });
  }

  /* ── Hero search button ── */
  document.getElementById('heroSearchBtn')?.addEventListener('click', () => {
    const city = citySelect?.value || '';
    const spec = specialtySelect?.value || '';
    location.href = `results.html?city=${city}&specialty=${spec}`;
  });

  /* ── Cities grid ── */
  const citiesGrid = document.getElementById('citiesGrid');
  if (citiesGrid) {
    const emojis = ['🕌','🏛️','🌆','🌇','🏙️','🌃','🏟️','🌉','🏔️','🌊'];
    citiesGrid.innerHTML = CITIES.map((c, i) => `
      <a class="city-card" href="results.html?city=${c.id}">
        <div class="city-emoji">${emojis[i % emojis.length]}</div>
        <p class="city-name">${c.name}</p>
        <p class="city-province">${c.province}</p>
      </a>
    `).join('');
  }

  /* ── Specialties grid ── */
  const specGrid = document.getElementById('specialtiesGrid');
  if (specGrid) {
    specGrid.innerHTML = SPECIALTIES.map(s => `
      <a class="specialty-card" href="results.html?specialty=${s.id}">
        <div class="specialty-icon-wrap">${s.icon}</div>
        <p class="specialty-name">${s.name}</p>
      </a>
    `).join('');
  }

  /* ── Footer specialties ── */
  const footerSpec = document.getElementById('footerSpecialties');
  if (footerSpec) {
    footerSpec.innerHTML = SPECIALTIES.slice(0, 6).map(s =>
      `<a href="results.html?specialty=${s.id}">${s.icon} ${s.name}</a>`
    ).join('');
  }
});
