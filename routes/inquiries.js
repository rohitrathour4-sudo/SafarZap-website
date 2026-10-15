const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const inquiriesFilePath = path.join(__dirname, '..', 'data', 'inquiries.json');

function readInquiries() {
  try {
    const data = fs.readFileSync(inquiriesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading inquiries.json:', err);
    return [];
  }
}

function writeInquiries(inquiries) {
  fs.writeFileSync(inquiriesFilePath, JSON.stringify(inquiries, null, 2), 'utf8');
}

// GET /api/inquiries - List inquiries for Admin
router.get('/', (req, res) => {
  const inquiries = readInquiries();
  const { status, type } = req.query;

  let filtered = inquiries;
  if (status && status !== 'all') {
    filtered = filtered.filter(i => i.status.toLowerCase() === status.toLowerCase());
  }
  if (type && type !== 'all') {
    filtered = filtered.filter(i => i.type === type);
  }

  res.json({
    success: true,
    count: filtered.length,
    inquiries: filtered
  });
});

// POST /api/inquiries - Create new custom trip planner inquiry or general message
router.post('/', (req, res) => {
  const {
    customerName,
    customerEmail,
    customerPhone,
    type = 'custom_trip',
    destinations = [],
    travelDate,
    durationDays = 5,
    adults = 2,
    children = 0,
    hotelTier = '3-Star Deluxe',
    vehicleType = 'Sedan',
    estimatedBudgetINR = 25000,
    route,
    message = ''
  } = req.body;

  if (!customerName || !customerPhone) {
    return res.status(400).json({
      success: false,
      message: 'Name and Phone number are required to submit an inquiry.'
    });
  }

  const randomNum = Math.floor(100 + Math.random() * 900);
  const inquiryId = `INQ-2026-${randomNum}`;

  const newInquiry = {
    id: inquiryId,
    createdAt: new Date().toISOString(),
    customerName: customerName.trim(),
    customerEmail: (customerEmail || '').trim() || 'safarzap.traveler@gmail.com',
    customerPhone: customerPhone.trim(),
    type,
    destinations: Array.isArray(destinations) ? destinations : [destinations],
    travelDate: travelDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    durationDays: Number(durationDays) || 5,
    adults: Number(adults) || 2,
    children: Number(children) || 0,
    hotelTier,
    vehicleType,
    estimatedBudgetINR: Number(estimatedBudgetINR) || 25000,
    route: route || undefined,
    message: message.trim(),
    status: 'New'
  };

  const inquiries = readInquiries();
  inquiries.unshift(newInquiry);
  writeInquiries(inquiries);

  res.status(201).json({
    success: true,
    message: 'Thank you! Your inquiry has been received by SafarZap travel planners.',
    inquiry: newInquiry,
    contactHelp: {
      phone: '8725969152',
      email: 'safarzap@gmail.com',
      note: 'Our North India travel expert will call you shortly on your provided phone number.'
    }
  });
});

// PATCH /api/inquiries/:id/status - Update inquiry status (Admin CRM)
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  if (!['New', 'In Progress', 'Contacted', 'Converted', 'Archived'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }

  const inquiries = readInquiries();
  const index = inquiries.findIndex(i => i.id.toUpperCase() === req.params.id.toUpperCase());

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Inquiry not found' });
  }

  inquiries[index].status = status;
  inquiries[index].updatedAt = new Date().toISOString();
  writeInquiries(inquiries);

  res.json({
    success: true,
    message: `Inquiry ${inquiries[index].id} marked as ${status}`,
    inquiry: inquiries[index]
  });
});

module.exports = router;
