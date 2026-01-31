import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    image: {
      type: String, 
      required: false,
    },
    pricePerDay: {
      type: Number,
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
