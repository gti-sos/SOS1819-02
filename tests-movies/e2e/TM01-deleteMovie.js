describe('Checking if an expense is deleted', function(){
    it('should show some expenses',function(){
        browser
            .get("https://sos1819-02.herokuapp.com/#!/api-movies");
            
             element
                .all(by.repeater("movie in movies"))
                .then(function(initialMovies){
                     console.log(initialMovies.length);
                      browser.driver.sleep(2000);
                      element.all(by.css('[value="Borrar"]')).last().click();
                      
                      element.all(by.repeater("movie in movies"))
                .then(function(finalMovies){
                 expect(finalMovies.length).toEqual(initialMovies.length-1);
                    
                    
                    
                })
                })})})