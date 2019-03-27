var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 8080;



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@sos1819-02-qn7gl.mongodb.net/sos1819-02?retryWrites=true";
var movies;
var companies;
var scorers;

const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(error => {
    movies = client.db("sos1819-02").collection("movies");
    companies = client.db("sos1819-02").collection("companies");
    scorers = client.db("sos1819-02").collection("scorers");


    console.log("Connected to database.");

});






app.use("/", express.static(__dirname + "/public"));

"============================="
//Recursos Alejandro Martin
"============================="



//GET /api/v1/movies-stats/docs
/*
app.get("/api/v1/movies-stats/docs/", (req,res)=>{
    res.redirect("");
});
*/


var moviesstats = [];

// GET /api/v1/movies-stats/loadInitialData

app.get("/api/v1/movies-stats/loadInitialData", (req, res) => {

    var moviesstatsinitial = [{
            country: "EEUU",
            year: "1997",
            name: "Titanic",
            movienomination: "14",
            movieaward: "11",
            movieedition: "70"
        },

        {
            country: "EEUU",
            year: "1959",
            name: "Ben Hur",
            movienomination: "12",
            movieaward: "11",
            movieedition: "32"
        },

        {
            country: "Nueva Zelanda",
            year: "2003",
            name: "El Señor de los Anillos: el retorno del Rey",
            movienomination: "11",
            movieaward: "11",
            movieedition: "76"
        },


        {
            country: "EEUU",
            year: "1939",
            name: "Lo que el viento se llevó",
            movienomination: "13",
            movieaward: "10",
            movieedition: "12"
        },

        {
            country: "EEUU",
            year: "1961",
            name: "West Side Story",
            movienomination: "11",
            movieaward: "10",
            movieedition: "34"
        }

    ];

    movies.find({}).toArray((error, moviesArray) => {
        if (moviesArray.length == 0) {
            movies.insert(moviesstatsinitial);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(409);
        }
    });
});

// GET /api/v1/movies-stats

app.get("/api/v1/movies-stats", (req, res) => {

    movies.find({}).toArray((error, moviesArray) => {

        res.send(moviesArray);
        if (error) {
            console.log("Error: " + error);
        }
    });
});




// POST /api/v1/movies-stats

app.post("/api/v1/movies-stats", (req, res) => {

    var newmoviesstats = req.body;
    var yearMovie = req.body.year;

    movies.find({ "year": yearMovie }).toArray((error, moviesArray) => {

        if (error) {
            console.log("Error: " + error);
        }
        if (moviesArray.length > 0) {
            res.sendStatus(409);
        }
        else {
            movies.insert(newmoviesstats);
            res.sendStatus(201);
        }
    });
});

// DELETE /api/v1/movies-stats

app.delete("/api/v1/movies-stats", (req, res) => {

    movies.remove({});
    res.sendStatus(200);

});


// GET /api/v1/movies-stats/1997

app.get("/api/v1/movies-stats/:year", (req, res) => {

    var year = req.params.year;

    movies.find({ "year": year }).toArray((error, filteredmoviesstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredmoviesstats.length >= 1) {
            res.send(filteredmoviesstats);
        }
        else {
            res.sendStatus(404);
        }
    });

});




// PUT /api/v1/movies-stats/1997

app.put("/api/v1/movies-stats/:year", (req, res) => {
    var id = req.params._id
    var year = req.params.year;
    var updatedmoviesstats = req.body;
    movies.find({}).toArray((err, moviesArray) => {
        if (err) {
            console.log(err);
        }
        if (movies != updatedmoviesstats.year || id != updatedmoviesstats._id) {
            res.sendStatus(400);
        }
        else {
            movies.updateOne({ year: year }, { $set: updatedmoviesstats });
            res.sendStatus(200);
        }

    });
});

// DELETE /api/v1/movies-stats/1997

app.delete("/api/v1/movies-stats/:year", (req, res) => {

    var year = req.params.year;
    movies.find({ "year": year }).toArray((error, filteredmoviesstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredmoviesstats.length == 0) {
            res.sendStatus(404);
        }
        else {
            movies.deleteOne({ "year": year });
            res.sendStatus(200);
        }
    });
});



// POST /api/v1/movies-stats/1997

app.post("/api/v1/movies-stats/:year", (req, res) => {

    res.sendStatus(409);
});

// PUT /api/v1/movies-stats

app.put("/api/v1/movies-stats", (req, res) => {

    res.sendStatus(405);
});

"========================"
//Recursos Alberto Pérez
"========================"

//var scorersstats = [];

// GET /api/v1/companies-stats/docs

app.get("/api/v1/scorers-stats/docs", (req, res) => {
    res.redirect("...........");
})

// GET /api/v1/scorers-stats/loadInitialData

app.get("/api/v1/scorers-stats/loadInitialData", (req, res) => {

    var scorersstatsinitial = [{
        country: "argentina",
        year: "2004",
        name: "lionel-messi",
        scorergoal: "405",
        scorermatch: "440",
        scoreraverage: "0.92"
    }, {
        country: "portugal",
        year: "2009",
        name: "cristiano-ronaldo",
        scorergoal: "311",
        scorermatch: "292",
        scoreraverage: "1.07"
    }];


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

app.get("/api/v1/scorers-stats", (req, res) => {
    scorers.find({}).toArray((error, scorersArray) => {
        res.send(scorersArray)
        if (error) {
            console.log("Error:" + error);
        }


    });
});


// POST /api/v1/scorers-stats

app.post("/api/v1/scorers-stats", (req, res) => {


    var newScorer= req.body;
    var ok = false;

    if (!newScorer.country || !newScorer.year || !newScorer.name ||
        !newScorer.scorergoal || !newScorer.scorermatch || !newScorer.scoreraverage ||
        Object.keys(newScorer).length != 7) {
        res.sendStatus(400);
    }
    else {

        scorersstats.find({}).toArray((err, scorersArray) => {
            for (var i = 0; i < scorersArray.length; i++) {

                if (scorersArray[i].country == newScorer.country &&
                    scorersArray[i].year == newScorer.year && scorersArray[i].name == newScorer.name &&
                    scorersArray[i].scorergoal == newScorer.scorergoal && scorersArray[i].scorermatch == newScorer.scorermatch &&
                    scorersArray[i].scoreraverage == newScorer.scoreraverage) {
                    ok = true;

                }

            }


            if (ok == true) {
                res.sendStatus(409);
            }
            else {

                scorersstats.insertOne(newScorer);
                res.sendStatus(201);
            }





        });
    }
});

var scorersstats=[]
// DELETE /api/v1/scorers-stats

app.delete("/api/v1/scorers-stats", (req, res) => {
    scorersstatsinitial.remove({});
    res.sendStatus(200);
});


// GET /api/v1/scorers-stats/argentina

app.get("/api/v1/scorers-stats/:country", (req, res) => {

    var country = req.params.country;

    scorers.find({ "country": country }).toArray((error, filteredscorersstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredscorersstats.length >= 1) {
            res.send(filteredscorersstats);
        }
        else {
            res.sendStatus(404);
        }
    });

});


// PUT /api/v1/scorers-stats/argentina

app.put("/api/v1/scorers-stats/:country", (req, res) => {

    var country = req.params.country;
    var updatedscorersstats = req.body;

    scorers.find({ "country": country }).toArray((error, filteredscorersstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredscorersstats.length === 0) {
            res.sendStatus(400);
        }
        else {
            scorers.updateOne({ "country": country }, { $set: updatedscorersstats });
            res.sendStatus(200);
        }

    });

});


// DELETE /api/v1/scorers-stats/argentina

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

app.post("/api/v1/scorers-stats/:country", (req, res) => {

    res.sendStatus(405);
});

// PUT /api/v1/scorers-stats

app.put("/api/v1/scorers-stats", (req, res) => {

    res.sendStatus(405);
});

"======================="
//Recursos Pablo Garcia
"======================="

var companiesstats = [];

// GET /api/v1/companies-stats/docs

app.get("/api/v1/companies-stats/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/6990295/S17oyqep");
})

// GET /api/v1/companies-stats/loadInitialData

app.get("/api/v1/companies-stats/loadInitialData", (req, res) => {

    var companiesstatsinitial = [{
            country: "EEUU",
            year: "2014",
            company: "apple",
            income: "182,795",
            marketcapitalization: "732.63",
            employee: "80300"
        },
        {
            country: "Corea del Sur",
            year: "2007",
            company: "samsung",
            income: "174,2",
            marketcapitalization: "110.10",
            employee: "263000"
        },

        {
            country: "Alemania",
            year: "2007",
            company: "volkswagen",
            income: "160,3",
            marketcapitalization: "101.06",
            employee: "329305"
        },

        {
            country: "Reino Unido",
            year: "2009",
            company: "british petroleum",
            income: "246,1",
            marketcapitalization: "34.7",
            employee: "80300"
        },

        {
            country: "China",
            year: "2007",
            company: "petrochina",
            income: "169,7",
            marketcapitalization: "369.57",
            employee: "307000"
        }


    ];
    companies.find({}).toArray((error, companiesArray) => {
        if (companiesArray.length == 0) {
            companies.insert(companiesstatsinitial);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(409);
        }
    });

});


// GET /api/v1/companies-stats

app.get("/api/v1/companies-stats", (req, res) => {
    companies.find({}).toArray((error, companiesArray) => {
        res.send(companiesArray);
        if (error) {
            console.log("Error: " + error);
        }
    });
});


// POST /api/v1/companies-stats

app.post("/api/v1/companies-stats", (req, res) => {


    var newStat = req.body;

    companiesstats.find(newStat).toArray((err, companiesArray) => {

        if (err) console.log("FATAL ERROR !!: ", err);

        if (companiesArray == 0) {

            companiesstats.insert(newStat);
            console.log("Request accepted, creating new resource in database.");
            res.sendStatus(201);

        }
        else {

            console.log("FATAL ERROR !!: Resource already exists in the database.");
            res.sendStatus(409);

        }

    });
});


// DELETE /api/v1/ucompanies-stats

app.delete("/api/v1/companies-stats", (req, res) => {

    companiesstats.remove({});
    console.log("Request accepted, removing all resources of database.");
    res.sendStatus(200);

});


// GET /api/v1/companies-stats/1997

app.get("/api/v1/companies-stats/:year", (req, res) => {

    var year = req.params.year;

    companies.find({ "year": year }).toArray((error, filteredcompaniesstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredcompaniesstats.length >= 1) {
            res.send(filteredcompaniesstats);
        }
        else {
            res.sendStatus(404);
        }
    });

});


// PUT /api/v1/companies-stats/1997

app.put("/api/v1/companies-stats/:year", (req, res) => {

    var year = req.params.year;
    var updatedcompaniesstats = req.body;

    companies.find({ "year": year }).toArray((error, filteredcompaniesstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredcompaniesstats.length === 0) {
            res.sendStatus(400);
        }
        else {
            companies.updateOne({ "year": year }, { $set: updatedcompaniesstats });
            res.sendStatus(200);
        }

    });

});


// DELETE /api/v1/companies-stats/1997

app.delete("/api/v1/companies-stats/:year", (req, res) => {

    var year = req.params.year;

    companies.find({ "year": year }).toArray((error, filteredcompaniesstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredcompaniesstats.length === 0) {
            res.sendStatus(404);
        }
        else {
            companies.deleteOne({ "year": year });
            res.sendStatus(200);
        }
    });

});

// POST /api/v1/companies-stats/1997

app.post("/api/v1/companies-stats/:year", (req, res) => {

    res.sendStatus(405);
});

// PUT /api/v1/companies-stats

app.put("/api/v1/companies-stats", (req, res) => {

    res.sendStatus(405);
});






app.get("/time", (request, response) => {
    response.send(new Date());
})

app.listen(port, () => {

    console.log("magic is happening in port " + port);
})
