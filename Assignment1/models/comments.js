var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var commentSchema = new Schema({
    handle: {type: String},
    comment: {type: String},
    upVotes: {type: Number, min: 0},
    downVotes: {type: Number, min: 0},
    timeStamp: {type: Date, default: new Date}
});

module.exports = mongoose.model('Comment', commentSchema);