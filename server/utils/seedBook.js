import Book from "../models/book.js";

const booksData = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    pricePerDay: 10,
    isAvailable: true,
    image: "/uploads/books/p1.jpg",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    pricePerDay: 8,
    isAvailable: true,
    image: "/uploads/books/p2.jpg",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    pricePerDay: 12,
    isAvailable: true,
    image: "/uploads/books/p3.jpg",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    pricePerDay: 9,
    isAvailable: true,
    image: "/uploads/books/p4.jpg",
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    pricePerDay: 11,
    isAvailable: true,
    image: "/uploads/books/p5.jpg",
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    pricePerDay: 7,
    isAvailable: true,
    image: "/uploads/books/p6.jpg",
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    pricePerDay: 7,
    isAvailable: true,
    image: "/uploads/books/p7.jpg",
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    pricePerDay: 10,
    isAvailable: true,
    image: "/uploads/books/p8.jpg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    pricePerDay: 6,
    isAvailable: true,
    image: "/uploads/books/p9.jpg",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    pricePerDay: 9,
    isAvailable: true,
    image: "/uploads/books/p10.jpg",
  },
];

const seedBooks = async () => {
  try {
    await Book.deleteMany();
    await Book.insertMany(booksData);
    console.log("📚 Books seeded successfully with LOCAL images");
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  }
};

export default seedBooks;
