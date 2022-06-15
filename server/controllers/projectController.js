import log from '../config/winston';
// Importando el modelo Project
import ProjectModel from '../models/ProjectModel';

/* Actions Methods */
// Lista los proyectos
// GET /projects | GET /projects/index
const index = async (req, res) => {
  // 1 Pedirle a la base de datos
  // que me de todos lo proyectos que tiene
  // db.projects.find()
  try {
    log.info('Listando proyectos ... ⌛');
    const projectsDocs = await ProjectModel.find();
    log.info('Proyectos listados con exito ... 🎉');
    res.json(projectsDocs);
  } catch (error) {
    log.error(`💥 Error al listar proyectos: ${error.message}`);
    res.status(500).json(error);
  }
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
  // Desestructurando la informacion
  // del formulario o de un posible error
  const { errorData, validData } = req;
    // Crear view models para este actio method
    let project = {};
    let errorModel = {};
  // Verifico si hay error de validacion  
  if (errorData) {
    log.error('💥 Se retorna objeto de error de validacion 💥');
    // Rescantado los datos del formulario
    project = errorData.value;
    // Usamos reduce para generar un objeto
    // de errores a partir de inner
  }
  log.info('Se retorna un objeto Proyecto valido');
  // Crear un documento con los datos provistos
  // por el formulario y guardar dicho documento
  // en projectModel
  const projectModel = new ProjectModel(validData);
  // Siempre que se ejecuta una operacion
  // que depende de un tercero, es una buena practica
  // envolver esa operacion en un bloque try
  try {
    log.info('Salvando el Proyecto...⌛');
    // Se salva el documento projecto
    project = await projectModel.save();
    log.info('🎉 Proyecto salvado con exito 🎉');
    // Redireccionando al recurso que lista los proyectos
    // GET /projects
    return res.redirect('/projects');
  } catch (error) {
    log.error(`Ha fallado el intento de salvar un proyecto:${error.message}`);
    return res.status(500).json({ error });
  }
};
  
  // Exportando el controlador
  export default {
    index,
    add,
    addPost,
  };