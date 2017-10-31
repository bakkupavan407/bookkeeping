var jwt = require('jwt-simple');
var ObjectId = require('mongodb').ObjectID;
var db = require("../config/dbconfig").db;
var utils = require("../utils/response");

var auth = {
  login: function(req, res){
    try{
      var logindata = req.body;
      db.users.find(logindata, function (err, result) {
        if(err) res.json(utils.response("failure", {"errmsg": err}));
        var tokenInfo = getToken(), data = result[0];
          data.token = tokenInfo.token;
          data.expires = tokenInfo.expires;
        res.json(utils.response("success", result));
      });
    }
    catch(err){
      res.json(utils.response("failure", {"errmsg": err}));
    }
  },
  register: function(req, res){
    try {
      var userdata = req.body;
      if(!userdata){
        res.json(utils.response("failure", {"errmsg": "Something wrong with input data!"}));
      } else {
        db.users.insert(userdata, function (err, result) {
          if(err) res.json(utils.response("failure", {"errmsg": err}));

          var tokenInfo = getToken();
          result.token = tokenInfo.token;
          result.expires = tokenInfo.expires;

          res.json(utils.response("success", result));
        });
      }
    } catch(err) {
      res.json(utils.response("failure", {"errmsg": err}));
    }
  }
};

// to generate token and set expire time.
function getToken() {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());

  return {
    token: token,
    expires: expires
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;