describe("Check if data is loaded: ",function () {
    it("List shows more than 0 items", function (){
        browser.get("https://sos1819-02.herokuapp.com/#!/api-movies");
        var movies = element.all(by.repeater("movie in movies"));
        expect(movies.count()).toBeGreaterThan(0);
    });
});