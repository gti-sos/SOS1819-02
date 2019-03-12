
var express = require("express");

var app= express();

var tiempo= new Date();
var hora= tiempo.getHours();
var minutos= tiempo.getMinutes();
var segundos = tiempo.getSeconds();

var horaEntera = hora + ":" + minutos + ":" + segundos;

var port = process.env.PORT || 8080;

console.log("Hora actual:" , horaEntera);

app.get("/time", (request, response) => {
    response.send(Date());
    console.log("Nueva solicitud recibida");
});

app.listen(port, () => {
    console.log("Server operativo!")
});