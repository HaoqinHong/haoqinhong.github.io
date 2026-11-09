(() => {
  const controls = document.querySelector('.publication-filters');
  if (!controls) return;
  const items = [...document.querySelectorAll('#four .publication-list:not(.project-feature) .publication-item')];
  const groups = [...new Set(items.map(item => item.closest('.intro-card')).filter(Boolean))];
  groups.forEach(group => group.classList.add('publication-filter-group'));
  items.forEach(item => {
    const authors = item.querySelector('.publication-authors')?.textContent.trim() || '';
    item.dataset.first = /^Haoqin Hong\b/.test(authors) ? 'true' : 'false';
    item.dataset.cofirst = /Haoqin Hong\s*\*/.test(authors) ? 'true' : 'false';
  });
  const include = controls.querySelector('#include-cofirst');
  let selected = 'all';
  function filter(value) {
    selected = value; include.disabled = value !== 'first';
    items.forEach(item => {
      item.hidden = value === 'first' && !(item.dataset.first === 'true' || include.checked && item.dataset.cofirst === 'true');
    });
    groups.forEach(group => { group.hidden = !items.some(item => group.contains(item) && !item.hidden); });
    controls.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
    controls.querySelector('.publication-count').textContent = `${items.filter(item => !item.hidden).length} / ${items.length}`;
  }
  include.addEventListener('change', () => filter(selected));
  controls.querySelectorAll('button').forEach(button => button.addEventListener('click', () => filter(button.dataset.filter)));
  controls.hidden = false;
  filter('all');
})();