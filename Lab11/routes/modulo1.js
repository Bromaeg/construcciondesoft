const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hola desde el módulo 1!');
});

router.get('/ruta1', (req, res, next) => {
  res.send('Respuesta de la ruta "/ruta1" en el módulo 1');
});

router.get('/ruta2', (req, res, next) => {
  res.send('Respuesta de la ruta "/ruta2" en el módulo 1');
});

module.exports = router;