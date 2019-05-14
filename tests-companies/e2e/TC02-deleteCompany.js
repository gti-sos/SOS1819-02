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
                        expect(finalCompanies.length).toEqual(10);

                    });
            });
    });
});






/* describe("Check if a Company can be deleted: ", function(){
    
        it("List should be wane after the Company deletion.", function(){
                
                browser.get("https://sos1819-04.herokuapp.com/#!/api-companies ");
                
                check();
                
                function check(){
                    
                    element
                        .all(by.repeater("company in companies"))
                        .then(function(initialCompanies){
                                
                                if(initialCompanies.length<10){
                                    
                                    element(by.css('[value="Borrar Country123/123"]')).click();
                                    
                                    element
                                        .all(by.repeater("company in companies"))
                                        .then(function(finalCompanies){
                                                
                                                expect(initialCompanies.length).toBeGreaterThan(finalCompanies.length);
                                                
                                            }
                                        );
                                    
                                } else if(initialCompanies.length==0){
                                    
                                    element(by.css('[value="Página Anterior"]')).click();
                                    
                                    element(by.css('[value="Borrar Country123/123"]')).click();
                                    
                                    element
                                        .all(by.repeater("company in companies"))
                                        .then(function(finalCompanies){
                                                
                                                expect(initialCompanies.length).toBeGreaterThan(finalCompanies.length);
                                                
                                            }
                                        );
                                    
                                } else {
                                    
                                    element(by.css('[value="Siguiente Página"]')).click().then(check());
                                    
                                }
                                
                            }
                        );
                    
                }
                
                
            }
        );
    
    }
);
*/