import express from 'express';
import { createTransaction, getTransactionById, updateTransactionStatus } from '../controllers/transactionController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Crear una nueva transacción
router.post('/', authenticate, createTransaction);

// Obtener una transacción por ID
router.get('/:id', authenticate, getTransactionById);

// Actualizar el estado de una transacción
router.patch('/:id', authenticate, updateTransactionStatus);

export default router;
