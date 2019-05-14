describe('Checking if an expense is deleted', function() {
    it('should show some expenses', function() {
        browser
            .get("https://sos1819-02.herokuapp.com/#!/api-companies");
        check();

        function check() {


            element
                .all(by.repeater("company in companies"))
                .then(function(initialCompanies) {
                    if (initialCompanies.length < 10) {


                        console.log(initialCompanies.length);

                        browser.driver.sleep(2000);

                        element.all(by.css('[value="Borrar Country123/123"]')).click();

                        element.all(by.repeater("company in companies"))
                            .then(function(finalCompanies) {
                                expect(initialCompanies.length).toBeGreaterThan(finalCompanies.length);
                            });
                    }
                    else if (initialCompanies.length == 0) {
                        element(by.css('[value="Página Anterior"]')).click();
                        element(by.css('[value="Borrar Country123/123"]')).click();
                        element.all(by.repeater("company in companies"))
                            .then(function(finalCompanies) {
                               // expect(finalCompanies.length).toEqual(initialCompanies.length - 1);
                                expect(initialCompanies.length).toBeGreaterThan(finalCompanies.length);
                            });
                    }
                    else {
                        element(by.css('value="Siguiente Página"]')).click().then(check());
                    }
                });
        }
    });
});
