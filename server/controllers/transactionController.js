import Transaction from "../models/transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
