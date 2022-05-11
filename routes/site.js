const express = require('express');
const router = express.Router();
const Post= require('../models/Site');


//ROUTES
router.get('/', (req, res)=>{
    res.send("Hello World!");
});


router.post('/', (req, res)=>{
    console.log(req.body);
});

module.exports = router;