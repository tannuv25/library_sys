import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import api from "../api/axios";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const res = await api.get("/api/books");
      console.log("Books API response:", res.data); // 👈 check once
      setBooks(res.data.books);  // ✅ FIXED
    } catch (err) {
      console.error(err);
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
}, []);


  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="bg-linear-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 py-12 text-white">
          <h1 className="text-3xl font-bold">Books Library</h1>
          <p className="text-indigo-100 mt-1">
            Browse available books and borrow easily
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {loading && (
          <p className="text-center text-gray-500">
            Loading books...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && books.length === 0 && (
          <p className="text-center text-gray-500">
            No books available
          </p>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
