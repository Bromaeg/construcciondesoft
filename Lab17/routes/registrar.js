const express = require('express');
const router = express.Router();
const modelosModels = require('../models/modelos.models.js');
const connection = require('../database/database.js');
const mysql = require('mysql2');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

router.get('/registrar', (req, res, next) => {
  res.render('registrar'); // Renderizar la vista registrar.ejs
});

router.post('/registrar', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (modelosModels.validarcredenciales(username, password)) {
    req.session.isLoggedIn = true;
    req.session.user = { username };
    req.session.save(err => {
      if (err) {
        console.log('Error al guardar la sesión: ', err);
        res.redirect('/');
      } else {
        res.redirect('/')// Redireccionar a la página principal
      }
    });
  } else {
    res.redirect('/');
  }
});

router.post('/registrar', moduleController.registrar);

module.exports = router;
