var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var bodyParser  = require('body-parser');
var request     = require('request');
var brain       = require('./components/brain').getSingleton(http);
var logger      = require('./components/logger').getSingleton();

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});

http.listen(8080, function() {
    logger.log('Express server listening on port ' + http.address().port);
    brain.start();
});