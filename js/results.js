// ============================================================
//  SHIFA DIRECTORY — results.js
//  Search / filter / sort / paginate doctor listings
// ============================================================

const ITEMS_PER_PAGE = 8;
let currentPage = 1;
let filteredDocs = [];

document.addEventListener('DOMContentLoaded', () => {

  /* ── Read URL params ── */
  const params    = new URLSearchParams(location.search);
  const initCity  = params.get('city')      || '';
  const initSpec  = params.get('specialty') || '';

  /* ── Populate filter dropdowns ── */
  const cityEl = document.getElementById('filterCity');
  const specEl = document.getElementById('filterSpecialty');

  CITIES.forEach(c => {
    const o = document.createElement('option');
    o.value = c.id;
    o.textContent = c.name;
    if (String(c.id) === initCity) o.selected = true;
    cityEl.appendChild(o);
  });

  SPECIALTIES.forEach(s => {
    const o = document.createElement('option');
    o.value = s.id;
    o.textContent = `${s.icon} ${s.name}`;
    if (String(s.id) === initSpec) o.selected = true;
    specEl.appendChild(o);
  });

  /* ── Update banner heading ── */
  function updateHeading() {
    const cityName = initCity   ? (getCity(Number(initCity)).name      || '') : '';
    const specName = initSpec   ? (getSpecialty(Number(initSpec)).name || '') : '';
    const h = document.getElementById('resultsHeading');
    const s = document.getElementById('resultsSubHeading');
    if (cityName || specName) {
      h.textContent = [specName, cityName ? `in ${cityName}` : ''].filter(Boolean).join(' ') || 'Find Doctors';
    }
    if (s) s.textContent = `Showing available doctors${cityName ? ` in ${cityName}` : ''}`;
  }
  updateHeading();

  /* ── Fee range display ── */
  const feeRange = document.getElementById('feeRange');
  const feeValue = document.getElementById('feeValue');
  feeRange?.addEventListener('input', () => {
    const v = Number(feeRange.value);
    feeValue.textContent = v >= 10000 ? 'Any' : `PKR ${v.toLocaleString()}`;
    runFilter();
  });

  /* ── Mobile filter toggle ── */
  document.getElementById('filterToggleBtn')?.addEventListener('click', () => {
    const sidebar = document.getElementById('filtersSidebar');
    sidebar.classList.toggle('open');
  });

  /* ── Clear filters ── */
  document.getElementById('clearFiltersBtn')?.addEventListener('click', () => {
    cityEl.value = '';
    specEl.value = '';
    document.querySelectorAll('[name="gender"]')[0].checked = true;
    feeRange.value = 10000;
    feeValue.textContent = 'Any';
    document.getElementById('filterExp').value = '0';
    runFilter();
    showToast('Filters cleared', 'info');
  });

  /* ── Event listeners ── */
  cityEl.addEventListener('change', () => { currentPage = 1; runFilter(); });
  specEl.addEventListener('change', () => { currentPage = 1; runFilter(); });
  document.querySelectorAll('[name="gender"]').forEach(r => r.addEventListener('change', () => { currentPage = 1; runFilter(); }));
  document.getElementById('filterExp')?.addEventListener('change', () => { currentPage = 1; runFilter(); });
  document.getElementById('sortSelect')?.addEventListener('change', renderResults);

  /* ── Initial render ── */
  runFilter();
});

function runFilter() {
  const cityVal   = document.getElementById('filterCity')?.value || '';
  const specVal   = document.getElementById('filterSpecialty')?.value || '';
  const genderVal = document.querySelector('[name="gender"]:checked')?.value || '';
  const maxFee    = Number(document.getElementById('feeRange')?.value || 10000);
  const minExp    = Number(document.getElementById('filterExp')?.value || 0);

  filteredDocs = DOCTORS.filter(d => {
    if (!d.is_active) return false;
    if (cityVal  && String(d.city_id)      !== cityVal)  return false;
    if (specVal  && String(d.specialty_id) !== specVal)  return false;
    if (genderVal && d.gender !== genderVal)             return false;
    if (maxFee < 10000 && d.fee > maxFee)                return false;
    if (d.experience_years < minExp)                     return false;
    return true;
  });

  // Count badge
  const total = filteredDocs.length;
  const count = document.getElementById('docCount');
  if (count) count.textContent = total;

  currentPage = 1;
  renderResults();
  updateFilterBadge();
}

function sortDocs(docs) {
  const sort = document.getElementById('sortSelect')?.value || 'default';
  const d = [...docs];
  switch (sort) {
    case 'exp-desc':   return d.sort((a,b) => b.experience_years - a.experience_years);
    case 'fee-asc':    return d.sort((a,b) => a.fee - b.fee);
    case 'fee-desc':   return d.sort((a,b) => b.fee - a.fee);
    case 'name-asc':   return d.sort((a,b) => a.name.localeCompare(b.name));
    case 'rating':     return d.sort((a,b) => (b.rating||0) - (a.rating||0));
    default:           return d;
  }
}

function renderResults() {
  const grid = document.getElementById('doctorsGrid');
  if (!grid) return;

  const sorted = sortDocs(filteredDocs);
  const start  = (currentPage - 1) * ITEMS_PER_PAGE;
  const page   = sorted.slice(start, start + ITEMS_PER_PAGE);

  if (!page.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No Doctors Found</h3>
        <p>Try adjusting your filters or search in a different city.</p>
      </div>`;
    document.getElementById('pagination').innerHTML = '';
    return;
  }

  grid.innerHTML = page.map(doctorCardHTML).join('');
  renderPagination(sorted.length);
}

function renderPagination(total) {
  const pag = document.getElementById('pagination');
  if (!pag) return;
  const pages = Math.ceil(total / ITEMS_PER_PAGE);
  if (pages <= 1) { pag.innerHTML = ''; return; }

  let html = `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goPage(${currentPage-1})">‹</button>`;
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || Math.abs(i - currentPage) <= 1) {
      html += `<button class="page-btn ${i===currentPage?'active':''}" onclick="goPage(${i})">${i}</button>`;
    } else if (Math.abs(i - currentPage) === 2) {
      html += `<span style="padding:0 6px;color:var(--muted)">…</span>`;
    }
  }
  html += `<button class="page-btn" ${currentPage === pages ? 'disabled' : ''} onclick="goPage(${currentPage+1})">›</button>`;
  pag.innerHTML = html;
}

function goPage(n) {
  currentPage = n;
  renderResults();
  document.querySelector('.sort-bar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateFilterBadge() {
  const cityVal   = document.getElementById('filterCity')?.value || '';
  const specVal   = document.getElementById('filterSpecialty')?.value || '';
  const genderVal = document.querySelector('[name="gender"]:checked')?.value || '';
  const maxFee    = Number(document.getElementById('feeRange')?.value || 10000);
  const minExp    = Number(document.getElementById('filterExp')?.value || 0);

  let count = 0;
  if (cityVal)       count++;
  if (specVal)       count++;
  if (genderVal)     count++;
  if (maxFee < 10000) count++;
  if (minExp > 0)    count++;

  const badge  = document.getElementById('filterCountBadge');
  const badge2 = document.getElementById('activeFilterCount');
  [badge, badge2].forEach(b => {
    if (!b) return;
    b.textContent = count;
    b.style.display = count > 0 ? 'inline-block' : 'none';
  });
}
