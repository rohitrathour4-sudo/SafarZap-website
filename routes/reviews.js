const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const testimonialsFilePath = path.join(__dirname, '..', 'data', 'testimonials.json');

function readReviews() {
  try {
    const data = fs.readFileSync(testimonialsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeReviews(reviews) {
  fs.writeFileSync(testimonialsFilePath, JSON.stringify(reviews, null, 2), 'utf8');
}

// GET /api/reviews
router.get('/', (req, res) => {
  const reviews = readReviews();
  res.json({
    success: true,
    count: reviews.length,
    reviews
  });
});

// POST /api/reviews
router.post('/', (req, res) => {
  const { name, city, tour, rating, comment } = req.body;

  if (!name || !comment) {
    return res.status(400).json({
      success: false,
      message: 'Name and review comments are required.'
    });
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    name: name.trim(),
    city: (city || 'India').trim(),
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    tour: (tour || 'North India Holiday Package').trim(),
    rating: Math.min(5, Math.max(1, parseInt(rating) || 5)),
    date: 'Just now',
    comment: comment.trim(),
    verified: true
  };

  const reviews = readReviews();
  reviews.unshift(newReview);
  writeReviews(reviews);

  res.status(201).json({
    success: true,
    message: 'Thank you for sharing your SafarZap travel story!',
    review: newReview
  });
});

module.exports = router;
