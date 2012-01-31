var mongoose = require('mongoose');

function setSeverity(value)
{
    value = value.toUpperCase();
    if (value != 'FATAL') {
        value = 'WARNING';
    }
    return value;
}

var Schema = new mongoose.Schema({
    severity : { type: String, set: setSeverity },
    type : { type: String }
});

module.exports = mongoose.model('Error', Schema);