const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/module.controller.js');
const session = require('express-session');
const connection = require('../util/database.js'); // Importamos la conexión a la base de datos
const mysql = require('mysql2');

async function validarcredenciales(username, password) {
    const [rows, fields] = await connection.promise().query(
        'SELECT * FROM masones WHERE username = ? AND password = ?',
        [username, password]
    );

    if (fields && fields[0] && fields[0].password) {
        const passwordBuffer = fields[0].password;
        const decodedPassword = passwordBuffer.toString('utf8');
        console.log(decodedPassword);
        if (decodedPassword === password) {
            return true;
        }
    }
    return false;
}

async function procesarRegistro(req, res) {
    const { username, password} = req.body;
  
    const [rows, fields] = await connection.promise().query(
      'INSERT INTO masones (username, password) VALUES (?, ?)',
      [username, password]
    );
    res.send('Gracias por registrarse');
  }
    
// Ruta para autenticar usuarios
router.post('/auth', async (req, res) => {
    const { username, password } = req.body;
  
    // Validamos las credenciales del usuario
    const usuario = await validarcredenciales(username, password);
  
    if (usuario) {
      // Si las credenciales son válidas, iniciamos sesión y redirigimos a la página de inicio
      req.session.loggedIn = true;
      req.session.username = usuario.username;
      req.session.userId = usuario.id;
      req.session.password = usuario.password;
  
      // Enviamos los datos a la base de datos
      connection.promise().query(
          'INSERT INTO tabla (id, username, password) VALUES (?, ?, ?)',
          [usuario.id, usuario.username, usuario.password]
      );
  
      res.redirect('/module');
    } else {
      res.send('Usuario o contraseña incorrectos');
    }
  });
  
// Exportamos el router
module.exports = router;

module.exports.validarcredenciales = validarcredenciales;
module.exports.procesarRegistro = procesarRegistro;
