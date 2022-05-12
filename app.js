const express= require('express');

const app= express();
const bodyParser= require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const siteRoute= require('./routes/site');
app.use('/site', siteRoute);

const userRoute= require('./routes/user');
app.use('/', userRoute)


//LISTEN
const port= process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`))