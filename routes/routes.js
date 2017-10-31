var bodyParser = require("body-parser");
var auth = require("./auth");
var user = require("../src/user/user");
var admin = require("../src/admin/admin");

module.exports = {

    init: function(app) {
        // setting json on express to ge the json data
        app.use(bodyParser.json());
        // setting urlencoded on express to use encoded url
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        // to allow the CORS
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        // app.all('/api/v1/*', [require('../middleware/validateRequest')]);

        // user login registration
        app.post("/login", auth.login);
        app.post("/register", auth.register);

        // dummy services
        app.get("/", function(req, res) {
            res.send("Welcomes you my dear!!");
        });
        // app.get("/getname", function(req, res) {
        //     res.send("PowerStar");
        // });
        // app.get("/naresh", user.sampleuser);
        // app.get("/fapps", user.fapps);

        // validating emailid
        // app.post("/api/user/emailvalidate", user.emailvalidate);

        // user management services
        // app.post("/api/user/saveuser", user.saveuser);
        // app.post("/api/user/loginuser", user.loginuser);

        // admin routes
        // app.post("/api/admin/savedepts", admin.savedepts);
    }
}
