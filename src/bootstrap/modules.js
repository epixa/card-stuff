/**
 * Loads all of the application modules
 *
 * @param App The application state
 */
module.exports = function(App){
    App.Modules = App.library('module/loader').load(App.SOURCE_PATH + '/modules');
};