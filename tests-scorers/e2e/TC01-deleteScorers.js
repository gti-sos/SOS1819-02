describe("Check if a scorer can be deleted: ", function(){
    
        it("List should be wane after the scorer deletion.", function(){
                
                browser.get("https://sos1819-02.herokuapp.com/#!/api-scorers/");
                
                check();
                
                function check(){
                    
                    element
                        .all(by.repeater("scorer in scorers"))
                        .then(function(initialScorers){
                                
                                if(initialScorers.length<10){
                                    
                                    element(by.css('[value="delete"]')).last().click();
                                    
                                    element
                                        .all(by.repeater("scorer in scorers"))
                                        .then(function(finalScorers){
                                                
                                                expect(initialScorers.length).toBeGreaterThan(finalScorers.length);
                                                
                                            }
                                        );
                                    
                                } else if(initialScorer.length==0){
                                    
                                    element(by.css('[value="Página Anterior"]')).click();
                                    
                                    element(by.css('[value="delete"]')).click();
                                    
                                    element
                                        .all(by.repeater("scorer in scorers"))
                                        .then(function(finalScorers){
                                                
                                                expect(initialScorers.length).toBeGreaterThan(finalScorers.length);
                                                
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