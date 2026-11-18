/**
 * Skinspire Aesthetic & Technology - Application Controller
 * Multi-View Compact Storefront + Visual Category Tiles + Sticky Bottom Dock
 * Features:
 * - Compact Home Landing Page with 6 Visual Category Tiles & 6 Featured Products (2-2-2 mobile / 3-3 desktop)
 * - Dedicated Products View with Interactive Category Tiles, Search & Sort
 * - Category Tiles Quick Sheet Modal from Bottom Dock
 * - Intelligent WhatsApp Order Form (Pre-selected product vs All products dropdown) -> +92 307 7870347
 * - Quick View Modal with Technical Specifications & Protocol
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  let currentView = 'home';
  let currentCategory = 'all';
  let searchQuery = '';
  let currentSort = 'popular';
  let activeOrderProduct = null;
  let activeOrderQty = 1;

  // Views
  const homeView = document.getElementById('homeView');
  const productsView = document.getElementById('productsView');
  const aboutView = document.getElementById('aboutView');

  // Dynamic Containers
  const homeCategoryTiles = document.getElementById('homeCategoryTiles');
  const homeFeaturedGrid = document.getElementById('homeFeaturedGrid');
  const catalogCategoryTiles = document.getElementById('catalogCategoryTiles');
  const categorySheetGrid = document.getElementById('categorySheetGrid');
  const productsGrid = document.getElementById('productsGrid');
  const activeCategoryHeading = document.getElementById('activeCategoryHeading');
  const resultsCount = document.getElementById('resultsCount');
  const searchInput = document.getElementById('catalogSearch');
  const sortSelect = document.getElementById('sortSelect');

  // Category Sheet Modal
  const categorySheetModal = document.getElementById('categorySheetModal');
  const btnCloseCategorySheet = document.getElementById('btnCloseCategorySheet');

  // Order Modal Elements
  const orderModal = document.getElementById('orderModal');
  const btnCloseOrderModal = document.getElementById('btnCloseOrderModal');
  const orderForm = document.getElementById('orderForm');
  const selectedProductCard = document.getElementById('selectedProductCard');
  const productSelectGroup = document.getElementById('productSelectGroup');
  const productSelect = document.getElementById('productSelect');
  const orderQtyDisplay = document.getElementById('orderQtyDisplay');
  const btnQtyMinus = document.getElementById('btnQtyMinus');
  const btnQtyPlus = document.getElementById('btnQtyPlus');
  const orderLiveTotal = document.getElementById('orderLiveTotal');

  // Quickview Modal Elements
  const quickviewModal = document.getElementById('quickviewModal');
  const btnCloseQuickview = document.getElementById('btnCloseQuickview');
  const quickviewBody = document.getElementById('quickviewBody');

  // Mobile Drawer Elements
  const menuToggle = document.getElementById('menuToggle');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const btnCloseDrawer = document.getElementById('btnCloseDrawer');

  // WhatsApp & Contact Configuration
  const WHATSAPP_PHONE = '923077870347'; // +92 307 7870347
  const STORE_EMAIL = 'ansarch238@gmail.com';

  /* ==========================================================================
     1. Multi-View Switching & Synchronized Navigation Active State
     ========================================================================== */
  function syncActiveNavigation(viewKey) {
    // Desktop Top Nav
    document.querySelectorAll('.nav-links .nav-link').forEach(link => {
      const v = link.getAttribute('data-view');
      link.classList.toggle('active', v === viewKey);
    });

    // Bottom Dock Bar
    document.querySelectorAll('.bottom-dock-nav .dock-btn').forEach(btn => {
      const d = btn.getAttribute('data-dock');
      if (d === 'home' || d === 'products') {
        btn.classList.toggle('active', d === viewKey);
      } else if (d === 'categories') {
        btn.classList.remove('active');
      }
    });

    // Mobile Drawer Links
    document.querySelectorAll('.drawer-nav-link').forEach(link => {
      const v = link.getAttribute('data-view');
      const f = link.getAttribute('data-filter');
      if (viewKey === 'products' && f) {
        link.classList.toggle('active', f === currentCategory);
      } else {
        link.classList.toggle('active', v === viewKey);
      }
    });
  }

  window.switchView = function(viewKey) {
    currentView = viewKey;
    window.closeCategorySheet();

    const actualView = (viewKey === 'contact') ? 'about' : viewKey;

    [homeView, productsView, aboutView].forEach(el => {
      if (el) el.classList.remove('active');
    });

    if (actualView === 'home' && homeView) {
      homeView.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (actualView === 'products' && productsView) {
      productsView.classList.add('active');
      renderCatalogCategoryTiles();
      renderProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (actualView === 'about' && aboutView) {
      aboutView.classList.add('active');
      if (viewKey === 'contact') {
        setTimeout(() => {
          const contactEl = document.getElementById('contactSection');
          if (contactEl) {
            contactEl.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    syncActiveNavigation(viewKey);
  };

  window.openProductsCategory = function(slug = 'all') {
    currentCategory = slug;
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    window.switchView('products');
  };

  /* ==========================================================================
     2. Category Tiles Rendering (Home, Products View & Category Quick Sheet)
     ========================================================================== */
  function renderHomeCategoryTiles() {
    if (!homeCategoryTiles) return;
    // Show the 6 visual specialty tiles (exclude "all")
    const specialtyCats = categories.filter(c => c.slug !== 'all');
    homeCategoryTiles.innerHTML = specialtyCats.map(cat => `
      <button type="button" class="category-tile-card" onclick="window.openProductsCategory('${cat.slug}')">
        <div class="category-tile-thumb">
          <img src="${cat.image}" alt="${cat.name}" loading="lazy" onerror="this.src='images/products/dr-pen-a9.jpg'">
        </div>
        <div class="category-tile-meta">
          <span class="category-tile-name">${cat.shortName}</span>
          <span class="category-tile-count">${cat.count} ${cat.count === 1 ? 'Item' : 'Items'}</span>
        </div>
      </button>
    `).join('');
  }

  function renderCatalogCategoryTiles() {
    if (!catalogCategoryTiles) return;
    catalogCategoryTiles.innerHTML = categories.map(cat => `
      <button type="button" class="catalog-tile-chip ${cat.slug === currentCategory ? 'active' : ''}" data-slug="${cat.slug}" onclick="window.selectCatalogCategory('${cat.slug}')">
        <img class="catalog-tile-img" src="${cat.image}" alt="${cat.shortName}" loading="lazy" onerror="this.src='images/products/dr-pen-a9.jpg'">
        <div class="catalog-tile-text">
          <span class="catalog-tile-title">${cat.shortName}</span>
          <span class="catalog-tile-qty">${cat.count}</span>
        </div>
      </button>
    `).join('');
  }

  function renderCategorySheetTiles() {
    if (!categorySheetGrid) return;
    categorySheetGrid.innerHTML = categories.map(cat => `
      <button type="button" class="sheet-tile-btn ${cat.slug === currentCategory && currentView === 'products' ? 'active' : ''}" onclick="window.openProductsCategory('${cat.slug}')">
        <div class="sheet-tile-thumb">
          <img src="${cat.image}" alt="${cat.name}" loading="lazy" onerror="this.src='images/products/dr-pen-a9.jpg'">
        </div>
        <div class="sheet-tile-info">
          <span class="sheet-tile-name">${cat.name}</span>
          <span class="sheet-tile-count">${cat.count} ${cat.count === 1 ? 'Product' : 'Products'}</span>
        </div>
        <svg class="sheet-tile-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    `).join('');
  }

  window.selectCatalogCategory = function(slug) {
    currentCategory = slug;
    renderCatalogCategoryTiles();
    renderProducts();
    syncActiveNavigation('products');
  };

  /* ==========================================================================
     3. Category Tiles Quick Sheet Modal Controls
     ========================================================================== */
  window.openCategorySheet = function() {
    renderCategorySheetTiles();
    if (categorySheetModal) {
      categorySheetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.querySelectorAll('.bottom-dock-nav .dock-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-dock') === 'categories');
      });
    }
  };

  window.closeCategorySheet = function() {
    if (categorySheetModal && categorySheetModal.classList.contains('active')) {
      categorySheetModal.classList.remove('active');
      document.body.style.overflow = '';
      syncActiveNavigation(currentView);
    }
  };

  if (btnCloseCategorySheet) {
    btnCloseCategorySheet.addEventListener('click', window.closeCategorySheet);
  }
  if (categorySheetModal) {
    categorySheetModal.addEventListener('click', (e) => {
      if (e.target === categorySheetModal) window.closeCategorySheet();
    });
  }

  /* ==========================================================================
     4. Compact Product Card Builder (100% Inside Bounds on Mobile 2-Col & Desktop)
     ========================================================================== */
  function buildProductCardHTML(prod) {
    return `
      <article class="product-card" data-id="${prod.id}">
        <div class="card-image-wrap" onclick="window.viewQuickView('${prod.id}')">
          <img src="${prod.image}" alt="${prod.title}" loading="lazy" onerror="this.src='images/products/dr-pen-a9.jpg'">
          ${prod.tag ? `<span class="card-tag">${prod.tag}</span>` : ''}
        </div>

        <div class="card-content">
          <div class="card-category-label">${prod.category}</div>
          <h3 class="card-title" title="${prod.title}" onclick="window.viewQuickView('${prod.id}')">${prod.title}</h3>

          <div class="card-price-block">
            <span class="card-vip-price">${formatPKR(prod.price)}</span>
            <span class="card-rating-mini">★ ${prod.rating.toFixed(1)}</span>
          </div>

          <div class="card-actions-row">
            <button class="btn-shop-now" type="button" onclick="window.openOrderModal('${prod.id}')">
              <span>Shop Now</span>
            </button>
            <button class="btn-card-wa" type="button" title="WhatsApp Inquiry" aria-label="WhatsApp Inquiry" onclick="window.sendDirectWhatsApp('${prod.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.074-1.854-.429-1.428-.588-2.355-2.029-2.427-2.124-.071-.095-.584-.778-.584-1.485 0-.707.369-1.054.5-1.2.13-.146.284-.183.379-.183.095 0 .19.002.272.006.087.004.204-.033.319.243.119.288.405.992.441 1.065.036.073.06.159.012.256-.048.098-.072.159-.143.243-.072.085-.152.19-.217.255-.072.072-.147.151-.063.295.084.145.373.616.802.998.552.492 1.017.644 1.161.716.144.072.228.06.313-.037.084-.097.359-.418.455-.561.096-.144.192-.12.323-.072.131.048.835.394.978.466.143.072.239.108.275.169.036.06.036.353-.108.758z"/>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  /* ==========================================================================
     5. Render Featured 6 Products on Home Landing Page
     ========================================================================== */
  function renderHomeFeatured() {
    if (!homeFeaturedGrid) return;
    const featured = featuredProductIds
      .map(id => products.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 6);

    homeFeaturedGrid.innerHTML = featured.map(buildProductCardHTML).join('');
  }

  /* ==========================================================================
     6. Filter, Sort & Render Full Catalog in Products View
     ========================================================================== */
  function getFilteredProducts() {
    let list = [...products];

    if (currentCategory !== 'all') {
      list = list.filter(p => p.categorySlug === currentCategory);
    }

    if (searchQuery) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery) ||
        p.shortDesc.toLowerCase().includes(searchQuery)
      );
    }

    return list.sort((a, b) => {
      if (currentSort === 'price-low') return a.price - b.price;
      if (currentSort === 'price-high') return b.price - a.price;
      if (currentSort === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount;
    });
  }

  function renderProducts() {
    if (!productsGrid) return;
    const filtered = getFilteredProducts();

    const activeCatObj = categories.find(c => c.slug === currentCategory);
    if (activeCategoryHeading) {
      activeCategoryHeading.textContent = (activeCatObj && activeCatObj.slug !== 'all')
        ? activeCatObj.name
        : 'All Aesthetic Products';
    }

    if (resultsCount) {
      resultsCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'item' : 'items'}`;
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="empty-catalog-state">
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.4rem;">No products found</h3>
          <p style="color: #6b7280; font-size: 0.85rem; margin-bottom: 1.25rem;">Try clearing your search or switching category tiles.</p>
          <button id="btnResetFilters" class="btn-primary-vip" style="padding: 0.55rem 1.25rem; font-size: 0.82rem;">Show All 30 Products</button>
        </div>
      `;
      document.getElementById('btnResetFilters')?.addEventListener('click', () => {
        window.openProductsCategory('all');
      });
      return;
    }

    productsGrid.innerHTML = filtered.map(buildProductCardHTML).join('');
  }

  /* ==========================================================================
     7. Populate Dropdown for Direct Order Form Mode
     ========================================================================== */
  function populateProductDropdown() {
    if (!productSelect) return;
    productSelect.innerHTML = '<option value="">-- Choose a Product --</option>';
    products.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.title} - ${formatPKR(p.price)}`;
      productSelect.appendChild(opt);
    });

    productSelect.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      if (selectedId) {
        const prod = products.find(p => p.id === selectedId);
        if (prod) {
          activeOrderProduct = prod;
          updateOrderModalUI(false);
        }
      }
    });
  }

  /* ==========================================================================
     8. Intelligent Order Form Modal System
     ========================================================================== */
  window.openOrderModal = function(productId = null) {
    window.closeCategorySheet();
    activeOrderQty = 1;
    if (orderQtyDisplay) orderQtyDisplay.textContent = '1';

    if (productId) {
      activeOrderProduct = products.find(p => p.id === productId);
    } else if (!activeOrderProduct) {
      activeOrderProduct = products[0];
    }

    updateOrderModalUI(Boolean(productId));

    if (orderModal) {
      orderModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  function updateOrderModalUI(isLockedMode = false) {
    if (!activeOrderProduct) return;

    if (selectedProductCard) {
      selectedProductCard.innerHTML = `
        <img class="selected-prod-thumb" src="${activeOrderProduct.image}" alt="${activeOrderProduct.title}" onerror="this.src='images/products/dr-pen-a9.jpg'">
        <div class="selected-prod-info">
          <div class="selected-prod-title">${activeOrderProduct.title}</div>
          <div class="selected-prod-pricing">
            <span class="selected-prod-vip-price">${formatPKRFull(activeOrderProduct.price)}</span>
          </div>
        </div>
        ${isLockedMode ? `<button type="button" class="btn-change-product" id="btnUnlockDropdown">Change</button>` : ''}
      `;

      const btnUnlock = document.getElementById('btnUnlockDropdown');
      if (btnUnlock) {
        btnUnlock.addEventListener('click', () => {
          if (productSelectGroup) productSelectGroup.style.display = 'block';
          btnUnlock.style.display = 'none';
        });
      }
    }

    if (productSelectGroup) {
      productSelectGroup.style.display = isLockedMode ? 'none' : 'block';
    }

    if (productSelect) {
      productSelect.value = activeOrderProduct.id;
    }

    updateLiveBill();
  }

  function updateLiveBill() {
    if (!activeOrderProduct || !orderLiveTotal) return;
    const subtotal = activeOrderProduct.price * activeOrderQty;
    orderLiveTotal.textContent = formatPKRFull(subtotal);
  }

  if (btnQtyMinus) {
    btnQtyMinus.addEventListener('click', () => {
      if (activeOrderQty > 1) {
        activeOrderQty--;
        if (orderQtyDisplay) orderQtyDisplay.textContent = activeOrderQty;
        updateLiveBill();
      }
    });
  }

  if (btnQtyPlus) {
    btnQtyPlus.addEventListener('click', () => {
      if (activeOrderQty < 99) {
        activeOrderQty++;
        if (orderQtyDisplay) orderQtyDisplay.textContent = activeOrderQty;
        updateLiveBill();
      }
    });
  }

  function closeOrderModal() {
    if (orderModal) {
      orderModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (btnCloseOrderModal) btnCloseOrderModal.addEventListener('click', closeOrderModal);
  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) closeOrderModal();
    });
  }

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const customerName = document.getElementById('custName')?.value.trim();
      const customerPhone = document.getElementById('custPhone')?.value.trim();
      const customerLocation = document.getElementById('custLocation')?.value.trim();
      const clinicName = document.getElementById('custClinic')?.value.trim();
      const customerNotes = document.getElementById('custNotes')?.value.trim();

      if (!customerName || !customerPhone || !customerLocation) {
        showToast('Please fill in Name, Phone, and Location.');
        return;
      }

      if (!activeOrderProduct) {
        showToast('Please select a product first.');
        return;
      }

      const totalAmount = activeOrderProduct.price * activeOrderQty;

      const message = `✨ *ORDER - SKINSPIRE AESTHETIC & TECH* ✨\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Client Name:* ${customerName}\n` +
        `📱 *Contact No:* ${customerPhone}\n` +
        `📍 *Delivery City / Address:* ${customerLocation}\n` +
        (clinicName ? `🏥 *Clinic / Salon:* ${clinicName}\n` : '') +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📦 *Selected Product:* ${activeOrderProduct.title}\n` +
        `📂 *Category:* ${activeOrderProduct.category}\n` +
        `🏷️ *Price:* ${formatPKRFull(activeOrderProduct.price)}\n` +
        `🔢 *Quantity:* ${activeOrderQty}\n` +
        `💰 *Total Amount:* ${formatPKRFull(totalAmount)}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        (customerNotes ? `📝 *Special Notes:* ${customerNotes}\n` : '') +
        `✨ *Helpline:* +92 307 7870347\n` +
        `📧 *Email:* ${STORE_EMAIL}\n` +
        `🚚 *Delivery:* Across All Pakistan\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `_Please confirm dispatch timeline & tracking._`;

      const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

      showToast('Opening WhatsApp with your VIP order details...');
      setTimeout(() => {
        window.open(waUrl, '_blank');
        closeOrderModal();
        orderForm.reset();
      }, 350);
    });
  }

  /* ==========================================================================
     9. Direct WhatsApp Quick Inquiry
     ========================================================================== */
  window.sendDirectWhatsApp = function(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const msg = `Hello Skinspire Pakistan,\nI want to inquire about *${prod.title}* (Category: ${prod.category}).\nPrice: ${formatPKRFull(prod.price)}.\nKindly share stock availability and delivery timeline to my city.`;
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  /* ==========================================================================
     10. Quick View Modal
     ========================================================================== */
  window.viewQuickView = function(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod || !quickviewModal || !quickviewBody) return;

    quickviewBody.innerHTML = `
      <div class="quickview-img-box">
        <img src="${prod.image}" alt="${prod.title}" onerror="this.src='images/products/dr-pen-a9.jpg'">
      </div>
      <div>
        <div class="card-category-label" style="font-size: 0.75rem;">${prod.category}</div>
        <h2 style="font-family: var(--font-serif); font-size: 1.35rem; line-height: 1.25; margin-bottom: 0.6rem; color: var(--noir-950);">
          ${prod.title}
        </h2>

        <div class="card-reviews-row" style="margin-bottom: 0.85rem;">
          <span class="stars-rating">${'★'.repeat(Math.floor(prod.rating))}</span>
          <span><strong>${prod.rating.toFixed(1)}</strong> (${prod.reviewsCount} clinic reviews)</span>
        </div>

        <div style="margin-bottom: 1rem;">
          <span style="font-size: 1.45rem; font-weight: 800; color: var(--gold-dark);">${formatPKRFull(prod.price)}</span>
        </div>

        <p style="font-size: 0.88rem; color: #4b5563; line-height: 1.55; margin-bottom: 1rem;">
          ${prod.shortDesc}
        </p>

        <h4 style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.45rem; color: var(--noir-950);">
          Technical Specifications
        </h4>
        <table class="specs-table">
          <tbody>
            ${prod.specs ? prod.specs.map(s => `<tr><td>${s.label}</td><td>${s.value}</td></tr>`).join('') : ''}
          </tbody>
        </table>

        ${prod.howToUse ? `
          <div style="background: var(--bg-soft); padding: 0.85rem; border-radius: var(--radius-md); border-left: 3px solid var(--gold-primary); margin-bottom: 1.2rem;">
            <strong style="font-size: 0.82rem; display: block; margin-bottom: 0.2rem; color: var(--noir-950);">Application Protocol:</strong>
            <p style="font-size: 0.8rem; color: #4b5563; line-height: 1.5;">${prod.howToUse}</p>
          </div>
        ` : ''}

        <div style="display: flex; gap: 0.65rem; margin-top: 0.85rem;">
          <button class="btn-primary-vip" style="flex: 1;" onclick="window.closeQuickview(); window.openOrderModal('${prod.id}')">
            Order Now
          </button>
          <button class="btn-card-wa" style="width: 48px; height: auto;" title="WhatsApp Inquiry" onclick="window.sendDirectWhatsApp('${prod.id}')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.074-1.854-.429-1.428-.588-2.355-2.029-2.427-2.124-.071-.095-.584-.778-.584-1.485 0-.707.369-1.054.5-1.2.13-.146.284-.183.379-.183.095 0 .19.002.272.006.087.004.204-.033.319.243.119.288.405.992.441 1.065.036.073.06.159.012.256-.048.098-.072.159-.143.243-.072.085-.152.19-.217.255-.072.072-.147.151-.063.295.084.145.373.616.802.998.552.492 1.017.644 1.161.716.144.072.228.06.313-.037.084-.097.359-.418.455-.561.096-.144.192-.12.323-.072.131.048.835.394.978.466.143.072.239.108.275.169.036.06.036.353-.108.758z"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    quickviewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeQuickview = function() {
    if (quickviewModal) {
      quickviewModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (btnCloseQuickview) btnCloseQuickview.addEventListener('click', window.closeQuickview);
  if (quickviewModal) {
    quickviewModal.addEventListener('click', (e) => {
      if (e.target === quickviewModal) window.closeQuickview();
    });
  }

  /* ==========================================================================
     11. Search, Sort, Desktop Nav & Mobile Drawer Listeners
     ========================================================================== */
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Desktop Top Navigation
  document.querySelectorAll('.nav-links .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const action = link.getAttribute('data-action');
      const view = link.getAttribute('data-view');
      if (action === 'categories') {
        window.openCategorySheet();
      } else if (view === 'products') {
        window.openProductsCategory('all');
      } else if (view) {
        window.switchView(view);
      }
    });
  });

  // Mobile Drawer
  function openDrawer() {
    if (drawerOverlay) {
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  window.closeDrawer = function() {
    if (drawerOverlay) {
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', window.closeDrawer);
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) window.closeDrawer();
    });
  }

  document.querySelectorAll('.drawer-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.getAttribute('data-filter');
      const view = link.getAttribute('data-view');
      window.closeDrawer();
      if (filter) {
        window.openProductsCategory(filter);
      } else if (view) {
        window.switchView(view);
      }
    });
  });

  // Header scroll shadow
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeCategorySheet();
      closeOrderModal();
      window.closeQuickview();
      window.closeDrawer();
    }
  });

  function showToast(message) {
    let toast = document.getElementById('siteToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'siteToast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2.2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Initial Render
  renderHomeCategoryTiles();
  renderHomeFeatured();
  renderCatalogCategoryTiles();
  renderCategorySheetTiles();
  populateProductDropdown();
  renderProducts();
  syncActiveNavigation('home');
});
