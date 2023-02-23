console.log("Hola desde node");

//El modulo filesystem sirve para acceder al sistema de archivos en la computadora

const filesystem = require("fs");
filesystem.writeFileSync("hola.txt", "Hola desde node");


let imprimir = (numero) =>{
    console.log(numero);
}

const arreglo = [5000, 60,61,90,100,10,20,100];

for (let item of arreglo){
    setTimeout(() => {
        console.log(item);
    }, item);
}

setTimeout(() => {
    console.log("hackeado");
}, 1000);

const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Mi Pagina Web desde Servidor</title></head>");
    res.write("<body><h1>Hola desde mi servidor privado</h1></body>");
    res.end("Holiiiiiis");
});

function calcularPromedio(arr) {
    const suma = arr.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    const promedio = suma / arr.length;
    return promedio;
  }
const numeros = [2, 4, 6, 8, 10];
const promedio = calcularPromedio(numeros);
console.log(promedio);
server.listen(3000);

