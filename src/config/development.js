var Config = require('./production');

Config.MongoDb.host = 'localhost';
Config.MongoDb.user = null;
Config.MongoDb.pass = null;

module.exports = Config;