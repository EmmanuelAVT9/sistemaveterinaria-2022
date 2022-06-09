//Importar express
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('about',
  // Este es el View Model 
  {
    name: 'Emmanuel Vázquez',
    email: 'prueba@gmail.com',
    url: 'www.itgam.com/emmanuelVazquez'
   });
});

module.exports = router;