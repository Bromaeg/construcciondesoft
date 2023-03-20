const express = require('express');
const router = express.Router();
const path = require('path');

const moduleController = require('../controllers/module.controller.js');


// Manejar la ruta principal
router.get('/module', (req, res, next) => {
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

// Manejar la ruta "/modulo1"
router.get('/modulo1', moduleController.getModule);
