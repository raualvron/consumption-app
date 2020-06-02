var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var cors = require('cors');

const db = require("./models");
const env = require("./config/env.config.js");
const routes = require("./routes/consumption.routes");
const importer = require("./utils/csv.util");

app.use(cors({origin: '*'}));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

app.use("/consumption", routes);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
    // Drop consumptions collection in case it exists
    mongoose.connection.collections["consumptions"].drop(function (err, res) {
      if (res) console.log("Database deleted");
      // Import dataset
      importer.importCSV(env.dataset);
    });
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

var port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Server is up and running on the port number: " + port);
});
