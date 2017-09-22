var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        name: {
            type:String,
            require: true
        },
        email: {
            type:String,
            require: true
        },
        password: {
            type:String,
            require: true
        }
    });
    return mongoose.model('User', schema);
}();