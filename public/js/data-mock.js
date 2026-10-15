// SafarZap Client-side Data and Config
window.SAFARZAP_CONFIG = {
  brandName: "SafarZap",
  tagline: "Discover the Magic of North India",
  phone: "8725969152",
  phoneFormatted: "+91 8725969152",
  email: "safarzap@gmail.com",
  whatsappUrl: "https://wa.me/918725969152?text=Hello%20SafarZap%2C%20I%20am%20interested%20in%20North%20India%20tour%20packages.",
  currencyRates: {
    INR: { symbol: "₹", rate: 1 },
    USD: { symbol: "\$", rate: 0.012 },
    EUR: { symbol: "€", rate: 0.011 }
  },
  currentCurrency: "INR"
};

window.MOCK_DESTINATIONS = [
  {
    "id": "kashmir",
    "name": "Kashmir & Ladakh",
    "tagline": "Paradise on Earth & High Mountain Deserts",
    "image": "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1000&q=80",
    "highlights": ["Dal Lake Shikara", "Gulmarg Snow Gondola", "Pangong Tso Lake", "Nubra Valley Dunes"],
    "bestSeason": "Apr - Oct (Spring/Summer) & Dec - Feb (Snow)",
    "packagesCount": 4,
    "description": "Breathtaking valleys, snow-capped peaks, alpine lakes, centuries-old houseboats and ancient Buddhist monasteries."
  },
  {
    "id": "himachal",
    "name": "Himachal Pradesh",
    "tagline": "The Valley of Gods & Adventure Trails",
    "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80",
    "highlights": ["Solang Valley Rafting", "Spiti Valley Roads", "McLeod Ganj Monasteries", "Atal Tunnel Drive"],
    "bestSeason": "Round the year (Snow in Dec-Feb, Greenery in Mar-Jun)",
    "packagesCount": 5,
    "description": "Pine forests, serene hill stations, rushing mountain rivers, Tibetan spiritual culture and high altitude passes."
  },
  {
    "id": "uttarakhand",
    "name": "Uttarakhand (Devbhoomi)",
    "tagline": "Spiritual Solace & Himalayan Serenity",
    "image": "https://images.unsplash.com/photo-1600100397608-f010f443b782?auto=format&fit=crop&w=1000&q=80",
    "highlights": ["Rishikesh River Rafting", "Ganga Aarti Haridwar", "Kedarnath Temple", "Jim Corbett Tiger Safari"],
    "bestSeason": "Mar - Jun & Sep - Nov",
    "packagesCount": 4,
    "description": "Sacred pilgrim routes of Char Dham, thrilling river rapids, tranquil emerald lakes of Nainital and royal national parks."
  },
  {
    "id": "rajasthan",
    "name": "Rajasthan",
    "tagline": "The Royal Realm of Maharajas & Forts",
    "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
    "highlights": ["Amer Fort Jaipur", "Lake Pichola Udaipur", "Thar Desert Safari", "Mehrangarh Fort Jodhpur"],
    "bestSeason": "Oct - Mar (Pleasant Winter)",
    "packagesCount": 4,
    "description": "Majestic hilltop fortresses, vibrant desert folk melodies, royal palaces, camel safaris on golden dunes and royal cuisine."
  },
  {
    "id": "goldentriangle",
    "name": "Golden Triangle",
    "tagline": "Delhi - Agra - Jaipur Timeless Splendor",
    "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80",
    "highlights": ["Taj Mahal Sunrise", "Red Fort & Chandni Chowk", "Hawa Mahal", "Fatehpur Sikri"],
    "bestSeason": "Sep - Apr",
    "packagesCount": 3,
    "description": "India's celebrated cultural circuit featuring the magnificent Taj Mahal, Mughal monuments, and royal Rajput palaces."
  },
  {
    "id": "punjab",
    "name": "Punjab & Amritsar",
    "tagline": "Sacred Golden Temple & Vibrant Heritage",
    "image": "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1000&q=80",
    "highlights": ["Golden Temple Darshan", "Wagah Border Beating Retreat", "Jallianwala Bagh", "Authentic Amritsari Kulcha"],
    "bestSeason": "Oct - Mar",
    "packagesCount": 2,
    "description": "Heartwarming Punjabi hospitality, soulful spiritual vibes, heroic patriotic heritage, and rich culinary feasts."
  }
]
;

window.MOCK_PACKAGES = [
  {
    "id": "sz-kash-01",
    "slug": "magical-kashmir-paradise-tour",
    "title": "Magical Kashmir: Srinagar, Gulmarg & Pahalgam",
    "region": "Kashmir & Ladakh",
    "duration": "6 Days / 5 Nights",
    "days": 6,
    "nights": 5,
    "priceINR": 18499,
    "originalPriceINR": 24999,
    "discountPercent": 26,
    "rating": 4.9,
    "reviewCount": 184,
    "badge": "Best Seller",
    "travelStyle": "Family & Honeymoon",
    "startCity": "Srinagar",
    "endCity": "Srinagar",
    "image": "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1000&q=80",
    "description": "Experience heaven on earth with romantic Dal Lake Shikara rides, majestic snowfall at Gulmarg, lush valleys of Pahalgam, and heritage wooden houseboat stays.",
    "highlights": [
      "1-Hour Sunset Shikara ride on Dal Lake",
      "Stay in an authentic carved wooden Srinagar Houseboat",
      "Gondola Cable Car ride up to Phase 1/2 in Gulmarg",
      "Betaab Valley & Aru Valley excursion in Pahalgam",
      "Mughal Gardens: Shalimar Bagh, Nishat Bagh & Chashme Shahi"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival Srinagar & Dal Lake Shikara Ride",
        "description": "Welcome to Srinagar! Meet our representative at Srinagar Airport and transfer to your luxury Dal Lake Houseboat. In the evening, enjoy a tranquil 1-hour Shikara ride gazing at the Zabarwan range.",
        "meals": "Dinner",
        "stay": "Deluxe Houseboat, Dal Lake"
      },
      {
        "day": 2,
        "title": "Srinagar to Gulmarg Day Trip (The Meadow of Flowers)",
        "description": "Scenic drive through pine forests to Gulmarg (2,730m). Take the world's highest cable car (Gondola) to Kongdoori and Apharwat Peak. Enjoy snow activities, skiing, or snowmobile rides.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Srinagar"
      },
      {
        "day": 3,
        "title": "Srinagar to Pahalgam (The Valley of Shepherds)",
        "description": "Drive past Saffron fields of Pampore and Awantipora ruins. Reach Pahalgam along the roaring Lidder River. Check in to riverside resort and stroll through local markets.",
        "meals": "Breakfast & Dinner",
        "stay": "River Resort, Pahalgam"
      },
      {
        "day": 4,
        "title": "Pahalgam - Betaab Valley, Aru & Chandanwari",
        "description": "Explore the famous Betaab Valley (where Bollywood movies were filmed), the picturesque village of Aru, and Chandanwari (start of Amarnath Yatra). Experience pristine alpine nature.",
        "meals": "Breakfast & Dinner",
        "stay": "River Resort, Pahalgam"
      },
      {
        "day": 5,
        "title": "Pahalgam to Srinagar & Mughal Heritage Tour",
        "description": "Return to Srinagar. Visit UNESCO-nominated Mughal Gardens: Nishat Bagh (Garden of Pleasure), Shalimar Bagh (Abode of Love), and Shankaracharya Temple offering panoramic city views.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Srinagar"
      },
      {
        "day": 6,
        "title": "Departure from Srinagar Airport",
        "description": "After breakfast, pack unforgettable Kashmiri memories. Transfer to Srinagar Airport for your onward flight home with sweet SafarZap souvenirs.",
        "meals": "Breakfast",
        "stay": "Tour Concludes"
      }
    ],
    "inclusions": [
      "5 Nights accommodation (1N Deluxe Houseboat + 4N 3-Star/4-Star Hotels)",
      "Daily Buffet Breakfast and Dinner (MAP Plan)",
      "Dedicated AC Sedan/Innova for all transfers and sightseeing",
      "1-Hour Shikara ride on Dal Lake",
      "Toll taxes, parking fees, driver allowance and fuel charges",
      "24/7 on-trip SafarZap concierge support"
    ],
    "exclusions": [
      "Airfare / Train tickets to Srinagar",
      "Gulmarg Gondola ride tickets (available as add-on)",
      "Local union cab in Pahalgam (Aru/Betaab valley)",
      "Personal expenses, tips, and pony rides",
      "Travel insurance"
    ]
  },
  {
    "id": "sz-lad-01",
    "slug": "ladakh-pangong-nubra-odyssey",
    "title": "Leh Ladakh High Altitude Odyssey & Pangong Lake",
    "region": "Kashmir & Ladakh",
    "duration": "7 Days / 6 Nights",
    "days": 7,
    "nights": 6,
    "priceINR": 24999,
    "originalPriceINR": 32000,
    "discountPercent": 22,
    "rating": 4.95,
    "reviewCount": 156,
    "badge": "Adventure Pick",
    "travelStyle": "Adventure & Expedition",
    "startCity": "Leh",
    "endCity": "Leh",
    "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
    "description": "Cross Khardung La (one of the world's highest motorable roads), camp under starry skies by the surreal blue Pangong Tso Lake, and ride double-humped camels in Hunder Sand Dunes.",
    "highlights": [
      "Cross legendary Khardung La Pass (17,982 ft)",
      "Overnight luxury swiss camp by Pangong Tso Lake",
      "Double-humped Bactrian Camel safari in Nubra Valley",
      "Magnetic Hill & Sangam of Indus-Zanskar Rivers",
      "Thiksey & Diskit Monasteries"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival Leh & Acclimatization",
        "description": "Land at Leh Kushok Bakula Rimpochee Airport. Rest completely for the day to acclimatize to high altitude (3,500m). Evening visit to Leh Market and Shanti Stupa for sunset.",
        "meals": "Dinner",
        "stay": "Hotel in Leh"
      },
      {
        "day": 2,
        "title": "Sham Valley Sightseeing & Magnetic Hill",
        "description": "Drive towards Sham Valley. Experience the gravity-defying Magnetic Hill, confluence of Indus & Zanskar rivers (Sangam), Gurudwara Pathar Sahib, and Hall of Fame museum.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Leh"
      },
      {
        "day": 3,
        "title": "Leh to Nubra Valley via Khardung La",
        "description": "Drive through the legendary Khardung La Pass (17,982 ft). Arrive in Nubra Valley, visit the gigantic 106-ft Maitreya Buddha at Diskit Monastery and ride camels on Hunder Sand Dunes.",
        "meals": "Breakfast & Dinner",
        "stay": "Deluxe Camp, Hunder (Nubra)"
      },
      {
        "day": 4,
        "title": "Nubra Valley to Pangong Tso via Shyok River",
        "description": "Take the scenic Shyok river route to the world-renowned Pangong Tso Lake (14,270 ft). Watch the lake change shades from turquoise to cobalt blue against brown desert mountains.",
        "meals": "Breakfast & Dinner",
        "stay": "Cottages/Camps at Pangong Lake"
      },
      {
        "day": 5,
        "title": "Pangong Lake Sunrise to Leh via Chang La",
        "description": "Witness an awe-inspiring sunrise over Pangong Lake. Journey back to Leh via Chang La Pass (17,688 ft). Visit Thiksey Monastery and Shey Palace on the way.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Leh"
      },
      {
        "day": 6,
        "title": "Monasteries & Local Leh Discovery",
        "description": "Explore Hemis Monastery, Stok Palace Museum, and spend your evening souvenir hunting for Pashmina shawls, Ladakhi apricots, and Tibetan silver jewellery in Leh bazaar.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Leh"
      },
      {
        "day": 7,
        "title": "Departure from Leh Airport",
        "description": "Transfer to airport. Fly over the snow-laden Himalayas with memories of an epic high-altitude adventure.",
        "meals": "Breakfast",
        "stay": "Tour Concludes"
      }
    ],
    "inclusions": [
      "6 Nights accommodation in standard deluxe hotels & luxury camps",
      "Daily Breakfast & Dinner with warm hospitality",
      "Dedicated Non-AC/Heated SUV (Innova/Xylo/Tempo) for mountain roads",
      "Inner Line Permits (ILP) & Wildlife Environmental fees",
      "Oxygen cylinder in vehicle during high-pass crossings",
      "SafarZap Local Ladakhi guide and 24/7 ground assistance"
    ],
    "exclusions": [
      "Flights to and from Leh",
      "Bactrian camel ride charges at Hunder",
      "Monument entry fees",
      "Personal medications and river rafting fees"
    ]
  },
  {
    "id": "sz-hp-01",
    "slug": "shimla-manali-solang-kasol-retreat",
    "title": "Shimla & Manali Himalayan Enchantment with Kasol",
    "region": "Himachal Pradesh",
    "duration": "6 Days / 5 Nights",
    "days": 6,
    "nights": 5,
    "priceINR": 14499,
    "originalPriceINR": 19999,
    "discountPercent": 27,
    "rating": 4.88,
    "reviewCount": 210,
    "badge": "Top Value",
    "travelStyle": "Family & Friends",
    "startCity": "Delhi / Chandigarh",
    "endCity": "Delhi / Chandigarh",
    "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80",
    "description": "The quintessential Himachal holiday: colonial strolls down Shimla Mall Road, snow adventures in Solang Valley, Atal Tunnel drive, and chilled cafe vibes in Kasol & Manikaran.",
    "highlights": [
      "Shimla Ridge, Mall Road & Jakhu Temple",
      "Kufri fun campus & snow views",
      "Solang Valley adventure sports (Paragliding, Zorbing)",
      "Drive through engineering marvel Atal Tunnel to Sissu",
      "Kasol Parvati River cafe walk & Manikaran Hot Springs"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Delhi / Chandigarh to Shimla Drive",
        "description": "Scenic pickup from Delhi/Chandigarh and uphill drive along the winding Himalayan expressway. Check in to your Shimla hillside hotel. Evening walk along the historic Mall Road and Christ Church.",
        "meals": "Dinner",
        "stay": "Valley View Hotel, Shimla"
      },
      {
        "day": 2,
        "title": "Shimla & Kufri Excursion",
        "description": "Visit Kufri (2,622m) known for scenic viewpoints and Himalayan Nature Park. Return to Shimla to explore Jakhoo Hill temple dedicated to Lord Hanuman and the Gaiety Heritage Theatre.",
        "meals": "Breakfast & Dinner",
        "stay": "Valley View Hotel, Shimla"
      },
      {
        "day": 3,
        "title": "Shimla to Manali via Kullu Valley",
        "description": "A picturesque 7-8 hour drive traversing Mandi, Pandoh Dam, Hanogi Mata Temple and Kullu Valley. Stop for river rafting on the Beas River and visit famous Kullu Shawl weaving factories.",
        "meals": "Breakfast & Dinner",
        "stay": "Resort in Manali"
      },
      {
        "day": 4,
        "title": "Solang Valley & Atal Tunnel to Sissu (Lahaul)",
        "description": "Full day excitement at Solang Valley. Engage in paragliding, quad biking, or zorbing. Cross the iconic 9.02 km Atal Tunnel into Lahaul Valley to marvel at the Sissu Waterfall.",
        "meals": "Breakfast & Dinner",
        "stay": "Resort in Manali"
      },
      {
        "day": 5,
        "title": "Manali Local Sightseeing & Kasol Excursion",
        "description": "Visit the 450-year-old wooden Hadimba Devi Temple, Vashisht Hot Water Springs, and Tibetan Monastery. Afternoon drive to Kasol in Parvati Valley and sacred Manikaran Gurudwara.",
        "meals": "Breakfast & Dinner",
        "stay": "Resort in Manali"
      },
      {
        "day": 6,
        "title": "Manali to Delhi / Chandigarh Drop",
        "description": "After a sumptuous breakfast, drive back to Chandigarh / Delhi railway station or airport with sweet Himalayan apples and memories.",
        "meals": "Breakfast",
        "stay": "Tour Concludes"
      }
    ],
    "inclusions": [
      "5 Nights accommodation in scenic 3-star/4-star valley hotels",
      "Daily Breakfast and Dinner",
      "Private AC Sedan/SUV for entire round trip from Delhi/Chandigarh",
      "All toll taxes, state permits, green cess, and driver charges",
      "Full sightseeing in Shimla, Kufri, Manali, Solang Valley & Kasol"
    ],
    "exclusions": [
      "Adventure activity charges (Paragliding, River Rafting)",
      "Rohtang Pass NGT green permit cab (if opted over Solang)",
      "Lunch, snacks, and monument entry tickets"
    ]
  },
  {
    "id": "sz-spiti-01",
    "slug": "spiti-valley-middle-land-expedition",
    "title": "Spiti Valley 4x4 Circuit: Kaza, Chandratal & Key Monastery",
    "region": "Himachal Pradesh",
    "duration": "8 Days / 7 Nights",
    "days": 8,
    "nights": 7,
    "priceINR": 22499,
    "originalPriceINR": 28999,
    "discountPercent": 22,
    "rating": 4.98,
    "reviewCount": 98,
    "badge": "Epic Explorer",
    "travelStyle": "Adventure & Expedition",
    "startCity": "Chandigarh",
    "endCity": "Chandigarh",
    "image": "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1000&q=80",
    "description": "Traverse the rugged cold desert of Spiti: ancient 1,000-year-old Key Monastery, highest post office Hikkim, fossil village Langza, and camping beside mystical crescent moon Chandratal Lake.",
    "highlights": [
      "Send a postcard from World's Highest Post Office at Hikkim (14,567 ft)",
      "Camp beside the celestial moon lake Chandratal",
      "1,000-year-old Key Gompa & Tabo Monastery (Ajanta of the Himalayas)",
      "Asia's highest suspension bridge at Chicham",
      "Fossil hunting in Langza village beneath Buddha Statue"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Chandigarh to Narkanda / Sarahan",
        "description": "Drive past apple orchards of Kotgarh to Sarahan. Visit the exquisite wooden Bhimakali Temple.",
        "meals": "Dinner",
        "stay": "Hotel in Narkanda/Sarahan"
      },
      {
        "day": 2,
        "title": "Sarahan to Sangla & Chitkul (Last Indian Village)",
        "description": "Enter Kinnaur district along the gushing Baspa River. Explore Chitkul, the last inhabited village near the Indo-Tibet border.",
        "meals": "Breakfast & Dinner",
        "stay": "Riverside Camp in Sangla"
      },
      {
        "day": 3,
        "title": "Sangla to Kalpa with Kinner Kailash Views",
        "description": "Drive to Kalpa. Gaze at the sacred Kinner Kailash peak changing colors during sunset. Walk through traditional apple villages.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Kalpa"
      },
      {
        "day": 4,
        "title": "Kalpa to Kaza via Nako Lake & Gue Mummy",
        "description": "Witness the transition into cold desert terrain. Stop at Nako Lake and pay respects to the 500-year-old naturally preserved mummy of Sangha Tenzin at Gue.",
        "meals": "Breakfast & Dinner",
        "stay": "Homestay/Hotel in Kaza"
      },
      {
        "day": 5,
        "title": "Kaza - Hikkim, Komic, Langza & Key Monastery",
        "description": "Visit Key Monastery perched on a hill, Kibber village, Chicham bridge, Hikkim's world-highest post office, and Komic (highest motorable village).",
        "meals": "Breakfast & Dinner",
        "stay": "Homestay/Hotel in Kaza"
      },
      {
        "day": 6,
        "title": "Kaza to Chandratal Lake via Kunzum Pass",
        "description": "Cross the treacherous and thrilling Kunzum La (14,931 ft). Trek 1 km to reach crescent-shaped Chandratal Lake with crystal turquoise water. Stargazing at night.",
        "meals": "Breakfast & Dinner",
        "stay": "Deluxe Camps near Chandratal"
      },
      {
        "day": 7,
        "title": "Chandratal to Manali via Rohtang / Atal Tunnel",
        "description": "Tackle the iconic Batal-Gramphu boulder tracks. Drive through Atal Tunnel into the green cedar valleys of Manali. Celebrate the circuit completion.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Manali"
      },
      {
        "day": 8,
        "title": "Manali to Chandigarh Drop",
        "description": "Drop off at Chandigarh Airport or Railway station with memories of a lifetime across Spiti Valley.",
        "meals": "Breakfast",
        "stay": "Tour Concludes"
      }
    ],
    "inclusions": [
      "7 Nights stay in authentic Spitian homestays, hotels & luxury Swiss tents",
      "Breakfast and Dinner daily",
      "Sturdy 4x4 / High Clearance SUV with expert mountain chauffeur",
      "Inner line permits, fuel, tolls, and environmental passes",
      "First aid and backup oxygen support"
    ],
    "exclusions": [
      "Lunches and personal shopping",
      "Monastery camera fees",
      "Tips and porter charges"
    ]
  },
  {
    "id": "sz-uk-01",
    "slug": "rishikesh-haridwar-spiritual-adventure",
    "title": "Rishikesh & Haridwar: Ganga Aarti & River Rafting",
    "region": "Uttarakhand (Devbhoomi)",
    "duration": "4 Days / 3 Nights",
    "days": 4,
    "nights": 3,
    "priceINR": 9999,
    "originalPriceINR": 13999,
    "discountPercent": 28,
    "rating": 4.87,
    "reviewCount": 140,
    "badge": "Weekend Escape",
    "travelStyle": "Spiritual & Adventure",
    "startCity": "Delhi / Dehradun",
    "endCity": "Delhi / Dehradun",
    "image": "https://images.unsplash.com/photo-1600100397608-f010f443b782?auto=format&fit=crop&w=1000&q=80",
    "description": "The perfect blend of thrills and tranquility: 16 km white water rafting on the holy Ganges, Beatles Ashram meditation walk, cliff jumping, and the divine evening Ganga Aarti at Har Ki Pauri.",
    "highlights": [
      "16 km Grade III River Rafting from Shivpuri to Rishikesh",
      "Cliff Jumping and Body Surfing on the Ganges",
      "Mesmerizing Ganga Aarti at Triveni Ghat and Har Ki Pauri",
      "Visit iconic suspension bridges: Laxman Jhula & Ram Jhula",
      "The Beatles Ashram & Rajaji Forest nature walk"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Delhi to Haridwar & Evening Ganga Aarti",
        "description": "Morning drive from Delhi to sacred Haridwar. Check in to hotel. Visit Mansa Devi & Chandi Devi temples via cable car. At dusk, gather at Har Ki Pauri for the grand, soul-stirring Maha Aarti with floating diyas.",
        "meals": "Dinner",
        "stay": "Hotel in Haridwar"
      },
      {
        "day": 2,
        "title": "Haridwar to Rishikesh & River Rafting Adventure",
        "description": "Short scenic drive to Rishikesh (Yoga Capital of the World). Head to Shivpuri for adrenaline-pumping 16 km white water rafting through famous rapids: Roller Coaster, Golf Course, and Club House. Cliff jump into holy waters.",
        "meals": "Breakfast & Dinner",
        "stay": "Riverside Eco Resort / Camp, Rishikesh"
      },
      {
        "day": 3,
        "title": "Beatles Ashram, Cafe Hopping & Triveni Ghat",
        "description": "Morning yoga session by the river. Visit Maharishi Mahesh Yogi's Beatles Ashram with graffiti-laden meditation domes. Relax in bohemian cafes like Little Buddha Cafe. Evening Aarti at Triveni Ghat.",
        "meals": "Breakfast & Dinner",
        "stay": "Riverside Eco Resort / Camp, Rishikesh"
      },
      {
        "day": 4,
        "title": "Neer Gaddu Waterfall & Return to Delhi",
        "description": "Hike to picturesque Neer Gaddu waterfall for a refreshing mountain dip. Afterward, board your comfortable cab back to Delhi with revitalized spirit.",
        "meals": "Breakfast",
        "stay": "Tour Concludes"
      }
    ],
    "inclusions": [
      "3 Nights deluxe hotel / riverside camp accommodation",
      "Breakfast and Dinner daily",
      "Private AC vehicle for entire itinerary from Delhi & back",
      "16 KM Ganga River Rafting with licensed instructors & safety gear",
      "Campfire with music at Rishikesh resort"
    ],
    "exclusions": [
      "Bungee Jumping, Giant Swing or Flying Fox fees at Mohan Chatti",
      "Cable car tickets at Haridwar",
      "Lunches and monument entry"
    ]
  },
  {
    "id": "sz-uk-02",
    "slug": "chardham-yatra-sacred-circuit",
    "title": "Sacred Chardham Yatra: Kedarnath & Badrinath",
    "region": "Uttarakhand (Devbhoomi)",
    "duration": "8 Days / 7 Nights",
    "days": 8,
    "nights": 7,
    "priceINR": 26999,
    "originalPriceINR": 34999,
    "discountPercent": 23,
    "rating": 4.96,
    "reviewCount": 165,
    "badge": "Devotional Classic",
    "travelStyle": "Spiritual & Pilgrimage",
    "startCity": "Haridwar / Rishikesh",
    "endCity": "Haridwar / Rishikesh",
    "image": "https://images.unsplash.com/photo-1626014303757-646633783777?auto=format&fit=crop&w=1000&q=80",
    "description": "Seek divine blessings on the revered Do-Dham/Char-Dham sacred trail. Experience the awe-inspiring Kedarnath Jyotirlinga surrounded by snow peaks and Vishnu's holy abode Badrinath.",
    "highlights": [
      "Darshan at Sri Kedarnath Jyotirlinga (11,755 ft)",
      "Darshan at Sri Badrinath Dham & dip in Tapt Kund",
      "Witness Panch Prayag: Devprayag, Rudraprayag, Karnaprayag",
      "Visit Mana Village - The First Village of India & Saraswati River",
      "Dedicated SafarZap Yatra coordinator & medical support"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Haridwar to Guptkashi via Devprayag",
        "description": "Drive alongside the Alaknanda and Bhagirathi rivers confluence at Devprayag to form the Holy Ganga. Reach Guptkashi.",
        "meals": "Dinner",
        "stay": "Hotel in Guptkashi"
      },
      {
        "day": 2,
        "title": "Guptkashi to Kedarnath Trek / Heli",
        "description": "Early morning drive to Sonprayag/Gaurikund. Trek 16 km (or take helicopter/pony) to the majestic Kedarnath Temple. Attend the divine evening Sandhya Aarti.",
        "meals": "Breakfast & Dinner",
        "stay": "Camp/Lodge near Kedarnath Temple"
      },
      {
        "day": 3,
        "title": "Kedarnath Darshan & Trek down to Guptkashi",
        "description": "Early morning Abhishek Darshan at Kedarnath. Marvel at the Kedardome peak. Trek down to Gaurikund and drive back to Guptkashi hotel.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Guptkashi"
      },
      {
        "day": 4,
        "title": "Guptkashi to Badrinath via Joshimath",
        "description": "Scenic drive through Chopta, Chamoli and Joshimath. Reach Badrinath Dham. Take a holy bath in the natural sulphur Tapt Kund.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Badrinath"
      },
      {
        "day": 5,
        "title": "Badrinath Darshan & Mana Village",
        "description": "Darshan of Badri Vishal. Visit Mana Village, Vyas Gufa, Ganesh Gufa and Bhim Pul over roaring Saraswati river. Evening return to Pipalkoti/Rudraprayag.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Pipalkoti"
      },
      {
        "day": 6,
        "title": "Pipalkoti to Rishikesh",
        "description": "Drive down the Himalayan valleys back to Rishikesh. Evening relax at hotel.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Rishikesh"
      },
      {
        "day": 7,
        "title": "Rishikesh Local Temple & Ashrams",
        "description": "Visit Swarg Ashram, Geeta Bhawan, Parmarth Niketan and relax with Ayurvedic massage.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Rishikesh"
      },
      {
        "day": 8,
        "title": "Drop at Haridwar / Dehradun",
        "description": "Morning departure to Haridwar railway station or Dehradun Jolly Grant Airport with holy Char Dham prasad.",
        "meals": "Breakfast",
        "stay": "Yatra Concludes"
      }
    ],
    "inclusions": [
      "7 Nights accommodation in hotels & yatra lodges",
      "Pure vegetarian satvik breakfast and dinner",
      "Dedicated mountain vehicle (Innova/Tempo Traveller)",
      "Yatra registration and biometric assistance",
      "Driver allowances, tolls, and priority darshan coordination"
    ],
    "exclusions": [
      "Helicopter tickets for Kedarnath (can be arranged on request)",
      "Pony / Palki / Doli charges",
      "Special pooja tickets"
    ]
  },
  {
    "id": "sz-raj-01",
    "slug": "royal-rajasthan-jaipur-jodhpur-udaipur",
    "title": "Royal Rajasthan Heritage: Jaipur, Jodhpur & Udaipur",
    "region": "Rajasthan",
    "duration": "7 Days / 6 Nights",
    "days": 7,
    "nights": 6,
    "priceINR": 21999,
    "originalPriceINR": 28999,
    "discountPercent": 24,
    "rating": 4.93,
    "reviewCount": 230,
    "badge": "Royal Experience",
    "travelStyle": "Heritage & Culture",
    "startCity": "Jaipur",
    "endCity": "Udaipur",
    "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
    "description": "Live like royalty across the Pink City of Jaipur, the Sun & Blue City of Jodhpur, and the romantic Lake City Udaipur. Palaces, forts, camel rides, and Rajput royal dining.",
    "highlights": [
      "Amer Fort elephant/jeep ride & Hawa Mahal facade",
      "Majestic Mehrangarh Fort towering over blue Jodhpur",
      "Sunset boat cruise on Lake Pichola in Udaipur",
      "City Palace & Saheliyon-ki-Bari in Udaipur",
      "Authentic Rajasthani cultural dance show at Bagore Ki Haveli"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Welcome to Jaipur (The Pink City)",
        "description": "Arrive in Jaipur. Check in to your heritage hotel. Visit Birla Temple, Albert Hall Museum, and explore colorful Johari & Bapu Bazaars for lacquer bangles and textiles.",
        "meals": "Dinner",
        "stay": "Heritage Hotel, Jaipur"
      },
      {
        "day": 2,
        "title": "Jaipur Forts & Palaces Full Day Tour",
        "description": "Ascend the hilltop Amer Fort. Visit Jal Mahal (Water Palace), the honeycombed Hawa Mahal (Palace of Winds), Jantar Mantar observatory, and royal City Palace.",
        "meals": "Breakfast & Dinner",
        "stay": "Heritage Hotel, Jaipur"
      },
      {
        "day": 3,
        "title": "Jaipur to Jodhpur via Ajmer & Pushkar",
        "description": "Drive towards Jodhpur. Stop at sacred Pushkar to visit the rare Lord Brahma Temple and holy Pushkar Lake. Continue to Jodhpur, the Blue City.",
        "meals": "Breakfast & Dinner",
        "stay": "Haveli Hotel, Jodhpur"
      },
      {
        "day": 4,
        "title": "Jodhpur Mehrangarh Fort & Drive to Udaipur",
        "description": "Visit the colossal Mehrangarh Fort, Jaswant Thada marble cenotaph, and Umaid Bhawan Palace. Later, drive to Udaipur via Ranakpur Jain Temples with 1,444 uniquely carved pillars.",
        "meals": "Breakfast & Dinner",
        "stay": "Lakeside Hotel, Udaipur"
      },
      {
        "day": 5,
        "title": "Udaipur - City of Lakes Sightseeing",
        "description": "Explore the sprawling City Palace complex overlooking Lake Pichola, Jagdish Temple, and fountains of Saheliyon-ki-Bari. Evening romantic boat ride on Lake Pichola past Jag Mandir.",
        "meals": "Breakfast & Dinner",
        "stay": "Lakeside Hotel, Udaipur"
      },
      {
        "day": 6,
        "title": "Sajjangarh Monsoon Palace & Bagore Ki Haveli",
        "description": "Drive up to Sajjangarh Monsoon Palace for panoramic Aravalli sunset. Enjoy traditional folk music, fire dance and puppetry at historic Bagore Ki Haveli.",
        "meals": "Breakfast & Dinner",
        "stay": "Lakeside Hotel, Udaipur"
      },
      {
        "day": 7,
        "title": "Departure from Udaipur",
        "description": "After breakfast, transfer to Maharana Pratap Airport or Udaipur Railway Station for onward journey with royal Rajput souvenirs.",
        "meals": "Breakfast",
        "stay": "Tour Concludes"
      }
    ],
    "inclusions": [
      "6 Nights heritage & luxury 4-star palace/hotel stay",
      "Breakfast and Dinner daily with traditional Rajasthani specialties",
      "Dedicated air-conditioned Sedan/Innova with experienced chauffeur",
      "Lake Pichola boat ride tickets",
      "Monument entry assistance and city guides in Jaipur & Udaipur"
    ],
    "exclusions": [
      "Flight / Train tickets",
      "Monument entry fees & camera permits",
      "Lunches and alcoholic beverages"
    ]
  },
  {
    "id": "sz-jaisal-01",
    "slug": "jaisalmer-golden-desert-safari",
    "title": "Jaisalmer: Golden Fort, Desert Dunes & Camel Safari",
    "region": "Rajasthan",
    "duration": "4 Days / 3 Nights",
    "days": 4,
    "nights": 3,
    "priceINR": 11999,
    "originalPriceINR": 15999,
    "discountPercent": 25,
    "rating": 4.91,
    "reviewCount": 112,
    "badge": "Desert Special",
    "travelStyle": "Adventure & Culture",
    "startCity": "Jodhpur / Jaisalmer",
    "endCity": "Jodhpur / Jaisalmer",
    "image": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1000&q=80",
    "description": "Explore the living golden fortress of Sonar Qila, intricate yellow sandstone havelis, and spend an unforgettable night in luxury desert camps under starlit dunes with folk dances and bonfire.",
    "highlights": [
      "Sonar Qila (Jaisalmer Fort) - India's only living fort",
      "Patwon Ki Haveli & Salim Singh Ki Haveli craftsmanship",
      "Sam Sand Dunes sunset Camel & Jeep Dune Bashing",
      "Royal Swiss desert camp with Kalbeliya folk music & dinner",
      "Boating at picturesque Gadisar Lake"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival Jaisalmer & Gadisar Lake",
        "description": "Pick up from Jaisalmer/Jodhpur. Check in to golden stone hotel. In evening visit tranquil Gadisar Lake surrounded by cenotaphs and temples.",
        "meals": "Dinner",
        "stay": "Golden Stone Hotel, Jaisalmer"
      },
      {
        "day": 2,
        "title": "Living Fort & Sandstone Havelis Tour",
        "description": "Walk through narrow alleys of the 12th-century Golden Fort, still home to thousands of residents. Visit royal palaces, Jain temples, Patwon ki Haveli and Nathmal ki Haveli.",
        "meals": "Breakfast & Dinner",
        "stay": "Golden Stone Hotel, Jaisalmer"
      },
      {
        "day": 3,
        "title": "Kuldhara Ghost Village & Sam Desert Camp",
        "description": "Visit the mystical abandoned ruins of Kuldhara. Proceed to Sam Sand Dunes. Enjoy thrill of 4x4 Jeep Dune Bashing and sunset camel ride. Evening Rajasthani cultural performance with bonfire and buffet dinner under the stars.",
        "meals": "Breakfast & Dinner",
        "stay": "Luxury Swiss Tent, Sam Sand Dunes"
      },
      {
        "day": 4,
        "title": "Desert Sunrise & Departure",
        "description": "Wake up to desert sunrise. Enjoy hot masala chai and breakfast. Transfer to Jaisalmer / Jodhpur airport or railway station.",
        "meals": "Breakfast",
        "stay": "Tour Concludes"
      }
    ],
    "inclusions": [
      "2 Nights stay in heritage boutique hotel + 1 Night luxury Swiss desert camp",
      "Breakfast and Dinner daily",
      "Camel Safari on Sam Sand Dunes",
      "Evening Rajasthani cultural dance show, bonfire & snacks",
      "Private AC vehicle for all transfers and tours"
    ],
    "exclusions": [
      "Jeep dune bashing (available as add-on)",
      "Alcohol, snacks and monument entries"
    ]
  },
  {
    "id": "sz-gt-01",
    "slug": "golden-triangle-delhi-agra-jaipur",
    "title": "Golden Triangle Classic: Delhi, Agra Taj Mahal & Jaipur",
    "region": "Golden Triangle",
    "duration": "5 Days / 4 Nights",
    "days": 5,
    "nights": 4,
    "priceINR": 13999,
    "originalPriceINR": 18500,
    "discountPercent": 24,
    "rating": 4.92,
    "reviewCount": 310,
    "badge": "Must Do Circuit",
    "travelStyle": "Heritage & Culture",
    "startCity": "New Delhi",
    "endCity": "New Delhi",
    "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80",
    "description": "The quintessential introduction to India: Delhi's imperial monuments, Agra's breathtaking white marble Taj Mahal, red sandstone Fatehpur Sikri, and Jaipur's royal Pink City forts.",
    "highlights": [
      "Sunrise visit to the iconic Taj Mahal (Wonder of the World)",
      "Agra Fort and the ghost city of Fatehpur Sikri",
      "Amer Fort, Hawa Mahal and City Palace in Jaipur",
      "Old Delhi Chandni Chowk rickshaw ride & Jama Masjid",
      "India Gate, Rashtrapati Bhavan & Qutub Minar"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival Delhi - Old & New Delhi Sightseeing",
        "description": "Pickup from Delhi airport/hotel. Tour Old Delhi: Jama Masjid, Chandni Chowk rickshaw ride, and Red Fort. Drive past India Gate, Parliament House, and visit Qutub Minar.",
        "meals": "Dinner",
        "stay": "Hotel in Delhi"
      },
      {
        "day": 2,
        "title": "Delhi to Agra & Agra Fort Sunset",
        "description": "Smooth 3-hour drive via Yamuna Expressway to Agra. Visit Agra Fort, former residence of Mughal emperors, and Mehtab Bagh for sunset views of the Taj Mahal across the Yamuna.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Agra"
      },
      {
        "day": 3,
        "title": "Taj Mahal Sunrise & Drive to Jaipur via Fatehpur Sikri",
        "description": "Witness the ethereal sunrise over the pristine white marble Taj Mahal. Return to hotel for breakfast. Drive to Jaipur, stopping at emperor Akbar's deserted capital city of Fatehpur Sikri and Chand Baori stepwell.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Jaipur"
      },
      {
        "day": 4,
        "title": "Jaipur Pink City Palace & Forts Discovery",
        "description": "Full day in Jaipur: Amer Fort with elephant/jeep ride, Jal Mahal, Hawa Mahal, royal City Palace and Jantar Mantar. Evening shopping in colorful bazaars.",
        "meals": "Breakfast & Dinner",
        "stay": "Hotel in Jaipur"
      },
      {
        "day": 5,
        "title": "Jaipur to Delhi Departure",
        "description": "After leisurely breakfast, drive back to New Delhi. Drop at Delhi Airport or Railway Station for onward journey.",
        "meals": "Breakfast",
        "stay": "Tour Concludes"
      }
    ],
    "inclusions": [
      "4 Nights accommodation in 4-star hotels",
      "Daily breakfast and dinner",
      "Private AC Sedan/Innova for entire circuit from Delhi to Delhi",
      "Expressway tolls, state tourist permits, parking and driver night fees",
      "English/Hindi speaking government licensed monuments guides"
    ],
    "exclusions": [
      "Monument entrance tickets",
      "Lunches and personal shopping"
    ]
  },
  {
    "id": "sz-pb-01",
    "slug": "amritsar-golden-temple-wagah-heritage",
    "title": "Amritsar Soul & Spirit: Golden Temple & Wagah Border",
    "region": "Punjab & Amritsar",
    "duration": "3 Days / 2 Nights",
    "days": 3,
    "nights": 2,
    "priceINR": 7499,
    "originalPriceINR": 9999,
    "discountPercent": 25,
    "rating": 4.94,
    "reviewCount": 178,
    "badge": "Cultural Favorite",
    "travelStyle": "Spiritual & Heritage",
    "startCity": "Amritsar",
    "endCity": "Amritsar",
    "image": "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1000&q=80",
    "description": "Immerse in the profound devotion of Sri Harmandir Sahib (Golden Temple), savor the largest community kitchen Langar, feel electric patriotism at Wagah Border Beating Retreat, and taste legendary Amritsari cuisine.",
    "highlights": [
      "Sri Harmandir Sahib (Golden Temple) night illumination & Palki ceremony",
      "Partake in Guru Ka Langar and community service",
      "High-energy Wagah Border Beating Retreat Ceremony",
      "Historic Jallianwala Bagh Memorial and Partition Museum",
      "Food walk: Amritsari Chole Kulche, Makki Di Roti & Creamy Lassi"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival Amritsar & Golden Temple Evening Illumination",
        "description": "Warm Punjabi welcome at Amritsar Airport or Railway station. Check in to hotel. Head to the sublime Sri Harmandir Sahib (Golden Temple). Witness the sanctum gilded with pure gold reflecting in the holy Sarovar lake. Attend the evening Palki Sahib ceremony.",
        "meals": "Dinner",
        "stay": "Heritage Hotel, Amritsar"
      },
      {
        "day": 2,
        "title": "Jallianwala Bagh, Heritage Street & Wagah Border",
        "description": "Morning visit to Jallianwala Bagh and Partition Museum. Indulge in hot crispy Amritsari Kulcha breakfast. Afternoon drive to Indo-Pak border at Wagah to cheer for the grand military drill and flag lowering ceremony.",
        "meals": "Breakfast & Dinner",
        "stay": "Heritage Hotel, Amritsar"
      },
      {
        "day": 3,
        "title": "Gobindgarh Fort & Departure",
        "description": "Visit historic Gobindgarh Fort and Sadda Pind cultural village. Shop for Phulkari dupattas and Punjabi juttis before airport / station drop.",
        "meals": "Breakfast",
        "stay": "Tour Concludes"
      }
    ],
    "inclusions": [
      "2 Nights hotel accommodation in prime central location",
      "Daily breakfast and traditional Punjabi dinner",
      "Private AC cab for all city transfers and Wagah border trip",
      "VIP / Special seating coordination at Wagah Border ceremony",
      "Tolls, parking and driver charges"
    ],
    "exclusions": [
      "Train/Air tickets",
      "Personal food cravings outside included meals",
      "Museum entry tickets"
    ]
  }
]
;

window.MOCK_CABS = [
  {
    "id": "cab-del-manali",
    "from": "Delhi NCR",
    "to": "Manali / Solang Valley",
    "distance": "530 km",
    "duration": "10-12 hrs",
    "popular": true,
    "pricing": {
      "sedan": { "car": "Swift Dzire / Etios", "capacity": "4 Passengers", "luggage": "2 Bags", "priceINR": 7499, "originalINR": 8999 },
      "suv": { "car": "Maruti Ertiga / Triber", "capacity": "6 Passengers", "luggage": "3 Bags", "priceINR": 9999, "originalINR": 11999 },
      "luxurySuv": { "car": "Toyota Innova Crysta", "capacity": "6-7 Passengers", "luggage": "4 Bags", "priceINR": 13499, "originalINR": 15999 },
      "tempo": { "car": "Force Tempo Traveller", "capacity": "12-16 Passengers", "luggage": "8 Bags", "priceINR": 18999, "originalINR": 22000 }
    }
  },
  {
    "id": "cab-del-shimla",
    "from": "Delhi NCR",
    "to": "Shimla / Kufri",
    "distance": "345 km",
    "duration": "7-8 hrs",
    "popular": true,
    "pricing": {
      "sedan": { "car": "Swift Dzire / Etios", "capacity": "4 Passengers", "luggage": "2 Bags", "priceINR": 4999, "originalINR": 5999 },
      "suv": { "car": "Maruti Ertiga", "capacity": "6 Passengers", "luggage": "3 Bags", "priceINR": 6799, "originalINR": 7999 },
      "luxurySuv": { "car": "Toyota Innova Crysta", "capacity": "6-7 Passengers", "luggage": "4 Bags", "priceINR": 9499, "originalINR": 11000 },
      "tempo": { "car": "Force Tempo Traveller", "capacity": "12-16 Passengers", "luggage": "8 Bags", "priceINR": 14499, "originalINR": 16500 }
    }
  },
  {
    "id": "cab-del-agra",
    "from": "Delhi NCR",
    "to": "Agra (Taj Mahal Same Day / One-way)",
    "distance": "230 km",
    "duration": "3.5 hrs (via Yamuna Exp)",
    "popular": true,
    "pricing": {
      "sedan": { "car": "Swift Dzire / Etios", "capacity": "4 Passengers", "luggage": "2 Bags", "priceINR": 2999, "originalINR": 3799 },
      "suv": { "car": "Maruti Ertiga", "capacity": "6 Passengers", "luggage": "3 Bags", "priceINR": 4299, "originalINR": 5200 },
      "luxurySuv": { "car": "Toyota Innova Crysta", "capacity": "6-7 Passengers", "luggage": "4 Bags", "priceINR": 5999, "originalINR": 7200 },
      "tempo": { "car": "Force Tempo Traveller", "capacity": "12-16 Passengers", "luggage": "8 Bags", "priceINR": 8999, "originalINR": 10500 }
    }
  },
  {
    "id": "cab-del-jaipur",
    "from": "Delhi NCR",
    "to": "Jaipur (Pink City)",
    "distance": "280 km",
    "duration": "4.5 hrs",
    "popular": true,
    "pricing": {
      "sedan": { "car": "Swift Dzire / Etios", "capacity": "4 Passengers", "luggage": "2 Bags", "priceINR": 3999, "originalINR": 4899 },
      "suv": { "car": "Maruti Ertiga", "capacity": "6 Passengers", "luggage": "3 Bags", "priceINR": 5499, "originalINR": 6499 },
      "luxurySuv": { "car": "Toyota Innova Crysta", "capacity": "6-7 Passengers", "luggage": "4 Bags", "priceINR": 7499, "originalINR": 8999 },
      "tempo": { "car": "Force Tempo Traveller", "capacity": "12-16 Passengers", "luggage": "8 Bags", "priceINR": 11999, "originalINR": 13999 }
    }
  },
  {
    "id": "cab-del-rishi",
    "from": "Delhi NCR",
    "to": "Rishikesh / Haridwar",
    "distance": "240 km",
    "duration": "4.5 hrs",
    "popular": true,
    "pricing": {
      "sedan": { "car": "Swift Dzire / Etios", "capacity": "4 Passengers", "luggage": "2 Bags", "priceINR": 3499, "originalINR": 4200 },
      "suv": { "car": "Maruti Ertiga", "capacity": "6 Passengers", "luggage": "3 Bags", "priceINR": 4799, "originalINR": 5800 },
      "luxurySuv": { "car": "Toyota Innova Crysta", "capacity": "6-7 Passengers", "luggage": "4 Bags", "priceINR": 6799, "originalINR": 7999 },
      "tempo": { "car": "Force Tempo Traveller", "capacity": "12-16 Passengers", "luggage": "8 Bags", "priceINR": 9999, "originalINR": 11500 }
    }
  },
  {
    "id": "cab-chd-manali",
    "from": "Chandigarh / Mohali",
    "to": "Manali",
    "distance": "280 km",
    "duration": "6-7 hrs",
    "popular": true,
    "pricing": {
      "sedan": { "car": "Swift Dzire / Etios", "capacity": "4 Passengers", "luggage": "2 Bags", "priceINR": 4499, "originalINR": 5400 },
      "suv": { "car": "Maruti Ertiga", "capacity": "6 Passengers", "luggage": "3 Bags", "priceINR": 5999, "originalINR": 7200 },
      "luxurySuv": { "car": "Toyota Innova Crysta", "capacity": "6-7 Passengers", "luggage": "4 Bags", "priceINR": 8499, "originalINR": 9800 },
      "tempo": { "car": "Force Tempo Traveller", "capacity": "12-16 Passengers", "luggage": "8 Bags", "priceINR": 12499, "originalINR": 14500 }
    }
  },
  {
    "id": "cab-srn-gulmarg",
    "from": "Srinagar Airport / City",
    "to": "Gulmarg / Pahalgam",
    "distance": "55 - 90 km",
    "duration": "1.5 - 2.5 hrs",
    "popular": false,
    "pricing": {
      "sedan": { "car": "Etios / Dzire", "capacity": "4 Passengers", "luggage": "2 Bags", "priceINR": 2499, "originalINR": 3000 },
      "suv": { "car": "Maruti Ertiga / Tavera", "capacity": "6 Passengers", "luggage": "3 Bags", "priceINR": 3499, "originalINR": 4200 },
      "luxurySuv": { "car": "Innova Crysta", "capacity": "6-7 Passengers", "luggage": "4 Bags", "priceINR": 4799, "originalINR": 5500 },
      "tempo": { "car": "Tempo Traveller", "capacity": "12-16 Passengers", "luggage": "8 Bags", "priceINR": 6999, "originalINR": 8000 }
    }
  }
]
;

window.MOCK_TESTIMONIALS = [
  {
    "id": "rev-1",
    "name": "Dr. Rohit & Neha Aggarwal",
    "city": "Chandigarh",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    "tour": "Magical Kashmir: Srinagar, Gulmarg & Pahalgam",
    "rating": 5,
    "date": "September 2026",
    "comment": "SafarZap made our Kashmir family holiday seamless! From our prompt airport pickup to the heritage houseboat on Dal Lake and Gondola Phase-2 passes in Gulmarg, everything was arranged to perfection. Special thanks to team SafarZap (+91 8725969152) for 24/7 assistance!",
    "verified": true
  },
  {
    "id": "rev-2",
    "name": "Amit & Priya Deshmukh",
    "city": "Mumbai",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    "tour": "Shimla & Manali Himalayan Enchantment",
    "rating": 5,
    "date": "August 2026",
    "comment": "Booked the 6-day Himachal package. The Innova Crysta provided was sparkling clean, the driver was so polite and knew all the best mountain viewpoints. Solang paragliding was breathtaking! SafarZap is our go-to travel partner for North India now.",
    "verified": true
  },
  {
    "id": "rev-3",
    "name": "Kavita R. Nair",
    "city": "Bangalore",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    "tour": "Leh Ladakh High Altitude Odyssey",
    "rating": 5,
    "date": "July 2026",
    "comment": "Ladakh was on my bucket list for 5 years. SafarZap handled our permits, oxygen support over Khardung La, and arranged the most picturesque camp right beside Pangong Lake. Incredible service at an honest price!",
    "verified": true
  },
  {
    "id": "rev-4",
    "name": "Sameer & Tanvi Singhania",
    "city": "Ahmedabad",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    "tour": "Royal Rajasthan Heritage",
    "rating": 5,
    "date": "October 2026",
    "comment": "Royal treatment throughout Jaipur, Jodhpur, and Udaipur! The lake view room in Udaipur was breathtaking. We had some last-minute schedule changes and the SafarZap support team resolved it in minutes via WhatsApp.",
    "verified": true
  },
  {
    "id": "rev-5",
    "name": "Suresh & Meena Bansal",
    "city": "Delhi",
    "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    "tour": "Sacred Chardham Yatra: Kedarnath & Badrinath",
    "rating": 5,
    "date": "June 2026",
    "comment": "Completed Kedarnath and Badrinath darshan with our elderly parents. SafarZap arranged comfortable stays, priority coordination, and a very caring mountain driver. Truly Devbhoomi experience!",
    "verified": true
  }
]
;

window.MOCK_FAQS = [
  {
    "q": "What is the best time to visit Kashmir and Himachal?",
    "a": "For lush green valleys, pleasant weather, and flowers: April to June. For experiencing snow and winter sports (skiing, snowmobiles): December to February. For autumn golden chinar leaves: October to November."
  },
  {
    "q": "How do I book a tour with SafarZap?",
    "a": "You can book directly on our website by clicking 'Book Now' on any package, customize via our Custom Tour Planner, or call/WhatsApp our travel desk directly at +91 8725969152 or email safarzap@gmail.com. We require only a minimal advance to lock your reservations."
  },
  {
    "q": "Are airport transfers and sightseeing cabs private?",
    "a": "Yes! All SafarZap packages come with a private, dedicated air-conditioned vehicle (Sedan/SUV/Innova) exclusively for your family/group from arrival till departure."
  },
  {
    "q": "Do you assist with Ladakh permits and Kedarnath registration?",
    "a": "Absolutely. SafarZap takes care of Inner Line Permits (ILP) for Ladakh (Pangong, Nubra Valley, Khardung La) and mandatory Uttarakhand Chardham biometric registration seamlessly."
  },
  {
    "q": "Can I customize an itinerary for my family or group?",
    "a": "Yes! Use our interactive 'Custom Trip Planner' on this site to pick your preferred destinations, hotel tier (3-star, 4-star, luxury camps), vehicle type, and dates. Our team will send a tailored itinerary and instant quote within 15 minutes."
  },
  {
    "q": "What is SafarZap's cancellation and refund policy?",
    "a": "We offer high flexibility: 100% refund on cancellations made 15+ days prior to travel date. For cancellations within 7-14 days, a 70% refund or free date rescheduling is provided. Contact +91 8725969152 for immediate support."
  }
]
;
