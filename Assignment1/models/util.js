var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://mongodb4545ok:ha8zaw@danu7.it.nuigalway.ie:8717/mongodb4545');

mongoose.connection.on('error', function(err){
  console.log(err);
});

mongoose.connection.once('open', function(){
  console.log("Connected to MongoDB");
});

exports.connection = connection;