describe("Check if a new company can be created: ", function(){
        it("List should grow after the Company creation", function(){
            
                browser.get("https://sos1819-02.herokuapp.com/#!/api-companies");
                
                check();
                
                function check(){
                   
                    element
                        .all(by.repeater("company in companies"))
                        .then(function (initialCompanies){
                                
                                if(initialCompanies.length==10){
                                    
                                    element(by.css('[value="Siguiente Página"]')).click().then(check());
                                    
                                } else {
                                
                                    element(by.model('newCompany.company')).sendKeys('company123');
                                    element(by.model('newCompany.country')).sendKeys('Country123');
                                    element(by.model('newCompany.year')).sendKeys(123);
                                    element(by.model('newCompany.income')).sendKeys(123);
                                    element(by.model('newCompany.marketcapitalization')).sendKeys(123);
                                    element(by.model('newCompany.employee')).sendKeys(123);

                                    element(by.css('[value="Añadir"]')).click();
                                    
                                    element
                                        .all(by.repeater("company in companies"))
                                        .then(function(finalCompanies){
                                            
                                                expect(finalCompanies.length).toEqual(finalCompanies.lenght);
                                            
                                            }
                                        );
                                        
                                }
                                
                            }
                        );
                        
                }
                
            }
        );
    
    }
);