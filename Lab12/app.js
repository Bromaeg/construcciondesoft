// Requerir las librerías
const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const fs = require("fs");
const ejs = require('ejs');



// Importar las vistas
const index = require('./views/index.ejs');

// Crear la aplicación de Express
const app = express();

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', './views');

// Crear una ruta para la página principal
app.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Página principal' });
});

// Crear una ruta para la página "acerca de"
app.get('/acerca', (req, res) => {
res.render('acerca', { pageTitle: 'Acerca de los masones' });
});

// Crear una ruta para procesar el formulario
app.post('/acerca', (req, res) => {
const datos = req.body;
console.log(datos);
fs.writeFileSync("registro.txt", JSON.stringify(datos));
res.render('registro', { pageTitle: 'Bienvenido', datos: datos });
});

// Configurar el middleware de body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Configurar la ruta 404
app.use((req, res, next) => {
res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
const server = http.createServer(app);
server.listen(3000, () => {
console.log("Servidor iniciado en el puerto 3000");
});