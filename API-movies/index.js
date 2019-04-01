var express = require("express");
var bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://test:test@sos1819-02-qn7gl.mongodb.net/sos1819-02?retryWrites=true";

var movies;

const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(error => {
    movies = client.db("sos1819-02").collection("movies");
    
    console.log("Connected to database.");

});

var app = express();



app.use(bodyParser.json());

app.use("/", express.static("/SOS1819-02/public"));

var port = process.env.PORT || 8080;

//SECURE
var apikeyObject = {};
var api_key = "sos1819";

apikeyObject.checkApiKey = function(req, res) {
    if (!req.query.apikey) {
        console.error('WARNING: No apikey was sent!');
        res.sendStatus(401);
        return false;
    }
    if (req.query.apikey !== api_key) {
        console.error('WARNING: Incorrect apikey was used!');
        res.sendStatus(403);
        return false;
    }
    return true;
};




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

// GET /api/v1/secure/movies-stats/loadInitialData
console.log("GET loadInitialData");
app.get("/api/v1/secure/movies-stats/loadInitialData", (req, res) => {

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
    if (!apikeyObject.checkApiKey(req, res)) return;

    movies.find({}).toArray((err, moviesArray) => {
        if (err)
            console.log("Error: " + err);
        if (moviesArray.length == 0)
            console.log("/Load Initial Data");
        movies.insertMany(moviesstatsinitial);
        res.send(moviesstatsinitial);
    });

});
//GET RECURSO COMPLETO CON BÚSQUEDA Y PAGINACIÓN
app.get("/api/v1/secure/movies-stats", function(req, res) {
    if (!apikeyObject.checkApiKey(req, res)) return;

    var dbquery = {};
    let offset = 0;
    let limit = Number.MAX_SAFE_INTEGER;
    delete req.query.apikey;

    if (req.query.offset) {
        offset = parseInt(req.query.offset);
        delete req.query.offset;
    }
    if (req.query.limit) {
        limit = parseInt(req.query.limit);
        delete req.query.limit;
    }

    Object.keys(req.query).forEach((i) => {
        if (isNaN(req.query[i]) == false) {
            dbquery[i] = parseInt(req.query[i]);
        }
        else {
            dbquery[i] = req.query[i];
        }
    });

    if (Object.keys(req.query).includes('from') && Object.keys(req.query).includes('to')) {
        delete dbquery.from;
        delete dbquery.to;
        dbquery['year'] = { "$lte": parseInt(req.query['to']), "$gte": parseInt(req.query['from']) };
    }
    else if (Object.keys(req.query).includes('from')) {
        delete dbquery.from;
        dbquery['year'] = { "$gte": parseInt(req.query['from']) };
    }
    else if (Object.keys(req.query).includes('to')) {
        delete dbquery.to;
        dbquery['year'] = { "$lte": parseInt(req.query['to']) };
    }

    movies.find(dbquery).skip(offset).limit(limit).toArray((err, filteredmoviesstats) => {
        if (err) {
            console.error(" Error accesing DB");
            res.sendStatus(500);
            return;
        }

        if (filteredmoviesstats.length == 0) {
            res.sendStatus(404);
        }
        else {
            res.send(filteredmoviesstats.map((s) => {
                return s;
            }));
        }
    });
});



// POST /api/v1/secure/movies-stats
//POST AL RECURSO COMPLETO
console.log("POST conjunto movies-stats");
app.post("/api/v1/secure/movies-stats", (req, res) => {

    if (!apikeyObject.checkApiKey(req, res)) return;

    var movie = req.body;
    movies.insert(movie);
    res.sendStatus(201);
});

// DELETE /api/v1/secure/movies-stats
//DELETE AL RECURSO COMPLETO

console.log("DELETE conjunto movies-stats");
app.delete("/api/v1/secure/movies-stats", (req, res) => {
    if (!apikeyObject.checkApiKey(req, res)) return;

    movies.find({}).toArray((err, filteredmoviesstats) => {
        if (err)
            console.log("Error" + err);
        if (filteredmoviesstats.length == 0)
            console.log("Ya está vacio");
        res.send([]);
        movies.deleteMany({});
    });
});


// GET /api/v1/secure/movies-stats/1997
//GET A UN RECURSO CONCRETO
console.log("GET al año movies-stats/1997");
app.get("api/v1/secure/movies-stats/:year", (req, res) => {
    if (!apikeyObject.checkApiKey(req, res)) return;

    var year = req.params.year;

    movies.find({ "year": year }).toArray((err, filteredmoviesstats) => {
        if (err)
            console.log("Error :" + err);
        if (filteredmoviesstats.length >= 1) {
            res.send(filteredmoviesstats);
        }
        else {
            res.sendStatus(404);
        }
    });
});





// PUT /api/v1/movies-stats/1997
console.log("PUT al año movies-stats/1997");
app.put("/api/v1/secure/movies-stats/:year", (req, res) => {
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

// DELETE /api/v1/secure/movies-stats/1997
//DELETE DE UN RECURSO CONCRETO
console.log("DELETE al año movies-stats/1997");
app.delete("/api/v1/secure/movies-stats/:year", (req, res) => {
    if (!apikeyObject.checkApiKey(req, res)) return;

    var year = req.params.year;

    movies.find({ "year": year }).toArray((err, filteredmoviesstats) => {
        if (err)
            console.log("Error :" + err);
        if (filteredmoviesstats.length == 0) {
            console.log("No se encuentra el recurso a eliminar");
            res.sendStatus(404);
        }
        else {
            res.sendStatus(200);
            movies.deleteMany({ "year": year });
        }
    });
});


// POST /api/v1/secure/movies-stats/1997
//POST INCORRECTO
console.log("POST erroneo al año movies-stats/1997--> 405");
app.post("/api/v1/secure/movies-stats/:year", (req, res) => {
    if (!apikeyObject.checkApiKey(req, res)) return;

    res.sendStatus(405);
});

// PUT /api/v1/secure/movies-stats
//PUT INCORRECTO
console.log("PUT erroneo al conjunto movies-stats--> 405");

app.put("/api/v1/secure/movies-stats", (req, res) => {
    if (!apikeyObject.checkApiKey(req, res)) return;

    res.sendStatus(405);
});

console.log("GET /time ");
app.get("/time", (request, response) => {
    response.send(new Date());
})

app.listen(port, () => {

    console.log("magic is happening in port " + port);
})
console.log("fin ");