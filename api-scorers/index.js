var scorersApi = {};
const BASE_PATH = "/api-scorers/v1";

console.log("submodulo api-scorers");
module.exports = scorersApi;

scorersApi.register = function(app, scorers, scorersstatsinitial) {
    console.log("quedan registrados");
    app.get(BASE_PATH + "/scorers-stats/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/6869425/S17usmtj");
    })

    // loadInitialData
    app.get(BASE_PATH + "/scorers-stats/loadInitialData", (req, res) => {
        console.log("loadInitialAlberto#########");
        scorers.find({}).toArray((error, scorersArray) => {
            if (scorersArray.length == 0) {
                console.log("vacio");
                scorers.insertMany(scorersstatsinitial);
                console.log("cargado");
                res.sendStatus(200);
            }
            else {
                res.sendStatus(409);
                console.log("409 conflict--");
            }
        });
    });

    //console.log(scorers.find({}).toArray());

    app.get(BASE_PATH + "/scorers-stats", (req, res) => {

        //Búsqueda
        var search = {}
        if (req.query.country) search["country"] = req.query.country;
        if (req.query.year) search["year"] = req.query.year;
        if (req.query.name) search["name"] = req.query.name;
        if (req.query.scorergoal) search["scorergoal"] = req.query.scorergoal;
        if (req.query.scorermatch) search["scorermatch"] = req.query.scorermatch;
        if (req.query.scoreraverage) search["scoreraverage"] = req.query.scoreraverage;


        //Paginacion
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;

        scorers.find(search, { projection: { _id: 0 } }).skip(offset).limit(limit).toArray((error, scorersArray) => {
            console.log("###############scorersArray#####################");

            res.send(scorersArray);
            if (error) {
                console.log("Error:");
                console.log(scorers);
            }


        });
    });

    // DELETE /api/v1/scorers-stats
    console.log("DELETE al conjunto /scorers-stats ");
    app.delete(BASE_PATH + "/scorers-stats", (req, res) => {
        scorers.deleteMany({});

        res.sendStatus(200);
    });

    app.post(BASE_PATH + "/scorers-stats", (req, res) => {

        var nameScorer = req.body.name;
        var newScorer = req.body;
        if (!newScorer.country || !newScorer.year || !newScorer.name || !newScorer.scorergoal || !newScorer.scorermatch || !newScorer.scoreraverage) {
            res.sendStatus(400);
        }
        else {
            scorers.find({ "name": nameScorer }).toArray((error, scorersArray) => {

                if (error) {
                    console.log("Error: " + error);
                }
                if (scorersArray.length > 0) {
                    res.sendStatus(409);
                    console.log("error conflicto 409");
                }
                else {
                    console.log("incluye");
                    scorers.insertOne(newScorer);
                    res.sendStatus(201);
                }
            });
        }
    });
    // PUT /api/v1/scorers-stats
    console.log("PUT Erroneo al conjunto /scorers-stats/ --> 405 ");
    app.put(BASE_PATH + "/scorers-stats", (req, res) => {

        res.sendStatus(405);
    });

    console.log("PUT al año /scorers-stats/year ")
    app.put(BASE_PATH + "/scorers-stats/:country/:year", (req, res) => {
        var id = req.params._id
        var country = req.params.country;
        var year = req.params.year;
        var updatedscorersstats = req.body;
        scorers.find({ "country": country, "year": year }).toArray((error, scorersArray) => {
            if (error) {
                console.log(error);
            }
            if (scorersArray.length == 0) {
                res.sendStatus(404);
            }
            else {
                if (
                    id != updatedscorersstats._id) {
                    res.sendStatus(400);
                }
                else {
                    scorers.updateOne({ year: year }, { $set: updatedscorersstats });
                    scorers.updateOne({ country: country }, { $set: updatedscorersstats });
                    res.sendStatus(200);
                }
            }
        });
    });

    app.post(BASE_PATH + "/scorers-stats/:country", (req, res) => {

        res.sendStatus(405);
    });



    // DELETE /api/v1/scorers-stats/EEUU/2014
    console.log("DELETE al año scorers-stats/2014");
    app.delete(BASE_PATH + "/scorers-stats/:country/:year", (req, res) => {

        var country = req.params.country;
        var year = req.params.year;
        scorers.find({ "country": country, "year": year }).toArray((error, filteredscorersstats) => {
            if (error) {
                console.log("Error: " + error);
            }
            if (filteredscorersstats.length == 0) {
                res.sendStatus(404);
            }
            else {
                scorers.deleteOne({ "country": country, "year": year });
                res.sendStatus(200);
            }
        });
    });
    app.get(BASE_PATH + "/scorers-stats/:country/:year", (req, res) => {

        var country = req.params.country;
        var year = req.params.year;

        scorers.find({ "country": country, "year": year }, { projection : { _id: 0 } }).toArray((error, filteredscorersstats) => {
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

}
