var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        text: {
            type:String,
            require: true
        },
        likes: {
            type:Number,
            require: true
        },
        uid: {
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }
    });
    return mongoose.model('Post', schema);
}();