const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type:{
        type: String,
        enum: ["Destination", "Hotel", "Restaurant","Atractive"],
        required: true,
    },
    reference: {
      type: Schema.Types.ObjectId,
      refPath: "type",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    when: {
      type: Date,
    },
    who: {
      type: String,
      enum: ["Solo", "Family", "Friends", "Couple"],
    },
    photos: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
