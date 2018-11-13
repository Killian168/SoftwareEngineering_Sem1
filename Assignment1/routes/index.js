var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');
var nextpage = 1; // Index of page loaded next time a get request for comments is recieved
var totalPages = 1; // 1 by default

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
            "id": savedComment._id,
            "commentMessage": savedComment.comment
        });
    });
});

// Gets Comments from the DB
router.get('/getComment', function(req,res,next) {

    var query   = {};
    var options = {
        sort:     { "timeStamp": -1 },
        limit:    10,
        page: nextpage
    };

    // Get comments from DB
    Comment.paginate(query, options).then(function(result) {
        res.send(result);
        totalPages = result.pages;
    });

});

// Gets Comments from the DB
router.get('/getNextComment', function(req,res,next) {
    if(nextpage<totalPages) {
        nextpage++;
    }
    var query   = {};
    var options = {
        sort:     { "timeStamp": -1 },
        limit:    10,
        page: nextpage
    };

    // Get comments from DB
    Comment.paginate(query, options).then(function(result) {
        res.send(result);
        totalPages = result.pages;
    });

});

// Gets Comments from the DB
router.get('/getPrevComment', function(req,res,next) {
    if(nextpage>1) {
        nextpage--;
    }
    var query   = {};
    var options = {
        sort:     { "timeStamp": -1 },
        limit:    10,
        page: nextpage
    };

    // Get comments from DB
    Comment.paginate(query, options).then(function(result) {
        res.send(result);
    });

});

module.exports = router;
