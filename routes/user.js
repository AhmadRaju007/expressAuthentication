const express = require('express');
const router = express.Router();
const db= require('../db/database');

//GETS ALL SITES
router.get('/login', async (req, res)=>{
    try{
        const sites = await Site.find();
        res.json(sites);
    } catch(err){
        res.json({message: err});
    }
});