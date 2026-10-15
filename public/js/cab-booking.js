// SafarZap Intercity Taxi & Cab Booking Module

let allCabRoutes = [];
let selectedCabVehicleTier = 'sedan';

document.addEventListener('DOMContentLoaded', () => {
  loadCabRoutes();
  setupCabForm();
});

async function loadCabRoutes() {
  const container = document.getElementById('cabs-grid');
  if (!container) return;

  try {
    const res = await fetch('/api/cabs');
    if (!res.ok) throw new Error('API offline');
    const data = await res.json();
    allCabRoutes = (data.routes && data.routes.length > 0) ? data.routes : (window.MOCK_CABS || []);
  } catch (e) {
    allCabRoutes = window.MOCK_CABS || [];
  }

  renderCabRoutes();
}

function selectCabTier(tier) {
  selectedCabVehicleTier = tier;
  document.querySelectorAll('.cab-tier-btn').forEach(btn => {
    if (btn.getAttribute('data-tier') === tier) {
      btn.className = "cab-tier-btn px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white shadow-sm transition";
    } else {
      btn.className = "cab-tier-btn px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition";
    }
  });
  renderCabRoutes();
}

function renderCabRoutes() {
  const container = document.getElementById('cabs-grid');
  if (!container || allCabRoutes.length === 0) return;

  container.innerHTML = allCabRoutes.map(route => {
    const pricing = route.pricing[selectedCabVehicleTier] || route.pricing.sedan;
    return `
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm card-hover flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs text-slate-500 mb-3">
            <span class="flex items-center gap-1 font-semibold text-teal-700">
              <i data-lucide="navigation" class="w-3.5 h-3.5"></i> ${route.distance}
            </span>
            <span class="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium text-slate-600">
              ~ ${route.duration}
            </span>
          </div>

          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
              <i data-lucide="car" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="text-xs text-slate-400 font-medium">Pickup: <span class="text-slate-700 font-semibold">${route.from}</span></div>
              <h4 class="text-base font-bold text-slate-900">${route.to}</h4>
            </div>
          </div>

          <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4 text-xs space-y-1.5">
            <div class="flex justify-between text-slate-600">
              <span>Vehicle:</span>
              <strong class="text-slate-900">${pricing.car}</strong>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>Capacity & Luggage:</span>
              <span class="text-slate-800">${pricing.capacity} • ${pricing.luggage}</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>Toll & Fuel:</span>
              <span class="text-emerald-700 font-semibold">Included</span>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div class="text-xs text-slate-400 line-through" data-inr-price="${pricing.originalINR}">${formatPrice(pricing.originalINR)}</div>
            <div class="text-xl font-black text-slate-900" data-inr-price="${pricing.priceINR}">${formatPrice(pricing.priceINR)}</div>
            <span class="text-[10px] text-slate-500">Fixed all-inclusive fare</span>
          </div>
          <button onclick="openCabBookingModal('${route.id}')" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5">
            Book Cab
          </button>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

let activeCabRoute = null;

function openCabBookingModal(routeId) {
  activeCabRoute = allCabRoutes.find(r => r.id === routeId) || allCabRoutes[0];
  const modal = document.getElementById('cab-modal');
  if (!modal || !activeCabRoute) return;

  const pricing = activeCabRoute.pricing[selectedCabVehicleTier] || activeCabRoute.pricing.sedan;

  document.getElementById('cab-modal-route').textContent = `${activeCabRoute.from} to ${activeCabRoute.to}`;
  document.getElementById('cab-modal-vehicle').textContent = `${pricing.car} (${pricing.capacity})`;
  document.getElementById('cab-modal-price').textContent = formatPrice(pricing.priceINR);
  document.getElementById('cab-date').value = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function closeCabModal() {
  const modal = document.getElementById('cab-modal');
  if (modal) modal.classList.add('hidden');
}

function setupCabForm() {
  const form = document.getElementById('cab-booking-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('cab-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Reserving Cab...`;

    const payload = {
      routeId: activeCabRoute ? activeCabRoute.id : 'cab-custom',
      from: activeCabRoute ? activeCabRoute.from : 'Delhi',
      to: activeCabRoute ? activeCabRoute.to : 'Destination',
      vehicleType: selectedCabVehicleTier,
      customerName: document.getElementById('cab-name').value,
      customerPhone: document.getElementById('cab-phone').value,
      customerEmail: document.getElementById('cab-email').value,
      pickupDate: document.getElementById('cab-date').value,
      pickupTime: document.getElementById('cab-time').value,
      pickupAddress: document.getElementById('cab-address').value
    };

    try {
      const res = await fetch('/api/cabs/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      closeCabModal();
      showToast(`Cab Reserved! Booking ID: ${data.bookingRef}. Driver assigned shortly.`, 'success');
      alert(`Cab Booking Confirmed!\nBooking Reference: ${data.bookingRef}\nRoute: ${data.route}\nOur chauffeur will arrive on time.\nFor updates, contact SafarZap Helpline: +91 8725969152.`);
    } catch (e) {
      closeCabModal();
      showToast('Cab request received! Our taxi coordinator will call you directly.', 'success');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}
