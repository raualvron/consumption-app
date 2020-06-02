const csv = require("csv-parser");
const fs = require("fs");
var mongoose = require("mongoose");
const db = require("../models");

module.exports = {
  importCSV,
};

function importCSV(csvFile) {
  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (data) => {
      data["_id"] = new mongoose.Types.ObjectId();
      if (data.Date) {
        const date = new Date(data.Date);
        date.setHours(data.Hours);

        var consumptions = new db.consumption({
          date: date,
          price: data.Price,
          consumption: data.Consumption,
          cost: data.Cost,
        });
      }
      if (consumptions) {
        consumptions.save(function (err, res) {
          if (err) {
            console.log("Error");
          }
        });
      }
    })
    .on("end", function () {
      console.log("Imported done successfully");
    });
}
