const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const bookingsFilePath = path.join(__dirname, '..', 'data', 'bookings.json');
const packagesFilePath = path.join(__dirname, '..', 'data', 'packages.json');

function readBookings() {
  try {
    const data = fs.readFileSync(bookingsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading bookings.json:', err);
    return [];
  }
}

function writeBookings(bookings) {
  fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), 'utf8');
}

function readPackages() {
  try {
    const data = fs.readFileSync(packagesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// GET /api/bookings - List all bookings
router.get('/', (req, res) => {
  const bookings = readBookings();
  const { status, search } = req.query;

  let filtered = bookings;
  if (status && status !== 'all') {
    filtered = filtered.filter(b => b.status.toLowerCase() === status.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(b => 
      b.id.toLowerCase().includes(q) ||
      b.customerName.toLowerCase().includes(q) ||
      b.customerEmail.toLowerCase().includes(q) ||
      b.customerPhone.includes(q) ||
      (b.packageTitle && b.packageTitle.toLowerCase().includes(q))
    );
  }

  res.json({
    success: true,
    count: filtered.length,
    bookings: filtered
  });
});

// GET /api/bookings/:id - Get specific booking by reference ID
router.get('/:id', (req, res) => {
  const bookings = readBookings();
  const booking = bookings.find(b => b.id.toUpperCase() === req.params.id.toUpperCase());

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking reference not found' });
  }

  res.json({
    success: true,
    booking,
    support: {
      brand: "SafarZap Tours & Travels",
      phone: "8725969152",
      email: "safarzap@gmail.com",
      whatsapp: "https://wa.me/918725969152"
    }
  });
});

// POST /api/bookings - Create new booking
router.post('/', (req, res) => {
  const {
    packageId,
    customerName,
    customerEmail,
    customerPhone,
    travelDate,
    adults = 1,
    children = 0,
    vehicle = "Sedan (Swift Dzire/Etios)",
    hotelTier = "3-Star Deluxe",
    addons = [],
    notes = "",
    paymentMethod = "Pay on Arrival / UPI"
  } = req.body;

  if (!customerName || !customerPhone || !travelDate) {
    return res.status(400).json({
      success: false,
      message: 'Name, phone number, and travel date are required.'
    });
  }

  const packages = readPackages();
  const pkg = packages.find(p => p.id === packageId) || {
    title: req.body.packageTitle || "Custom North India Tour",
    priceINR: req.body.priceINR || 15000
  };

  // Base calculation
  const numAdults = parseInt(adults) || 1;
  const numChildren = parseInt(children) || 0;
  const baseRate = pkg.priceINR;

  // Children charged 60% of adult price
  let calculatedTotal = (numAdults * baseRate) + (numChildren * Math.round(baseRate * 0.6));

  // Hotel Tier upgrade multiplier
  if (hotelTier.includes("4-Star")) {
    calculatedTotal += (numAdults * 2500);
  } else if (hotelTier.includes("5-Star") || hotelTier.includes("Palace")) {
    calculatedTotal += (numAdults * 6000);
  }

  // Vehicle adjustment
  if (vehicle.includes("Innova")) {
    calculatedTotal += 3500;
  } else if (vehicle.includes("Tempo")) {
    calculatedTotal += 8000;
  }

  // Add-ons (e.g., Gondola pass, Paragliding: ₹2,000 per person)
  if (addons && Array.isArray(addons)) {
    calculatedTotal += (addons.length * 1800 * numAdults);
  }

  // Generate Reference ID: SFZ-2026-XXXX
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const bookingId = `SFZ-2026-${randomSuffix}`;

  // Advance calculation (25% token advance)
  const advanceAmount = Math.round(calculatedTotal * 0.25);
  const balanceDue = calculatedTotal - advanceAmount;

  const newBooking = {
    id: bookingId,
    createdAt: new Date().toISOString(),
    packageId: pkg.id || packageId,
    packageTitle: pkg.title,
    customerName: customerName.trim(),
    customerEmail: (customerEmail || "").trim() || "guest@safarzap.com",
    customerPhone: customerPhone.trim(),
    travelDate,
    adults: numAdults,
    children: numChildren,
    vehicle,
    hotelTier,
    addons,
    totalAmountINR: calculatedTotal,
    advancePaidINR: advanceAmount,
    balanceDueINR: balanceDue,
    paymentMethod,
    status: "Confirmed",
    notes: notes || "Standard booking",
    supportContact: {
      phone: "8725969152",
      email: "safarzap@gmail.com"
    }
  };

  const bookings = readBookings();
  bookings.unshift(newBooking);
  writeBookings(bookings);

  res.status(201).json({
    success: true,
    message: 'Booking confirmed successfully with SafarZap!',
    booking: newBooking,
    support: {
      phone: "8725969152",
      email: "safarzap@gmail.com",
      message: "For any instant modifications or travel questions, call or WhatsApp our helpline at +91 8725969152."
    }
  });
});

// PATCH /api/bookings/:id/status - Update booking status (Admin)
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  if (!['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }

  const bookings = readBookings();
  const index = bookings.findIndex(b => b.id.toUpperCase() === req.params.id.toUpperCase());

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  bookings[index].status = status;
  bookings[index].updatedAt = new Date().toISOString();
  writeBookings(bookings);

  res.json({
    success: true,
    message: `Booking ${bookings[index].id} status updated to ${status}`,
    booking: bookings[index]
  });
});

module.exports = router;
