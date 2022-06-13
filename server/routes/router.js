// Importando el enrutador de Home
import homeRouter from './homeRouter';

// Funcion que agrega todos los enrutadores
// a la aplicación de express
const addRoutes = (app) => {
  /* Agregando enrutador a Home */
  app.use('/', homeRouter);
};

export default {
  addRoutes,
};