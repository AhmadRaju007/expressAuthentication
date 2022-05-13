const express = require('express');
const authController= require('../controllers/auth.controller');
const router = express.Router();
const db= require('../connection/connect');


router.get('/', authController.index);

//LOGIN MODULE
// router.get('/', async (req, res)=>{
//     res.json({message: "hello world!"});
// });

//LOGIN MODULE
router.get('/login', async (req, res)=>{
    res.json({message: "hei!"});
});

//REGISTER MODULE
router.get('/login', async (req, res)=>{
    res.json({message: "hei!"});
});

module.exports = router;