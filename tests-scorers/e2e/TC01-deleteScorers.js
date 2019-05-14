describe('Checking if an scorer is deleted', function(){
    it("Should delete the created item", function () {
		element.all(by.repeater("scorer in scorers")).first().all(by.css('[value="delete"]')).last().click();
		browser.takeScreenshot().then(function (png) {
        writeScreenShot(png, 'exception.png');
    });
    });
});