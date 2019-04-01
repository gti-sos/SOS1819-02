console.log("declaracion de variables express y bodyParser");
var express = require("express");
var bodyParser = require("body-parser");
var scorersApi = require("./api-scorers/");
var companiesApi = require("./api-companies/");


/___________Paginacion y autentificacion(proceso)_________________/
//var jwt = require("jsonwebtoken");
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json({limit: "10mb"}));


var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 8080;


console.log("MongoClient");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@sos1819-02-qn7gl.mongodb.net/sos1819-02?retryWrites=true";
const pgm = "mongodb+srv://test:test@sos1819-02-pgm-kocym.mongodb.net/sos1819-02-pgm?retryWrites=true";
const apc = "mongodb+srv://test:test@sos1819-02-apc-kwvgb.mongodb.net/sos1819-02-apc?retryWrites=true";

console.log("declaracion db");
var movies;
var companies;
var scorers;

const client = new MongoClient(uri, { useNewUrlParser: true });


client.connect(error => {
    movies = client.db("sos1819-02").collection("movies");

    console.log("Connected to database.");
});


console.log("conectadas las 3 bases de datos");


app.use("/", express.static(__dirname + "/public"));

"============================="
//Recursos Alejandro Martin
"============================="


console.log("###################Recursos Alejandro###################");

//GET /api/v1/movies-stats/docs
console.log("GET conjunto movies-stats/docs");

app.get("/api/v1/movies-stats/docs/", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/7067709/S17usmjv");
});




console.log("declaracion moviesstats vacio");
var moviesstats = [];

// GET /api/v1/movies-stats/loadInitialData
console.log("GET loadInitialData");
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
    console.log("movies guardadas en moviesstatsinitial");
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
console.log("GET conjunto movies-stats");
app.get("/api/v1/movies-stats", (req, res) => {

    movies.find({}).toArray((error, moviesArray) => {

        res.send(moviesArray);
        if (error) {
            console.log("Error: " + error);
        }
    });
});




// POST /api/v1/movies-stats
console.log("POST conjunto movies-stats");
app.post("/api/v1/movies-stats", (req, res) => {

    var newmoviesstats = req.body;
    var yearMovie = req.body.year;

    var newMovies = req.body;

    if (!newMovies.country || !newMovies.year || !newMovies.name || !newMovies.movienomination || !newMovies.movieaward || !newMovies.movieedition) {
        res.sendStatus(400);
    }


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
console.log("DELETE conjunto movies-stats");
app.delete("/api/v1/movies-stats", (req, res) => {

    movies.remove({});
    res.sendStatus(200);

});


// GET /api/v1/movies-stats/1997
console.log("GET al año movies-stats/1997");
app.get("/api/v1/movies-stats/:year", (req, res) => {

    var year = req.params.year;

    movies.find({ "year": year }).toArray((error, filteredmoviesstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredmoviesstats.length >= 1) {
            res.send(filteredmoviesstats[0]);
        }
        else {
            res.sendStatus(404);
        }
    });

});




// PUT /api/v1/movies-stats/1997
console.log("PUT al año movies-stats/1997");
app.put("/api/v1/movies-stats/:year", (req, res) => {
    var id = req.params._id;
    var year = req.params.year;
    var updatedmoviesstats = req.body;
    movies.find({}).toArray((error, moviesArray) => {
        if (error) {
            console.log(error);
        }
        if (year != updatedmoviesstats.year || id != updatedmoviesstats._id) {
            res.sendStatus(400);
        }
        else {
            movies.updateOne({ year: year }, { $set: updatedmoviesstats });
            res.sendStatus(200);
        }

    });
});

// DELETE /api/v1/movies-stats/1997
console.log("DELETE al año movies-stats/1997");
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
console.log("POST erroneo al año movies-stats/1997--> 405");
app.post("/api/v1/movies-stats/:year", (req, res) => {

    res.sendStatus(405);
});

// PUT /api/v1/movies-stats
console.log("PUT erroneo al conjunto movies-stats--> 405");
app.put("/api/v1/movies-stats", (req, res) => {

    res.sendStatus(405);
});





"======================="
//Recursos Pablo Garcia
"======================="

console.log("###################Recursos Pablo Garcia###################");

// GET /api/v1/companies-stats/docs
//--> GET redirect POSTMAN
console.log("GET a docs");
app.get("/api/v1/companies-stats/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/6990295/S17oyqep");
})

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
        } ];
  
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



const clientapc = new MongoClient(apc, { useNewUrlParser: true });
clientapc.connect(error => {
    scorers = clientapc.db("sos1819-02-apc").collection("scorers");
    scorersApi.register(app,scorers,scorersstatsinitial);
    console.log("Connected to database.");

});

//CONECTAR A LA BASEDEDATOS MONGO PABLO
const clientpgm = new MongoClient(pgm, { useNewUrlParser: true });

clientpgm.connect(error => {
    companies = clientpgm.db("sos1819-02-pgm").collection("companies");
    companiesApi.register(app,companies,companiesstatsinitial);
    console.log("Connected to database de Pablo.");
});



console.log("GET /time ");
app.get("/time", (request, response) => {
    response.send(new Date());
})

app.listen(port, () => {

    console.log("magic is happening in port " + port);
})
console.log("fin ");
