var db = require("../../config/dbconfig").db;
var utils = require("../../utils/response");
var mongo = require('mongodb');
var utils = require("../../utils/response");

var ledgers = {
	getledgers: function(req, res) {
		try {
			var userid = req.sessionuid;
			db.ledgers.find({userid: userid}).toArray(function (err, result) {
				if(err) res.json(utils.response("failure", {"errmsg": err}));
				res.json(utils.response("success", result));
			});
		} catch(err) {
			res.json(utils.response("failure", {"errmsg": err}));
		}
	},
	saveledgers: function(req, res){
		try {
	      var ledger = req.body;
	      if(!ledger){
	        res.json(utils.response("failure", {"errmsg": "Something wrong with input data!"}));
	      } else {
					ledger.userid = req.sessionuid;
					ledger.timestamp = new Date();
	        db.ledgers.insert(ledger, function (err, result) {
	          if(err) res.json(utils.response("failure", {"errmsg": err}));

	          res.json(utils.response("success", result));
	        });
	      }
	    } catch(err) {
	      res.json(utils.response("failure", {"errmsg": err}));
	    }
	},
	updateledgers: function(req, res){
		try {
			var ledger = req.body;
			var ledgerid = ledger.ledgerid;
			var ledger_id = new mongo.ObjectID(ledgerid);
			var userid = req.sessionuid;
			var gquery = {"_id": ledger_id, "userid": userid};

			delete ledger.ledgerid;
			db.ledgers.update(gquery, {$set: ledger}, function(err, result){
				if(err) res.json(utils.response("failure", {"errmsg": err}));
				res.json(utils.response("success", result));
			});
		} catch (err) {
			res.json(utils.response("failure", {"errmsg": err}));
		}
	},
	deleteledgers: function(req, res) {
		try{
			var ledgerid = req.body.ledgerid;
			var ledger_id = new mongo.ObjectID(ledgerid);
			var userid = req.sessionuid;
			var gquery = { "_id": ledger_id, "userid": userid};

			db.ledgers.remove(gquery, function(err, obj) {
				if (err) throw err;
				res.json(utils.response("success"));
			});
		} catch (err) {
			res.json(utils.response("failure", {"errmsg": err && err.message}));
		}
	}
}

module.exports = ledgers;


