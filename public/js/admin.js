// SafarZap Admin Portal & Management System

let adminBookings = [];
let adminInquiries = [];

function openAdminPortal() {
  const modal = document.getElementById('admin-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  loadAdminData();
}

function closeAdminPortal() {
  const modal = document.getElementById('admin-modal');
  if (modal) modal.classList.add('hidden');
}

function switchAdminTab(tabName) {
  document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.add('hidden'));
  document.querySelectorAll('.admin-tab-btn').forEach(b => {
    b.className = "admin-tab-btn px-4 py-2 text-xs font-bold rounded-xl text-slate-600 hover:bg-slate-100 transition";
  });

  const targetContent = document.getElementById(`admin-tab-${tabName}`);
  const targetBtn = document.getElementById(`admin-btn-${tabName}`);
  if (targetContent) targetContent.classList.remove('hidden');
  if (targetBtn) targetBtn.className = "admin-tab-btn px-4 py-2 text-xs font-bold rounded-xl bg-amber-600 text-white shadow-sm transition";

  lucide.createIcons();
}

async function loadAdminData() {
  await Promise.all([
    loadAdminStats(),
    loadAdminBookings(),
    loadAdminInquiries()
  ]);
  lucide.createIcons();
}

async function loadAdminStats() {
  try {
    const res = await fetch('/api/admin/stats');
    const data = await res.json();
    if (data.success && data.stats) {
      const s = data.stats;
      document.getElementById('stat-total-revenue').textContent = `₹${s.totalRevenueINR.toLocaleString('en-IN')}`;
      document.getElementById('stat-advance-collected').textContent = `₹${s.totalAdvanceCollectedINR.toLocaleString('en-IN')}`;
      document.getElementById('stat-total-bookings').textContent = s.totalBookings;
      document.getElementById('stat-confirmed-bookings').textContent = s.confirmedBookings;
      document.getElementById('stat-total-inquiries').textContent = s.totalInquiries;
      document.getElementById('stat-new-inquiries').textContent = s.newInquiries;
      document.getElementById('stat-total-packages').textContent = s.totalPackages;
      document.getElementById('stat-avg-rating').textContent = `${s.averageRating} ★`;
    }
  } catch (e) {
    console.error('Failed to load stats:', e);
  }
}

async function loadAdminBookings() {
  const tbody = document.getElementById('admin-bookings-table');
  if (!tbody) return;

  try {
    const res = await fetch('/api/bookings');
    const data = await res.json();
    adminBookings = data.bookings || [];

    renderAdminBookings(adminBookings);
  } catch (e) {
    console.error('Failed to load bookings:', e);
  }
}

function renderAdminBookings(bookingsList) {
  const tbody = document.getElementById('admin-bookings-table');
  if (!tbody) return;

  if (bookingsList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-xs text-slate-400">No bookings found.</td></tr>`;
    return;
  }

  tbody.innerHTML = bookingsList.map(b => {
    let statusBg = 'bg-amber-100 text-amber-800';
    if (b.status === 'Confirmed') statusBg = 'bg-emerald-100 text-emerald-800';
    if (b.status === 'Cancelled') statusBg = 'bg-rose-100 text-rose-800';
    if (b.status === 'Completed') statusBg = 'bg-blue-100 text-blue-800';

    return `
      <tr class="border-b border-slate-100 hover:bg-slate-50 text-xs">
        <td class="p-3 font-mono font-bold text-amber-700">${b.id}</td>
        <td class="p-3">
          <div class="font-bold text-slate-900">${b.customerName}</div>
          <div class="text-[11px] text-slate-500">${b.customerPhone} | ${b.customerEmail}</div>
        </td>
        <td class="p-3">
          <div class="font-semibold text-slate-800 max-w-[200px] truncate" title="${b.packageTitle}">${b.packageTitle}</div>
          <div class="text-[11px] text-slate-500">${b.travelDate} • ${b.adults} Ad / ${b.children || 0} Ch</div>
        </td>
        <td class="p-3 font-bold text-slate-900">₹${Number(b.totalAmountINR || 0).toLocaleString('en-IN')}</td>
        <td class="p-3 font-semibold text-emerald-700">₹${Number(b.advancePaidINR || 0).toLocaleString('en-IN')}</td>
        <td class="p-3">
          <span class="px-2 py-0.5 rounded-full text-[11px] font-bold ${statusBg}">
            ${b.status}
          </span>
        </td>
        <td class="p-3">
          <select onchange="updateBookingStatus('${b.id}', this.value)" class="text-xs bg-white border border-slate-200 rounded p-1 text-slate-700">
            <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td class="p-3 text-right">
          <button onclick="showBookingVoucherById('${b.id}')" class="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded text-slate-700">
            Voucher
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

async function updateBookingStatus(bookingId, newStatus) {
  try {
    const res = await fetch(`/api/bookings/${bookingId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`Booking ${bookingId} status updated to ${newStatus}`, 'success');
      loadAdminData();
    }
  } catch (e) {
    showToast('Failed to update status', 'error');
  }
}

function showBookingVoucherById(id) {
  const b = adminBookings.find(item => item.id === id);
  if (b) {
    showBookingVoucher(b);
  }
}

async function loadAdminInquiries() {
  const tbody = document.getElementById('admin-inquiries-table');
  if (!tbody) return;

  try {
    const res = await fetch('/api/inquiries');
    const data = await res.json();
    adminInquiries = data.inquiries || [];

    renderAdminInquiries(adminInquiries);
  } catch (e) {
    console.error('Failed to load inquiries:', e);
  }
}

function renderAdminInquiries(list) {
  const tbody = document.getElementById('admin-inquiries-table');
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-xs text-slate-400">No inquiries found.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(i => {
    let statusClass = 'bg-amber-100 text-amber-800';
    if (i.status === 'Contacted') statusClass = 'bg-blue-100 text-blue-800';
    if (i.status === 'Converted') statusClass = 'bg-emerald-100 text-emerald-800';

    return `
      <tr class="border-b border-slate-100 hover:bg-slate-50 text-xs">
        <td class="p-3 font-mono font-bold text-slate-700">${i.id}</td>
        <td class="p-3">
          <div class="font-bold text-slate-900">${i.customerName}</div>
          <div class="text-[11px] text-slate-500">${i.customerPhone}</div>
        </td>
        <td class="p-3 font-medium text-slate-800">
          ${i.type === 'cab_rental' ? `Cab: ${i.route || 'Outstation'}` : (i.destinations || []).join(', ')}
        </td>
        <td class="p-3 text-slate-600">
          ${i.durationDays ? `${i.durationDays} Days • ` : ''}${i.travelDate}
        </td>
        <td class="p-3 font-bold text-slate-900">₹${Number(i.estimatedBudgetINR || 0).toLocaleString('en-IN')}</td>
        <td class="p-3">
          <span class="px-2 py-0.5 rounded-full text-[11px] font-bold ${statusClass}">
            ${i.status}
          </span>
        </td>
        <td class="p-3 text-right">
          <select onchange="updateInquiryStatus('${i.id}', this.value)" class="text-xs bg-white border border-slate-200 rounded p-1 text-slate-700">
            <option value="New" ${i.status === 'New' ? 'selected' : ''}>New</option>
            <option value="In Progress" ${i.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Contacted" ${i.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
            <option value="Converted" ${i.status === 'Converted' ? 'selected' : ''}>Converted</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');
}

async function updateInquiryStatus(id, newStatus) {
  try {
    const res = await fetch(`/api/inquiries/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`Inquiry ${id} status updated to ${newStatus}`, 'success');
      loadAdminData();
    }
  } catch (e) {
    showToast('Failed to update status', 'error');
  }
}

// Add New Package
document.addEventListener('DOMContentLoaded', () => {
  const addPkgForm = document.getElementById('admin-add-package-form');
  if (addPkgForm) {
    addPkgForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const newPkg = {
        title: document.getElementById('new-pkg-title').value,
        region: document.getElementById('new-pkg-region').value,
        duration: document.getElementById('new-pkg-duration').value,
        days: parseInt(document.getElementById('new-pkg-days').value) || 5,
        nights: parseInt(document.getElementById('new-pkg-nights').value) || 4,
        priceINR: parseInt(document.getElementById('new-pkg-price').value) || 19999,
        originalPriceINR: parseInt(document.getElementById('new-pkg-orig-price').value) || 24999,
        discountPercent: 20,
        rating: 5.0,
        reviewCount: 1,
        badge: document.getElementById('new-pkg-badge').value,
        travelStyle: document.getElementById('new-pkg-style').value,
        image: document.getElementById('new-pkg-image').value || "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1000&q=80",
        description: document.getElementById('new-pkg-desc').value,
        highlights: document.getElementById('new-pkg-highlights').value.split(',').map(s => s.trim()),
        itinerary: [
          { day: 1, title: "Arrival & Sightseeing", description: "Scenic transfer and leisure day.", meals: "Dinner", stay: "Deluxe Resort" }
        ],
        inclusions: ["Deluxe Hotel Stay", "Breakfast & Dinner", "Dedicated Private Chauffeur & Cab"],
        exclusions: ["Airfare / Train", "Personal Expenses"]
      };

      try {
        const res = await fetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPkg)
        });
        const data = await res.json();

        if (data.success) {
          showToast('New tour package created and published live on SafarZap!', 'success');
          addPkgForm.reset();
          loadPackages();
          loadAdminStats();
          switchAdminTab('bookings');
        }
      } catch (err) {
        showToast('Failed to create package', 'error');
      }
    });
  }
});
