const mongoose = require("mongoose");

function mongoDbConnection(){
mongoose
  .connect("mongodb://127.0.0.1:27017/mynewdb")
  .then(() => console.log("mongo Db Connected "))
  .catch(() => console.log("Connection Not SuccesFul"));
}


module.exports= mongoDbConnection;

