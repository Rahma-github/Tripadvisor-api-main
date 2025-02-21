const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    tripName: { type: String, required: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: "Destination", required: true },
    date: { type: Date }, 
    description: { type: String },
    visibility: { type: String, enum: ["public", "restricted"], default: "restricted" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, versionKey: false }
);

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
