/* global path*/

console.log("declaracion de variables express y bodyParser");
var express = require("express");
var bodyParser = require("body-parser");
var moviesApi = require("./api-movies/");
var scorersApi = require("./api-scorers/");
var companiesApi = require("./api-companies/");


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

app.use("/", express.static(path.join(__dirname, "public"))); //conexion index.html principal

app.use("/api-companies/v1/minipostman-companies", express.static(path.join(__dirname + "/public/api-companies")));  //conexion index.html tourist


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
    }

];

"======================="
//Recursos Pablo Garcia
"======================="

var companiesstatsinitial = [{
        country: "EEUU",
        year: "2014",
        company: "apple",
        income: 182.795,
        marketcapitalization: 732.63,
        employee: 80300
    },
    {
        country: "Corea del Sur",
        year: "2007",
        company: "samsung",
        income: 174.2,
        marketcapitalization: 110.10,
        employee: 263000
    },

    {
        country: "Alemania",
        year: "2007",
        company: "volkswagen",
        income: 160.3,
        marketcapitalization: 101.06,
        employee: 329305
    },

    {
        country: "Reino Unido",
        year: "2009",
        company: "british petroleum",
        income: 246.1,
        marketcapitalization: 34.7,
        employee: 80300
    },

    {
        country: "China",
        year: "2007",
        company: "petrochina",
        income: 169.7,
        marketcapitalization: 369.57,
        employee: 307000
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
    companiesApi.register(app, companies, companiesstatsinitial);
    console.log("Connected to database de Pablo.");
});


console.log("conectadas las 3 bases de datos");



console.log("GET /time ");
app.get("/time", (request, response) => {
    response.send(new Date());
})

app.listen(port, () => {

    console.log("magic is happening in port " + port);
})
console.log("fin ");



