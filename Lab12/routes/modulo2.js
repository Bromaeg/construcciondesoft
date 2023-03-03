const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hola desde el módulo 2!');
});

router.get('/ruta3', (req, res, next) => {
  res.send('Respuesta de la ruta "/ruta3" en el módulo 2');
});

router.post('/ruta4', (req, res, next) => {
  const datos = req.body;
  console.log(datos);
  res.send('Datos recibidos y guardados!');
});

module.exports = router;
