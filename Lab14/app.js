// Requerir las librerías
const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const fs = require("fs");
const ejs = require('ejs');
const path = require('path');
const models = require('./models/modelos.models.js');
const session = require('express-session');

// Crear la aplicación de Express
const app = express();

// Configurar la sesión
app.use(session({
    secret: 'mason', //clave secreta para firmar el id
    resave: false, //evita que se guarde la sesion en el almacenamiento si no se ha modificado
    saveUninitialized: false //evita que se cree una sesion para solicitudes que no la necesitan
}));

// Configurar la carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', './views');

// Configurar el middleware de body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Crear una ruta para la página principal
app.get('/', (req, res, next) => {
    res.render('index', { pageTitle: 'Inicio' });
});

// Configurar login 
app.post('/', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'mason' && password === 'mason') {
        req.session.isLoggedIn = true;
        res.redirect('/module');
    } else {
        res.redirect('/');
    }
});

// Middleware para verificar si hay sesión iniciada
function requireLogin(req, res, next) {
    if (req.session.isLoggedIn) {
        return next();
    }
    res.redirect('/');
}

// Crear una ruta para la página "modulo1"
app.get('/module', requireLogin, (req, res, next) => {
    res.render('modulo1.ejs', { pageTitle: 'Módulo 1' });
});

// Crear una ruta para procesar el formulario
app.post('/module', (req, res, next) => {
    const datos = req.body;
    console.log(datos);
    fs.writeFileSync("registro.txt", JSON.stringify(datos));
    res.render('modulo1.ejs', { pageTitle: 'Bienvenido', datos: datos });
});

// Configurar la ruta 404
app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
const server = http.createServer(app);
server.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000");
});
