const express = require('express');
const router = express.Router();

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

module.exports = router;