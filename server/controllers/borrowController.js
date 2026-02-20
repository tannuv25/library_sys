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

    // 🔹 Check max 2 active borrows
    const activeCount = await Borrow.countDocuments({
      user: userId,
      status: "ACTIVE"
    });

    if (activeCount >= 2) {
      return res.status(400).json({
        message: "You can only borrow maximum 2 books at a time"
      });
    }

    // 🔹 Prevent same book twice
    const alreadyBorrowed = await Borrow.findOne({
      user: userId,
      book: bookId,
      status: "ACTIVE"
    });

    if (alreadyBorrowed) {
      return res.status(400).json({
        message: "You have already borrowed this book"
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        message: "No copies available"
      });
    }

    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);

    const totalCost = days * book.pricePerDay;

    const borrow = await Borrow.create({
      user: userId,
      book: bookId,
      borrowDate,
      dueDate,
      totalCost
    });

    // 🔹 Decrease inventory
    book.availableCopies -= 1;
    await book.save();

    res.status(201).json({
      message: "Book borrowed successfully",
      borrow
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrow = await Borrow.findById(borrowId).populate("book");

    if (!borrow || borrow.status === "RETURNED") {
      return res.status(400).json({
        message: "Invalid borrow record"
      });
    }

    const actualReturnDate = new Date();

    let overdueAmount = 0;

    if (actualReturnDate > borrow.dueDate) {
      const diffTime = actualReturnDate - borrow.dueDate;
      const overdueDays = Math.ceil(
        diffTime / (1000 * 60 * 60 * 24)
      );

      overdueAmount = overdueDays * 10; // ₹10 per day fine
    }

    borrow.returnDate = actualReturnDate;
    borrow.overdueAmount = overdueAmount;
    borrow.status = "RETURNED";
    await borrow.save();

    // 🔹 Increase inventory
    borrow.book.availableCopies += 1;
    await borrow.book.save();

    // 🔹 Add fine to user balance
    if (overdueAmount > 0) {
      await User.findByIdAndUpdate(borrow.user, {
        $inc: { balance: overdueAmount }
      });
    }

    res.json({
      message: "Book returned successfully",
      overdueAmount
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getActiveBorrow = async (req, res) => {
  try {
    const borrows = await Borrow.find({
      user: req.user.id,
      status: "ACTIVE"
    }).populate("book");

    res.json(borrows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBorrowHistory = async (req, res) => {
  try {
    const history = await Borrow.find({
      user: req.user.id,
      status: "RETURNED"
    }).populate("book");

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
