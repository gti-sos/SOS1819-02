describe("Check if data is loaded: ",function () {
    it("List shows more than 0 items", function (){
        browser.get("https://sos1819-02.herokuapp.com/#!/api-companies");
        var companies = element.all(by.repeater("company in companies"));
        expect(companies.count()).toBeGreaterThan(0);
    });
});