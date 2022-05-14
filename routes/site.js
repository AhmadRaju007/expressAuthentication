const express = require('express');
const siteController= require('../controllers/site.controller');
const router = express.Router();


//ROUTES
router.post('/', siteController.save);

//GETS SPECIFIC SITE
router.get('/:siteId', siteController.details);

module.exports = router;