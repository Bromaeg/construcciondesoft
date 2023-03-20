// Requerir las librerías
const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const fs = require("fs");
const ejs = require('ejs');
const path = require('path');
const models = require('./models/modelos.models.js');
const session = require('express-session');
const app = express();
const mysql = require('mysql2');
const connection = require('./util/database.js');


// Configurar EJS como motor de vistas

app.set('views', './views');
app.set('view engine', 'ejs');

// Configurar el middleware de body-parser

app.use(bodyParser.urlencoded({ extended: false }));

// Configurar la carpeta pública

app.use(express.static(path.join(__dirname, 'public')));

// Configurar la sesión
app.use(session({
  secret: 'masones4siempre', //clave secreta para firmar el id
  resave: false, //evita que se guarde la sesion en el almacenamiento si no se ha modificado
  saveUninitialized: false //evita que se cree una sesion para solicitudes que no la necesitan
}));

// Crear una ruta para la página principal
app.get('/', (req, res, next) => {
  if (req.session.isLoggedIn) {
    res.redirect('/module');
  } else {
    res.render('index', { pageTitle: 'Inicio' });
  }
});

// Verificar si el usuario está registrado
app.post('/', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  connection.query(
    'SELECT * FROM masones WHERE username = ? AND password = ?',
    [username, password],
    (err, results, fields) => {
      if (err) {
        console.log('Error al buscar los datos: ', err);
        res.sendStatus(500);
      } else if (results.length === 1) {
        req.session.isLoggedIn = true;
        req.session.user = { username };
        req.session.save((err) => {
          if (err) {
            console.log('Error al guardar la sesión: ', err);
          } else {
            res.redirect('/module');
          }
        });
      } else {
        res.render('index', { pageTitle: 'Inicio', errorMessage: 'Usuario o contraseña incorrectos' });
      }
    }
  );
});

// Middleware para verificar si el usuario está autenticado
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


// Configurar login
app.post('/', (req, res, next) => {
  const models = require('./models/modelos.models.js');
  const validarcredenciales = models.validarcredenciales;
  let username = req.body.username;
  let password = req.body.password;
  models.validarcredenciales(username, password);

  if (models.validarcredenciales(username, password) === true) {
    connection.query(
      'SELECT * FROM masones WHERE username = ? AND password = ?',
      [username, password],
      (err, results, fields) => {
        if (err) {
          console.log('Error al buscar los datos: ', err);
          res.sendStatus(500);
        } else if (results.length === 1) {
          req.session.isLoggedIn = true;
          req.session.user = { username };
          req.session.save((err) => {
            if (err) {
              console.log('Error al guardar la sesión: ', err);
            } else {
              res.redirect('/');
            }
          });
        } else {
          res.redirect('/');
        }
      }
    );
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


// Crear una ruta para procesar el formulario
app.post('/module', (req, res, next) => {
  const datos = req.body;
  console.log(datos);
  fs.writeFileSync("registro.txt", JSON.stringify(datos));
  res.render('modulo1.ejs', { pageTitle: 'Bienvenido', datos: datos });
});

//Crear una ruta para la pagina "registrar"
app.get('/registrar', (req, res, next) => {
    res.render('registrar.ejs', { pageTitle: 'Registrar' });
});

//Crear una ruta para procesar el registro
app.post('/registrar', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password; 

  connection.query(
    'INSERT INTO masones (username, password) VALUES (?, ?)',
    [username, password],
    (err, results, fields) => {
      if (err) {
        console.log('Error al registrar el usuario: ', err);
        res.sendStatus(500);
      } else {
        console.log('Usuario registrado correctamente');
        res.redirect('/');
      }
    }
  );
});

// Configurar la ruta 404
app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
connection.connect(function (err) {
    if (err) {
        console.error('Error de conexión: ' + err.stack);
        return;
    }

    console.log('Conectado como ID ' + connection.threadId);

    const server = http.createServer(app);
    server.listen(3000, () => {
        console.log("Servidor iniciado en el puerto 3000");
});
});

// Crear una ruta para cerrar sesión
app.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log('Error al cerrar sesión: ', err);
        } else {
            res.redirect('/');
        }
    });
});
