// services/reviewService.js

import Review from '../models/Review.js';

export const createReview = async (data) => {
  return await Review.create(data);
};

export const getReviewsByUser = async (userId) => {
  return await Review.findAll({
    where: { revieweeId: userId },
  });
};

export const getReviewById = async (id) => {
  return await Review.findByPk(id);
};

export const updateReview = async (id, data) => {
  const review = await Review.findByPk(id);
  if (review) {
    return await review.update(data);
  }
  return null;
};

export const deleteReview = async (id) => {
  const review = await Review.findByPk(id);
  if (review) {
    await review.destroy();
    return true;
  }
  return false;
};
