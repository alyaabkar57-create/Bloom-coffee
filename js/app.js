/* =========================================================
   Bloom Coffee — Application Logic
   Cart, wishlist, i18n, filters, product detail and UI.
   ========================================================= */
(function () {
  'use strict';

  const { CATEGORIES, SIZES, EXTRAS, PRODUCTS, OFFERS, REVIEWS, I18N } = window.BLOOM_DATA;

  const STORAGE = {
    lang: 'bloom_lang',
    cart: 'bloom_cart',
    wishlist: 'bloom_wishlist'
  };

  const state = {
    lang: localStorage.getItem(STORAGE.lang) || 'ar',
    cart: readJSON(STORAGE.cart, []),
    wishlist: readJSON(STORAGE.wishlist, []),
    drawer: null,
    menuFilter: 'all',
    menuQuery: '',
    detailSize: 'medium',
    detailExtras: [],
    activeOffer: null
  };

  function readJSON(key, fallback) {
    try { const value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value : fallback; }
    catch (e) { return fallback; }
  }
  function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || key; }
  function localize(obj) { return obj && obj[state.lang] ? obj[state.lang] : (obj && obj.en) || ''; }
  function itemMeta(item) { return (item.meta && localize(item.meta)) || ''; }
  function money(value) { return `${Number(value).toFixed(0)} ${state.lang === 'ar' ? 'ر.س' : 'SAR'}`; }
  function esc(str) { return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  const ICONS = {
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2.2l2.3 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H5.2"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4l1.4 1.4L12 21l7.4-6.6 1.4-1.4a5.2 5.2 0 0 0 0-7.4Z"/></svg>',
    heartFill: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4l1.4 1.4L12 21l7.4-6.6 1.4-1.4a5.2 5.2 0 0 0 0-7.4Z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m6 6-6-6 6-6"/></svg>'
  };

  /* ---------------- Language ---------------- */
  function applyLanguage() {
    const isAr = state.lang === 'ar';
    document.documentElement.lang = state.lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const [attr, key] = el.dataset.i18nAttr.split('|');
      el.setAttribute(attr, t(key));
    });
    document.querySelectorAll('[data-lang-toggle]').forEach(el => { el.textContent = t('lang'); });
    renderCart();
    renderWishlist();
    // Re-render page-specific dynamic content
    if (document.body.dataset.page === 'menu') { renderFilters(); renderMenu(false); }
    if (document.body.dataset.page === 'product') renderProduct();
    if (document.body.dataset.page === 'offers') renderOffers();
    if (document.body.dataset.page === 'home') renderBestSellers();
  }

  function toggleLanguage() {
    state.lang = state.lang === 'ar' ? 'en' : 'ar';
    localStorage.setItem(STORAGE.lang, state.lang);
    applyLanguage();
  }

  /* ---------------- Cart ---------------- */
  function cartCount() { return state.cart.reduce((sum, i) => sum + i.qty, 0); }
  function cartTotal() { return state.cart.reduce((sum, i) => sum + i.price * i.qty, 0); }

  function addToCart(item, showToast = true) {
    const existing = state.cart.find(i => i.key === item.key);
    if (existing) existing.qty += item.qty || 1;
    else state.cart.push({ ...item, qty: item.qty || 1 });
    saveJSON(STORAGE.cart, state.cart);
    updateBadges();
    renderCart();
    if (showToast) toast(t('addedToCart'), ICONS.check);
  }

  function buildCartItem(product, sizeId, extrasIds, qty) {
    const size = SIZES.find(s => s.id === sizeId) || SIZES[1];
    const extras = (extrasIds || []).map(id => EXTRAS.find(e => e.id === id)).filter(Boolean);
    const extrasPrice = extras.reduce((s, e) => s + e.price, 0);
    const extrasAr = extras.length ? ' + ' + extras.map(e => e.ar).join('، ') : '';
    const extrasEn = extras.length ? ' + ' + extras.map(e => e.en).join(', ') : '';
    return {
      key: `${product.id}|${size.id}|${(extrasIds || []).slice().sort().join(',')}`,
      refId: product.id,
      image: product.image,
      price: product.price + size.factor + extrasPrice,
      name: { ar: product.ar.name, en: product.en.name },
      meta: {
        ar: `${size.ar}${extrasAr}`,
        en: `${size.en}${extrasEn}`
      },
      qty: qty || 1
    };
  }

  function addProductToCart(product, sizeId, extrasIds, qty, showToast) {
    addToCart(buildCartItem(product, sizeId, extrasIds, qty), showToast);
  }

  function addOfferToCart(offer) {
    addToCart({
      key: `offer|${offer.id}`,
      refId: offer.id,
      image: offer.image,
      price: offer.price,
      name: { ar: offer.ar.name, en: offer.en.name },
      meta: { ar: 'باقة عرض', en: 'Offer Bundle' },
      qty: 1
    });
  }

  function updateQty(key, delta) {
    const item = state.cart.find(i => i.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) state.cart = state.cart.filter(i => i.key !== key);
    saveJSON(STORAGE.cart, state.cart);
    updateBadges();
    renderCart();
  }

  function removeFromCart(key) {
    state.cart = state.cart.filter(i => i.key !== key);
    saveJSON(STORAGE.cart, state.cart);
    updateBadges();
    renderCart();
    toast(t('removedFromCart'));
  }

  function renderCart() {
    const body = document.getElementById('cart-items');
    const foot = document.getElementById('cart-foot');
    if (!body || !foot) return;
    if (!state.cart.length) {
      body.innerHTML = `<div class="empty-state">${ICONS.cart}<h4>${t('emptyCart')}</h4><p>${t('emptyCartDesc')}</p></div>`;
      foot.innerHTML = '';
      return;
    }
    body.innerHTML = state.cart.map(item => `
      <div class="drawer-item">
        <img src="${esc(item.image)}" alt="">
        <div class="drawer-item-info">
          <div class="drawer-item-title">${esc(localize(item.name))}</div>
          <div class="drawer-item-meta">${esc(itemMeta(item))}</div>
          <div class="drawer-item-bottom">
            <div class="qty-control">
              <button aria-label="-" data-qty="-1" data-key="${esc(item.key)}">−</button>
              <span>${item.qty}</span>
              <button aria-label="+" data-qty="1" data-key="${esc(item.key)}">+</button>
            </div>
            <span class="price-tag">${money(item.price * item.qty)}</span>
          </div>
          <button class="remove-btn" data-remove="${esc(item.key)}">${ICONS.close} ${t('remove')}</button>
        </div>
      </div>`).join('');
    foot.innerHTML = `
      <div class="row"><span>${t('subtotal')}</span><span class="price-tag">${money(cartTotal())}</span></div>
      <button class="btn btn-primary btn-block" id="checkout-btn">${t('checkout')} ${ICONS.arrow}</button>
      <button class="btn btn-outline btn-block" id="clear-cart" style="margin-top:10px">${t('clearAll')}</button>`;
  }

  /* ---------------- Wishlist ---------------- */
  function toggleWishlist(id) {
    const idx = state.wishlist.indexOf(id);
    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      toast(t('removedFromWish'));
    } else {
      state.wishlist.push(id);
      toast(t('addedToWish'), ICONS.heartFill);
    }
    saveJSON(STORAGE.wishlist, state.wishlist);
    updateBadges();
    renderWishlist();
    document.querySelectorAll(`[data-fav="${id}"]`).forEach(btn => {
      btn.classList.toggle('active', state.wishlist.includes(id));
      btn.innerHTML = state.wishlist.includes(id) ? ICONS.heartFill : ICONS.heart;
    });
  }

  function renderWishlist() {
    const body = document.getElementById('wishlist-items');
    if (!body) return;
    const items = state.wishlist.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    if (!items.length) {
      body.innerHTML = `<div class="empty-state">${ICONS.heart}<h4>${t('emptyWish')}</h4><p>${t('emptyWishDesc')}</p></div>`;
      return;
    }
    body.innerHTML = items.map(p => `
      <div class="drawer-item">
        <img src="${esc(p.image)}" alt="">
        <div class="drawer-item-info">
          <div class="drawer-item-title">${esc(localize({ ar: p.ar.name, en: p.en.name }))}</div>
          <div class="drawer-item-meta">${esc(localize(CATEGORIES.find(c => c.id === p.category)))}</div>
          <div class="drawer-item-bottom">
            <span class="price-tag">${money(p.price)}</span>
            <div style="display:flex;gap:6px">
              <button class="icon-btn" style="width:36px;height:36px;border-radius:10px;background:var(--roast);color:var(--cream)" data-quick-add="${p.id}" title="${t('addToCart')}">${ICONS.plus}</button>
              <button class="remove-btn" data-wish-remove="${p.id}">${ICONS.close}</button>
            </div>
          </div>
        </div>
      </div>`).join('');
  }

  /* ---------------- Drawers & Toast ---------------- */
  function openDrawer(type) {
    state.drawer = type;
    const root = document.getElementById('drawer-root');
    const title = document.getElementById('drawer-title');
    document.getElementById('cart-items').style.display = type === 'cart' ? 'block' : 'none';
    document.getElementById('cart-foot').style.display = type === 'cart' ? 'block' : 'none';
    document.getElementById('wishlist-items').style.display = type === 'wishlist' ? 'block' : 'none';
    title.innerHTML = type === 'cart' ? `${ICONS.cart} ${t('cartTitle')}` : `${ICONS.heart} ${t('wishTitle')}`;
    title.style.display = 'flex'; title.style.alignItems = 'center'; title.style.gap = '10px';
    root.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    state.drawer = null;
    document.getElementById('drawer-root').classList.remove('open');
    document.body.style.overflow = '';
  }
  function closeMobile() {
    document.getElementById('mobile-menu').classList.remove('open');
    document.body.style.overflow = '';
  }

  let toastTimer = 0;
  function toast(message, icon) {
    const stack = document.getElementById('toast-stack');
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `${icon || ICONS.check}<span>${esc(message)}</span>`;
    stack.appendChild(el);
    setTimeout(() => {
      el.classList.add('out');
      setTimeout(() => el.remove(), 300);
    }, 2600);
  }

  function updateBadges() {
    const cartBadge = document.getElementById('cart-badge');
    const wishBadge = document.getElementById('wish-badge');
    if (cartBadge) { cartBadge.textContent = cartCount(); cartBadge.style.display = cartCount() ? 'grid' : 'none'; }
    if (wishBadge) { wishBadge.textContent = state.wishlist.length; wishBadge.style.display = state.wishlist.length ? 'grid' : 'none'; }
  }

  /* ---------------- Reusable product card ---------------- */
  function productCard(p) {
    const fav = state.wishlist.includes(p.id);
    const cat = CATEGORIES.find(c => c.id === p.category);
    return `
      <article class="product-card reveal">
        <div class="product-media">
          ${p.best ? `<span class="product-tag">★ ${t('popular')}</span>` : ''}
          <button class="fav-btn ${fav ? 'active' : ''}" data-fav="${p.id}" aria-label="${t('wishlist')}">${fav ? ICONS.heartFill : ICONS.heart}</button>
          <img src="${esc(p.image)}" alt="${esc(localize({ ar: p.ar.name, en: p.en.name }))}">
        </div>
        <div class="product-body">
          <div class="product-name">
            <h3>${esc(localize({ ar: p.ar.name, en: p.en.name }))}</h3>
            <span class="rating">★ ${p.rating}</span>
          </div>
          <p class="product-desc">${esc(localize({ ar: p.ar.desc, en: p.en.desc }))}</p>
          <div class="product-foot">
            <span class="product-price">${money(p.price)} <small>${t('perPiece')}</small></span>
            <div class="card-actions">
              <a href="product.html?id=${p.id}" class="icon-btn" title="${t('details')}" style="background:var(--white);color:var(--roast);border-color:var(--line)">${ICONS.arrow}</a>
              <button class="icon-btn" data-add="${p.id}" title="${t('addToCart')}">${ICONS.plus}</button>
            </div>
          </div>
        </div>
      </article>`;
  }

  function bindProductCards(scope) {
    scope.querySelectorAll('[data-fav]').forEach(btn => btn.addEventListener('click', () => toggleWishlist(btn.dataset.fav)));
    scope.querySelectorAll('[data-add]').forEach(btn => btn.addEventListener('click', () => {
      const p = PRODUCTS.find(x => x.id === btn.dataset.add);
      if (p) addProductToCart(p, 'medium', [], 1, true);
    }));
  }

  /* ---------------- Home page ---------------- */
  function renderBestSellers() {
    const grid = document.getElementById('best-grid');
    if (!grid) return;
    grid.innerHTML = PRODUCTS.filter(p => p.best).slice(0, 4).map(productCard).join('');
    bindProductCards(grid);
    observeReveals(grid);
  }

  function renderHomeOffers() {
    const grid = document.getElementById('home-offers-grid');
    if (!grid) return;
    grid.innerHTML = OFFERS.slice(0, 3).map(offerCardHTML).join('');
  }

  function renderReviews() {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;
    grid.innerHTML = REVIEWS.map(r => `
      <div class="review-card reveal">
        <div class="review-stars">${'★'.repeat(r.rating)}</div>
        <p class="review-text">“${esc(localize({ ar: r.ar.text, en: r.en.text }))}”</p>
        <div class="review-author">
          <div class="review-avatar">${esc(r.initials)}</div>
          <div><strong>${esc(localize({ ar: r.ar.name, en: r.en.name }))}</strong><small>${t('reviewsTitle').replace(/.*/, state.lang === 'ar' ? 'عميل بلوم' : 'Bloom Guest')}</small></div>
        </div>
      </div>`).join('');
    observeReveals(grid);
  }

  /* ---------------- Menu page ---------------- */
  function renderMenu(showLoading = true) {
    const grid = document.getElementById('menu-grid');
    const count = document.getElementById('results-count');
    if (!grid) return;

    const render = () => {
      const q = state.menuQuery.trim().toLowerCase();
      const list = PRODUCTS.filter(p => {
        const matchCat = state.menuFilter === 'all' || p.category === state.menuFilter;
        const haystack = `${p.ar.name} ${p.en.name} ${p.ar.desc} ${p.en.desc}`.toLowerCase();
        return matchCat && (!q || haystack.includes(q));
      });
      if (count) count.textContent = `${list.length} ${state.lang === 'ar' ? 'مشروب' : 'items'}`;
      if (!list.length) {
        grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">${ICONS.search}<h4>${t('noResults')}</h4><p>${t('noResultsDesc')}</p></div>`;
        return;
      }
      grid.innerHTML = list.map(productCard).join('');
      bindProductCards(grid);
      observeReveals(grid);
    };

    if (showLoading) {
      grid.innerHTML = Array.from({ length: 6 }, () => '<div class="skeleton" style="height:390px"></div>').join('');
      setTimeout(render, 350);
    } else render();
  }

  function renderFilters() {
    const filterWrap = document.getElementById('filter-wrap');
    if (!filterWrap) return;
    filterWrap.innerHTML = `<button class="filter-btn ${state.menuFilter === 'all' ? 'active' : ''}" data-filter="all">${t('all')}</button>` +
      CATEGORIES.map(c => `<button class="filter-btn ${state.menuFilter === c.id ? 'active' : ''}" data-filter="${c.id}">${localize(c)}</button>`).join('');
  }

  function initMenu() {
    const filterWrap = document.getElementById('filter-wrap');
    if (filterWrap) {
      renderFilters();
      filterWrap.addEventListener('click', e => {
        const btn = e.target.closest('[data-filter]');
        if (!btn) return;
        filterWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.menuFilter = btn.dataset.filter;
        renderMenu(false);
      });
    }
    const search = document.getElementById('menu-search');
    if (search) {
      let timer;
      search.addEventListener('input', e => {
        clearTimeout(timer);
        timer = setTimeout(() => { state.menuQuery = e.target.value; renderMenu(false); }, 180);
      });
    }
    renderMenu(true);
  }

  /* ---------------- Product detail ---------------- */
  function renderProduct() {
    const wrap = document.getElementById('product-detail');
    const relatedWrap = document.getElementById('related-grid');
    if (!wrap) return;
    const id = new URLSearchParams(window.location.search).get('id');
    const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
    const cat = CATEGORIES.find(c => c.id === p.category);
    const fav = state.wishlist.includes(p.id);

    wrap.innerHTML = `
      <div class="detail-image reveal"><img src="${esc(p.image)}" alt="${esc(localize({ ar: p.ar.name, en: p.en.name }))}"></div>
      <div class="detail-info reveal">
        <div class="breadcrumb"><a href="index.html">${t('nav_home')}</a> / <a href="menu.html">${t('nav_menu')}</a> / <span>${esc(localize({ ar: p.ar.name, en: p.en.name }))}</span></div>
        <span class="eyebrow">${esc(localize(cat))}</span>
        <h1>${esc(localize({ ar: p.ar.name, en: p.en.name }))}</h1>
        <div class="detail-price">${money(p.price)} <small>${t('perPiece')}</small></div>
        <p class="detail-desc">${esc(localize({ ar: p.ar.desc, en: p.en.desc }))}</p>

        <div class="detail-extra-box">
          <div class="option-group" style="margin-bottom:18px">
            <h4>${t('size')} <span>✦</span></h4>
            <div class="option-row" id="size-options">
              ${SIZES.map(s => `<button class="option-chip ${s.id === state.detailSize ? 'active' : ''}" data-size="${s.id}">${localize(s)} ${s.factor ? `<small>+${money(s.factor)}</small>` : ''}</button>`).join('')}
            </div>
          </div>
          <div class="option-group" style="margin-bottom:0">
            <h4>${t('extras')} <span>✦</span></h4>
            <div class="option-row" id="extra-options">
              ${EXTRAS.map(e => `<button class="option-chip ${state.detailExtras.includes(e.id) ? 'active' : ''}" data-extra="${e.id}">${localize(e)} <small>+${money(e.price)}</small></button>`).join('')}
            </div>
          </div>
        </div>

        <div class="ingredients-box">
          <h4>${t('ingredients')}</h4>
          <p>${esc(localize({ ar: p.ar.ingredients, en: p.en.ingredients }))}</p>
        </div>

        <div class="detail-actions">
          <button class="btn btn-accent" id="detail-add">${ICONS.cart} ${t('addToCart')}</button>
          <button class="btn btn-outline" data-fav="${p.id}">${fav ? ICONS.heartFill : ICONS.heart} ${t('wishlist')}</button>
          <a href="menu.html" class="btn btn-outline">${ICONS.back} ${t('backToMenu')}</a>
        </div>
      </div>`;

    // bind options
    wrap.querySelectorAll('[data-size]').forEach(btn => btn.addEventListener('click', () => {
      state.detailSize = btn.dataset.size;
      wrap.querySelectorAll('[data-size]').forEach(b => b.classList.toggle('active', b === btn));
    }));
    wrap.querySelectorAll('[data-extra]').forEach(btn => btn.addEventListener('click', () => {
      const id = btn.dataset.extra;
      const idx = state.detailExtras.indexOf(id);
      if (idx > -1) state.detailExtras.splice(idx, 1); else state.detailExtras.push(id);
      btn.classList.toggle('active');
    }));
    wrap.querySelector('#detail-add').addEventListener('click', () => addProductToCart(p, state.detailSize, state.detailExtras, 1, true));
    bindProductCards(wrap);

    if (relatedWrap) {
      const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 3);
      const fallback = related.length ? related : PRODUCTS.filter(x => x.id !== p.id).slice(0, 3);
      relatedWrap.innerHTML = fallback.map(productCard).join('');
      bindProductCards(relatedWrap);
      observeReveals(relatedWrap);
    }
    observeReveals(wrap);
  }

  /* ---------------- Offers page ---------------- */
  function offerCardHTML(o) {
    return `
      <article class="offer-card reveal">
        <img src="${esc(o.image)}" alt="${esc(localize({ ar: o.ar.name, en: o.en.name }))}">
        <span class="offer-badge">−${Math.round((1 - o.price / o.oldPrice) * 100)}%</span>
        <div class="offer-body">
          <h3>${esc(localize({ ar: o.ar.name, en: o.en.name }))}</h3>
          <p>${esc(localize({ ar: o.ar.desc, en: o.en.desc }))}</p>
          <div class="offer-price"><strong>${money(o.price)}</strong><del>${money(o.oldPrice)}</del></div>
          <button class="btn btn-light" data-offer="${o.id}">${t('viewOffer')} ${ICONS.arrow}</button>
        </div>
      </article>`;
  }

  function renderOffers() {
    const grid = document.getElementById('offers-grid');
    if (!grid) return;
    grid.innerHTML = OFFERS.map(offerCardHTML).join('');
    grid.querySelectorAll('[data-offer]').forEach(btn => btn.addEventListener('click', () => openOffer(btn.dataset.offer)));
    observeReveals(grid);
  }

  function openOffer(id) {
    const offer = OFFERS.find(o => o.id === id);
    if (!offer) return;
    state.activeOffer = offer;
    const modal = document.getElementById('offer-modal');
    document.getElementById('offer-img').src = offer.image;
    document.getElementById('offer-modal-title').textContent = localize({ ar: offer.ar.name, en: offer.en.name });
    document.getElementById('offer-modal-desc').textContent = localize({ ar: offer.ar.desc, en: offer.en.desc });
    document.getElementById('offer-modal-details').textContent = localize({ ar: offer.ar.details, en: offer.en.details });
    document.getElementById('offer-modal-price').innerHTML = `${money(offer.price)} <del style="font-size:.8rem;color:var(--muted);font-weight:500">${money(offer.oldPrice)}</del>`;
    document.getElementById('offer-add').innerHTML = `${ICONS.cart} ${t('addOffer')}`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    document.getElementById('offer-modal').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---------------- Contact form ---------------- */
  function initContact() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('[name=name]');
      const email = form.querySelector('[name=email]');
      const message = form.querySelector('[name=message]');
      let ok = true;
      const validate = (input, condition, key) => {
        const field = input.closest('.form-field');
        const valid = condition(input.value.trim());
        field.classList.toggle('invalid', !valid);
        field.querySelector('.error').textContent = valid ? '' : t(key);
        if (!valid) ok = false;
      };
      validate(name, v => v.length > 1, 'errName');
      validate(email, v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'errEmail');
      validate(message, v => v.length > 4, 'errMessage');
      if (!ok) return;
      const btn = form.querySelector('button[type=submit]');
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner"></span> ${t('sending')}`;
      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.textContent = t('send');
        toast(t('successMsg'), ICONS.check);
      }, 900);
    });
  }

  /* ---------------- Utilities ---------------- */
  function observeReveals(scope) {
    const items = (scope || document).querySelectorAll('.reveal:not(.show)');
    if (!('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('show')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('show'); io.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  }

  function initGlobal() {
    // Language toggles
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => btn.addEventListener('click', toggleLanguage));

    // Header scroll
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10));

    // Mobile menu
    document.getElementById('hamburger').addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    document.getElementById('mobile-overlay').addEventListener('click', closeMobile);
    document.getElementById('close-mobile').addEventListener('click', closeMobile);
    document.querySelectorAll('.mobile-panel a').forEach(a => a.addEventListener('click', closeMobile));

    // Drawer
    document.getElementById('open-cart').addEventListener('click', () => openDrawer('cart'));
    document.getElementById('open-wish').addEventListener('click', () => openDrawer('wishlist'));
    document.getElementById('drawer-overlay').addEventListener('click', closeDrawer);
    document.getElementById('drawer-close').addEventListener('click', closeDrawer);

    // Drawer delegated actions
    const cartItems = document.getElementById('cart-items');
    cartItems.addEventListener('click', e => {
      const qty = e.target.closest('[data-qty]');
      if (qty) { updateQty(qty.dataset.key, Number(qty.dataset.qty)); if (state.cart.length === 0) toast(t('qtyUpdated')); return; }
      const remove = e.target.closest('[data-remove]');
      if (remove) removeFromCart(remove.dataset.remove);
    });
    document.getElementById('cart-foot').addEventListener('click', e => {
      if (e.target.closest('#checkout-btn')) toast(t('checkoutMsg'));
      if (e.target.closest('#clear-cart')) {
        state.cart = []; saveJSON(STORAGE.cart, state.cart); updateBadges(); renderCart(); toast(t('clearAll'));
      }
    });
    document.getElementById('wishlist-items').addEventListener('click', e => {
      const add = e.target.closest('[data-quick-add]');
      if (add) { const p = PRODUCTS.find(x => x.id === add.dataset.quickAdd); if (p) addProductToCart(p, 'medium', [], 1, true); return; }
      const rem = e.target.closest('[data-wish-remove]');
      if (rem) toggleWishlist(rem.dataset.wishRemove);
    });

    // Offer modal
    const modal = document.getElementById('offer-modal');
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('offer-add').addEventListener('click', () => {
      if (state.activeOffer) addOfferToCart(state.activeOffer);
      closeModal();
    });

    // ESC closes overlays
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeDrawer(); closeMobile(); closeModal(); }
    });

    // Active nav highlight
    let current = window.location.pathname.split('/').pop() || 'index.html';
    if (current === 'product.html') current = 'menu.html';
    document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === current));

    updateBadges();
    applyLanguage();
    observeReveals(document);
  }

  function initPage() {
    initGlobal();
    const page = document.body.dataset.page;
    if (page === 'home') { renderBestSellers(); renderHomeOffers(); renderReviews(); }
    if (page === 'menu') initMenu();
    if (page === 'product') renderProduct();
    if (page === 'offers') renderOffers();
    if (page === 'contact') initContact();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPage);
  else initPage();
})();
