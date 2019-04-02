var companiesApi = {};
const BASE_PATH = "/api-companies/v1";

console.log("submodulo api-companies");

module.exports = companiesApi;

companiesApi.register = function(app, companies, companiesstatsinitial) {
    console.log("quedan registrados");
    app.get(BASE_PATH + "/companies-stats/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/6990295/S17oyqep");
    })

    // loadInitialData
    app.get(BASE_PATH + "/companies-stats/loadInitialData", (req, res) => {
        console.log("loadInitialPablo#########");
        companies.find({}).toArray((error, companiesArray) => {
            if (companiesArray.length == 0) {
                console.log("vacio");
                companies.insertMany(companiesstatsinitial);
                console.log("cargado");
                res.sendStatus(200);
            }
            else {
                res.sendStatus(409);
                console.log("409 conflict");
            }
        });
    });
    
    // GET /api/v1/companies-stats
    app.get(BASE_PATH + "/companies-stats", (req, res) => {

        //Búsqueda
        var search = {}
        if (req.query.country) search["country"] = req.query.country;
        if (req.query.year) search["year"] = req.query.year;
        if (req.query.company) search["company"] = req.query.company;
        if (req.query.income) search["income"] = req.query.income;
        if (req.query.marketcapitalization) search["marketcapitalization"] = req.query.marketcapitalization;
        if (req.query.employee) search["employee"] = req.query.employee;


        //Paginacion
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;
        companies.find(search, { fields: { _id: 0 } }).skip(offset).limit(limit).toArray((error, companiesArray) => {
            console.log("###############companiesArray#####################");

            res.send(companiesArray);
            if (error) {
                console.log("Error:");
            }
        });
    });
    // POST /api/v1/companies-stats
    app.post(BASE_PATH + "/companies-stats", (req, res) => {

        var Company = req.body.company;
        var newCompany = req.body;
        if (!newCompany.country || !newCompany.year || !newCompany.company || !newCompany.income || !newCompany.marketcapitalization || !newCompany.employee) {
            res.sendStatus(400);
        }
        companies.find({ "company": Company }).toArray((error, companiesArray) => {

            if (error) {
                console.log("Error: " + error);
            }
            if (companiesArray.length > 0) {
                res.sendStatus(409);
                console.log("error 2");
            }
            else {
                console.log("incluye");
                companies.insertOne(newCompany);
                res.sendStatus(201);
            }
        });
    });
    
    // DELETE /api/v1/companies-stats
    console.log("DELETE al conjunto /companies-stats ");
    app.delete(BASE_PATH + "/companies-stats", (req, res) => {
        companies.deleteMany({});

        res.sendStatus(200);
    });
    
    // GET /api/v1/companies-stats/1997
    console.log("GET al año companies-stats/2014");
    app.get(BASE_PATH + "/companies-stats/:country/:year", (req, res) => {

        var country = req.params.country;
        var year = req.params.year;

        companies.find({ "country": country , "year": year },{ fields: { _id: 0 }} ).toArray((error, filteredcompaniesstats) => {
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
   
    // PUT /api/v1/companies-stats/2014
    app.put(BASE_PATH + "/companies-stats/:country/:year", (req, res) => {
        var id = req.params._id
        var country = req.params.country;
        var year = req.params.year;
        var updatedcompaniesstats = req.body;
        companies.find({ "country": country, "year": year }).toArray((error, companiesArray) => {
            if (error) {
                console.log(error);
            }
            if (companiesArray.length == 0) {
                res.sendStatus(404);
            }
            else {
                if (id != updatedcompaniesstats._id) {
                    res.sendStatus(400);
                }
                else {
                    companies.updateOne({ year: year }, { $set: updatedcompaniesstats });
                    companies.updateOne({ country: country }, { $set: updatedcompaniesstats });
                    res.sendStatus(200);
                }
            }

        });
    });

    // DELETE /api/v1/companies-stats/EEUU/2014
    console.log("DELETE al año companies-stats/2014");
    app.delete(BASE_PATH + "/companies-stats/:country/:year", (req, res) => {

        var country = req.params.country;
        var year = req.params.year;
        companies.find({ "country": country, "year": year }).toArray((error, filteredcompaniesstats) => {
            if (error) {
                console.log("Error: " + error);
            }
            if (filteredcompaniesstats.length == 0) {
                res.sendStatus(404);
            }
            else {
                companies.deleteOne({ "country": country, "year": year });
                res.sendStatus(200);
            }
        });
    });
 
    // POST /api/v1/companies-stats/1997
    console.log("POST Erroneo al año /companies-stats/1997-->405 ");
    app.post(BASE_PATH +"/api/v1/companies-stats/:year", (req, res) => {

        res.sendStatus(405);
    });
    
    // PUT /api/v1/companies-stats
    console.log("PUT Erroneo al conjunto /companies-stats/ --> 405 ");
    app.put(BASE_PATH + "/companies-stats", (req, res) => {

        res.sendStatus(405);
    });
}
