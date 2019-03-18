var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

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
        movieedition : "32" }    
        
    ];

    res.sendStatus(200);
});


// GET /api/v1/movies-stats

app.get("/api/v1/movies-stats", (req, res) => {
    res.send(moviesstats);
});


// POST /api/v1/movies-stats

app.post("/api/v1/movies-stats", (req, res) => {

    var newmoviesstats = req.body;

    moviesstats.push(newmoviesstats);

    res.sendStatus(201);
});


// DELETE /api/v1/uefa-club-rankings

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

    res.sendStatus(409);
});

// PUT /api/v1/movies-stats

app.put("/api/v1/movies-stats", (req, res) => {

    res.sendStatus(409);
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

    res.sendStatus(409);
});

// PUT /api/v1/scorers-stats

app.put("/api/v1/scorers-stats", (req,res)=>{

    res.sendStatus(409);
});

























app.get("/time", (request, response) => {
    response.send(new Date());
})

app.listen(port, () => {

    console.log("magic is happening in port " + port);
})
