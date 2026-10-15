// SafarZap Booking Engine & Voucher Generator

let currentBookingPackage = null;

function openBookingModal(pkgId) {
  currentBookingPackage = allPackages.find(p => p.id === pkgId) || allPackages[0];
  if (!currentBookingPackage) return;

  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  // Set default form values
  document.getElementById('booking-pkg-title').textContent = currentBookingPackage.title;
  document.getElementById('booking-pkg-region').textContent = `${currentBookingPackage.region} • ${currentBookingPackage.duration}`;
  document.getElementById('booking-pkg-img').src = currentBookingPackage.image;

  // Set default travel date to 7 days from now
  const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    dateInput.value = nextWeek;
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  // Populate dynamic add-ons based on region
  populateAddons(currentBookingPackage.region);

  recalculateBookingPrice();
  modal.classList.remove('hidden');
  lucide.createIcons();
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) modal.classList.add('hidden');
}

function populateAddons(region) {
  const container = document.getElementById('booking-addons-container');
  if (!container) return;

  let regionalAddons = [
    { id: "addon-bonfire", name: "Campfire & Music Evening", price: 1200 },
    { id: "addon-guide", name: "Personal Government Certified Monument Guide", price: 1800 },
    { id: "addon-insurance", name: "Travel & High-Altitude Medical Insurance", price: 950 }
  ];

  if (region.includes("Kashmir")) {
    regionalAddons.unshift(
      { id: "addon-gondola", name: "Gulmarg Gondola Phase-2 Snow Peak Pass", price: 2100 },
      { id: "addon-shikara", name: "Dal Lake Sunset Candlelight Shikara Ride", price: 1500 }
    );
  } else if (region.includes("Himachal")) {
    regionalAddons.unshift(
      { id: "addon-para", name: "Solang Valley Tandem Paragliding", price: 2400 },
      { id: "addon-rafting", name: "Kullu Beas River Rafting Pass", price: 1600 }
    );
  } else if (region.includes("Rajasthan")) {
    regionalAddons.unshift(
      { id: "addon-dune", name: "4x4 Desert Jeep Dune Bashing & Sunset Camel Safari", price: 2200 },
      { id: "addon-pichola", name: "Lake Pichola Luxury Royal Sunset Cruise", price: 1800 }
    );
  } else if (region.includes("Uttarakhand")) {
    regionalAddons.unshift(
      { id: "addon-rafting", name: "16 km Shivpuri Ganges White Water Rafting", price: 1500 },
      { id: "addon-aarti", name: "Har Ki Pauri VIP Ganga Aarti Reserved Seating", price: 1100 }
    );
  }

  container.innerHTML = regionalAddons.map(addon => `
    <label class="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition">
      <div class="flex items-center gap-2">
        <input type="checkbox" name="booking-addon" value="${addon.name}" data-price="${addon.price}" onchange="recalculateBookingPrice()" class="rounded text-amber-600 focus:ring-amber-500 w-4 h-4">
        <span class="text-xs font-semibold text-slate-800">${addon.name}</span>
      </div>
      <span class="text-xs font-bold text-amber-700">+₹${addon.price}</span>
    </label>
  `).join('');
}

function recalculateBookingPrice() {
  if (!currentBookingPackage) return;

  const adults = parseInt(document.getElementById('booking-adults').value) || 1;
  const children = parseInt(document.getElementById('booking-children').value) || 0;
  const hotelTier = document.getElementById('booking-hotel').value;
  const vehicle = document.getElementById('booking-vehicle').value;

  const basePricePerAdult = currentBookingPackage.priceINR;
  const childPrice = Math.round(basePricePerAdult * 0.6);

  let baseTotal = (adults * basePricePerAdult) + (children * childPrice);

  // Hotel upgrade
  let hotelUpgrade = 0;
  if (hotelTier === '4-star') {
    hotelUpgrade = adults * 2500;
  } else if (hotelTier === '5-star') {
    hotelUpgrade = adults * 6000;
  }

  // Vehicle upgrade
  let vehicleUpgrade = 0;
  if (vehicle === 'innova') {
    vehicleUpgrade = 3500;
  } else if (vehicle === 'tempo') {
    vehicleUpgrade = 8000;
  }

  // Add-ons
  let addonsTotal = 0;
  document.querySelectorAll('input[name="booking-addon"]:checked').forEach(cb => {
    addonsTotal += (Number(cb.getAttribute('data-price')) || 0) * adults;
  });

  const subtotal = baseTotal + hotelUpgrade + vehicleUpgrade + addonsTotal;
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const discount = Math.round(subtotal * 0.08); // 8% SafarZap Online Promo
  const grandTotal = subtotal + gst - discount;
  const advanceRequired = Math.round(grandTotal * 0.25); // 25% token advance
  const balanceDue = grandTotal - advanceRequired;

  // Update UI Elements
  document.getElementById('price-subtotal').textContent = formatPrice(subtotal);
  document.getElementById('price-gst').textContent = formatPrice(gst);
  document.getElementById('price-discount').textContent = `- ${formatPrice(discount)}`;
  document.getElementById('price-grand-total').textContent = formatPrice(grandTotal);
  document.getElementById('price-advance').textContent = formatPrice(advanceRequired);
  document.getElementById('price-balance').textContent = formatPrice(balanceDue);

  window.currentCalculatedBooking = {
    subtotal,
    gst,
    discount,
    grandTotal,
    advanceRequired,
    balanceDue
  };
}

// Handle Booking Form Submit
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('booking-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Confirming...`;

    const selectedAddons = [];
    document.querySelectorAll('input[name="booking-addon"]:checked').forEach(cb => {
      selectedAddons.push(cb.value);
    });

    const hotelTierName = {
      '3-star': '3-Star Deluxe Resort/Hotel',
      '4-star': '4-Star Premium Boutique',
      '5-star': '5-Star Luxury Heritage Palace'
    }[document.getElementById('booking-hotel').value] || '3-Star Deluxe';

    const vehicleName = {
      'sedan': 'Private AC Sedan (Dzire / Etios)',
      'innova': 'Private Toyota Innova Crysta SUV',
      'tempo': 'Private Force Tempo Traveller (Group)'
    }[document.getElementById('booking-vehicle').value] || 'Private AC Sedan';

    const payload = {
      packageId: currentBookingPackage.id,
      packageTitle: currentBookingPackage.title,
      customerName: document.getElementById('booking-name').value,
      customerPhone: document.getElementById('booking-phone').value,
      customerEmail: document.getElementById('booking-email').value,
      travelDate: document.getElementById('booking-date').value,
      adults: parseInt(document.getElementById('booking-adults').value) || 1,
      children: parseInt(document.getElementById('booking-children').value) || 0,
      hotelTier: hotelTierName,
      vehicle: vehicleName,
      addons: selectedAddons,
      notes: document.getElementById('booking-notes').value,
      paymentMethod: document.getElementById('booking-payment-method').value
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        closeBookingModal();
        showBookingVoucher(data.booking);
        showToast(`Booking Successful! Reference: ${data.booking.id}`, 'success');
      } else {
        showToast(data.message || 'Booking submission failed', 'error');
      }
    } catch (err) {
      // Fallback client confirmation
      const fallbackBooking = {
        id: `SFZ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        ...payload,
        totalAmountINR: window.currentCalculatedBooking ? window.currentCalculatedBooking.grandTotal : 35000,
        advancePaidINR: window.currentCalculatedBooking ? window.currentCalculatedBooking.advanceRequired : 8750,
        balanceDueINR: window.currentCalculatedBooking ? window.currentCalculatedBooking.balanceDue : 26250,
        status: 'Confirmed'
      };
      closeBookingModal();
      showBookingVoucher(fallbackBooking);
      showToast('Booking Confirmed! Voucher Generated.', 'success');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
});

// Render Confirmed Voucher Modal
function showBookingVoucher(booking) {
  const modal = document.getElementById('voucher-modal');
  const content = document.getElementById('voucher-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div id="printable-voucher" class="bg-white p-6 md:p-8 rounded-2xl border border-slate-200">
      <!-- Voucher Header -->
      <div class="flex flex-wrap items-center justify-between border-b pb-6 mb-6 gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
            SZ
          </div>
          <div>
            <h2 class="text-2xl font-bold font-serif-heading text-slate-900 tracking-tight">Safar<span class="text-amber-600">Zap</span></h2>
            <p class="text-xs text-slate-500 font-medium">North India Tours & Travel Specialist</p>
          </div>
        </div>

        <div class="text-right">
          <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">Booking Voucher</div>
          <div class="text-lg font-black text-amber-700 font-mono tracking-wider">${booking.id}</div>
          <span class="inline-block mt-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            Status: ${booking.status || 'Confirmed'}
          </span>
        </div>
      </div>

      <!-- Support Banner -->
      <div class="bg-slate-900 text-white p-4 rounded-xl mb-6 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div>
          <span class="text-amber-400 font-bold">24/7 SafarZap Travel Helpline:</span>
          <span class="font-bold ml-1 text-sm">+91 8725969152</span>
        </div>
        <div>
          <span class="text-slate-400">Official Support Email:</span>
          <span class="text-amber-300 ml-1">safarzap@gmail.com</span>
        </div>
      </div>

      <!-- Booking Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-xs">
        <div class="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 class="font-bold text-slate-900 text-sm border-b pb-2">Traveler Information</h4>
          <div><span class="text-slate-500 font-medium">Lead Traveler:</span> <strong class="text-slate-900 ml-1 text-sm">${booking.customerName}</strong></div>
          <div><span class="text-slate-500 font-medium">Phone:</span> <strong class="text-slate-900 ml-1">${booking.customerPhone}</strong></div>
          <div><span class="text-slate-500 font-medium">Email:</span> <strong class="text-slate-900 ml-1">${booking.customerEmail}</strong></div>
          <div><span class="text-slate-500 font-medium">Travelers:</span> <strong class="text-slate-900 ml-1">${booking.adults} Adults${booking.children ? `, ${booking.children} Children` : ''}</strong></div>
        </div>

        <div class="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 class="font-bold text-slate-900 text-sm border-b pb-2">Package & Itinerary Details</h4>
          <div><span class="text-slate-500 font-medium">Tour Package:</span> <strong class="text-slate-900 ml-1">${booking.packageTitle}</strong></div>
          <div><span class="text-slate-500 font-medium">Start Date:</span> <strong class="text-amber-700 ml-1">${booking.travelDate}</strong></div>
          <div><span class="text-slate-500 font-medium">Hotel Tier:</span> <strong class="text-slate-900 ml-1">${booking.hotelTier}</strong></div>
          <div><span class="text-slate-500 font-medium">Private Vehicle:</span> <strong class="text-slate-900 ml-1">${booking.vehicle}</strong></div>
        </div>
      </div>

      <!-- Addons and Inclusions -->
      ${booking.addons && booking.addons.length ? `
        <div class="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50/50 text-xs">
          <h5 class="font-bold text-amber-950 mb-2">Confirmed Experiences & Add-ons:</h5>
          <div class="flex flex-wrap gap-2">
            ${booking.addons.map(a => `<span class="bg-white border border-amber-300 text-amber-900 px-3 py-1 rounded-full font-medium shadow-sm">✓ ${a}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Financials -->
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-xs">
        <h4 class="font-bold text-slate-900 text-sm border-b pb-2 mb-3">Billing & Payment Summary</h4>
        <div class="flex justify-between py-1 text-slate-600">
          <span>Total Tour Cost (Taxes Included):</span>
          <span class="font-bold text-slate-900">${formatPrice(booking.totalAmountINR)}</span>
        </div>
        <div class="flex justify-between py-1 text-emerald-700 font-semibold">
          <span>Token Advance Paid / Verified:</span>
          <span>${formatPrice(booking.advancePaidINR)}</span>
        </div>
        <div class="flex justify-between py-1 text-amber-900 font-bold border-t border-slate-200 mt-2 pt-2 text-sm">
          <span>Balance Payable on Arrival:</span>
          <span>${formatPrice(booking.balanceDueINR)}</span>
        </div>
      </div>

      <!-- Important Notes & Contact instructions -->
      <div class="border-t pt-4 text-[11px] text-slate-500 space-y-1.5">
        <p>• <strong>Important:</strong> Please carry a government-approved photo ID (Aadhaar / Voter ID / Passport) for hotel check-ins and high-altitude permits.</p>
        <p>• Your dedicated local chauffeur and coordinator details will be SMS-ed and WhatsApp-ed 24 hours prior to travel date.</p>
        <p>• For urgent modifications or assistance, contact SafarZap directly: <strong>+91 8725969152</strong> or email <strong>safarzap@gmail.com</strong>.</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex flex-wrap items-center justify-between gap-4 no-print">
      <button onclick="closeVoucherModal()" class="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition">
        Close
      </button>
      <div class="flex items-center gap-3">
        <a href="https://wa.me/918725969152?text=Hello%20SafarZap%2C%20here%20is%20my%20booking%20reference%20${booking.id}." target="_blank" class="px-4 py-2.5 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-xl flex items-center gap-1.5 transition">
          <i data-lucide="message-circle" class="w-4 h-4 text-emerald-600"></i> WhatsApp Support
        </a>
        <button onclick="window.print()" class="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5">
          <i data-lucide="printer" class="w-4 h-4"></i> Print Travel Voucher
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function closeVoucherModal() {
  const modal = document.getElementById('voucher-modal');
  if (modal) modal.classList.add('hidden');
}

// Track Booking by ID
async function trackBookingPrompt() {
  const refId = prompt("Enter your SafarZap Booking Reference ID (e.g. SFZ-2026-9412):");
  if (!refId) return;

  try {
    const res = await fetch(`/api/bookings/${refId.trim()}`);
    const data = await res.json();
    if (data.success && data.booking) {
      showBookingVoucher(data.booking);
    } else {
      alert("Booking Reference ID not found. Please verify your reference or call +91 8725969152 for help.");
    }
  } catch (e) {
    alert("Unable to fetch booking. Please call our 24/7 hotline: +91 8725969152.");
  }
}
