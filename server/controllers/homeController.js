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
      title: 'Index Controller Working!!!',
      author: 'Ivan Rivalcoba',
      emojie,
    };
    res.render('index', viewModel);
  };
  
  export default {
    // Action Methods
    index,
  };