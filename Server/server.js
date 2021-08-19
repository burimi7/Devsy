process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
var express = require('express');
var app = express();
var cors = require('cors');
var apiRoutes = express.Router();
var http=require('http');
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads


// Add headers
app.use(function (req, res, next) {

    res.setHeader('Content-Type', ['application/json', 'charset=utf-8']); 
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', ['GET','POST','DELETE','UPDATE','PUT','PATCH']); 
    res.setHeader('Access-Control-Allow-Headers', ["X-API-KEY","Origin","X-Requested-With","Content-Type","Accept","Access-Control-Request-Method","Authorization"]);   
    
    // Pass to next layer of middleware
    next();
});

// routes
app.use('/api/User', require('./Controllers/user.controller'));
app.get('/',function(req,res){
    res.send('Welcome to Devsy\'s backend');
});

const port = process.env.PORT || 3000;
const host = '0.0.0.0'

app.listen(port, host, function () {
    console.log('Weatherly app listening on port 3000!')
  })

