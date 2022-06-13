import log from '../config/winston';
// Importando el modelo Project
import ProjectModel from '../models/ProjectModel';

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

// Procesa el formulario que Agrega ideas de proyectos
// POST /projects/add
const addPost = async (req, res) => {
  const { errorData: error } = req;
  if (error) {
    log.error('💥 Se retorna objeto de error de validacion 💥');
    // La validacion fallo
    // return res.status(200).json(error);
  } else {
    // Desestructurando la informacion
    // del formulario
    const { validData: project } = req;
    log.info('Se retorna un objeto Cita valido');
        // Crear un documento con los datos provistos
    // por el formulario y guardar dicho documento
    // en projectModel
    const projectModel = new ProjectModel(validData);
    // Siempre que se ejecuta una operacion
    // que depende de un tercero, es una buena practica
    // envolver esa operacion en un bloque try
    try {
      // Se salva el documento projecto
      log.info('Se salva objeto Projecto');
      project = await projectModel.save();
    } catch (error) {
      log.error(`Ha fallado el intento de salvar un proyecto:${error.message}`);
      return res.status(500).json({ error });
    }
  }
   // Respondemos con los viewModels generados
     // res.render('projects/addProjectView', { project, errorModel });
  // Sanity check TODO:Provisional
  return res.status(200).json({ project, errorModel });
};
  
  // Exportando el controlador
  export default {
    index,
    add,
    addPost,
  };