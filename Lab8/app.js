console.log("Hola desde node");

//El modulo filesystem sirve para acceder al sistema de archivos en la computadora

const filesystem = require("fs");
filesystem.writeFileSync("hola.txt", "Hola desde node");