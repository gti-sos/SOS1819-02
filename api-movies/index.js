var moviesApi = {};
const BASE_PATH= "/api-movies/v1";

console.log("submodulo api-movies");

module.exports = moviesApi;


moviesApi.register = function(app,movies,moviesstatsinitial){
        console.log("quedan registrados");
    app.get(BASE_PATH+"/movies-stats/docs", (req, res) => {
    res.redirect("");
})


"============================="
//Recursos Alejandro Martin
"============================="

console.log("###################Recursos Alejandro###################");

//GET /api/v1/movies-stats/docs
console.log("GET conjunto movies-stats/docs");

app.get("/api/v1/movies-stats/docs/", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/7067709/S17usmjv");
});



// loadInitialData
app.get(BASE_PATH+"/movies-stats/loadInitialData", (req,res)=>{
    console.log("loadInitialAle#########");
    movies.find({}).toArray((error,moviesArray)=>{
        if(moviesArray.length==0){
            console.log("vacio");
            scorers.insertMany(scorersstatsinitial);
            console.log("movies insertadas");
            res.sendStatus(200);
        }
        else {
            res.sendStatus(409);
            console.log("error: 409 conflict");
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

}