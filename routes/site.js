const express = require('express');
const siteController= require('../controllers/site.controller');
const router = express.Router();


//ROUTES
router.post('/', siteController.save);

//GETS SPECIFIC SITE
router.get('/:siteId', async (req, res)=>{
    try{
        const site = await Site.findById(req.params.siteId);
        res.json(site);
    } catch(err){
        res.json({message: err});
    }
});

module.exports = router;