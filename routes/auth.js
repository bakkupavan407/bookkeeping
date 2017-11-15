var jwt = require('jwt-simple');
var ObjectId = require('mongodb').ObjectID;
var db = require("../config/dbconfig").db;
var utils = require("../utils/response");
var mongo = require('mongodb');

var auth = {
    login: function(req, res) {
        try {
            var logindata = req.body;
            db.users.find(logindata, function(err, result) {
                if (err) res.json(utils.response("failure", { "errmsg": err }));
                var tokenInfo = getToken(),
                    data = result[0];
                data.token = tokenInfo.token;
                data.expires = tokenInfo.expires;
                res.json(utils.response("success", result));
            });
        } catch (err) {
            res.json(utils.response("failure", { "errmsg": err }));
        }
    },
    register: function(req, res) {
        try {
            var userdata = req.body;
            if (!userdata) {
                res.json(utils.response("failure", { "errmsg": "Something wrong with input data!" }));
            } else {
                userdata.userid = "";
                userdata.role = "user";
                userdata.timestamp = new Date().toISOString();
                db.users.insert(userdata, function(err, result) {
                    if (err) res.json(utils.response("failure", { "errmsg": err }));

                    // var tokenInfo = getToken();
                    // result.token = tokenInfo.token;
                    // result.expires = tokenInfo.expires;

                    delete result.password;

                    res.json(utils.response("success", result));
                });
            }
        } catch (err) {
            res.json(utils.response("failure", { "errmsg": err }));
        }
    },
    validateUser: function(uid) {
        return new Promise(function(resolve, reject){
            if (!uid) reject(false);
            var o_id = new mongo.ObjectID(uid);
            db.users.findOne({ "_id": o_id }, function(err, result) {
                if (err) reject(false);
                resolve(result);
            });
        });
    }
};

// to generate token and set expire time.
function getToken() {
    var expires = expiresIn(0.333333); // 7 days
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