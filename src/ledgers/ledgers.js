var db = require("../../config/dbconfig").db;
var utils = require("../../utils/response");
var mongo = require('mongodb');
var utils = require("../../utils/response");

var ledgers = {
	getledgers: function(req, res) {
		
	},
	saveledgers: function(req, res){
		try {
	      var ledger = req.body;
	      if(!ledger){
	        res.json(utils.response("failure", {"errmsg": "Something wrong with input data!"}));
	      } else {
	        db.ledgers.insert(ledger, function (err, result) {
	          if(err) res.json(utils.response("failure", {"errmsg": err}));

	          res.json(utils.response("success", result));
	        });
	      }
	    } catch(err) {
	      res.json(utils.response("failure", {"errmsg": err}));
	    }
	},
	deleteledgers: function(req, res) {
		try{
			var uid = req.body.uid;
			var o_id = new mongo.ObjectID(uid);
			var gquery = { "_id": o_id };
			var sessionid = req.sessionuid;

			db.ledgers.find(gquery, function(err, result) {
					if (err) res.json(utils.response("failure", { "errmsg": err }));
					var data = result[0];
					if(data && data.uid === sessionid) {
						db.ledgers.remove(gquery, function(err, obj) {
							if (err) throw err;
							res.json(utils.response("success"));
						});
					} else {
						res.json(utils.response("failure", {errmsg: "You can only delete your own data."}));
					}
			});
		} catch (err) {
			res.json(utils.response("failure", {"errmsg": err && err.message}));
		}
	}
}

module.exports = ledgers;


