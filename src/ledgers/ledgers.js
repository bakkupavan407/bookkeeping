var db = require("../../config/dbconfig").db;
var utils = require("../../utils/response");

var ledgers = {
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
	}
}

module.exports = ledgers;


