// controllers/reviewController.js

import * as reviewService from '../services/reviewService.js';

export const createReview = async (req, res) => {
  const { transactionId, reviewerId, revieweeId, rating, comment } = req.body;
  try {
    const review = await reviewService.createReview({
      transactionId,
      reviewerId,
      revieweeId,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

export const getReviewsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const reviews = await reviewService.getReviewsByUser(userId);
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await reviewService.getReviewById(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
};

export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const updatedReview = await reviewService.updateReview(id, { rating, comment });
    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await reviewService.deleteReview(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
