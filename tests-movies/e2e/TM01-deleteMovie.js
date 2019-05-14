describe("Check if a movie can be deleted: ", function(){
    
        it("List should be wane after the movie deletion.", function(){
                
                browser.get("https://sos1819-02.herokuapp.com/#!/api-movies");
                
                check();
                
                function check(){
                    
                    element
                        .all(by.repeater("movie in movies"))
                        .then(function(initialMovies){
                                
                                if(initialMovies.length<10){
                                    
                                 element.all(by.css('[value="Borrar"]')).last().click();

                                    
                                    element
                                        .all(by.repeater("movie in movies"))
                                        .then(function(finalMovies){
                                                
                                        expect(finalMovies.length).toEqual(initialMovies.length-1);                                                
                                            }
                                        );
                                    
                                } else if(initialMovies.length==0){
                                    
                                    element(by.css('[value="Página Anterior"]')).click();
                                    
                                    element.all(by.css('[value="Borrar"]')).last().click();
                                    
                                    element
                                        .all(by.repeater("movie in movies"))
                                        .then(function(finalMovies){
                                                
                                                expect(initialMovies.length).toBeGreaterThan(finalMovies.length);
                                                
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