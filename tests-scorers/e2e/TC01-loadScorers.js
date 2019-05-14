describe("Check if data is loaded: ",function () {
    it("List shows more than 0 items", function (){
        browser.get("https://sos1819-02.herokuapp.com/#!/api-scorers");
        var scorers = element.all(by.repeater("scorer in scorers"));
        expect(scorers.count()).toBeGreaterThan(0);
    });
});