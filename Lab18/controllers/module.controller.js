const Module = require('../models/modelos.models.js');

exports.getModule = (req, res, next) => {
  const cookies = req.get('Cookie') || '';
  let consultas = cookies.split('=')[1] || 0;
  consultas++;

  res.setHeader('Set-Cookie', 'consultas=' + consultas + '; HttpOnly');
  res.render('module', { pageTitle: 'Módulo 1', consultas: consultas });
};

exports.postModule = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  Module.findOne({ username: username, password: password })
    .then(module => {
      if (!module) {
        // Si las credenciales no son válidas, se redirecciona a la página de inicio de sesión
        res.redirect('/module');
      } else {
        // Si las credenciales son válidas, se guarda la sesión del usuario
        req.session.isLoggedIn = true;
        req.session.user = module;
        req.session.save(err => {
          if (err) {
            console.log(err);
          }
          res.redirect('/module');
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.redirect('/module');
    });
};

const registrar = (req, res) => {
  const { username, password } = req.body;
  

  // Ejecutar consulta SQL para insertar los datos en la base de datos
  connection.query(
    'INSERT INTO masones (username, password) VALUES (?, ?)',
    [username, password],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al registrar usuario');
      } else {
        res.redirect('/inicio');
      }
    }
  );
};

module.exports = {
  // ...
  registrar,
};