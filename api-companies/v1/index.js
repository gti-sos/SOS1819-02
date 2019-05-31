console.log("submodulo api-companies");

module.exports = function(app, BASE_PATH, companies) {
    console.log("quedan registrados");
    app.get(BASE_PATH + "/companies-stats/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/6990295/S1EH21eC");
    })

    //INTEGRACIONES
    //===============//
    // PROXY PABLO   //
    //===============//
  ////////JUANPE////////////////////////   
    var request = require("request");
    var Api= "http://sos1819-04.herokuapp.com";
    app.use("/proxyJP", function(req, res) {
        var url = Api + req.url;
        req.pipe(request(url)).pipe(res);
    });
    ////////DIONI////////////////////////   
    
    var Api2= "http://sos1819-07.herokuapp.com";
    app.use("/proxyDio", function(req, res) {
        var url = Api2 + req.url;
        req.pipe(request(url)).pipe(res);
    });


    // loadInitialData
    app.get(BASE_PATH + "/companies-stats/loadInitialData", (req, res) => {
        console.log("loadInitialPablo#########");
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
        }, {
            country: "Corea del Sur",
            year: "2007",
            company: "samsung",
            income: 174.2,
            marketcapitalization: 110.10,
            employee: 263000
        }, {
            country: "Alemania",
            year: "2007",
            company: "volkswagen",
            income: 160.3,
            marketcapitalization: 101.06,
            employee: 329305
        }, {
            country: "Japon",
            year: "2015",
            company: "Toyota",
            income: 145.4,
            marketcapitalization: 45.8,
            employee: 62500

        }, {
            country: "China",
            year: "2007",
            company: "petrochina",
            income: 169.7,
            marketcapitalization: 369.57,
            employee: 307000
        }, {
            country: "Belgica",
            year: "2007",
            company: "dexia",
            income: 197.1,
            marketcapitalization: 374.7,
            employee: 876500
        }, {
            country: "Brasil",
            year: "2007",
            company: "petroleo brasileiro",
            income: 125,
            marketcapitalization: 47.5,
            employee: 75200
        }, {
            country: "Canada",
            year: "2007",
            company: "royal bank",
            income: 46.6,
            marketcapitalization: 60.7,
            employee: 175200
        }, {
            country: "España",
            year: "2010",
            company: "grupo santander",
            income: 95.7,
            marketcapitalization: 72.7,
            employee: 20500
        }, {
            country: "Finlandia",
            year: "2006",
            company: "nokia",
            income: 165.1,
            marketcapitalization: 45.6,
            employee: 278500
        }, {
            country: "Reino Unido",
            year: "2009",
            company: "british petroleum",
            income: 146.1,
            marketcapitalization: 34.7,
            employee: 80300
        }];

        companies.find({}).toArray((error, companiesArray) => {
            if (companiesArray.length == 0) {
                console.log("vacio");
                companies.insertMany(companiesstatsinitial);
                console.log("cargado");
                res.sendStatus(201);
            }
            else {
                res.sendStatus(409);
                console.log("409 conflict");
            }
        });
    });

    // GET CONJUNTO /api/v1/companies-stats
    app.get(BASE_PATH + "/companies-stats", (req, res) => {

        //Búsqueda
        var search = {}
        if (req.query.country) search["country"] = req.query.country;
        if (req.query.year) search["year"] = req.query.year;
        if (req.query.company) search["company"] = req.query.company;
        if (req.query.income) search["income"] = parseInt(req.query.income);
        if (req.query.marketcapitalization) search["marketcapitalization"] = parseInt(req.query.marketcapitalization);
        if (req.query.employee) search["employee"] = parseInt(req.query.employee);


        //Paginacion
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || Number.MAX_SAFE_INTEGER;
        companies.find(search, { projection: { _id: 0 } }).skip(offset).limit(limit).toArray((error, companiesArray) => {
            console.log("###############companiesArray#####################");

            res.send(companiesArray);
            if (error) {
                console.log("Error:");
            }
        });
    });
    // POST CONJUNTO /api/v1/companies-stats
    app.post(BASE_PATH + "/companies-stats", (req, res) => {
        var newcompaniesstats = req.body;
        var countryCompany = req.body.country;
        var newCompany = req.body;

        if (!newCompany.country || !newCompany.year || !newCompany.company || !newCompany.income || !newCompany.marketcapitalization || !newCompany.employee) {
            res.sendStatus(400);
        }
        else {
            companies.find({ "country": countryCompany }).toArray((error, companiesArray) => {

                if (error) {
                    console.log("Error: " + error);
                }
                if (companiesArray.length > 0) {
                    res.sendStatus(409);
                    console.log("error 409 conflicto");
                }
                else {
                    console.log("incluye");
                    companies.insertOne(newcompaniesstats);
                    res.sendStatus(201);
                }
            });
        }
    });

    // DELETE CONJUNTO /api/v1/companies-stats
    console.log("DELETE al conjunto /companies-stats ");
    app.delete(BASE_PATH + "/companies-stats", (req, res) => {
        companies.deleteMany({});
        res.sendStatus(200);
    });

    // GET concreto /api/v1/companies-stats/1997
    console.log("GET al año companies-stats/2014");
    app.get(BASE_PATH + "/companies-stats/:country/:year", (req, res) => {

        var country = req.params.country;
        var year = req.params.year;

        companies.find({ "country": country, "year": year }, { projection: { _id: 0 } }).toArray((error, filteredcompaniesstats) => {
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

    // PUT concreto /api/v1/companies-stats/2014
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
                if (id != updatedcompaniesstats._id || !updatedcompaniesstats.country || !updatedcompaniesstats.year || !updatedcompaniesstats.company || !updatedcompaniesstats.income || !updatedcompaniesstats.marketcapitalization || !updatedcompaniesstats.employee) {
                    res.sendStatus(400);
                }
                else {
                    if (country != req.body.country || year != req.body.year) {
                        res.sendStatus(400);
                    }
                    else {
                        companies.updateOne({ year: year }, { $set: updatedcompaniesstats });
                        companies.updateOne({ country: country }, { $set: updatedcompaniesstats });

                        res.sendStatus(200);
                    }
                }
            }
        });
    });

    // DELETE concreto /api/v1/companies-stats/EEUU/2014
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

    // POST concreto /api/v1/companies-stats/EEUU/1997
    console.log("POST Erroneo al año /companies-stats/EEUU/1997-->405 ");
    app.post(BASE_PATH + "/companies-stats/:country/:year", (req, res) => {

        res.sendStatus(405);
    });

    // PUT CONJUNTO /api/v1/companies-stats
    console.log("PUT Erroneo al conjunto /companies-stats/ --> 405 ");
    app.put(BASE_PATH + "/companies-stats", (req, res) => {

        res.sendStatus(405);
    });
}
