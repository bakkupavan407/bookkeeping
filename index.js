var express = require("express");
var pbks = express();

var routes = require("./routes/routes");

/*pbks server running port*/
pbks.listen(process.env.PORT || 3000, function() {
    console.log("Server listening on port 3000");
});

/*iniating routes*/
routes.init(pbks);
