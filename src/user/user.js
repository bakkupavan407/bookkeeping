var bodyParser = require("body-parser");
var db = require("../../config/dbconfig").db;
var utils = require("../../utils/response");

module.exports = {
    // test methods
    sampleuser: function(req, res) {
        res.send("Naresh Kumar R");
    },
    fapps: function(req, res) {
        res.sendFile(__dirname + '/user.html');
    },

    emailvalidate: function(req, res){
      try {
        var data = req.body;
        if (Object.keys(data).length) {
            var user = data || {},
                email = user.email || "";

            if ( email ) {
              var dataobj = {
                email: email
              };
              db.users.find(dataobj, function (err, result) {
                if(err) res.json(utils.response("failure", {"errmsg": err}));
                var resp = utils.createobj();
                if(result.length === 1){
                  resp.length = result.length;
                  resp.message = "Email id already exists!!!"
                } else {
                  resp.length = result.length;
                  resp.message = "Email id doesn't existes!!!"
                }
                res.json(resp);
              });
            } else {
                res.json(utils.response("failure", {"errmsg": "Input data is not valid!"}));
            }
        } else {
            res.json(utils.response("failure", {"errmsg": "Something wrong with input data!"}));
        }
      } catch(err) {
        res.json(utils.response("failure", {"errmsg": err}));
      }
    },

    // user management modules
    saveuser: function(req, res) {
      try {
        var data = req.body;
        if (Object.keys(data).length) {
            var user = data || {},
                fname = user.fname || "",
                lname = user.lname || "",
                password = user.password || "",
                email = user.email || "";

            if (fname && lname && password && email) {
              var dataobj = {
                fname: fname,
                lname: lname,
                password: password,
                email: email
              };
              db.users.insert(dataobj, function (err, result) {
                if(err) res.json(utils.response("failure", {"errmsg": err}));
                res.json(utils.response("success", result));
              });
            } else {
                res.json(utils.response("failure", {"errmsg": "Input data is not valid!"}));
            }
        } else {
            res.json(utils.response("failure", {"errmsg": "Something wrong with input data!"}));
        }
      } catch(err) {
        res.json(utils.response("failure", {"errmsg": err}));
      }
    },

    loginuser: function(req, res) {
      try {
        var data = req.body;
        var params = req.query;

        // checking for email existance
        if( Object.keys(params).length){
          var emailvalidate = params.email || "";
          if(emailvalidate){
            var findemail = {email: emailvalidate};
            db.users.count(findemail, function (err, result) {
              if(err) res.json(utils.response("failure", {"errmsg": err}));
              console.log("params result ", result);
              var resp = utils.createobj();
              if( result === 1 ) {
                resp.length = result;
                resp.message = "Email id already exists!!!"
              } else {
                resp.length = result;
                resp.message = "Email id doesn't existes!!!"
              }
              res.send(resp);
            });
          }
        } else if (Object.keys(data).length) {
              var user = data || {},
                  email = user.email || "",
                  password = user.password || "";

              if ( email && password ) {
                var dataobj = {
                  email: email,
                  password: password
                };
                db.users.find(dataobj, function (err, result) {
                  if(err) res.json(utils.response("failure", {"errmsg": err}));
                  res.json(utils.response("success", result[0]));
                });
              } else {
                  res.json(utils.response("failure", {"errmsg": "Input data is not valid!"}));
              }
          } else {
              res.json(utils.response("failure", {"errmsg": "Something wrong with input data!"}));
          }
      } catch(err) {
        res.json(utils.response("failure", {"errmsg": err}));
      }
    }
}
