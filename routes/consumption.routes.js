const consumption = require("../controllers/consumption.controller.js");
const router = require("express").Router();

// Retrieve all consumption
router.get("/", consumption.findAll);
router.delete("/:id", consumption.delete)
router.put('/:id', consumption.update)
router.post('/', consumption.insert)

module.exports = router;