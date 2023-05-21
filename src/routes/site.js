const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');


router.get('/search', siteController.search);
router.get('/privacy-policy', siteController.privacyPolicy);
router.get('/terms-of-use', siteController.termsOfUse);
router.get('/conditions', siteController.conditions);
router.get('/', siteController.index);

module.exports = router;