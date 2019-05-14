describe('Checking if an scorer is deleted', function(){
    it('should show some scorer',function(){
        browser
            .get("https://sos1819-02.herokuapp.com/#!/api-scorers");
            
             element.all(by.repeater("scorer in scorers"))
            .then(function(initialScorer) {
                element.all(by.css('[value="delete"]')).click();
                
                element.all(by.repeater("scorer in scorers"))
                    .then(function(finalScorers) {
                        expect(finalScorers.length).toEqual(0);
                    });
            });
    });
});