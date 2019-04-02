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

    //console.log(companies.find({}).toArray());

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
                console.log(companies);
            }


        });
    });

    // DELETE /api/v1/companies-stats
    console.log("DELETE al conjunto /companies-stats ");
    app.delete(BASE_PATH + "/companies-stats", (req, res) => {
        companies.deleteMany({});

        res.sendStatus(200);
    });

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

}
