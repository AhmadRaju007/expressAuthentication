const express= require('express');

const app= express();
const bodyParser= require('body-parser');
const cors = require('cors');
require('dotenv').config();

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));


//Import Routes
const siteRoute= require('./routes/site');
app.use('/site', siteRoute);

const authRoute= require('./routes/auth');
app.use('/auth', authRoute);

app.get('/', async (req, res)=>{
    res.json({message: "hello world!"});
});

// //LISTEN
const port= process.env.APP_PORT || 3001;
app.listen(port, ()=> console.log(`Listening on port ${port}...`))