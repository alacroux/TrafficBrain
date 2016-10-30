var singleton;

var Logger = function () {};

Logger.prototype.log = function (arg) {
    var date = new Date().toISOString();
    console.log(date, arg);
}

exports.getSingleton = function () {
    if (!singleton) {
        singleton = new Logger();
    }
    return singleton;
};