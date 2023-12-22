var express = require("express");
var router = express.Router();

require("../models/connection");
const Event = require("../models/events");

router.post("/", (req, res) => {
  // Check if event is not already registered
  Event.findOne({ title: req.body.title }).then((data) => {
    if (data === null) {
      const newEvent = new Event({
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
        gameId: ["6576fd7ad9e95bbd54710ad2", "6576fd7ad9e95bbd54710ad0", "6576fd7ad9e95bbd54710ad1"],
      });
      newEvent.save().then((newDoc) => {
        res.json({ result: true, dataGame: newDoc });
      });
    } else {
      // Event already in db
      res.json({ result: false, error: "Event exists already" });
    }
  });
});

router.get("/", (req, res) => {
  Event.find()
    .then((events) => {
      if (events === null) {
        res.json({ result: false, error: "Events not found" });
        return;
      } else {
        res.json({ result: true, events });
      }
    });
});;

module.exports = router;
