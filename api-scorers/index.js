var scorersApi = {};
const BASE_PATH= "/api-scorers/v1";

console.log("submodulo api-scorers");

module.exports = scorersApi;

    scorersApi.register = function(app,scorers,scorersstatsinitial){
        console.log("quedan registrados");
    app.get(BASE_PATH+"/scorers-stats/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/6869425/S17usmtj");
})

// loadInitialData
app.get(BASE_PATH+"/scorers-stats/loadInitialData", (req,res)=>{
    console.log("loadInitialAlberto#########");
    scorers.find({}).toArray((error,scorersArray)=>{
        if(scorersArray.length==0){
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

app.get(BASE_PATH+"/scorers-stats", (req, res) => {
    
    scorers.find({}).toArray((error,scorersArray)=>{
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
app.delete(BASE_PATH+"/scorers-stats", (req, res) => {
    scorers.deleteMany({});

    res.sendStatus(200);
});

app.post(BASE_PATH+"/scorers-stats", (req, res) => {

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

    }
