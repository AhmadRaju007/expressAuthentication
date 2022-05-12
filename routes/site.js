const express = require('express');
const router = express.Router();
const db= require('../db/database');


//ROUTES

//GETS ALL SITES
router.get('/', async (req, res)=>{
    try{
        const sites = await Site.find();
        res.json(sites);
    } catch(err){
        res.json({message: err});
    }
});

//GETS SPECIFIC SITE
router.get('/:siteId', async (req, res)=>{
    try{
        const site = await Site.findById(req.params.siteId);
        res.json(site);
    } catch(err){
        res.json({message: err});
    }
});

//SUBMITS A SITE
router.post('/', async (req, res)=>{
    const site= new Site({
       name: req.body.name,
       jurisdiction: req.body.jurisdiction,
       description: req.body.description,
       latitude: req.body.latitude,
       longitude: req.body.longitude,
    });

    try{
        const savedSite = await site.save();
        res.json(savedSite);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;