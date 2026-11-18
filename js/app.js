/**
 * Skinspire Aesthetic & Technology - Application Controller
 * Features:
 * - Dynamic product rendering with 15% VIP pricing & rounding rule (ends in 50 or 00)
 * - Intelligent Order Form: Pre-selected product vs All products selector
 * - Direct WhatsApp integration with +92 307 7870347
 * - Contact links with ansarch238@gmail.com
 * - Real-time Category Filtering & Search
 * - Quick View Modal with Full Specifications & Usage Protocol
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  let currentCategory = 'all';
  let searchQuery = '';
  let currentSort = 'popular';
  let activeOrderProduct = null;
  let activeOrderQty = 1;

  // DOM Elements
  const productsGrid = document.getElementById('productsGrid');
  const categoryPillsContainer = document.getElementById('categoryPills');
  const searchInput = document.getElementById('catalogSearch');
  const sortSelect = document.getElementById('sortSelect');
  const resultsCount = document.getElementById('resultsCount');

  // Order Modal Elements
  const orderModal = document.getElementById('orderModal');
  const btnCloseOrderModal = document.getElementById('btnCloseOrderModal');
  const orderForm = document.getElementById('orderForm');
  const selectedProductCard = document.getElementById('selectedProductCard');
  const productSelectGroup = document.getElementById('productSelectGroup');
  const productSelect = document.getElementById('productSelect');
  const btnChangeProduct = document.getElementById('btnChangeProduct');
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

  // WhatsApp Configuration
  const WHATSAPP_PHONE = '923077870347'; // +92 307 7870347
  const STORE_EMAIL = 'ansarch238@gmail.com';

  /* ==========================================================================
     1. Initialize & Render Category Pills
     ========================================================================== */
  function renderCategories() {
    if (!categoryPillsContainer) return;
    categoryPillsContainer.innerHTML = '';

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `category-pill-btn ${cat.slug === currentCategory ? 'active' : ''}`;
      btn.setAttribute('data-slug', cat.slug);
      btn.innerHTML = `
        <span>${cat.name}</span>
        <span class="pill-count">${cat.count}</span>
      `;

      btn.addEventListener('click', () => {
        currentCategory = cat.slug;
        document.querySelectorAll('.category-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts();
      });

      categoryPillsContainer.appendChild(btn);
    });
  }

  /* ==========================================================================
     2. Populate Dropdown for Direct Order Form Mode
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
          updateOrderModalUI();
        }
      }
    });
  }

  /* ==========================================================================
     3. Filter, Sort, and Render Products Grid
     ========================================================================== */
  function getFilteredProducts() {
    return products.filter(p => {
      const matchesCategory = currentCategory === 'all' || p.categorySlug === currentCategory;
      const matchesSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery) ||
        p.shortDesc.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (currentSort === 'price-low') return a.price - b.price;
      if (currentSort === 'price-high') return b.price - a.price;
      if (currentSort === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // default popular
    });
  }

  function renderProducts() {
    if (!productsGrid) return;
    const filtered = getFilteredProducts();

    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} of ${products.length} products`;
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="empty-catalog-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c59b4e" stroke-width="1.5" style="margin: 0 auto 1rem;">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">No products match your search</h3>
          <p style="color: #6b7280; font-size: 0.9rem; margin-bottom: 1.5rem;">Try adjusting your keywords or clearing the category filter.</p>
          <button id="btnResetFilters" class="btn-primary-vip" style="padding: 0.6rem 1.4rem; font-size: 0.85rem;">Reset All Filters</button>
        </div>
      `;
      document.getElementById('btnResetFilters')?.addEventListener('click', () => {
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        currentCategory = 'all';
        renderCategories();
        renderProducts();
      });
      return;
    }

    productsGrid.innerHTML = filtered.map(prod => `
      <div class="product-card" data-id="${prod.id}">
        <!-- Image & Badges -->
        <div class="card-image-wrap" onclick="window.viewQuickView('${prod.id}')">
          <img src="${prod.image}" alt="${prod.title}" loading="lazy" onerror="this.src='images/products/dr-pen-a9.jpg'">
          ${prod.tag ? `<span class="card-tag">${prod.tag}</span>` : ''}
          <button class="btn-quick-preview" type="button" onclick="event.stopPropagation(); window.viewQuickView('${prod.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Quick View
          </button>
        </div>

        <!-- Content Area -->
        <div class="card-content">
          <div class="card-category-label">${prod.category}</div>
          <h3 class="card-title" title="${prod.title}">${prod.title}</h3>

          <div class="card-reviews-row">
            <div class="stars-rating">
              ${'★'.repeat(Math.floor(prod.rating))}
            </div>
            <span><strong>${prod.rating.toFixed(1)}</strong> (${prod.reviewsCount})</span>
          </div>

          <!-- Pricing block: Only final price shown -->
          <div class="card-price-block">
            <div class="card-vip-price">
              <span>${formatPKR(prod.price)}</span>
            </div>
          </div>

          <!-- Action buttons: Shop Now opens Order Form with this product! -->
          <div class="card-actions-row">
            <button class="btn-shop-now" type="button" onclick="window.openOrderModal('${prod.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Shop Now
            </button>
            <button class="btn-card-wa" type="button" title="Quick WhatsApp Inquiry" onclick="window.sendDirectWhatsApp('${prod.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.074-1.854-.429-1.428-.588-2.355-2.029-2.427-2.124-.071-.095-.584-.778-.584-1.485 0-.707.369-1.054.5-1.2.13-.146.284-.183.379-.183.095 0 .19.002.272.006.087.004.204-.033.319.243.119.288.405.992.441 1.065.036.073.06.159.012.256-.048.098-.072.159-.143.243-.072.085-.152.19-.217.255-.072.072-.147.151-.063.295.084.145.373.616.802.998.552.492 1.017.644 1.161.716.144.072.228.06.313-.037.084-.097.359-.418.455-.561.096-.144.192-.12.323-.072.131.048.835.394.978.466.143.072.239.108.275.169.036.06.036.353-.108.758z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* ==========================================================================
     4. Intelligent Order Form Modal System
     - When coming from a product: Pre-selects and locks to that product.
     - When opened directly: Shows dropdown to pick any product.
     ========================================================================== */
  window.openOrderModal = function(productId = null) {
    activeOrderQty = 1;
    if (orderQtyDisplay) orderQtyDisplay.textContent = '1';

    if (productId) {
      // Pre-selected product mode
      activeOrderProduct = products.find(p => p.id === productId);
    } else {
      // Direct opening mode: default to first product if none selected yet
      if (!activeOrderProduct) {
        activeOrderProduct = products[0];
      }
    }

    updateOrderModalUI(Boolean(productId));

    // Show modal with animation
    if (orderModal) {
      orderModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  function updateOrderModalUI(isLockedMode = false) {
    if (!activeOrderProduct) return;

    // Render the summary box for active product
    if (selectedProductCard) {
      selectedProductCard.innerHTML = `
        <img class="selected-prod-thumb" src="${activeOrderProduct.image}" alt="${activeOrderProduct.title}" onerror="this.src='images/products/dr-pen-a9.jpg'">
        <div class="selected-prod-info">
          <div class="selected-prod-title">${activeOrderProduct.title}</div>
          <div class="selected-prod-pricing">
            <span class="selected-prod-vip-price">${formatPKR(activeOrderProduct.price)}</span>
          </div>
        </div>
        ${isLockedMode ? `
          <button type="button" class="btn-change-product" id="btnUnlockDropdown">Change</button>
        ` : ''}
      `;

      // Allow switching to full dropdown if locked
      const btnUnlock = document.getElementById('btnUnlockDropdown');
      if (btnUnlock) {
        btnUnlock.addEventListener('click', () => {
          if (productSelectGroup) productSelectGroup.style.display = 'block';
          btnUnlock.style.display = 'none';
        });
      }
    }

    // Toggle dropdown visibility
    if (productSelectGroup) {
      if (isLockedMode) {
        productSelectGroup.style.display = 'none';
      } else {
        productSelectGroup.style.display = 'block';
      }
    }

    if (productSelect) {
      productSelect.value = activeOrderProduct.id;
    }

    updateLiveBill();
  }

  function updateLiveBill() {
    if (!activeOrderProduct || !orderLiveTotal) return;
    const subtotal = activeOrderProduct.price * activeOrderQty;
    orderLiveTotal.textContent = formatPKR(subtotal);
  }

  // Quantity Counter Event Listeners
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

  // Close Order Modal
  function closeOrderModal() {
    if (orderModal) {
      orderModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (btnCloseOrderModal) {
    btnCloseOrderModal.addEventListener('click', closeOrderModal);
  }

  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) closeOrderModal();
    });
  }

  // Order Form Submit Handler (Redirects to WhatsApp with Formatted Details)
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

      // Compose professional VIP Order message
      const message = `✨ *ORDER - SKINSPIRE AESTHETIC & TECH* ✨\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Client Name:* ${customerName}\n` +
        `📱 *Contact No:* ${customerPhone}\n` +
        `📍 *Delivery City / Address:* ${customerLocation}\n` +
        (clinicName ? `🏥 *Clinic / Salon:* ${clinicName}\n` : '') +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📦 *Selected Product:* ${activeOrderProduct.title}\n` +
        `📂 *Category:* ${activeOrderProduct.category}\n` +
        `🏷️ *Price:* ${formatPKR(activeOrderProduct.price)}\n` +
        `🔢 *Quantity:* ${activeOrderQty}\n` +
        `💰 *Total Amount:* ${formatPKR(totalAmount)}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        (customerNotes ? `📝 *Special Notes:* ${customerNotes}\n` : '') +
        `✨ *Helpline:* +92 307 7870347\n` +
        `📧 *Email:* ${STORE_EMAIL}\n` +
        `🚚 *Delivery:* Across All Pakistan\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `_Please confirm dispatch timeline & tracking._`;

      const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

      // Show friendly confirmation toast and open WhatsApp
      showToast('Opening WhatsApp with your VIP order details...');
      setTimeout(() => {
        window.open(waUrl, '_blank');
        closeOrderModal();
        orderForm.reset();
      }, 400);
    });
  }

  /* ==========================================================================
     5. Direct WhatsApp Quick Inquiry (Card Icon)
     ========================================================================== */
  window.sendDirectWhatsApp = function(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const msg = `Hello Skinspire Pakistan,\nI want to inquire about *${prod.title}* (Category: ${prod.category}).\nPrice: ${formatPKR(prod.price)}.\nKindly share stock availability and delivery timeline to my city.`;
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  /* ==========================================================================
     6. Quick View Modal Details
     ========================================================================== */
  window.viewQuickView = function(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod || !quickviewModal || !quickviewBody) return;

    quickviewBody.innerHTML = `
      <div class="quickview-img-box">
        <img src="${prod.image}" alt="${prod.title}" onerror="this.src='images/products/dr-pen-a9.jpg'">
      </div>
      <div>
        <div class="card-category-label" style="font-size: 0.8rem;">${prod.category}</div>
        <h2 style="font-family: var(--font-serif); font-size: 1.5rem; line-height: 1.25; margin-bottom: 0.75rem; color: var(--noir-950);">
          ${prod.title}
        </h2>

        <div class="card-reviews-row" style="margin-bottom: 1rem;">
          <span class="stars-rating">${'★'.repeat(Math.floor(prod.rating))}</span>
          <span><strong>${prod.rating.toFixed(1)}</strong> (${prod.reviewsCount} verified clinic reviews)</span>
        </div>

        <div style="margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: baseline; gap: 0.65rem;">
            <span style="font-size: 1.6rem; font-weight: 800; color: var(--gold-dark);">${formatPKR(prod.price)}</span>
          </div>
        </div>

        <p style="font-size: 0.92rem; color: #4b5563; line-height: 1.6; margin-bottom: 1.25rem;">
          ${prod.shortDesc}
        </p>

        <h4 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; color: var(--noir-950);">
          Technical Specifications
        </h4>
        <table class="specs-table">
          <tbody>
            ${prod.specs ? prod.specs.map(s => `<tr><td>${s.label}</td><td>${s.value}</td></tr>`).join('') : ''}
          </tbody>
        </table>

        ${prod.howToUse ? `
          <div style="background: var(--bg-soft); padding: 1rem; border-radius: var(--radius-md); border-left: 3px solid var(--gold-primary); margin-bottom: 1.5rem;">
            <strong style="font-size: 0.85rem; display: block; margin-bottom: 0.25rem; color: var(--noir-950);">Application Protocol:</strong>
            <p style="font-size: 0.82rem; color: #4b5563; line-height: 1.5;">${prod.howToUse}</p>
          </div>
        ` : ''}

        <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
          <button class="btn-primary-vip" style="flex: 1;" onclick="window.closeQuickview(); window.openOrderModal('${prod.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Order Now
          </button>
          <button class="btn-card-wa" style="width: 50px; height: auto;" title="WhatsApp Inquiry" onclick="window.sendDirectWhatsApp('${prod.id}')">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
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

  if (btnCloseQuickview) {
    btnCloseQuickview.addEventListener('click', window.closeQuickview);
  }

  if (quickviewModal) {
    quickviewModal.addEventListener('click', (e) => {
      if (e.target === quickviewModal) window.closeQuickview();
    });
  }

  /* ==========================================================================
     7. Live Search & Sorting Listeners
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

  /* ==========================================================================
     8. Mobile Drawer Menu Listeners
     ========================================================================== */
  function openDrawer() {
    if (drawerOverlay) {
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawerOverlay) {
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', closeDrawer);
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) closeDrawer();
    });
  }

  // Handle mobile drawer links
  document.querySelectorAll('.drawer-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const categorySlug = link.getAttribute('data-filter');
      if (categorySlug) {
        e.preventDefault();
        currentCategory = categorySlug;
        renderCategories();
        renderProducts();
        closeDrawer();
        const catalogEl = document.getElementById('catalogSection');
        if (catalogEl) {
          catalogEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  /* ==========================================================================
     9. Header Scroll Shadow & Utilities
     ========================================================================== */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  /* ==========================================================================
     10. Dynamic Navigation Highlighting (Yellow/Gold Active on current section)
     ========================================================================== */
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');
  const sectionIds = ['hero', 'catalogSection', 'benefits', 'howToOrder', 'contactSection'];

  function updateActiveNav(targetId) {
    desktopNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${targetId}` || (targetId === 'hero' && (href === '#hero' || href === 'index.html'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Click on nav links: immediate active state & smooth scroll
  desktopNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          desktopNavLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Logo click: smooth scroll to top and set Home as active
  const brandLogo = document.querySelector('.brand-logo-wrap');
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      updateActiveNav('hero');
    });
  }

  // ScrollSpy on window scroll: dynamically updates active link
  window.addEventListener('scroll', () => {
    let currentSection = 'hero';
    const scrollPosition = window.scrollY + 140;

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentSection = id;
        }
      }
    });

    updateActiveNav(currentSection);
  }, { passive: true });

  // Initialize UI
  renderCategories();
  populateProductDropdown();
  renderProducts();
});
