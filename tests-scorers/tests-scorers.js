exports.config = {
    
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
                "e2e/TC01-loadScorers.js",
                "e2e/TC01-deleteScorers.js",
                "e2e/TC01-createScorers.js"
                
           ]
    
};