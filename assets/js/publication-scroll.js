(() => {
  const lists = [...document.querySelectorAll('#four .publication-list:not(.project-feature)')];
  lists.forEach(list => {
    list.classList.add('publication-scroll');
    list.tabIndex = 0;
    list.setAttribute('role', 'region');
    list.setAttribute('aria-label', list.previousElementSibling?.textContent.trim() || 'Publications');
    function measure() {
      const cards = [...list.children].filter(card => card.classList.contains('publication-item') && !card.hidden);
      const gap = parseFloat(getComputedStyle(list).rowGap) || 0;
      if (cards.length > 10) {
        const height = cards.slice(0, 10).reduce((sum,card) => sum + card.getBoundingClientRect().height, 0) + gap * 9;
        list.style.setProperty('--ten-paper-height', `${height}px`);
      } else list.style.removeProperty('--ten-paper-height');
    }
    const observer = new ResizeObserver(measure);
    [...list.children].forEach(card => observer.observe(card));
    new MutationObserver(() => { measure(); list.scrollTop = 0; }).observe(list, {subtree:true,attributes:true,attributeFilter:['hidden']});
    measure();
  });
})();