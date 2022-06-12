const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // render manda a renderizar (generar y entregar)
  // la vista al cliente
  // Calculando
  const emojieDataset = [
    '💻',
    '👨‍💻',
    '🎈',
    '🎄',
    '🦺',
    '🎢',
    '🎁',
    '🚆',
    '🌍',
    '♥',
  ];
  const emojie =
    emojieDataset[Math.floor(Math.random() * emojieDataset.length)];
  res.render(
    'index',
    // Este es el View-Model
    {
      title: 'Sistema para Agendar Citas de Pacientes de un Veterinaria🦴🐩',
      author: 'Emmanuel Vazquez',
      emojie,
    }
  );
});

module.exports = router;
