
const express = require('express');
const apiroute = require('./routes/Api');


const app = express();
const port = 8080;

app.use('/',express.static('public'));

app.use('/api', apiroute);

app.listen(port, () =>  console.log("listen"));