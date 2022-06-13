// Import Express Router
import { Router } from 'express';
// Import el controlador de Home
import homeController from '../controllers/homeController';

// Creo una instancia del Router de Express
const router = new Router();

// Get "/"
router.get('/', homeController.index);

// Exportando Router
export default router;