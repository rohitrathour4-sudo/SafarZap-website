const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Brand details
const BRAND_INFO = {
  name: "SafarZap",
  tagline: "Discover the Magic of North India",
  phone: "8725969152",
  phoneFormatted: "+91 8725969152",
  email: "safarzap@gmail.com",
  whatsappUrl: "https://wa.me/918725969152?text=Hello%20SafarZap%2C%20I%20would%20like%20to%20inquire%20about%20North%20India%20tour%20packages.",
  operatingRegions: ["Kashmir & Ladakh", "Himachal Pradesh", "Uttarakhand", "Rajasthan", "Golden Triangle", "Punjab & Amritsar"],
  officeAddress: "SafarZap Travels Hub, Mall Road & Connaught Place, New Delhi & Chandigarh, India",
  supportHours: "24/7 Dedicated Concierge & Emergency Helpline"
};

// General Info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    success: true,
    data: BRAND_INFO
  });
});

// Destinations endpoint
app.get('/api/destinations', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'destinations.json'), 'utf8');
    res.json({ success: true, destinations: JSON.parse(data) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to read destinations' });
  }
});

// FAQs endpoint
app.get('/api/faqs', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'faqs.json'), 'utf8');
    res.json({ success: true, faqs: JSON.parse(data) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to read FAQs' });
  }
});

// Contact endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Name, phone, and message are required.' });
  }

  try {
    const inqPath = path.join(__dirname, 'data', 'inquiries.json');
    const inquiries = JSON.parse(fs.readFileSync(inqPath, 'utf8'));
    const newMsg = {
      id: `MSG-2026-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      customerName: name.trim(),
      customerEmail: (email || '').trim() || 'guest@safarzap.com',
      customerPhone: phone.trim(),
      type: 'contact_message',
      subject: subject || 'General Inquiry',
      message: message.trim(),
      status: 'New'
    };
    inquiries.unshift(newMsg);
    fs.writeFileSync(inqPath, JSON.stringify(inquiries, null, 2), 'utf8');

    res.json({
      success: true,
      message: 'Your message has been sent to SafarZap. We will get back to you shortly!',
      supportContact: {
        phone: BRAND_INFO.phone,
        email: BRAND_INFO.email
      }
    });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Mount Routes
app.use('/api/packages', require('./routes/packages'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/cabs', require('./routes/cabs'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/admin', require('./routes/admin'));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  🌟 SafarZap - North India Tours & Travel Portal 🌟   `);
  console.log(`  🚀 Server running on: http://localhost:${PORT}        `);
  console.log(`  📞 Helpline: ${BRAND_INFO.phoneFormatted}                 `);
  console.log(`  ✉️  Email: ${BRAND_INFO.email}                     `);
  console.log(`=======================================================`);
});
