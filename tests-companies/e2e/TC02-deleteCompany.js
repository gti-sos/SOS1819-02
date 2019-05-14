describe('Checking if an company is deleted', function() {
    it('should show some companies', function() {
        browser
            .get('https://sos1819-02.herokuapp.com/#!/api-companies');

        element
            .all(by.repeater("company in companies"))
            .then(function(initialCompanies) {
                element(by.css('[value="Borrar"]')).click();

                element.all(by.repeater("company in companies"))
                    .then(function(finalCompanies) {
                        expect(finalCompanies.length).toEqual(11);

                    });
            });
    });
});
