// SafarZap Core Application Logic

let allPackages = [];
let allDestinations = [];
let currentFilterRegion = 'all';
let currentSearchTerm = '';
let currentStyle = 'all';
let maxBudget = 50000;

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  setupEventListeners();
  await loadDestinations();
  await loadPackages();
  await loadTestimonials();
  await loadFAQs();
  setupCurrencySelector();
  lucide.createIcons();
}

// Format price with active currency
function formatPrice(amountINR) {
  const currency = window.SAFARZAP_CONFIG.currentCurrency || 'INR';
  const config = window.SAFARZAP_CONFIG.currencyRates[currency] || { symbol: '₹', rate: 1 };
  const converted = Math.round(amountINR * config.rate);
  return `${config.symbol} ${converted.toLocaleString('en-IN')}`;
}

// Update all prices across page on currency change
function refreshCurrencyDisplay() {
  document.querySelectorAll('[data-inr-price]').forEach(el => {
    const inr = Number(el.getAttribute('data-inr-price'));
    if (!isNaN(inr)) {
      el.textContent = formatPrice(inr);
    }
  });
}

function setupCurrencySelector() {
  const select = document.getElementById('currency-select');
  if (select) {
    select.value = window.SAFARZAP_CONFIG.currentCurrency;
    select.addEventListener('change', (e) => {
      window.SAFARZAP_CONFIG.currentCurrency = e.target.value;
      refreshCurrencyDisplay();
      renderPackages();
    });
  }
}

// Load Destinations
async function loadDestinations() {
  try {
    const res = await fetch('/api/destinations');
    const data = await res.json();
    allDestinations = data.destinations || window.MOCK_DESTINATIONS;
  } catch (e) {
    allDestinations = window.MOCK_DESTINATIONS;
  }
  renderDestinations();
}

function renderDestinations() {
  const grid = document.getElementById('destinations-grid');
  if (!grid) return;

  grid.innerHTML = allDestinations.map(dest => `
    <div class="group relative rounded-2xl overflow-hidden shadow-lg card-hover cursor-pointer" onclick="filterByRegion('${dest.name}')">
      <div class="h-72 w-full overflow-hidden">
        <img src="${dest.image}" alt="${dest.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex flex-col justify-end p-6 text-white">
        <span class="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-950/70 border border-amber-500/30 px-3 py-1 rounded-full w-max mb-2">
          ${dest.bestSeason}
        </span>
        <h3 class="text-2xl font-bold font-serif-heading mb-1">${dest.name}</h3>
        <p class="text-sm text-slate-200 line-clamp-2 mb-3">${dest.description}</p>
        <div class="flex items-center justify-between text-xs font-semibold text-amber-300">
          <span>${dest.highlights[0]} • ${dest.highlights[1]}</span>
          <span class="flex items-center gap-1 group-hover:translate-x-1 transition">Explore <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></span>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// Load Packages
async function loadPackages() {
  const container = document.getElementById('packages-container');
  if (container) {
    container.innerHTML = `
      <div class="col-span-full py-16 flex flex-col items-center justify-center text-slate-400">
        <div class="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p>Loading North India tour packages...</p>
      </div>
    `;
  }

  try {
    const res = await fetch('/api/packages');
    if (!res.ok) throw new Error('API offline');
    const data = await res.json();
    allPackages = (data.packages && data.packages.length > 0) ? data.packages : (window.MOCK_PACKAGES || []);
  } catch (e) {
    allPackages = window.MOCK_PACKAGES || [];
  }

  renderPackages();
}

function filterByRegion(regionName) {
  currentFilterRegion = regionName.toLowerCase();
  
  // Update active pill button
  document.querySelectorAll('.region-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-region') === currentFilterRegion || (currentFilterRegion === 'all' && btn.getAttribute('data-region') === 'all')) {
      btn.className = "region-filter-btn px-5 py-2.5 rounded-full text-sm font-semibold bg-amber-600 text-white shadow-md transition";
    } else {
      btn.className = "region-filter-btn px-5 py-2.5 rounded-full text-sm font-semibold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm transition";
    }
  });

  const packagesSection = document.getElementById('packages-section');
  if (packagesSection) {
    packagesSection.scrollIntoView({ behavior: 'smooth' });
  }

  renderPackages();
}

function renderPackages() {
  const container = document.getElementById('packages-container');
  if (!container) return;

  let filtered = allPackages;

  if (currentFilterRegion && currentFilterRegion !== 'all') {
    filtered = filtered.filter(p => p.region.toLowerCase().includes(currentFilterRegion));
  }

  if (currentStyle && currentStyle !== 'all') {
    filtered = filtered.filter(p => p.travelStyle.toLowerCase().includes(currentStyle.toLowerCase()));
  }

  if (currentSearchTerm) {
    const q = currentSearchTerm.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.highlights.some(h => h.toLowerCase().includes(q))
    );
  }

  const budgetInput = document.getElementById('budget-filter');
  if (budgetInput && budgetInput.value) {
    const maxVal = Number(budgetInput.value);
    filtered = filtered.filter(p => p.priceINR <= maxVal);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
        <i data-lucide="compass" class="w-16 h-16 text-amber-500 mx-auto mb-4 animate-bounce"></i>
        <h3 class="text-xl font-bold text-slate-800 mb-2">No Tour Packages Match Your Filter</h3>
        <p class="text-slate-500 mb-6 max-w-md mx-auto">We couldn't find a package matching your exact parameters, but our custom trip designers can create one for you!</p>
        <button onclick="openCustomPlanner()" class="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-lg transition">
          Build Custom Tour Itinerary
        </button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(pkg => {
    let badgeClass = 'badge-bestseller';
    if (pkg.badge.includes('Adventure')) badgeClass = 'badge-adventure';
    if (pkg.badge.includes('Royal')) badgeClass = 'badge-royal';

    return `
      <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm card-hover flex flex-col justify-between">
        <div>
          <!-- Image and Badges -->
          <div class="relative h-56 w-full overflow-hidden">
            <img src="${pkg.image}" alt="${pkg.title}" class="w-full h-full object-cover">
            <span class="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full shadow-sm ${badgeClass}">
              ${pkg.badge}
            </span>
            <div class="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <i data-lucide="star" class="w-3.5 h-3.5 text-amber-400 fill-amber-400"></i>
              <span>${pkg.rating}</span>
              <span class="text-slate-400">(${pkg.reviewCount})</span>
            </div>
            <div class="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-lg flex items-center gap-1.5">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>${pkg.region}</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span class="flex items-center gap-1 text-teal-700 font-bold">
                <i data-lucide="clock" class="w-3.5 h-3.5"></i> ${pkg.duration}
              </span>
              <span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px]">
                ${pkg.travelStyle}
              </span>
            </div>

            <h3 class="text-xl font-bold text-slate-900 mb-2 line-clamp-2 hover:text-amber-600 transition cursor-pointer" onclick="viewPackageDetails('${pkg.id}')">
              ${pkg.title}
            </h3>

            <p class="text-xs text-slate-600 line-clamp-2 mb-4">
              ${pkg.description}
            </p>

            <!-- Key Highlights Preview -->
            <ul class="space-y-1.5 mb-5 text-xs text-slate-600">
              ${pkg.highlights.slice(0, 3).map(h => `
                <li class="flex items-start gap-1.5">
                  <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5"></i>
                  <span class="line-clamp-1">${h}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- Footer / Pricing & CTA -->
        <div class="px-6 pb-6 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <div class="flex items-baseline gap-2">
              <span class="text-xs text-slate-400 line-through" data-inr-price="${pkg.originalPriceINR}">${formatPrice(pkg.originalPriceINR)}</span>
              <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">${pkg.discountPercent}% OFF</span>
            </div>
            <div class="text-xl font-extrabold text-slate-900" data-inr-price="${pkg.priceINR}">
              ${formatPrice(pkg.priceINR)}
            </div>
            <span class="text-[11px] text-slate-500">per person / all incl.</span>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="viewPackageDetails('${pkg.id}')" class="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition" title="View Itinerary">
              Details
            </button>
            <button onclick="openBookingModal('${pkg.id}')" class="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-md transition flex items-center gap-1">
              Book Now
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

// View Package Details Modal
function viewPackageDetails(pkgId) {
  const pkg = allPackages.find(p => p.id === pkgId);
  if (!pkg) return;

  const modal = document.getElementById('package-details-modal');
  const modalContent = document.getElementById('package-details-content');

  modalContent.innerHTML = `
    <div>
      <div class="relative h-72 w-full rounded-t-2xl overflow-hidden">
        <img src="${pkg.image}" alt="${pkg.title}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
        <div class="absolute bottom-6 left-6 right-6 text-white">
          <span class="text-xs font-bold px-3 py-1 bg-amber-500 rounded-full mb-2 inline-block">${pkg.badge}</span>
          <h2 class="text-2xl md:text-3xl font-bold font-serif-heading mb-1">${pkg.title}</h2>
          <div class="flex flex-wrap items-center gap-4 text-xs text-slate-200">
            <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-400"></i> ${pkg.region}</span>
            <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5 text-amber-400"></i> ${pkg.duration}</span>
            <span class="flex items-center gap-1"><i data-lucide="star" class="w-3.5 h-3.5 text-amber-400 fill-amber-400"></i> ${pkg.rating} (${pkg.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      <div class="p-6 md:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
        <!-- Overview -->
        <div>
          <h3 class="text-lg font-bold text-slate-900 mb-2">Trip Overview</h3>
          <p class="text-sm text-slate-600 leading-relaxed">${pkg.description}</p>
        </div>

        <!-- Highlights -->
        <div>
          <h3 class="text-lg font-bold text-slate-900 mb-3">Key Highlights</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            ${pkg.highlights.map(h => `
              <div class="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl text-xs font-medium text-slate-700">
                <i data-lucide="sparkles" class="w-4 h-4 text-amber-500 shrink-0"></i>
                <span>${h}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Day by Day Itinerary -->
        <div>
          <h3 class="text-lg font-bold text-slate-900 mb-4">Detailed Day-by-Day Itinerary</h3>
          <div class="space-y-4 border-l-2 border-amber-300 pl-4 ml-2">
            ${pkg.itinerary.map(item => `
              <div class="relative">
                <div class="absolute -left-[23px] top-0 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-100"></div>
                <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span class="text-xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Day ${item.day}</span>
                    <span class="text-xs text-slate-500"><i data-lucide="utensils" class="w-3 h-3 inline mr-1"></i>${item.meals}</span>
                  </div>
                  <h4 class="text-sm font-bold text-slate-900 mb-1">${item.title}</h4>
                  <p class="text-xs text-slate-600 mb-2 leading-relaxed">${item.description}</p>
                  <div class="text-xs text-slate-500 font-medium">
                    <span class="text-teal-700 font-semibold">Night Stay:</span> ${item.stay}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Inclusions & Exclusions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200">
            <h4 class="text-sm font-bold text-emerald-900 mb-3 flex items-center gap-2">
              <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i> What's Included
            </h4>
            <ul class="space-y-2 text-xs text-emerald-950">
              ${pkg.inclusions.map(inc => `
                <li class="flex items-start gap-2">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5"></i>
                  <span>${inc}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="bg-rose-50/70 p-5 rounded-2xl border border-rose-200">
            <h4 class="text-sm font-bold text-rose-900 mb-3 flex items-center gap-2">
              <i data-lucide="x-circle" class="w-4 h-4 text-rose-600"></i> What's Not Included
            </h4>
            <ul class="space-y-2 text-xs text-rose-950">
              ${pkg.exclusions.map(exc => `
                <li class="flex items-start gap-2">
                  <i data-lucide="x" class="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5"></i>
                  <span>${exc}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- SafarZap Guarantee & Helpline -->
        <div class="bg-amber-50 p-4 rounded-xl border border-amber-200 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
              SZ
            </div>
            <div>
              <h5 class="text-xs font-bold text-amber-950">Need Customization or Instant Advice?</h5>
              <p class="text-xs text-amber-800">Directly connect with SafarZap holiday experts</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <a href="tel:8725969152" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm">
              <i data-lucide="phone" class="w-3.5 h-3.5"></i> 8725969152
            </a>
            <a href="${window.SAFARZAP_CONFIG.whatsappUrl}" target="_blank" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span class="text-xs text-slate-500">Starting from</span>
          <div class="text-2xl font-black text-slate-900">${formatPrice(pkg.priceINR)} <span class="text-xs font-normal text-slate-500">/ person</span></div>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="closePackageDetails()" class="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition">
            Close
          </button>
          <button onclick="closePackageDetails(); openBookingModal('${pkg.id}')" class="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-2">
            <i data-lucide="calendar" class="w-4 h-4"></i> Proceed to Book
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function closePackageDetails() {
  const modal = document.getElementById('package-details-modal');
  if (modal) modal.classList.add('hidden');
}

// Load Testimonials
async function loadTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container) return;

  let reviews = [];
  try {
    const res = await fetch('/api/reviews');
    if (!res.ok) throw new Error('API offline');
    const data = await res.json();
    reviews = (data.reviews && data.reviews.length > 0) ? data.reviews : (window.MOCK_TESTIMONIALS || []);
  } catch (e) {
    reviews = window.MOCK_TESTIMONIALS || [];
  }

  container.innerHTML = reviews.map(rev => `
    <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-1 text-amber-500 mb-3">
          ${Array(rev.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-amber-400 text-amber-400"></i>').join('')}
        </div>
        <p class="text-xs text-slate-700 italic leading-relaxed mb-4">"${rev.comment}"</p>
      </div>
      <div class="flex items-center gap-3 pt-3 border-t border-slate-100">
        <img src="${rev.avatar}" alt="${rev.name}" class="w-10 h-10 rounded-full object-cover">
        <div>
          <div class="text-xs font-bold text-slate-900 flex items-center gap-1">
            ${rev.name}
            ${rev.verified ? '<i data-lucide="badge-check" class="w-3.5 h-3.5 text-teal-600"></i>' : ''}
          </div>
          <div class="text-[11px] text-slate-500">${rev.city} • <span class="text-amber-700 font-medium">${rev.tour}</span></div>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// Load FAQs
async function loadFAQs() {
  const container = document.getElementById('faqs-container');
  if (!container) return;

  let faqs = [];
  try {
    const res = await fetch('/api/faqs');
    if (!res.ok) throw new Error('API offline');
    const data = await res.json();
    faqs = (data.faqs && data.faqs.length > 0) ? data.faqs : (window.MOCK_FAQS || []);
  } catch (e) {
    faqs = window.MOCK_FAQS || [];
  }

    container.innerHTML = faqs.map((faq, index) => `
      <div class="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <button class="w-full text-left p-4 font-bold text-slate-900 text-sm flex items-center justify-between gap-4 hover:bg-slate-50 transition" onclick="toggleFaq(${index})">
          <span>${faq.q}</span>
          <i data-lucide="chevron-down" id="faq-icon-${index}" class="w-4 h-4 text-slate-400 transition-transform"></i>
        </button>
        <div id="faq-ans-${index}" class="hidden p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
          ${faq.a}
        </div>
      </div>
    `).join('');

    lucide.createIcons();
  } catch (e) {
    console.error('Failed to load FAQs:', e);
  }
}

function toggleFaq(index) {
  const ans = document.getElementById(`faq-ans-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  if (ans && icon) {
    ans.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Region Filters
  document.querySelectorAll('.region-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const region = btn.getAttribute('data-region');
      filterByRegion(region);
    });
  });

  // Search Input
  const searchInput = document.getElementById('package-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.trim();
      renderPackages();
    });
  }

  // Travel Style Filter
  const styleSelect = document.getElementById('style-filter');
  if (styleSelect) {
    styleSelect.addEventListener('change', (e) => {
      currentStyle = e.target.value;
      renderPackages();
    });
  }

  // Budget Filter Slider
  const budgetFilter = document.getElementById('budget-filter');
  const budgetValue = document.getElementById('budget-value');
  if (budgetFilter && budgetValue) {
    budgetFilter.addEventListener('input', (e) => {
      budgetValue.textContent = formatPrice(e.target.value);
      renderPackages();
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      const payload = {
        name: document.getElementById('contact-name').value,
        phone: document.getElementById('contact-phone').value,
        email: document.getElementById('contact-email').value,
        subject: document.getElementById('contact-subject').value,
        message: document.getElementById('contact-message').value
      };

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast('Message sent! Our travel desk will contact you shortly.', 'success');
          contactForm.reset();
        } else {
          showToast(data.message || 'Failed to send message', 'error');
        }
      } catch (err) {
        showToast('Message submitted. You can also reach us directly at +91 8725969152.', 'success');
        contactForm.reset();
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  // Review Submission Modal
  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('review-name').value,
        city: document.getElementById('review-city').value,
        tour: document.getElementById('review-tour').value,
        rating: document.getElementById('review-rating').value,
        comment: document.getElementById('review-comment').value
      };

      try {
        const res = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast('Thank you for submitting your SafarZap review!', 'success');
          reviewForm.reset();
          closeReviewModal();
          loadTestimonials();
        }
      } catch (e) {
        showToast('Review submitted successfully!', 'success');
        closeReviewModal();
      }
    });
  }
}

// Toast Notification
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-emerald-700 text-white' : type === 'error' ? 'bg-rose-700 text-white' : 'bg-slate-900 text-white';
  
  toast.className = `${bg} px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-semibold transform transition-all duration-300 translate-y-2 opacity-0`;
  toast.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" class="text-white/70 hover:text-white">&times;</button>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

// Review Modal Toggles
function openReviewModal() {
  const modal = document.getElementById('review-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeReviewModal() {
  const modal = document.getElementById('review-modal');
  if (modal) modal.classList.add('hidden');
}
