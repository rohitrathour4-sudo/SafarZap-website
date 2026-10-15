const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const packagesFilePath = path.join(__dirname, '..', 'data', 'packages.json');

function readPackages() {
  try {
    const data = fs.readFileSync(packagesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading packages.json:', err);
    return [];
  }
}

function writePackages(packages) {
  fs.writeFileSync(packagesFilePath, JSON.stringify(packages, null, 2), 'utf8');
}

// GET /api/packages - Filter, search, and sort packages
router.get('/', (req, res) => {
  let packages = readPackages();
  const { region, style, search, minPrice, maxPrice, sort } = req.query;

  if (region && region !== 'all') {
    packages = packages.filter(p => p.region.toLowerCase().includes(region.toLowerCase()));
  }

  if (style && style !== 'all') {
    packages = packages.filter(p => p.travelStyle.toLowerCase().includes(style.toLowerCase()));
  }

  if (search) {
    const q = search.toLowerCase();
    packages = packages.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.highlights.some(h => h.toLowerCase().includes(q))
    );
  }

  if (minPrice) {
    packages = packages.filter(p => p.priceINR >= Number(minPrice));
  }
  if (maxPrice) {
    packages = packages.filter(p => p.priceINR <= Number(maxPrice));
  }

  // Sorting
  if (sort === 'price-asc') {
    packages.sort((a, b) => a.priceINR - b.priceINR);
  } else if (sort === 'price-desc') {
    packages.sort((a, b) => b.priceINR - a.priceINR);
  } else if (sort === 'rating') {
    packages.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'duration') {
    packages.sort((a, b) => a.days - b.days);
  }

  res.json({
    success: true,
    count: packages.length,
    packages
  });
});

// GET /api/packages/:id - Get single package by ID or slug
router.get('/:id', (req, res) => {
  const packages = readPackages();
  const pkg = packages.find(p => p.id === req.params.id || p.slug === req.params.id);

  if (!pkg) {
    return res.status(404).json({ success: false, message: 'Package not found' });
  }

  res.json({ success: true, package: pkg });
});

// POST /api/packages - Add a new package (Admin)
router.post('/', (req, res) => {
  const packages = readPackages();
  const newPkg = {
    id: `sz-pkg-${Date.now()}`,
    slug: (req.body.title || 'custom-pkg').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    ...req.body,
    createdAt: new Date().toISOString()
  };

  packages.unshift(newPkg);
  writePackages(packages);
  res.status(201).json({ success: true, package: newPkg });
});

// PUT /api/packages/:id - Update existing package (Admin)
router.put('/:id', (req, res) => {
  let packages = readPackages();
  const index = packages.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Package not found' });
  }

  packages[index] = { ...packages[index], ...req.body };
  writePackages(packages);
  res.json({ success: true, package: packages[index] });
});

// DELETE /api/packages/:id - Delete a package (Admin)
router.delete('/:id', (req, res) => {
  let packages = readPackages();
  const initialLength = packages.length;
  packages = packages.filter(p => p.id !== req.params.id);

  if (packages.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Package not found' });
  }

  writePackages(packages);
  res.json({ success: true, message: 'Package deleted successfully' });
});

module.exports = router;
