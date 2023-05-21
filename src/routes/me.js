const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/ticket', meController.ticket);
router.get('/stored/movies', meController.storedMovies);
router.get('/trash/movies', meController.trashMovies);
router.get('/stored/news', meController.storedNews);

module.exports = router;