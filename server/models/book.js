import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true
    },
    author: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    pricePerDay: {
      type: Number,
      required: true
    },
    totalCopies: {
      type: Number,
      required: true,
      min: 1
    },
    availableCopies: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);

// text search support
bookSchema.index({ title: "text", author: "text" });

const Book = mongoose.model("Book", bookSchema);
export default Book;
