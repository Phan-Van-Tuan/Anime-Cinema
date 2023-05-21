const express = require('express');
const router = express.Router();

const BookingController = require('../app/controllers/BookingController');


router.get('/choose-cinema', BookingController.cinema);
router.get('/choose-a-chair', BookingController.chair);
router.get('/choose-movie', BookingController.movie);
// router.get('/choose-movie-day', BookingController.getNewUrl);
router.get('/pay', BookingController.pay);
router.get('/cinemas', BookingController.cinemas);

module.exports = router;