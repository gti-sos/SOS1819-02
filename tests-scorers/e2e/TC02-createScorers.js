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
                                
                                    element(by.model('newScorer.name')).sendKeys('Rivaldo');
                                    element(by.model('newScorer.country')).sendKeys('bra');
                                    element(by.model('newScorer.year')).sendKeys(1987);
                                    element(by.model('newScorer.scorergoal')).sendKeys(167);
                                    element(by.model('newScorer.scorermatch')).sendKeys(350);
                                    element(by.model('newScorer.scoreraverage')).sendKeys(54);

                                    element(by.css('[value="Añadir"]')).click();
                                    
                                    element
                                        .all(by.repeater("scorer in scorers"))
                                        .then(function(finalScorers){
                                            
                                                expect(finalScorers.length).toEqual(initialScorers.length+1);
                                            
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