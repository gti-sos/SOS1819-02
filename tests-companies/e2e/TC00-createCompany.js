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
                                
                                    element(by.model('newCompany.company')).sendKeys('Renault');
                                    element(by.model('newCompany.country')).sendKeys('Francia');
                                    element(by.model('newCompany.year')).sendKeys(2007);
                                    element(by.model('newCompany.income')).sendKeys(60155);
                                    element(by.model('newCompany.marketcapitalization')).sendKeys(82453);
                                    element(by.model('newCompany.employee')).sendKeys(20007);

                                    element(by.css('[value="Añadir"]')).click();
                                    
                                    element
                                        .all(by.repeater("company in companies"))
                                        .then(function(finalCompanies){
                                            
                                                expect(finalCompanies.length).toEqual(initialCompanies.length+1);
                                            
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