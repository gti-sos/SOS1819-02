describe("Check if a new movie can be created: ", function(){
        it("List should grow after the movie creation", function(){
            
                browser.get("https://sos1819-02.herokuapp.com/#!/api-movies");
                
                check();
                
                function check(){
                   
                    element
                        .all(by.repeater("movie in movies"))
                        .then(function (initialMovies){
                                
                                if(initialMovies.length==10){
                                    
                                    element(by.css('[value="Siguiente Página"]')).click().then(check());
                                    
                                } else {
                                
                                    element(by.model('newMovie.name')).sendKeys('Movie123');
                                    element(by.model('newMovie.country')).sendKeys('Country123');
                                    element(by.model('newMovie.year')).sendKeys(123);
                                    element(by.model('newMovie.movienomination')).sendKeys(123);
                                    element(by.model('newMovie.movieaward')).sendKeys(123);
                                    element(by.model('newMovie.movieedition')).sendKeys(123);

                                    element(by.css('[value="Añadir"]')).click();
                                    
                                    element
                                        .all(by.repeater("movie in movies"))
                                        .then(function(finalMovies){
                                            
                                                expect(finalMovies.length).toEqual(initialMovies.length+1);
                                            
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