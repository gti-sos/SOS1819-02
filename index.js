var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 8080;



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@sos1819-02-qn7gl.mongodb.net/sos1819-02?retryWrites=true";
var movies;
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(error => {
    movies = client.db("sos1819-02").collection("movies");
    console.log("Connected to database.");
    
}); 








app.use("/", express.static(__dirname + "/public"));


//Recursos Alejandro Martin

var moviesstats = [];

// GET /api/v1/movies-stats/loadInitialData

app.get("/api/v1/movies-stats/loadInitialData", (req, res) => {

    moviesstats = [{
        country: "EEUU",
        year: "1997",
        name: "Titanic",
        movienomination: "14",
        movieaward:"11",
        movieedition : "70" } ,
    
    {
        country: "EEUU",
        year: "1959",
        name: "Ben Hur",
        movienomination: "12",
        movieaward:"11",
        movieedition : "32" }   ,
        
    {
        country: "Nueva Zelanda",
        year: "2003",
        name: "El Señor de los Anillos: el retorno del Rey",
        movienomination: "11",
        movieaward:"11",
        movieedition : "76" }  ,
        
        
    {
        country: "EEUU",
        year: "1939",
        name: "Lo que el viento se llevó",
        movienomination: "13",
        movieaward:"10",
        movieedition : "12" }  ,
        
    {
        country: "EEUU",
        year: "1961",
        name: "West Side Story",
        movienomination: "11",
        movieaward:"10",
        movieedition : "34" }      
        
    ];

    res.sendStatus(200);
});


// GET /api/v1/movies-stats

app.get("/api/v1/movies-stats", (req, res) => {
    
    movies.find({}).toArray((error, moviesArray) =>{
        
        res.send(moviesstats);
    if (error) {
            console.log("Error: " + error);
        }
    });
});

    


// POST /api/v1/movies-stats

app.post("/api/v1/movies-stats", (req,res)=>{
    
    var newmoviesstats = req.body;
    
   moviesstats.push(newmoviesstats);
    
    res.sendStatus(201);
});


// DELETE /api/v1/movies-stats

app.delete("/api/v1/movies-stats", (req, res) => {

    moviesstats = [];

    res.sendStatus(200);
});


// GET /api/v1/movies-stats/1997

app.get("/api/v1/movies-stats/:year", (req, res) => {

    var year = req.params.year;

    var filteredmoviesstats = moviesstats.filter((c) => {
        return c.year == year;
    });

    if (filteredmoviesstats.length >= 1) {
        res.send(filteredmoviesstats);
    }
    else {
        res.sendStatus(404);
    }

});


// PUT /api/v1/movies-stats/1997

app.put("/api/v1/movies-stats/:year", (req, res) => {

    var year = req.params.year;
    var updatedmoviesstats = req.body;
    var found = false;

    var updatedmoviesstats2 = moviesstats.map((c) => {

        if (c.year == year) {
            found = true;
            return updatedmoviesstats;
        }
        else {
            return c;
        }

    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        moviesstats = updatedmoviesstats2;
        res.sendStatus(200);
    }

});


// DELETE /api/v1/movies-stats/1997

app.delete("/api/v1/movies-stats/:year", (req, res) => {

    var year = req.params.year;
    var found = false;

    var updatedYear = moviesstats.filter((c) => {

        if (c.year == year)
            found = true;

        return c.year != year;
    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        moviesstats = updatedYear;
        res.sendStatus(200);
    }

});

// POST /api/v1/movies-stats/1997

app.post("/api/v1/movies-stats/:year", (req, res) => {

    res.sendStatus(405);
});

// PUT /api/v1/movies-stats

app.put("/api/v1/movies-stats", (req, res) => {

    res.sendStatus(405);
});


//Recursos Alberto Pérez

var scorersstats = [];

// GET /api/v1/scorers-stats/loadInitialData

app.get("/api/v1/scorers-stats/loadInitialData", (req,res)=>{
    
    scorersstats =  [{
    country: "argentina",
    year: "2004",
    name : "lionel-messi",
    scorergoal : "405",
    scorermatch: "440",
    scoreraverage : "0.92"
}, {
    country: "portugal",
    year: "2009",
    name : "cristiano-ronaldo",
    scorergoal : "311",
    scorermatch: "292",
    scoreraverage : "1.07"
}];

    res.sendStatus(200);
});


// GET /api/v1/scorers-stats

app.get("/api/v1/scorers-stats", (req,res)=>{
    res.send(scorersstats);
});


// POST /api/v1/scorers-stats

app.post("/api/v1/scorers-stats", (req,res)=>{
    
    var newscorersstats = req.body;
    
    scorersstats.push(newscorersstats);
    
    res.sendStatus(201);
});


// DELETE /api/v1/scorers-stats

app.delete("/api/v1/scorers-stats", (req,res)=>{
    
    scorersstats =  [];

    res.sendStatus(200);
});


// GET /api/v1/scorers-stats/argentina

app.get("/api/v1/scorers-stats/:country", (req,res)=>{

    var country = req.params.country;

    var filteredscorersstats = scorersstats.filter((c) =>{
       return c.country == country; 
    });
    
    if (filteredscorersstats.length >= 1){
        res.send(filteredscorersstats);
    }else{
        res.sendStatus(404);
    }

});


// PUT /api/v1/scorers-stats/argentina

app.put("/api/v1/scorers-stats/:country", (req,res)=>{

    var country = req.params.country;
    var updatedscorersstats = req.body;
    var found = false;

    var updatedscorersstats2 = scorersstats.map((c) =>{
    
        if(c.country == country){
            found = true;
            return updatedscorersstats;
        }else{
            return c;            
        }
 
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        scorersstats = updatedscorersstats2;
        res.sendStatus(200);
    }

});


// DELETE /api/v1/scorers-stats/argentina

app.delete("/api/v1/scorers-stats/:country", (req,res)=>{

    var country = req.params.country;
    var found = false;

    var updatedCountry = scorersstats.filter((c) =>{
        
            if(c.country == country)  
                found = true;
        
            return c.country != country;
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        scorersstats = updatedCountry;
        res.sendStatus(200);
    }

});

// POST /api/v1/scorers-stats/argentina

app.post("/api/v1/scorers-stats/:country", (req,res)=>{

    res.sendStatus(405);
});

// PUT /api/v1/scorers-stats

app.put("/api/v1/scorers-stats", (req,res)=>{

    res.sendStatus(405);
});


//Recursos Pablo Garcia

var companiesstats = [];

// GET /api/v1/companies-stats/loadInitialData

app.get("/api/v1/companies-stats/loadInitialData", (req, res) => {

    companiesstats = [{
        country: "EEUU",
        year: "2014",
        company: "apple",
        income :  "182,795",
        marketcapitalization:  "732.63" ,
        employee: "80300"} ,
 {
        country: "Corea del Sur",
        year: "2007",
        company: "samsung",
        income :  "174,2",
        marketcapitalization:  "110.10" ,
        employee: "263000"} ,
    
    {
        country: "Alemania",
        year: "2007",
        company: "volkswagen",
        income :  "160,3",
        marketcapitalization:  "101.06" ,
        employee: "329305"} ,
        
         {
        country: "Reino Unido",
        year: "2009",
        company: "british petroleum",
        income :  "246,1",
        marketcapitalization:  "34.7" ,
        employee: "80300"} ,
        
         {
        country: "China",
        year: "2007",
        company: "petrochina",
        income :  "169,7",
        marketcapitalization:  "369.57" ,
        employee: "307000"} ,
        
        
    ];

    res.sendStatus(200);
});


// GET /api/v1/companies-stats

app.get("/api/v1/companies-stats", (req, res) => {
    res.send(companiesstats);
});


// POST /api/v1/companies-stats

app.post("/api/v1/companies-stats", (req, res) => {

    var newcompaniesstats = req.body;

    companiesstats.push(newcompaniesstats);

    res.sendStatus(201);
});


// DELETE /api/v1/ucompanies-stats

app.delete("/api/v1/companies-stats", (req, res) => {

    companiesstats = [];

    res.sendStatus(200);
});


// GET /api/v1/companies-stats/1997

app.get("/api/v1/companies-stats/:year", (req, res) => {

    var year = req.params.year;

    var filteredcompaniesstats = companiesstats.filter((c) => {
        return c.year == year;
    });

    if (filteredcompaniesstats.length >= 1) {
        res.send(filteredcompaniesstats);
    }
    else {
        res.sendStatus(404);
    }

});


// PUT /api/v1/companies-stats/1997

app.put("/api/v1/companies-stats/:year", (req, res) => {

    var year = req.params.year;
    var updatedcompaniesstats = req.body;
    var found = false;

    var updatedcompaniesstats2 = companiesstats.map((c) => {

        if (c.year == year) {
            found = true;
            return updatedcompaniesstats;
        }
        else {
            return c;
        }

    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        companiesstats = updatedcompaniesstats2;
        res.sendStatus(200);
    }

});


// DELETE /api/v1/companies-stats/1997

app.delete("/api/v1/companies-stats/:year", (req, res) => {

    var year = req.params.year; 
    var found = false;

    var updatedYear = companiesstats.filter((c) => {

        if (c.year == year)
            found = true;

        return c.year != year;
    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        companiesstats = updatedYear;
        res.sendStatus(200);
    }

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
