// Importar express
const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render(
    'about',
    // Este es el View Model
    {
      name: 'Emmanuel Vázquez',
      email: 'prueba@gmail.com',
      url: 'www.itgam.com/emmanuelVazquez',
    }
  );
});

module.exports = router;
