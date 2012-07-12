/**
 * Bootstraps the modules in the current app
 * 
 * Modules are logical groupings of models, collections, and associated
 * functionality
 */

var fs = require('fs');
var util = require('underscore');

/**
 * Converts the given file name into its appropriate module name
 *
 * A module's name is parsed from its filename with the given algorithm:
 *  - The .js extension is dropped off
 *  - Words are separated by one or more spaces or underscores
 *  - The first letter of each word is capitalized
 *  - All spaces and underscores are then removed
 *
 *  e.g. my_module_name.js => MyModuleName
 *
 * @param fileName
 */
function moduleNameFromFile(fileName) {
    if (fileName.length < 4 || fileName.substr(-3) !== '.js') {
        throw "Invalid module file: " + fileName;
    }

    var moduleName = fileName;

    moduleName = moduleName.substr(0, moduleName.length - 3);
    moduleName = moduleName.replace(/_+/g, ' ');
    moduleName = moduleName.replace(/^([a-z])|\s+([a-z])/g, function(match){
        return match.toUpperCase();
    });
    moduleName = moduleName.replace(/\s+/g, '');

    return moduleName;
}

/**
 * Loads all of the application modules
 *
 * @param App The application state
 */
module.exports = function(App){
    var path = App.SOURCE_PATH + '/modules';
    fs.readdirSync(path).forEach(function(fileName){
        var fullPath = path + '/' + fileName;
        if (!fs.statSync(fullPath).isFile()) {
            return;
        }

        var name = moduleNameFromFile(fileName);
        var module = require(fullPath);
        if (util.isFunction(module)) {
            module = module(App);
        }
        App.Modules[name] = module;
    });
};
