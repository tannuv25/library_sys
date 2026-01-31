import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    reason: {
      type: String, // Borrow, Fine, Recharge
      required: true,
    },
    balanceAfter: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
