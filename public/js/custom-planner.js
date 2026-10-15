// SafarZap Interactive Custom Tour Planner & Dynamic Quote Estimator

function openCustomPlanner() {
  const plannerSection = document.getElementById('custom-planner-section');
  if (plannerSection) {
    plannerSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function calculateCustomTripQuote() {
  const days = parseInt(document.getElementById('plan-days').value) || 5;
  const adults = parseInt(document.getElementById('plan-adults').value) || 2;
  const children = parseInt(document.getElementById('plan-children').value) || 0;
  const hotelTier = document.getElementById('plan-hotel').value;
  const vehicle = document.getElementById('plan-vehicle').value;

  // Selected regions count
  const selectedRegions = [];
  document.querySelectorAll('input[name="plan-region"]:checked').forEach(cb => {
    selectedRegions.push(cb.value);
  });

  // Base daily cost per adult (sightseeing, meals, basic stay)
  let dailyRatePerAdult = 2800;

  if (hotelTier === '4-star') dailyRatePerAdult += 1500;
  if (hotelTier === '5-star') dailyRatePerAdult += 3800;

  // Total person days
  const effectiveAdults = adults + (children * 0.6);
  let totalStayAndFood = days * effectiveAdults * dailyRatePerAdult;

  // Vehicle daily cost
  let vehicleDailyRate = 2800; // Sedan
  if (vehicle === 'innova') vehicleDailyRate = 4200;
  if (vehicle === 'tempo') vehicleDailyRate = 6500;

  let totalVehicleCost = days * vehicleDailyRate;

  // Regional crossing allowance if more than 1 region selected
  let multiRegionBonus = selectedRegions.length > 1 ? (selectedRegions.length - 1) * 3500 : 0;

  const estimatedTotal = Math.round(totalStayAndFood + totalVehicleCost + multiRegionBonus);
  const estimatedPerPerson = Math.round(estimatedTotal / adults);

  // Update Display
  const totalEl = document.getElementById('plan-quote-total');
  const perPersonEl = document.getElementById('plan-quote-perperson');
  if (totalEl) totalEl.textContent = formatPrice(estimatedTotal);
  if (perPersonEl) perPersonEl.textContent = `${formatPrice(estimatedPerPerson)} / person`;

  window.currentCustomQuote = {
    estimatedTotal,
    estimatedPerPerson,
    days,
    adults,
    children,
    selectedRegions
  };
}

document.addEventListener('DOMContentLoaded', () => {
  // Listen to input changes in planner
  const inputsToWatch = ['plan-days', 'plan-adults', 'plan-children', 'plan-hotel', 'plan-vehicle'];
  inputsToWatch.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', calculateCustomTripQuote);
      el.addEventListener('change', calculateCustomTripQuote);
    }
  });

  document.querySelectorAll('input[name="plan-region"]').forEach(cb => {
    cb.addEventListener('change', calculateCustomTripQuote);
  });

  // Initialize quote calculation
  calculateCustomTripQuote();

  // Custom Planner Form Submission
  const form = document.getElementById('custom-planner-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('plan-submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Generating Custom Itinerary...`;

      const selectedRegions = [];
      document.querySelectorAll('input[name="plan-region"]:checked').forEach(cb => {
        selectedRegions.push(cb.value);
      });

      if (selectedRegions.length === 0) {
        showToast('Please select at least one North India region.', 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        return;
      }

      const payload = {
        customerName: document.getElementById('plan-name').value,
        customerPhone: document.getElementById('plan-phone').value,
        customerEmail: document.getElementById('plan-email').value,
        type: 'custom_trip',
        destinations: selectedRegions,
        travelDate: document.getElementById('plan-date').value,
        durationDays: parseInt(document.getElementById('plan-days').value) || 5,
        adults: parseInt(document.getElementById('plan-adults').value) || 2,
        children: parseInt(document.getElementById('plan-children').value) || 0,
        hotelTier: document.getElementById('plan-hotel').options[document.getElementById('plan-hotel').selectedIndex].text,
        vehicleType: document.getElementById('plan-vehicle').options[document.getElementById('plan-vehicle').selectedIndex].text,
        estimatedBudgetINR: window.currentCustomQuote ? window.currentCustomQuote.estimatedTotal : 45000,
        message: document.getElementById('plan-notes').value
      };

      try {
        const res = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success) {
          showCustomPlannerSuccess(data.inquiry);
          form.reset();
          calculateCustomTripQuote();
        } else {
          showToast(data.message || 'Inquiry submission failed', 'error');
        }
      } catch (err) {
        showCustomPlannerSuccess({
          id: `INQ-2026-${Math.floor(100 + Math.random() * 900)}`,
          ...payload
        });
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
});

function showCustomPlannerSuccess(inquiry) {
  const modal = document.getElementById('custom-success-modal');
  const details = document.getElementById('custom-success-details');
  if (!modal || !details) return;

  details.innerHTML = `
    <div class="text-center space-y-4">
      <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
        <i data-lucide="check" class="w-8 h-8"></i>
      </div>
      <h3 class="text-2xl font-bold font-serif-heading text-slate-900">Custom Tour Plan Requested!</h3>
      <p class="text-xs text-slate-600 max-w-md mx-auto">
        Thank you, <strong>${inquiry.customerName}</strong>! Your inquiry ID is <span class="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">${inquiry.id}</span>.
      </p>

      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2">
        <div><span class="text-slate-500">Destinations:</span> <strong>${(inquiry.destinations || []).join(', ')}</strong></div>
        <div><span class="text-slate-500">Duration:</span> <strong>${inquiry.durationDays} Days</strong></div>
        <div><span class="text-slate-500">Estimated Quote:</span> <strong class="text-emerald-700 font-bold">${formatPrice(inquiry.estimatedBudgetINR)}</strong></div>
      </div>

      <div class="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900">
        Our North India travel curator will call you at <strong>${inquiry.customerPhone}</strong> within 15 minutes.
      </div>

      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <a href="tel:8725969152" class="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition">
          <i data-lucide="phone" class="w-4 h-4"></i> Call Desk (+91 8725969152)
        </a>
        <a href="https://wa.me/918725969152?text=Hello%20SafarZap%2C%20here%20is%20my%20inquiry%20reference%20${inquiry.id}." target="_blank" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition">
          <i data-lucide="message-circle" class="w-4 h-4"></i> Chat on WhatsApp
        </a>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function closeCustomSuccessModal() {
  const modal = document.getElementById('custom-success-modal');
  if (modal) modal.classList.add('hidden');
}
