var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
require('./util');

var commentSchema = new Schema({
    handle: {type: String},
    comment: {type: String},
    upVotes: {type: Number, min: 0},
    downVotes: {type: Number, min: 0},
    timeStamp: {type: Date, default: new Date}
});
commentSchema.plugin(mongoosePaginate);

var Model = mongoose.model('Comment', commentSchema);

module.exports = Model;