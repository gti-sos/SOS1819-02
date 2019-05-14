exports.config = {

    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
        "e2e/TC01-loadCompanies.js",
        "e2e/TC01-createCompany.js",
        "e2e/TC01-deleteCompany.js"
    ]

};
