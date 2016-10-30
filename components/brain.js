var _           = require('underscore');
var socketio    = require('socket.io');
var events      = require('events');
var logger      = require('./logger').getSingleton();

var singleton,
    io,
    red = 'red',
    green = 'green',
    yellow = 'yellow';
var intersection = {
    state: 0,           // 0 : north/south red and east/west green, 1: north/south green and east/west red
    northSouth: red,    // 0 : red, 1 : green, 2 : yellow
    eastWest: red
};

var rotationTime = 300000,  // 5 minutes 
    yellowTime = 30000;     // 30 seconds

var Brain = function (http) {
    // Init of the socket
    io = socketio(http);
};

Brain.prototype.start = function () {
    logger.log("Traffic Brain strated");
    this.change();
    setInterval(this.change.bind(this), rotationTime);
};

Brain.prototype.change = function () {
    // If state is 0, switch northSouth to green, else switch eastWest to green
    this.changeColor(! intersection.state ? "northSouth" : "eastWest", green);
    // If state is 1, switch northSouth to red, else switch eastWest to red
    this.changeColor(intersection.state ? "northSouth" : "eastWest", red);
    // Switch state
    intersection.state = !intersection.state;
};

Brain.prototype.changeColor = function (light, color) {
    this.setColor(light, color);
    this.broadcastChanges();
    
    if(color === green) {
        setTimeout(function (light) {
            this.changeColor(light, yellow);
        }.bind(this, light), rotationTime - yellowTime);
    }
};

Brain.prototype.setColor = function (light, color) {
    logger.log('Set ' + light + ' to ' + color);
    intersection[light] = color;
};

Brain.prototype.broadcastChanges = function () {
    io.emit("update", intersection); 
};

Brain.prototype.getIntersection = function () {
    return intersection;
};

exports.getSingleton = function (http) {
    if (!singleton) {
        singleton = new Brain(http);
    }
    return singleton;
};