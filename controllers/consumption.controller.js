const db = require("../models");
const Consumption = db.consumption;

// Retrieve all consumption from the database.
exports.findAll = (req, res) => {
  Consumption.find({})
    .sort("-date")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving consumption.",
        status: 500,
      });
    });
};

exports.insert = (req, res) => {
  Consumption.create(req.body)
    .then((data) => {
      res.send({ data, status: 200 });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving consumption.",
        status: 500,
      });
    });
};

exports.update = (req, res) => {
  Consumption.findByIdAndUpdate(
    req.body.id,
    { $set: req.body },
    (err, resp) => {
      if (err)
        return res
          .status(500)
          .send({
            message:
              err.message ||
              "Some error occurred while retrieving consumption.",
            status: 500,
          });

      if (resp) {
        return res.status(200).send({
          message: "Update successfully",
          status: 200,
        });
      } else {
        return res.status(404).send({
          message: "No existe la nota",
          status: 404,
        });
      }
    }
  );
};

exports.delete = (req, res) => {
  Consumption.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.status(200).send({
        message: "Deleted successfully",
        status: 200,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving consumption.",
        status: 500,
      });
    });
};
