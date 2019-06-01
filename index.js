console.log("declaracion de variables express y bodyParser");
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var moviesApi = require("./api-movies/");
var scorersApi = require("./api-scorers/");
var companiesApi = require("./api-companies/");

//Integración
var cors = require("cors");



var path = require("path");
const BASE_PATH = "/api";

var app = express();

app.use(bodyParser.json());
var port = process.env.PORT || 8080;

app.use(cors());


console.log("MongoClient");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@sos1819-02-qn7gl.mongodb.net/sos1819-02?retryWrites=true";
const pgm = "mongodb+srv://test:test@sos1819-02-pgm-kocym.mongodb.net/sos1819-02-pgm?retryWrites=true";
const apc = "mongodb+srv://test:test@sos1819-02-apc-kwvgb.mongodb.net/sos1819-02-apc?retryWrites=true";

var movies;
var companies;
var scorers;




app.use("/", express.static(path.join(__dirname, "public"))); //conexion index.html principal

app.use("/ui/v1/companies-stats", express.static(path.join(__dirname + "/public/api-companies"))); //conexion index.html companies
app.use("/ui/v1/movies-stats", express.static(path.join(__dirname + "/public/api-movies"))); //conexion index.html movies
app.use("/ui/v1/scorers-stats", express.static(path.join(__dirname + "/public/api-scorers")));

"============================="
//Recursos Alejandro Martin
"============================="


var moviesstatsinitial = [{
        country: "EEUU",
        year: "1997",
        name: "Titanic",
        movienomination: 14,
        movieaward: 11,
        movieedition: 70
    },

    {
        country: "EEUU",
        year: "1959",
        name: "Ben Hur",
        movienomination: 12,
        movieaward: 11,
        movieedition: 32
    },

    {
        country: "Nueva Zelanda",
        year: "2003",
        name: "El Señor de los Anillos: el retorno del Rey",
        movienomination: 11,
        movieaward: 11,
        movieedition: 76
    },


    {
        country: "EEUU",
        year: "1939",
        name: "Lo que el viento se llevó",
        movienomination: 13,
        movieaward: 10,
        movieedition: 12
    },

    {
        country: "EEUU",
        year: "1961",
        name: "West Side Story",
        movienomination: 11,
        movieaward: 10,
        movieedition: 34
    },
    {
        country: "India",
        year: "2008",
        name: "Slumdog Millionaire",
        movienomination: 10,
        movieaward: 8,
        movieedition: 81
    }, {
        country: "FR",
        year: "2011",
        name: "The Artist",
        movienomination: 10,
        movieaward: 5,
        movieedition: 84
    }
];



//================//
//RECURSOS ALBERTO//
//================//
var scorersstatsinitial = [{
    country: "arg",
    year: "2004",
    name: "lionel",
    scorergoal: 405,
    scorermatch: 440,
    scoreraverage: 50
}, {
    country: "prt",
    year: "2009",
    name: "cristiano-ronaldo",
    scorergoal: 308,
    scorermatch: 200,
    scoreraverage: 76
}, {
    country: "esp",
    year: "1994",
    name: "raul-gonzalez",
    scorergoal: 311,
    scorermatch: 292,
    scoreraverage: 24
}, {
    country: "mex",
    year: "2000",
    name: "chicharito",
    scorergoal: 111,
    scorermatch: 104,
    scoreraverage: 22
}, {
    country: "bra",
    year: "2001",
    name: "ronaldo-nazario",
    scorergoal: 151,
    scorermatch: 242,
    scoreraverage: 25
}, {
    country: "Argentina",
    year: "2007",
    name: "Riquelme",
    scorergoal: 150,
    scorermatch: 172,
    scoreraverage: 29
}, {
    country: "Spain",
    year: "2003",
    name: "Capi",
    scorergoal: 315,
    scorermatch: 242,
    scoreraverage: 86
}];

//MONGO ALE
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(error => {
    movies = client.db("sos1819-02").collection("movies");
    moviesApi.register(app, movies, moviesstatsinitial);
    console.log("Connected to database ALE.");
});

//MONGO ALBERTO
const clientapc = new MongoClient(apc, { useNewUrlParser: true });
clientapc.connect(error => {
    scorers = clientapc.db("sos1819-02-apc").collection("scorers");
    scorersApi.register(app, scorers, scorersstatsinitial);
    console.log("Connected to database.");

});

//CONECTAR A LA BASEDEDATOS MONGO PABLO

const clientpgm = new MongoClient(pgm, { useNewUrlParser: true });
clientpgm.connect(error => {
    companies = clientpgm.db("sos1819-02-pgm").collection("companies");

    console.log("Connected to database de Pablo.");
    companiesApi(app, BASE_PATH, companies);
});


console.log("conectadas las 3 bases de datos");



/*console.log("GET /time ");
app.get("/time", (request, response) => {
    response.send(new Date());
});
*/

app.listen(port, () => {

    console.log("magic is happening in port " + port);
});

console.log("fin ");
