describe("Check if a new scorer can be created: ", function(){
        it("List should grow after the Scorer creation", function(){
            
                browser.get("https://sos1819-02.herokuapp.com/#!/api-scorers");
                
                check();
                
                function check(){
                   
                    element
                        .all(by.repeater("scorer in scorers"))
                        .then(function (initialScorers){
                                
                                if(initialScorers.length==10){
                                    
                                    element(by.css('[value="Siguiente Página"]')).click().then(check());
                                    
                                } else {

                                    element(by.css('[value="delete"]')).click();
                                    
                                    element
                                        .all(by.repeater("scorer in scorers"))
                                        .then(function(finalScorers){
                                            
                                                expect(finalScorers.length).toEqual(initialScorers.length-1);
                                            
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