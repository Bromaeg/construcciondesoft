console.log("Hola desde npm");

//Definimos filesystem, express, body-parser, modulo1 y modulo2 
const filesystem = require("fs");
filesystem.writeFileSync("texto1.txt", "Hola desde npm! by mike");
const express = require('express');
const bodyParser = require('body-parser');
const modulo1 = require('./routes/modulo1');
const modulo2 = require('./routes/modulo2');

const app = express();

// definimos imprimir como una funcion que recibe un arreglo de numeros y lo imprime en la consola
let imprimir = (numero) =>{
    console.log(numero);
}
const arreglo = [5000, 60,61,90,100,10,20,100];
for (let item of arreglo){
    setTimeout(() => {
        console.log(item);
    }, item);
}

// Crea un servidor web que al recibir una petición al servidor, despliegue una de las páginas (index.html)
const http = require("http");
const fs = require("fs");
let form = `
    <fieldset>
        <legend>¿Quieres ser mason?</legend>
        <div>
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" id="nombre">
            <label for="apellido">Apellido</label>
            <input type="text" name="apellido" id="apellido">
            <label for="edad">Edad</label>
            <input type="number" name="edad" id="edad">
            <label for="email">Email</label>
            <input type="email" name="email" id="email">
            <label for="Direccion">Direccion</label>
            <button type="submit">Enviar</button>
            
        </div>
    </fieldset>



`;

const server = http.createServer((request, response) => {
    console.log("Petición recibida");
    console.log(request.url);
    if (request.url == "/"){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(fs.readFileSync("index.html"));
        response.write("<a href='/acerca'>Acerca de los masones</a> <br>");
    } 
    else if (request.url == "/acerca" && request.method == "GET"){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("<h1>Acerca de los masones</h1>");
        response.write("<p>La masoneria es una fraternidad de hombres que comparten ciertos valores eticos y morales, y que trabajan juntos para mejorar a si mismos y a la sociedad en general. La masoneria se origino en Europa en la Edad Media como un gremio de albaniles que construian catedrales y otros edificios importantes. Con el tiempo, la fraternidad se transformo en una organizacion mas amplia que incluia a personas de distintas profesiones y clases sociales.</p>"); 
        response.write("<a href='/'>Regresar al inicio</a>");
        response.write("<form action=/acerca method = POST>")
        response.write(form);
        response.write("</form>")
    }
    else if (request.url == "/acerca" && request.method == "POST"){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("<h1>Bienvenuto.</h1>");
        let datos = "";
        request.on("data", (data) => {
            console.log(data);
            datos += data;
        });
        
        request.on("end", () => {
            console.log(datos);
            response.write("<p>Gracias por registrarte</p>");
            filesystem.writeFileSync("registro.txt", datos);
            response.write("<a href='/'>Regresar al inicio</a>");
            response.end();
        });
    }

    else {    
        
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("<h1>404 Not Found</h1>");
        response.write("<p>La pagina que buscas no existe</p>");
        response.write("<a href='/'>Regresar al inicio</a>");
        response.end();
        
    }
});
server.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});


// Crea una funcion que genere el promedio de un arreglo de numeros llamado "numeros"
function promedio(numeros){
    let suma = 0;
    for (let numero of numeros){
        suma += numero;
    }
    return suma / numeros.length;
}
const numeros = [1,2,3,4,5,6,7,8,9,10];
console.log(promedio(numeros));
setTimeout(() => {
    console.log("hackeado");
}, 1000);

//body-parser es un middleware que nos permite acceder a los datos de los formularios
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/modulo1', modulo1);
app.use('/modulo2', modulo2);

// Ruta 404
app.use((req, res, next) => {
  res.status(404).send('Página no encontrada');
});
