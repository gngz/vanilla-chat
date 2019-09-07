
require('dotenv').config();
const express = require('express');
const apiroute = require('./routes/Api');


const app = express();
const PORT = process.env.PORT || 8080;

app.use('/',express.static('public'));


// Import and use /api route
app.use('/api', apiroute);


// listen
app.listen(PORT, () =>  console.log(`Vanilla-Chat webserver listen on port ${PORT}`));

console.log(process.env.MONGO_URL)