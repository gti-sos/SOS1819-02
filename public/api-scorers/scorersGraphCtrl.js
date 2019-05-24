var datos = [ 1 ,2, 4 , 8 , 16 , 32 , 64 , 128 , 200];

function graficar(){
    d3.select(".barras")
        .selectAll
        .data(datos)
        .enter().append('div')
}