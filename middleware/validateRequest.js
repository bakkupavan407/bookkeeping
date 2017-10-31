var jwt = require('jwt-simple');
var validateUser = require('../routes/auth').validateUser;

module.exports = function(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
  var uid = (req.body && req.body.uid);

  if (token || key) {
    try {
      var decoded = jwt.decode(token, require('../config/secret.js')());

      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }

      validateUser(uid).
      then(function(result) {
        if (result) next();
      }).catch(function(err) {
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid User",
          "error": err
        });
        return;
      });
    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong/ Token Invalid.",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
};


// When performing a cross domain request, you will recieve
// a preflighted request first. This is to check if our the app
// is safe.

// We skip the token outh for [OPTIONS] requests.
//if(req.method == 'OPTIONS') next();

/*TOKEN READING CODE*/

// Authorize the user to see if s/he can access our resources

// var promise = new Promise(function(resolve, reject) {
//   var dbUser = validateUser(uid);
//   if (dbUser) {
//     resolve();
//   } else {
//     reject();
//   }
// });
//
// promise.then(function(result) {
//   console.log(result); // "Stuff worked!"
// }, function(err) {
//   console.log(err); // Error: "It broke"
// });

// var promise = validateUser(uid);
//
// promise.then(function(result) {
//   console.log(result);
// }, function(err) {
//   console.log(err);
// });

// var dbUser = validateUser(uid); // The parameter would be the logged in user's username
// console.log("validateUser >>>>>> ", dbUser);
// if (dbUser) {
//
//   next();
//
//   // if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
//   //   next(); // To move to next middleware
//   // } else {
//   //   res.status(403);
//   //   res.json({
//   //     "status": 403,
//   //     "message": "Not Authorized"
//   //   });
//   //   return;
//   // }
// } else {
//   // No user with this name exists, respond back with a 401
//   res.status(401);
//   res.json({
//     "status": 401,
//     "message": "Invalid User"
//   });
//   return;
// }
