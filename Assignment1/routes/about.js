var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


router.get('/', function(req, res, next) {

  try {
      var jwtString = req.cookies.Authorization.split(" ");
      var profile = verifyJwt(jwtString[1]);
      if (profile) {
          res.render('about');
      }
  }catch (err) {
      res.render('error', {message: "You are not logged in"});
      }
});

/*
 Verifies a JWT
 */
function verifyJwt(jwtString) {

  var value = jwt.verify(jwtString, 'CSIsTheWorst');
  return value;
}

module.exports = router;