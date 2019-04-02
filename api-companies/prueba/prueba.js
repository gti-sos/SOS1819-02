  console.log("Declara companiesstats vacia");
var companiesstats = [];


// GET /api/v1/companies-stats/loadInitialData
console.log("GET loadInitialData");
app.get("/api/v1/companies-stats/loadInitialData", (req, res) => {

  
  
  console.log("cargadas companiesstatsinitial");
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
console.log("GET al conjunto /companies-stats ");
app.get("/api/v1/companies-stats", (req, res) => {
    companies.find({}).toArray((error, companiesArray) => {
        res.send(companiesArray);
        if (error) {
            console.log("Error: " + error);
        }
    });
});


// POST /api/v1/companies-stats
console.log("POST al conjunto /companies-stats ");
app.post("/api/v1/companies-stats", (req, res) => {

    var newcompaniesstats = req.body;
    var yearCompany = req.body.year;
    var newCompanies = req.body;

    if (!newCompanies.country || !newCompanies.year || !newCompanies.company || !newCompanies.income || !newCompanies.marketcapitalization || !newCompanies.employee) {
        res.sendStatus(400);
    }
    companies.find({ "year": yearCompany }).toArray((error, companiesArray) => {

        if (error) {
            console.log("Error: " + error);
        }
        if (companiesArray.length > 0) {
            res.sendStatus(409);
        }
        else {
            companies.insert(newcompaniesstats);
            res.sendStatus(201);
        }
    });
});


// DELETE /api/v1/companies-stats
console.log("DELETE al conjunto /companies-stats ");
app.delete("/api/v1/companies-stats", (req, res) => {

    companies.remove({});
    //console.log("Request accepted, removing all resources of database.");
    res.sendStatus(200);

});


// GET /api/v1/companies-stats/2007
console.log("GET al AÑO /companies-stats/2007 ");
app.get("/api/v1/companies-stats/:year", (req, res) => {

    var year = req.params.year;

    companies.find({ "year": year }).toArray((error, filteredcompaniesstats) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (filteredcompaniesstats.length >= 1) {
            res.send(filteredcompaniesstats[0]);
        }
        else {
            res.sendStatus(404);
        }
    });

});




// PUT /api/v1/companies-stats/2007
console.log("GET al año /companies-stats/2007 ");
app.put("/api/v1/companies-stats/:year", (req, res) => {
    var id = req.params._id;
    var year = req.params.year;
    var updatedcompaniesstats = req.body;

    companies.find({}).toArray((error, companiesArray) => {
        if (error) {
            console.log("Error: " + error);
        }
        if (year != updatedcompaniesstats.year || id != updatedcompaniesstats._id) {
            res.sendStatus(400);
        }
        else {
            companies.updateOne({ "year": year }, { $set: updatedcompaniesstats });
            res.sendStatus(200);
        }

    });

});


// DELETE /api/v1/companies-stats/1997
console.log("DELETE al AÑO /companies-stats/1997 ");
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
console.log("POST Erroneo al año /companies-stats/1997-->405 ");
app.post("/api/v1/companies-stats/:year", (req, res) => {

    res.sendStatus(405);
});

// PUT /api/v1/companies-stats
console.log("PUT Erroneo al conjunto /companies-stats/1997-->405 ");
app.put("/api/v1/companies-stats", (req, res) => {

    res.sendStatus(405);
});
