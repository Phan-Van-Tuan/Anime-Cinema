const express = require('express');
const router = express.Router();
const multer  = require('multer');

const upload = multer();

const showTimeController = require('../app/controllers/ShowTimeController');

router.get('/create', showTimeController.create);
router.post('/create/stored', upload.none(), showTimeController.creating);
router.get('/', showTimeController.index);

module.exports = router;