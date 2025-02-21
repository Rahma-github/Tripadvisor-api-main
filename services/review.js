const Review = require("../models/review");

const addReview =async (data) => {
  try {
    const review = new Review(data);
    await review.save();
    return review;
  } catch (e) {
    return error;
  }
};

module.exports = {
  addReview,
};
