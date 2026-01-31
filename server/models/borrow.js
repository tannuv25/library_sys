import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    borrowDate: {
      type: Date,
      default: Date.now
    },
    dueDate: {
      type: Date,
      required: true
    },
    returnDate: Date,
    totalCost: {
      type: Number,
      required: true
    },
    overdueAmount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ["ACTIVE", "RETURNED"],
      default: "ACTIVE"
    }
  },
  { timestamps: true }
);

const Borrow = mongoose.model("Borrow", borrowSchema);
export default Borrow;
