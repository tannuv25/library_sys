import Book from "../models/book.js";

const booksData = [
  { title: "Clean Code", author: "Robert C. Martin", pricePerDay: 10, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p1.jpg" },
  { title: "Atomic Habits", author: "James Clear", pricePerDay: 8, totalCopies: 6, availableCopies: 6, image: "/uploads/books/p2.jpg" },
  { title: "The Pragmatic Programmer", author: "Andrew Hunt", pricePerDay: 12, totalCopies: 4, availableCopies: 4, image: "/uploads/books/p3.jpg" },
  { title: "Deep Work", author: "Cal Newport", pricePerDay: 9, totalCopies: 7, availableCopies: 7, image: "/uploads/books/p4.jpg" },
  { title: "You Don't Know JS", author: "Kyle Simpson", pricePerDay: 11, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p5.jpg" },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", pricePerDay: 7, totalCopies: 8, availableCopies: 8, image: "/uploads/books/p6.jpg" },
  { title: "Think and Grow Rich", author: "Napoleon Hill", pricePerDay: 7, totalCopies: 6, availableCopies: 6, image: "/uploads/books/p7.jpg" },
  { title: "Eloquent JavaScript", author: "Marijn Haverbeke", pricePerDay: 10, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p8.jpg" },
  { title: "The Alchemist", author: "Paulo Coelho", pricePerDay: 6, totalCopies: 9, availableCopies: 9, image: "/uploads/books/p9.jpg" },
  { title: "Zero to One", author: "Peter Thiel", pricePerDay: 9, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p10.jpg" },

  { title: "The Lean Startup", author: "Eric Ries", pricePerDay: 8, totalCopies: 6, availableCopies: 6, image: "/uploads/books/p11.jpg" },
  { title: "Start With Why", author: "Simon Sinek", pricePerDay: 7, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p12.jpg" },
  { title: "The 4-Hour Workweek", author: "Tim Ferriss", pricePerDay: 8, totalCopies: 7, availableCopies: 7, image: "/uploads/books/p13.jpg" },
  { title: "Sapiens", author: "Yuval Noah Harari", pricePerDay: 10, totalCopies: 6, availableCopies: 6, image: "/uploads/books/p14.jpg" },
  { title: "The Psychology of Money", author: "Morgan Housel", pricePerDay: 9, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p15.jpg" },
  { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", pricePerDay: 8, totalCopies: 6, availableCopies: 6, image: "/uploads/books/p16.jpg" },
  { title: "Ikigai", author: "Hector Garcia", pricePerDay: 7, totalCopies: 8, availableCopies: 8, image: "/uploads/books/p17.jpg" },
  { title: "Can't Hurt Me", author: "David Goggins", pricePerDay: 9, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p18.jpg" },
  { title: "Rework", author: "Jason Fried", pricePerDay: 8, totalCopies: 4, availableCopies: 4, image: "/uploads/books/p19.jpg" },
  { title: "Hooked", author: "Nir Eyal", pricePerDay: 7, totalCopies: 6, availableCopies: 6, image: "/uploads/books/p20.jpg" },

  { title: "The Power of Habit", author: "Charles Duhigg", pricePerDay: 8, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p21.jpg" },
  { title: "Thinking Fast and Slow", author: "Daniel Kahneman", pricePerDay: 11, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p22.jpg" },
  { title: "The Millionaire Fastlane", author: "MJ DeMarco", pricePerDay: 9, totalCopies: 7, availableCopies: 7, image: "/uploads/books/p23.jpg" },
  { title: "Drive", author: "Daniel Pink", pricePerDay: 8, totalCopies: 6, availableCopies: 6, image: "/uploads/books/p24.jpg" },
  { title: "Crushing It!", author: "Gary Vee", pricePerDay: 7, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p25.jpg" },
  { title: "The Art of War", author: "Sun Tzu", pricePerDay: 6, totalCopies: 10, availableCopies: 10, image: "/uploads/books/p26.jpg" },
  { title: "Meditations", author: "Marcus Aurelius", pricePerDay: 6, totalCopies: 8, availableCopies: 8, image: "/uploads/books/p27.jpg" },
  { title: "The Code Book", author: "Simon Singh", pricePerDay: 9, totalCopies: 4, availableCopies: 4, image: "/uploads/books/p28.jpg" },
  { title: "Grit", author: "Angela Duckworth", pricePerDay: 8, totalCopies: 6, availableCopies: 6, image: "/uploads/books/p29.jpg" },
  { title: "Tools of Titans", author: "Tim Ferriss", pricePerDay: 10, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p30.jpg" },

  { title: "The Hard Thing About Hard Things", author: "Ben Horowitz", pricePerDay: 10, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p31.jpg" },
  { title: "The Startup Owner's Manual", author: "Steve Blank", pricePerDay: 12, totalCopies: 4, availableCopies: 4, image: "/uploads/books/p32.jpg" },
  { title: "Make Time", author: "Jake Knapp", pricePerDay: 7, totalCopies: 6, availableCopies: 6, image: "/uploads/books/p33.jpg" },
  { title: "The One Thing", author: "Gary Keller", pricePerDay: 8, totalCopies: 7, availableCopies: 7, image: "/uploads/books/p34.jpg" },
  { title: "Influence", author: "Robert Cialdini", pricePerDay: 9, totalCopies: 6, availableCopies: 6, image: "/uploads/books/p35.jpg" },
  { title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", pricePerDay: 8, totalCopies: 9, availableCopies: 9, image: "/uploads/books/p36.jpg" },
  { title: "Man's Search for Meaning", author: "Viktor Frankl", pricePerDay: 7, totalCopies: 8, availableCopies: 8, image: "/uploads/books/p37.jpg" },
  { title: "The Design of Everyday Things", author: "Don Norman", pricePerDay: 9, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p38.jpg" },
  { title: "The Phoenix Project", author: "Gene Kim", pricePerDay: 10, totalCopies: 4, availableCopies: 4, image: "/uploads/books/p39.jpg" },
  { title: "Working Backwards", author: "Colin Bryar", pricePerDay: 9, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p40.jpg" },

  { title: "The Innovator's Dilemma", author: "Clayton Christensen", pricePerDay: 11, totalCopies: 4, availableCopies: 4, image: "/uploads/books/p41.jpg" },
  { title: "Hook Point", author: "Brendan Kane", pricePerDay: 7, totalCopies: 6, availableCopies: 6, image: "/uploads/books/p42.jpg" },
  { title: "Essentialism", author: "Greg McKeown", pricePerDay: 8, totalCopies: 7, availableCopies: 7, image: "/uploads/books/p43.jpg" },
  { title: "Never Split the Difference", author: "Chris Voss", pricePerDay: 9, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p44.jpg" },
  { title: "The Compound Effect", author: "Darren Hardy", pricePerDay: 7, totalCopies: 8, availableCopies: 8, image: "/uploads/books/p45.jpg" },
  { title: "Blue Ocean Strategy", author: "W. Chan Kim", pricePerDay: 10, totalCopies: 5, availableCopies: 5, image: "/uploads/books/p46.jpg" },
  { title: "Measure What Matters", author: "John Doerr", pricePerDay: 9, totalCopies: 6, availableCopies: 6, image: "/uploads/books/p47.jpg" },
  { title: "The Tipping Point", author: "Malcolm Gladwell", pricePerDay: 8, totalCopies: 7, availableCopies: 7, image: "/uploads/books/p48.jpg" },
  { title: "Outliers", author: "Malcolm Gladwell", pricePerDay: 8, totalCopies: 6, availableCopies: 6, image: "/uploads/books/p49.jpg" },
  { title: "The Magic of Thinking Big", author: "David Schwartz", pricePerDay: 7, totalCopies: 8, availableCopies: 8, image: "/uploads/books/p50.jpg" }
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
