// URL: Get /
const index = (req, res) => {
  // Calculando emojie
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
  // View-Models
  const viewModel = {
    title: 'Sistema Veterinaria',
    author: 'Emmanuel Vázquez',
    emojie,
  };
  res.render('home/indexView', viewModel);
};

// URL: Get /about
const about = (req, res) => {
  res.render('home/aboutView', {
    // Este es el View Model
    name: 'Emmanuel Vázquez',
    email: 'prueba@gmail.com',
    url: 'www.itgam.com/emmanuelVazquez',
    description:
      'Aplicación que te permite registrar citas de pacientes. PwpcII-2022A',
    version: '0.0.alpha',
  });
};
export default {
  // Action Methods
  index,
  about,
};