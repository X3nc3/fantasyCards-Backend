var express = require("express");
var router = express.Router();

require("dotenv").config();

require('../models/connection')
const Team = require('../models/teams')
const Card = require('../models/cards')
const Game = require('../models/games');
const Pack = require('../models/packs')

const apiHost = process.env.RAPIDAPI_HOST;
const apiKey = process.env.RAPIDAPI_KEY;

/* GET teams listing and add it to Database*/
// FIXME: Make league parameter dynamic (fetch all leagues ids wanted)
router.get('/setTeams', (req, res) => {
  fetch('https://v3.football.api-sports.io/teams?league=111&season=2023', {
    headers: {
      "x-rapidapi-host": apiHost,
      "x-rapidapi-key": apiKey,
    },
  })
    .then(response => response.json())
    .then(teamsList => {
      teamsList.response.map((e) => {
        const newTeam = new Team({
          id: e.team.id,
          name: e.team.name,
          country: e.team.country,
          image: e.team.logo,
          sport: 'football'
        })
        newTeam.save().then()
      })
        .then(() => {
          Team.find().then((data) =>
            res.json({
              result: true,
              message: `${data.length} Teams successfully added!`,
            })
          );
        })
        .catch((err) => console.error(err));
    })
});

/* GET players for teams that are in db */
// FIXME: Make team parametter dynamic (fetch all team ids that are in db)
router.get('/setCards', function (req, res) {
  fetch('https://v3.football.api-sports.io/players/squads?team=111', {
    headers: {
      'x-rapidapi-host': apiHost,
      'x-rapidapi-key': apiKey
    }
  })
    .then(response => response.json())
    .then(playerList => {
      let id = playerList.response[0].team.id
      playerList.response[0].players.map((e) => {
        const newCard = new Card({
          teamId: id,
          name: e.name,
          rarity: 3,
          stock: 25,
          picture: e.photo,
          eventsId: null,
          cardPrices: [
            { userId: '6576d0b8dbcfb883c78bd2fe', price: 0 },
            { userId: '6576d0b8dbcfb883c78bd2fe', price: 0 }
          ]
        })
        newCard.save()
      })
    })
})

/* GET games for teams that are in db */
// FIXME: Make league parameter dynamic (fetch all league ids that are in db)
router.get('/setGames', function (req, res) {
  fetch('https://v3.football.api-sports.io/fixtures?league=39&season=2023', {
    headers: {
      'x-rapidapi-host': apiHost,
      'x-rapidapi-key': apiKey
    }
  })
    .then(response => response.json())
    .then(gamesList => {
      gamesList.response.map((e) => {
        const newGame = new Game({
          gamId: e.fixture.id,
          teamHomeId: e.teams.home.id,
          teamAwayId: e.teams.away.id,
          startDate: e.fixture.periods.first,
          endDate: e.fixture.periods.second,
          status: e.fixture.status.long,
          winnerTeamHome: e.teams.home.winner,
          winnerTeamAway: e.teams.away.winner
        })
        newGame.save()
      })
    })
})

router.post('/pack', (req, res) => {
  const newPack = new Pack({
    rarity: 2,
    stock: 34,
    packPrices: [
      { userId: '65772715a7dd15c4a7dfca7c', price: 0 },
      { userId: '65772715a7dd15c4a7dfca7c', price: 0 }
    ]
  })
  newPack.save()
  res.json({ result: true });
});

module.exports = router;
