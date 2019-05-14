exports.config = {
    
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
                "e2e/TC01-loadScorers.js",
                "e2e/TC02-createScorers.js",
                "e2e/TC03-deleteScorers.js"
                
           ]
    
};