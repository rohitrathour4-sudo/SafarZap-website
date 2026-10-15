const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const bookingsFilePath = path.join(__dirname, '..', 'data', 'bookings.json');
const inquiriesFilePath = path.join(__dirname, '..', 'data', 'inquiries.json');
const packagesFilePath = path.join(__dirname, '..', 'data', 'packages.json');
const testimonialsFilePath = path.join(__dirname, '..', 'data', 'testimonials.json');

function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return [];
  }
}

// GET /api/admin/stats - KPI Dashboard stats
router.get('/stats', (req, res) => {
  const bookings = readJSON(bookingsFilePath);
  const inquiries = readJSON(inquiriesFilePath);
  const packages = readJSON(packagesFilePath);
  const reviews = readJSON(testimonialsFilePath);

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;

  const totalRevenueINR = bookings
    .filter(b => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + (Number(b.totalAmountINR) || 0), 0);

  const totalAdvanceCollectedINR = bookings
    .filter(b => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + (Number(b.advancePaidINR) || 0), 0);

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'New').length;

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : '4.9';

  res.json({
    success: true,
    stats: {
      totalBookings,
      confirmedBookings,
      pendingBookings,
      totalRevenueINR,
      totalAdvanceCollectedINR,
      totalInquiries,
      newInquiries,
      totalPackages: packages.length,
      totalReviews: reviews.length,
      averageRating: avgRating
    },
    contactInfo: {
      brand: "SafarZap",
      phone: "8725969152",
      email: "safarzap@gmail.com"
    }
  });
});

// GET /api/admin/export/:type - Export CSV
router.get('/export/:type', (req, res) => {
  const { type } = req.params;
  if (type === 'bookings') {
    const bookings = readJSON(bookingsFilePath);
    let csv = 'Booking ID,Customer Name,Phone,Email,Package,Travel Date,Adults,Children,Total (INR),Advance (INR),Status\n';
    bookings.forEach(b => {
      csv += `"${b.id}","${b.customerName}","${b.customerPhone}","${b.customerEmail}","${b.packageTitle}","${b.travelDate}",${b.adults},${b.children},${b.totalAmountINR},${b.advancePaidINR},"${b.status}"\n`;
    });
    res.header('Content-Type', 'text/csv');
    res.attachment(`safarzap-bookings-${Date.now()}.csv`);
    return res.send(csv);
  }

  if (type === 'inquiries') {
    const inquiries = readJSON(inquiriesFilePath);
    let csv = 'Inquiry ID,Customer Name,Phone,Email,Type,Destinations,Travel Date,Adults,Budget (INR),Status\n';
    inquiries.forEach(i => {
      const dest = (i.destinations || []).join('; ');
      csv += `"${i.id}","${i.customerName}","${i.customerPhone}","${i.customerEmail}","${i.type}","${dest}","${i.travelDate}",${i.adults || 2},${i.estimatedBudgetINR || 0},"${i.status}"\n`;
    });
    res.header('Content-Type', 'text/csv');
    res.attachment(`safarzap-inquiries-${Date.now()}.csv`);
    return res.send(csv);
  }

  res.status(400).send('Invalid export type. Use bookings or inquiries.');
});

module.exports = router;
