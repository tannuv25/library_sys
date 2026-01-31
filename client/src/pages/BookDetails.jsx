import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  return (
    <>
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

        {/* Image */}
        <img
         src={
              book.image
                ? `${BACKEND_URL}${book.image}`
                : "/book-placeholder.png"
            }
          alt={book.title}
          className="w-full h-96 object-cover rounded-xl border"
        />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {book.title}
          </h1>

          <p className="text-gray-600 mt-1">by {book.author}</p>

          <p className="mt-4 text-gray-700">
            {book.description || "No description available."}
          </p>

          <div className="mt-6 flex items-center gap-6">
            <span className="text-xl font-semibold text-indigo-600">
              ₹{book.pricePerDay} / day
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                book.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {book.available ? "Available" : "Unavailable"}
            </span>
          </div>

          <button
            disabled={!book.available}
            className={`mt-6 w-full py-3 rounded-md font-medium transition ${
              book.available
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Borrow Book
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
