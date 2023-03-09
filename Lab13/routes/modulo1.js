const express = require('express');
const router = express.Router();
const path = require('path');

const moduleController = require('../controllers/module.controller.js');

// Manejar la ruta principal
router.get('/', (req, res, next) => {
  const photos = [
    {
      url: '/images/photo1.jpg',
      title: 'Foto 1'
    },
    {
      url: '/images/photo2.jpg',
      title: 'Foto 2'
    }
  ];

  res.render('index', { photos: photos });
});

// Manejar la ruta "modulo1"
router.get('/module', moduleController.getModule);

// Manejar la solicitud de inicio de sesión
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  if (username === 'mason' && password === 'mason') {
    req.session.isLoggedIn = true;
    req.session.user = { username };
    req.session.save(err => {
      if (err) {
        console.error('Error al guardar la sesión:', err);
      }
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
