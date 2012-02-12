/**
 * Sets up the various connections for the application
 */

var Mongoose = require('mongoose');

/**
 * Builds a MongoDB connection string from the given configuration data
 *
 * Data has the following arguments:
 *  - REQUIRED name The name of the database
 *  - OPTIONAL host The database hostname; defaults to 'localhost'
 *  - OPTIONAL port The database port; defaults to the MongoDB default (27017)
 *  - OPTIONAL user The database username
 *  - OPTIONAL pass The database password
 *  - OPTIONAL options Any number of MongoDB options in key/value pairs
 *
 * @param data
 */
function mongoDbConnectionString(data)
{
    if (!data.name) {
        throw "No mongodb name specified";
    }

    if (!data.host) {
        data.host = 'localhost';
    }

    var str = 'mongodb://';

    if (data.user) {
        str += data.user;
        if (data.pass) {
            str += '@' + data.pass;
        }
        str += '/';
    }

    str += data.host;

    if (data.port) {
        str += ':' + data.port;
    }

    str += '/' + data.name;

    if (data.options) {
        str += '?';
        data.options.forEach(function(value, key){
            str += key + '=' + value + '&';
        });
        str = str.substr(0, str.length - 1);
    }

    return str;
}

/**
 * @param App The application state
 */
module.exports = function(App){
    App.Mongoose = Mongoose.connect(mongoDbConnectionString(App.Config.MongoDb));
};