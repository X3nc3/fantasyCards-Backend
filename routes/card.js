var express = require("express");
var router = express.Router();

const Card = require("../models/cards");
const User = require("../models/users");
const Team = require("../models/teams");

require("../models/connection");

router.get("/find/:name", (req, res) => {
  Card.findOne({ name: req.params.name })
    .then((data) => {
      res.json({ data })
    })
})

router.get("/marketCards", (req, res) => {
  Card.find({ "cardPrices.price": { $gt: 0 } }).then((card) => {
    res.json({ result: true, card: card });
  });
});

router.patch("/sell/:token/:subDocId", async (req, res) => {
  const card = await Card.findOne({
    "cardPrices.userToken": req.params.token,
    "cardPrices._id": req.params.subDocId,
  });
  const sub = card.cardPrices.find(
    (sd) => sd._id.toString() === req.params.subDocId
  );
  sub.price = req.body.price;
  await card.save();
  res.json(sub);
});

router.get("/addCardInGame/:userToken", (req, res) => {
  User.findOne({ token: req.params.userToken })
    .populate("cardsId")
    .then((data) => {
      res.json({ cards: data.cardsId });
    });
});

router.get("/:th/:ta/:token", async (req, res) => {
  const teamHome = await Team.findOne({ id: req.params.th });
  const teamAway = await Team.findOne({ id: req.params.ta });

  const cardTa = await Card.find({
    teamId: teamHome.id,
    "cardPrices.userToken": req.params.token
  });

  const cardTh = await Card.find({
    teamId: teamAway.id,
    "cardPrices.userToken": req.params.token
  });

  res.json({ result: true, teamHome, teamAway, cardTa, cardTh });
});


router.put("/buy/:buyertoken/:sellerToken/:subDocId", async (req, res) => {
  const card = await Card.findOneAndUpdate(
    {
      "cardPrices.userToken": req.params.sellerToken,
      "cardPrices._id": req.params.subDocId,
    },
    {
      $set: {
        "cardPrices.$.userToken": req.params.buyertoken,
        "cardPrices.$.price": 0,
      },
    }
  );

  const sub = card.cardPrices.find(
    (sd) => sd._id.toString() === req.params.subDocId
  );
  await User.findOneAndUpdate(
    { token: req.params.buyertoken },
    {
      $push: { cardsId: card._id },
      $inc: { credits: -sub.price },
    }
  );

  await User.findOneAndUpdate(
    { token: req.params.sellerToken },
    {
      $pull: { cardsId: card._id },
      $inc: { credits: sub.price }
    }
  );

  res.json({ result: true });
});

module.exports = router;
