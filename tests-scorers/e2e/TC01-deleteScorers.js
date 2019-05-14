describe('Checking if an scorer is deleted', function(){
    it('should show some scorer',function(){
        browser
            .get("https://sos1819-02.herokuapp.com/#!/api-scorers/");
            
             element
                .all(by.repeater("scorer in scorers"))
                .then(function(initialScorers){
                     console.log("esto es el initial Scorers"+initialScorers.length);
                      browser.driver.sleep(2000);
                      element.all(by.css('[value="delete"]')).click();
                      
                      element.all(by.repeater("scorer in scorers"))
                .then(function(finalScorers){
                 expect(finalScorers.length).toEqual(initialScorers.length-1);
                    console.log("esto es el final Scorers"+finalScorers.length);
                    
                    
                })
                })})})