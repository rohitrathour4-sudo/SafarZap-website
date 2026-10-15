# 🏔️ SafarZap — North India Tours & Travel Portal

**SafarZap** is a full-stack tours and travel web application dedicated to North India destinations (Kashmir, Ladakh, Himachal Pradesh, Uttarakhand, Rajasthan, Golden Triangle, Punjab & Amritsar).

---

## 📞 Brand & Contact Information

| Detail | Information |
|---|---|
| **Brand Name** | **SafarZap** |
| **Tagline** | Discover the Magic of North India |
| **Helpline / Phone** | `8725969152` (+91 8725969152) |
| **Official Email** | `safarzap@gmail.com` |
| **WhatsApp Support** | `https://wa.me/918725969152` |
| **Operating Regions** | Kashmir & Ladakh, Himachal Pradesh, Uttarakhand, Rajasthan, Golden Triangle, Punjab & Amritsar |

---

## 🌟 Key Features

### 1. Frontend Experience
- **North India Destination Showcases**: Visual discovery cards with seasons, highlights, and regional circuits.
- **Curated Tour Packages**: Real-time filtering by region, holiday style (Family, Adventure, Spiritual, Heritage), search bar, and budget range slider.
- **Dynamic Multi-Currency Switcher**: Real-time conversion between INR (₹), USD ($), and EUR (€).
- **Interactive Day-by-Day Itinerary Viewer**: Detailed daily plans, hotel stays, inclusions, exclusions, and photography.
- **Instant Booking Engine**:
  - Live cost calculation based on travelers, child fare (60%), hotel tier upgrades, vehicle selection, and optional regional add-ons.
  - Generates unique reference IDs (e.g. `SFZ-2026-XXXX`).
  - **Instant Printable Booking Voucher** with clean print styling (`window.print()`).
- **Interactive Custom Tour Planner**:
  - Travelers pick destinations, days, hotel tiers, vehicle types, and receive an estimated live quote before submitting their inquiry.
- **Intercity Outstation Cab & Taxi Booking**:
  - Transparent fixed fares with tolls and driver allowances included (Delhi-Manali, Delhi-Shimla, Delhi-Agra Taj Mahal, Delhi-Jaipur, Delhi-Rishikesh, Chandigarh-Manali, Srinagar-Gulmarg).
  - Vehicle switcher: Sedan (Dzire/Etios), SUV (Ertiga), Luxury SUV (Innova Crysta), Tempo Traveller.
- **Verified Traveler Reviews**: Testimonials from satisfied explorers with star ratings and user submission form.
- **Floating 24/7 Hotline & WhatsApp Speed-Dial**: Quick one-click call to `8725969152` or WhatsApp chat.

### 2. Backend & Operations CRM
- **RESTful API**:
  - `/api/packages` (GET all with filters, GET by slug/id, POST new, PUT, DELETE)
  - `/api/bookings` (GET all, GET by ID, POST new booking, PATCH status)
  - `/api/inquiries` (GET all, POST custom plan/inquiry, PATCH status)
  - `/api/cabs` (GET routes, POST cab booking)
  - `/api/reviews` (GET all, POST new review)
  - `/api/admin/stats` (KPI metrics: revenue, bookings, inquiries, ratings)
  - `/api/admin/export/:type` (Export bookings or inquiries to CSV)
  - `/api/destinations` & `/api/faqs`
  - `/api/contact` (Contact messages)
- **Built-in Admin Dashboard**:
  - Revenue & Booking analytics
  - Status management (`Confirmed`, `Pending`, `Completed`, `Cancelled`)
  - Inquiries CRM (`New`, `In Progress`, `Contacted`, `Converted`)
  - Direct CSV Export
  - Add New Tour Package form

---

## 📁 Project Structure

```
safarzap/
├── package.json               # Node.js dependencies (Express, CORS, Morgan)
├── server.js                  # Main Express backend server & static host
├── README.md                  # Project documentation
├── data/                      # Persistent JSON databases
│   ├── packages.json          # Curated North India tour catalog
│   ├── destinations.json      # Regional guides & highlights
│   ├── bookings.json          # Confirmed and pending bookings
│   ├── inquiries.json         # Custom tour plans & lead CRM
│   ├── cabs.json              # Intercity taxi routes and pricing
│   ├── testimonials.json      # Verified customer reviews
│   └── faqs.json              # Travel FAQs
├── routes/                    # Modular Express REST API routes
│   ├── packages.js            # Tour packages CRUD & filters
│   ├── bookings.js            # Booking engine & status updater
│   ├── inquiries.js           # Lead CRM & custom trip planner
│   ├── cabs.js                # Intercity taxi bookings
│   ├── reviews.js             # Review moderation
│   └── admin.js               # Analytics & CSV exports
└── public/                    # High-performance responsive frontend
    ├── index.html             # Main portal markup (Tailwind + Lucide)
    ├── css/
    │   └── styles.css         # Custom tokens, gradients, print styles
    └── js/
        ├── data-mock.js       # Client fallback data & configuration
        ├── app.js             # Main state, filters, search, currency
        ├── booking.js         # Booking engine & printable voucher
        ├── custom-planner.js  # Custom trip builder & dynamic quote
        ├── cab-booking.js     # Intercity taxi booking module
        └── admin.js           # Admin Dashboard & CRM operations
```

---

## 🚀 How to Run

1. Open PowerShell / Terminal in the project directory:
   ```powershell
   cd C:\Users\rohit\.gemini\antigravity\scratch\safarzap
   ```

2. Start the server:
   ```powershell
   node server.js
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

---

## 🛡️ Support & Inquiries
- **Phone:** `8725969152`
- **Email:** `safarzap@gmail.com`
- **Location:** SafarZap Hub, Connaught Place & Mall Road, New Delhi & Chandigarh, India
