import Book from "../models/book.js";
import Borrow from "../models/borrow.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    const publicBooks = books.map((book) => ({
      _id: book._id,
      title: book.title,
      author: book.author,
      image: book.image,
      pricePerDay: book.pricePerDay,
      isAvailable: book.availableCopies > 0
    }));

    res.json({ books: publicBooks });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAdminBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const total = await Book.countDocuments(query);

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      books,
      total,
      page,
      pages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.json(book);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createBook = async (req, res) => {
  try {
    const { title, author, image, pricePerDay, totalCopies } = req.body;

    if (!title || !author || !pricePerDay || !totalCopies) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }

    if (totalCopies < 1) {
      return res.status(400).json({
        message: "Total copies must be at least 1"
      });
    }

    const book = await Book.create({
      title,
      author,
      image,
      pricePerDay,
      totalCopies,
      availableCopies: totalCopies
    });

    res.status(201).json({
      message: "Book created successfully",
      book
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateBook = async (req, res) => {
  try {
    const { title, author, image, pricePerDay, totalCopies } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    // 🔹 Handle totalCopies update safely
    if (totalCopies !== undefined) {

      if (totalCopies < 1) {
        return res.status(400).json({
          message: "Total copies must be at least 1"
        });
      }

      const activeBorrows = await Borrow.countDocuments({
        book: book._id,
        status: "ACTIVE"
      });

      if (totalCopies < activeBorrows) {
        return res.status(400).json({
          message: "Cannot reduce total copies below active borrows"
        });
      }

      const difference = totalCopies - book.totalCopies;

      book.totalCopies = totalCopies;
      book.availableCopies += difference;
    }

    if (title) book.title = title;
    if (author) book.author = author;
    if (image) book.image = image;
    if (pricePerDay) book.pricePerDay = pricePerDay;

    await book.save();

    res.json({
      message: "Book updated successfully",
      book
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    const activeBorrows = await Borrow.countDocuments({
      book: book._id,
      status: "ACTIVE"
    });

    if (activeBorrows > 0) {
      return res.status(400).json({
        message: "Cannot delete book with active borrows"
      });
    }

    await book.deleteOne();

    res.json({
      message: "Book deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
