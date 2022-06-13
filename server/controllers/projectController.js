/* Actions Methods */

// Lista los proyectos
// GET /projects | GET /projects/index
const index = (req, res) => {
    res.send('Listando proyectos 🚧');
    // TODO: Agregar codigo de listado de proyectos
  };
  
  // Agrega ideas de proyectos
  // GET /projects/add
  const add = (req, res) => {
    res.render('projects/addProjectView', {});
    // TODO: Agregar codigo para agregar proyectos
  };
  
  // Exportando el controlador
  export default {
    index,
    add,
  };