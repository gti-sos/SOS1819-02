exports.config = {
    
    seleniumAddress: "http://localhost:4444/wd/hub",
    chromeOnly: true,
    specs: [
                "e2e/TM01-loadMovies.js",
                "e2e/TM02-createMovie.js",
                "e2e/TM03-deleteMovie.js"
           ]
    
};