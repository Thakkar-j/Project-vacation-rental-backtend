import mongoose from "mongoose";
const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
      enum: ["Apartment", "House", "Villa", "Cabin", "Condo"],
    },
    bedrooms: {
      type: String,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 2,
      max: 10,
    },
    thumbnailImage: {
      type: String,
      required: true,
    },
    internalImages: {
      type: [String],
      required: true,
    },
    amenities: {
      type: [String],
      required: true,
    },
    petsAllowed: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    smokingAllowed: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Property", propertySchema);
