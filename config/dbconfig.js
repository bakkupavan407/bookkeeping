
// mongodb://<dbuser>:<dbpassword>@ds155582.mlab.com:55582/fapps

// mongodb://admin:admin@ds155582.mlab.com:55582/fapps

// 
// mongodb://<dbuser>:<dbpassword>@ds241395.mlab.com:41395/pbks


var mongojs = require('mongojs');
var connectionString = "mongodb://127.0.0.1:27017/"; // "username:password@example.com/mydb"
var database = "pbks";
var collections = ["users","ledgers"];

var restDbConnStr = "mongodb://pbks:pbks@ds241395.mlab.com:41395/pbks";

module.exports = {
  db: mongojs(restDbConnStr , collections)
};

// admin admin


// var MongoClient = require('mongodb').MongoClient;
//
// const connectionstring = 'mongodb://127.0.0.1:27017/dbfapps',
//     collection = 'users';
//
// var userCollection;
// var db = MongoClient.connect(connectionstring, function(err, db) {
//     if (err)
//         throw err;
//     console.log("connected to the mongoDB !");
//     userCollection = db.collection(collection);
// });



// module.exports = {
//     postcolldata: function(req, res, data) {
//         var finalData;
//         userCollection.insert(data, function(err, result) {
//             if (err) {
//                 throw err;
//             } else {
//                 var insertedDoc = result.ops[0];
//                 console.log("Inserted Object ##### ", insertedDoc);
//                 finalData =  result.ops[0];
//             }
//         });
//         console.log("my finalData", finalData);
//         return finalData;
//     },
//     getCollData: function() {
//         userCollection.find().each(function(err, doc) {
//             if (err)
//                 throw err;
//             if (doc == null)
//                 return;
//
//             console.log("document find:");
//             console.log(doc.name);
//         });
//     }
// }
