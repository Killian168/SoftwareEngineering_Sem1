var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var commentSchema = new Schema({
    userName: {type: String},
    comment: {type: String}
});

module.exports = mongoose.model('Comment', commentSchema);