import Borrow from "../models/borrow.js";
import Book from "../models/book.js";
import User from "../models/user.js";

/* ---------------- BORROW BOOK ---------------- */
export const borrowBook = async (req, res) => {
  try {
    const { bookId, days } = req.body;
    const userId = req.user.id;

    if (!bookId || !days || days <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const user = await User.findById(userId);
    if (user.hasActiveBorrow) {
      return res.status(400).json({
        message: "You already have an active borrowed book"
      });
    }

    const book = await Book.findById(bookId);
    if (!book || !book.isAvailable) {
      return res.status(400).json({ message: "Book not available" });
    }

    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);

    const totalCost = days * book.pricePerDay;

    const borrow = await Borrow.create({
      userId,
      bookId,
      borrowDate,
      dueDate,
      totalCost
    });

    // update user & book
    user.hasActiveBorrow = true;
    await user.save();

    book.isAvailable = false;
    await book.save();

    res.status(201).json({
      message: "Book borrowed successfully",
      borrow
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- RETURN BOOK ---------------- */
export const returnBook = async (req, res) => {
  try {
    const { borrowId, returnDate } = req.body;

    const borrow = await Borrow.findById(borrowId);
    if (!borrow || borrow.status === "RETURNED") {
      return res.status(400).json({ message: "Invalid borrow record" });
    }

    const actualReturnDate = returnDate
      ? new Date(returnDate)
      : new Date();

    let overdueAmount = 0;

    if (actualReturnDate > borrow.dueDate) {
      const diffTime = actualReturnDate - borrow.dueDate;
      const overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      overdueAmount = overdueDays * 10; // fixed overdue charge
    }

    borrow.returnDate = actualReturnDate;
    borrow.overdueAmount = overdueAmount;
    borrow.status = "RETURNED";
    await borrow.save();

    // update user & book
    await User.findByIdAndUpdate(borrow.userId, {
      hasActiveBorrow: false
    });

    await Book.findByIdAndUpdate(borrow.bookId, {
      isAvailable: true
    });

    res.json({
      message: "Book returned successfully",
      borrow
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- ACTIVE BORROW ---------------- */
export const getActiveBorrow = async (req, res) => {
  try {
    const borrow = await Borrow.findOne({
      userId: req.user.id,
      status: "ACTIVE"
    }).populate("bookId");

    res.json(borrow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- BORROW HISTORY ---------------- */
export const getBorrowHistory = async (req, res) => {
  try {
    const history = await Borrow.find({
      userId: req.user.id,
      status: "RETURNED"
    }).populate("bookId");

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
