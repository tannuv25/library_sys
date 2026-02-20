import Borrow from "../models/borrow.js";
import User from "../models/user.js";
import Book from "../models/book.js";

export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Active borrows (max 2 now)
    const activeBorrows = await Borrow.find({
      user: userId,
      status: "ACTIVE"
    }).populate("book");

    // Borrow history
    const history = await Borrow.find({
      user: userId,
      status: "RETURNED"
    });

    const totalBorrowedBooks =
      activeBorrows.length + history.length;

    const totalSpent = history.reduce(
      (sum, item) => sum + item.totalCost,
      0
    );

    const totalOverdue = history.reduce(
      (sum, item) => sum + item.overdueAmount,
      0
    );

    res.json({
      activeBorrows,
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



export const getAdminDashboard = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments({ role: "user" });
    const totalBooks = await Book.countDocuments();

    const activeBorrows = await Borrow.countDocuments({
      status: "ACTIVE"
    });

    const returnedBorrows = await Borrow.countDocuments({
      status: "RETURNED"
    });

    const revenueData = await Borrow.aggregate([
      {
        $group: {
          _id: null,
          totalRental: { $sum: "$totalCost" },
          totalOverdue: { $sum: "$overdueAmount" }
        }
      }
    ]);

    const totalRental = revenueData[0]?.totalRental || 0;
    const totalOverdue = revenueData[0]?.totalOverdue || 0;

    const totalRevenue = totalRental + totalOverdue;

    const overdueCount = await Borrow.countDocuments({
      status: "ACTIVE",
      dueDate: { $lt: new Date() }
    });

    res.json({
      totalUsers,
      totalBooks,
      activeBorrows,
      returnedBorrows,
      totalRental,
      totalOverdue,
      totalRevenue,
      overdueCount
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
