const express = require('express');
const { createBooking, getBookings } = require('../controller/bookingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/bookings', protect, createBooking);
router.get('/bookings', protect, getBookings);

module.exports = router;
