"========================"
//Recursos Alberto Pérez
"========================"
var express = require("express");
var app = express();
console.log("###################Recursos ALBERTO###################");
//var scorersstats = [];
console.log("declaracion de scorerstats vacia (comentada)");
// GET /api/v1/companies-stats/docs
console.log("GET a scorers-stats/docs");

app.get("/api/v1/scorers-stats/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/6869425/S17usmtj");
})

// GET /api/v1/scorers-stats/loadInitialData
console.log("GET loadInitialData /scorers-stats/loadInitialData ");

app.get("/api/v1/scorers-stats/loadInitialData", (req, res) => {

    var scorersstatsinitial = [{
        country: "arg",
        year: "2004",
        name: "lionel",
        scorergoal: 405,
        scorermatch: 440,
        scoreraverage: 0.92
    }, {
        country: "prt",
        year: "2009",
        name: "cristiano-ronaldo",
        scorergoal: 311,
        scorermatch: 292,
        scoreraverage: 1.07
    }, {
        country: "esp",
        year: "1994",
        name: "raul-gonzalez",
        scorergoal: 311,
        scorermatch: 292,
        scoreraverage: 1.07
    }, {
        country: "mex",
        year: "2000",
        name: "chicharito",
        scorergoal: 111,
        scorermatch: 292,
        scoreraverage: 0.50
    }, {
        country: "bra",
        year: "2001",
        name: "ronaldo-nazario",
        scorergoal: 151,
        scorermatch: 242,
        scoreraverage: 0.67
    }];

    console.log("scorersstatsinitial cargados con los jugadores");
    scorers.find({}).toArray((error, scorersArray) => {
        if (scorersArray.length == 0) {
            scorers.insert(scorersstatsinitial);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(409);
        }
    });
});

// GET /api/v1/scorers-stats
console.log("GET al conjunto /scorers-stats ");
app.get("/api/v1/scorers-stats", (req, res) => {
    scorers.find({}).toArray((error, scorersArray) => {
        res.send(scorersArray)
        if (error) {
            console.log("Error:" + error);
        }


    });
});


// POST /api/v1/scorers-stats
console.log("POST al conjunto /scorers-stats ");
app.post("/api/v1/scorers-stats", (req, res) => {

    var nameScorer = req.body.name;
    var newScorer = req.body;
    if (!newScorer.country || !newScorer.year || !newScorer.name || !newScorer.scorergoal || !newScorer.scorermatch || !newScorer.scoreraverage) {
        res.sendStatus(400);
    }
    scorers.find({ "name": nameScorer }).toArray((error, scorersArray) => {

        if (error) {
            console.log("Error: " + error);
        }
        if (scorersArray.length > 0) {
            res.sendStatus(409);
        }
        else {
            scorers.insert(newScorer);
            res.sendStatus(201);
        }
    });
});
console.log("Declaracion scorerstats vacio");
var scorersstats = []
// DELETE /api/v1/scorers-stats
console.log("DELETE al conjunto /scorers-stats ");
app.delete("/api/v1/scorers-stats", (req, res) => {
    scorers.remove({});

    res.sendStatus(200);
});


// GET /api/v1/scorers-stats/name
console.log("GET al año /scorers-stats/name ");
app.get("/api/v1/scorers-stats/:name", (req, res) => {


    var name = req.params.name;

    scorers.find({ "name": name }).toArray((error, filteredscorersstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredscorersstats.length >= 1) {
            res.send(filteredscorersstats[0]);
        }
        else {
            res.sendStatus(404);
        }
    });

});


// PUT /api/v1/scorers-stats/year
console.log("PUT al año /scorers-stats/year ")
app.put("/api/v1/scorers-stats/:year", (req, res) => {
    var id = req.params._id
    var year = req.params.year;
    var updatedscorersstats = req.body;
    scorers.find({}).toArray((error, scorersArray) => {
        if (error) {
            console.log(error);
        }
        if (year != updatedscorersstats.year || id != updatedscorersstats._id) {
            res.sendStatus(400);
        }
        else {
            scorers.updateOne({ year: year }, { $set: updatedscorersstats });
            res.sendStatus(200);
        }

    });
});

// DELETE /api/v1/scorers-stats/argentina
console.log("DELETE a un pais /scorers-stats/argentina ");
app.delete("/api/v1/scorers-stats/:country", (req, res) => {
    var country = req.params.country;

    scorers.find({ "country": country }).toArray((error, filteredscorersstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredscorersstats.length === 0) {
            res.sendStatus(404);
        }
        else {
            scorers.deleteOne({ "country": country });
            res.sendStatus(200);
        }
    });

});

// POST /api/v1/scorers-stats/argentina
console.log("POST Erroneo a un recurso /scorers-stats/argentina --> 405 ");
app.post("/api/v1/scorers-stats/:country", (req, res) => {

    res.sendStatus(405);
});

// PUT /api/v1/scorers-stats
console.log("PUT Erroneo al conjunto /scorers-stats/ --> 405 ");
app.put("/api/v1/scorers-stats", (req, res) => {

    res.sendStatus(405);
});