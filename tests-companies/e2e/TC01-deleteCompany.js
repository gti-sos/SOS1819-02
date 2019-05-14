describe('Checking if an expense is deleted', function() {
    it('should show some expenses', function() {
        browser
            .get("https://sos1819-02.herokuapp.com/#!/api-companies");

        element
            .all(by.repeater("company in companies"))
            .then(function(initialCompanies) {
                console.log(initialCompanies.length);
                browser.driver.sleep(2000);
                element.all(by.css('[value="Borrar"]')).last().click();

                element.all(by.repeater("company in companies"))
                    .then(function(finalCompanies) {
                        expect(finalCompanies.length).toEqual(initialCompanies.length - 1);



                    });
            });
    });
});
