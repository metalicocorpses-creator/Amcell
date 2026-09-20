// ===== AmCell — interações principais =====

document.addEventListener('DOMContentLoaded', function () {

  // ---- Menu mobile ----
  var menuToggle = document.querySelector('.menu-toggle');
  var mainNav = document.querySelector('.main-nav');
  var overlay = document.querySelector('.nav-overlay');

  function closeMenu(){
    mainNav && mainNav.classList.remove('open');
    overlay && overlay.classList.remove('open');
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      overlay && overlay.classList.toggle('open');
    });
  }
  if (overlay) overlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.main-nav a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // ---- Busca (mostrar/esconder painel) ----
  var searchToggle = document.querySelector('.search-toggle');
  var searchPanel = document.querySelector('.search-panel');
  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', function () {
      searchPanel.classList.toggle('open');
      if (searchPanel.classList.contains('open')) {
        var input = searchPanel.querySelector('input');
        input && input.focus();
      }
    });
  }

  // ---- Busca: redireciona para /busca/ com termo ----
  var searchForms = document.querySelectorAll('.search-panel form, .search-form');
  searchForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="search"], input[type="text"]');
      var term = input ? input.value.trim() : '';
      window.location.href = '/busca/' + (term.length > 0 ? ('?q=' + encodeURIComponent(term)) : '');
    });
  });

  // ---- Filtro de categorias na página de produtos ----
  var chips = document.querySelectorAll('.filter-chip');
  var productCards = document.querySelectorAll('.products-grid .product-card');
  if (chips.length && productCards.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var filter = chip.getAttribute('data-filter');
        productCards.forEach(function (card) {
          if (filter === 'todos' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- Resultado de busca (busca.njk) ----
  var resultsWrap = document.getElementById('search-results');
  if (resultsWrap) {
    var params = new URLSearchParams(window.location.search);
    var q = (params.get('q') || '').toLowerCase().trim();
    var titleEl = document.getElementById('search-term');
    if (titleEl) titleEl.textContent = q ? ('"' + q + '"') : '';

    var allItems = Array.prototype.slice.call(document.querySelectorAll('[data-search-item]'));
    var matches = 0;
    allItems.forEach(function (item) {
      var haystack = (item.getAttribute('data-search-item') || '').toLowerCase();
      var visible = q === '' || haystack.indexOf(q) !== -1;
      item.style.display = visible ? '' : 'none';
      if (visible) matches++;
    });
    var emptyState = document.getElementById('search-empty');
    if (emptyState) emptyState.style.display = matches === 0 ? 'block' : 'none';
  }

  // ---- Formulário de contato (feedback visual) ----
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      var btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Enviando...';
        btn.disabled = true;
      }
      // O envio de fato é feito pelo Netlify Forms (data-netlify="true" no HTML)
    });
  }

  // ---- Ano automático no rodapé ----
  document.querySelectorAll('.current-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

});
