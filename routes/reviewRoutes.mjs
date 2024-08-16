// routes/reviewRoutes.js

import express from 'express';
import {
  createReview,
  getReviewsByUser,
  getReviewById,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', createReview);
router.get('/user/:userId', getReviewsByUser);
router.get('/:id', getReviewById);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
