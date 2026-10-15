const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const cabsFilePath = path.join(__dirname, '..', 'data', 'cabs.json');
const inquiriesFilePath = path.join(__dirname, '..', 'data', 'inquiries.json');

function readCabs() {
  try {
    const data = fs.readFileSync(cabsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// GET /api/cabs - List all North India cab routes
router.get('/', (req, res) => {
  const routes = readCabs();
  res.json({
    success: true,
    count: routes.length,
    routes
  });
});

// POST /api/cabs/book - Quick book an outstation taxi
router.post('/book', (req, res) => {
  const {
    routeId,
    from,
    to,
    vehicleType = 'sedan',
    pickupDate,
    pickupTime,
    customerName,
    customerPhone,
    customerEmail,
    pickupAddress
  } = req.body;

  if (!customerName || !customerPhone || !pickupDate) {
    return res.status(400).json({
      success: false,
      message: 'Name, phone number, and pickup date are required.'
    });
  }

  const routes = readCabs();
  const route = routes.find(r => r.id === routeId) || {
    from: from || 'Delhi NCR',
    to: to || 'North India Destination',
    pricing: {
      sedan: { priceINR: 4999 }
    }
  };

  const selectedTier = (route.pricing && route.pricing[vehicleType]) || { priceINR: 4999, car: vehicleType };
  const bookingRef = `CAB-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  // Store in inquiries database as well
  try {
    const inquiriesData = fs.readFileSync(inquiriesFilePath, 'utf8');
    const inquiries = JSON.parse(inquiriesData);
    inquiries.unshift({
      id: bookingRef,
      createdAt: new Date().toISOString(),
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'guest@safarzap.com',
      type: 'cab_rental',
      route: `${route.from} to ${route.to}`,
      vehicleType: selectedTier.car || vehicleType,
      travelDate: pickupDate,
      pickupTime: pickupTime || 'Morning (8:00 AM)',
      pickupAddress: pickupAddress || 'To be shared on call',
      estimatedBudgetINR: selectedTier.priceINR,
      status: 'New'
    });
    fs.writeFileSync(inquiriesFilePath, JSON.stringify(inquiries, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to append cab inquiry:', e);
  }

  res.status(201).json({
    success: true,
    message: 'Cab booking request received! Chauffeur and vehicle details will be dispatched to your phone.',
    bookingRef,
    route: `${route.from} to ${route.to}`,
    estimatedFareINR: selectedTier.priceINR,
    vehicle: selectedTier.car || vehicleType,
    support: {
      phone: '8725969152',
      email: 'safarzap@gmail.com'
    }
  });
});

module.exports = router;
