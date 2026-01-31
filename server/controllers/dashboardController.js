import Borrow from "../models/borrow.js";

/* ---------------- DASHBOARD SUMMARY ---------------- */
export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // Active borrow
    const activeBorrow = await Borrow.findOne({
      userId,
      status: "ACTIVE"
    }).populate("bookId");

    // Borrow history
    const history = await Borrow.find({
      userId,
      status: "RETURNED"
    });

    // Calculations
    const totalBorrowedBooks = history.length + (activeBorrow ? 1 : 0);

    const totalSpent = history.reduce(
      (sum, item) => sum + item.totalCost,
      0
    );

    const totalOverdue = history.reduce(
      (sum, item) => sum + item.overdueAmount,
      0
    );

    res.json({
      activeBorrow,
      stats: {
        totalBorrowedBooks,
        totalSpent,
        totalOverdue,
        historyCount: history.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
