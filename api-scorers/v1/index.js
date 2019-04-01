console.log("submodulo api-scorers");

module.exports= function(app,BASE_PATH){
    
    
    app.get(BASE_PATH+"/hello", (req,res)=>{
        res.send("hola que tal amigo");
    }),
    
    app.get(BASE_PATH+"/bye", (req,res)=>{
        res.send("agur amigo");
    })
}

