var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');
var startValue = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Avenue United FC' });
});

/* Commenting Routes for index comments */

// Adds a comment to our DB
router.post('/addComment', function(req, res, next) {

    // Extract the request body which contains the comment info
    comment = new Comment(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

// Gets Comments from the DB
router.get('/getComment', function(req,res,next) {

  // Get comments from DB
  Comment.find({ _id: {$lt: startValue}})
             .sort('-Date')
             .limit(10)
             .exec(function(err, comments){
                    console.log("finding comments");
                    res.send(comments);       
                    console.log("got Comments");
                    startValue+=10;
             });

});

module.exports = router;
