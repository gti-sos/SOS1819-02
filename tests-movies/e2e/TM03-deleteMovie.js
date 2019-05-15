describe('Checking if a movie is deleted', function(){
    it('should show some movie',function(){
        browser
            .get("https://sos1819-02.herokuapp.com/#!/api-movies");
            
             element
                .all(by.repeater("movie in movies"))
                .then(function(initialMovies){
                     console.log(initialMovies.length);
                      browser.driver.sleep(2000);
                      element.all(by.css('[value="Borrar todo"]')).last().click();
                      
                      element.all(by.repeater("movie in movies"))
                .then(function(finalMovies){
                 expect(finalMovies.length).toEqual(0);                    
                    
                    
                })
                })})})