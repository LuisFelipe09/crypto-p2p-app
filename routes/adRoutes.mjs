import express from 'express';
import { createAd, getAds, getAdById, deleteAd } from '../controllers/adController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Crear un nuevo anuncio
router.post('/', authenticate, createAd);

// Obtener todos los anuncios
router.get('/', getAds);

// Obtener un anuncio por ID
router.get('/:id', getAdById);

// Eliminar un anuncio por ID
router.delete('/:id', authenticate, deleteAd);

export default router;
