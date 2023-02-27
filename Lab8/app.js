console.log("Hola desde node");

//El modulo filesystem sirve para acceder al sistema de archivos en la computadora

const filesystem = require("fs");
filesystem.writeFileSync("texto1.txt", "Hola desde node! by mike");


let imprimir = (numero) =>{
    console.log(numero);
}

const arreglo = [5000, 60,61,90,100,10,20,100];

for (let item of arreglo){
    setTimeout(() => {
        console.log(item);
    }, item);
}

//Crea una pequeña aplicación web que al enviar una petición al servidor, despliegue una de las páginas (index.html)

const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
    console.log("Petición recibida");
    console.log(request.url);
    if (request.url == "/"){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(fs.readFileSync("index.html"));
    } 
    response.end();
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

//Crea una funcion que reciba un string y escriba este en un archivo de texto llamado "texto.txt" con el modulo fs

function escribirArchivo(texto){
    filesystem.writeFileSync("texto2.txt", texto);
}


escribirArchivo("Hola desde el Tecnologico de Monterrey!");

