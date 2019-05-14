describe('Checking if an scorer is deleted', function(){
    it("Should delete the created item", function () {
        browser.get("https://sos1819-02.herokuapp.com/#!/api-scorers");
                
                check();
                
                function check(){
		element.all(by.repeater("scorer in scorers")).first().all(by.css('[value="delete"]')).last().click();
		browser.takeScreenshot().then(function (png) {
        writeScreenShot(png, 'exception.png');
		
    });
    }});
    
});