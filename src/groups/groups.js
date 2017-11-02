var db = require("../../config/dbconfig").db;
var utils = require("../../utils/response");

var groups = {
	getgroups: function(req, res){
		try {
	        db.broadcats.find().toArray(function (err, result) {
	          if(err) res.json(utils.response("failure", {"errmsg": err}));
	          res.json(utils.response("success", result));
	        });
	    } catch(err) {
	        res.json(utils.response("failure", {"errmsg": err}));
	    }
	}
}

module.exports = groups;