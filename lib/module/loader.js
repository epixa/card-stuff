var fs = require('fs');

/**
 * Converts the given file name into its appropriate module name
 *
 * A module's name is parsed from its filename with the given algorithm:
 *  - The .js extension is dropped off
 *  - The first letter of each word (separated by one or more spaces/underscores) is capitalized
 *  - All spaces/underscores are then removed
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

module.exports = {
    /**
     * Retrieves all of the modules in the given path
     *
     * Note: This is not a recursive method.
     *
     * @param object
     */
    load: function(path){
        var modules = {};

        fs.readdirSync(path).forEach(function(fileName){
            var fullPath = path + '/' + fileName;
            if (!fs.statSync(fullPath).isFile()) {
                return;
            }

            var name = moduleNameFromFile(fileName);
            modules[name] = require(fullPath);
        });

        return modules;
    }
};
