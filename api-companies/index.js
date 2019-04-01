
"======================="
//Recursos Pablo Garcia
"======================="
var express = require("express");
var app = express();


// GET /api/v1/companies-stats/docs
//--> GET redirect POSTMAN
console.log("GET a docs");
app.get("/api/v1/companies-stats/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/6990295/S17oyqep");
})
console.log("Declara companiesstats vacia");
var companiesstats = [];


// GET /api/v1/companies-stats/loadInitialData
console.log("GET loadInitialData");
app.get("/api/v1/companies-stats/loadInitialData", (req, res) => {

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
        }


    ];
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





console.log("GET /time ");
app.get("/time", (request, response) => {
    response.send(new Date());
})