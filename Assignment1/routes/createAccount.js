var express = require('express');
var router = express.Router();

/* GET LogIn page. */
router.get('/', function(req, res, next) {
  res.render('createAccount', { title: 'Avenue United FC' });
});

module.exports = router;