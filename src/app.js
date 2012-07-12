var fs = require('fs');
var util = require('underscore');

module.exports = {
    ROOT_PATH:    fs.realpathSync('../'),
    SOURCE_PATH:  this.ROOT_PATH + '/src',
    LIBRARY_PATH: this.ROOT_PATH + '/lib',

    Config: {},

    Mongoose: null,

    Modules: {},

    sessionStorage: null,

    server: null,

    library: function(name){
        return require(this.LIBRARY_PATH + '/' + name);
    },

    require: function(name){
        return require(this.SOURCE_PATH + '/' + name);
    },

    bootstrap: function(server, rootPath){
        var self = this;

        self.server = server;

        if (rootPath) {
            self.ROOT_PATH    = rootPath;
            self.SOURCE_PATH  = self.ROOT_PATH + '/src';
            self.LIBRARY_PATH = self.ROOT_PATH + '/lib';
        }

        self.require('bootstrap/environments')(self, server);
        self.require('bootstrap/connections')(self, server);
        self.require('bootstrap/session')(self, server);
        self.require('bootstrap/views')(self, server);
        self.require('bootstrap/routes')(self, server);
        self.require('bootstrap/socket')(self, server);
        self.require('bootstrap/modules')(self, server);

        server.configure('development', function(){
            self.require('_development/data')(self);
        });
    },

    createError: function(severity, type, msg) {
        var data = {severity: severity};
        if (!util.isUndefined(type)) {
            data.type = type;
        }
        if (!util.isUndefined(msg)) {
            data.msg = msg;
        }

        // @todo: add logging
        console.error(data);
        return data;
    }
};
