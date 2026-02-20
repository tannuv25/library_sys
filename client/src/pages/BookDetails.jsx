import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useBorrow } from "../context/BorrowContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeBorrow, borrowBook, loading: borrowLoading } = useBorrow();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const activeCount = Array.isArray(activeBorrow)
    ? activeBorrow.length
    : activeBorrow
    ? 1
    : 0;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/api/books/${id}`);
        setBook(res.data);
      } catch {
        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleBorrow = async () => {
    if (book.availableCopies <= 0) {
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: "This book is currently unavailable.",
      });
      return;
    }

    if (activeCount >= 2) {
      Swal.fire({
        icon: "warning",
        title: "Borrow Limit Reached 📚",
        text: "You already have 2 active borrowed books.",
        confirmButtonText: "Go to My Dashboard",
      }).then(() => navigate("/dashboard"));
      return;
    }

    const { value: days } = await Swal.fire({
      title: "Borrow Book",
      input: "number",
      inputLabel: "Number of days",
      inputPlaceholder: "Enter days",
      inputAttributes: { min: 1 },
      showCancelButton: true,
      confirmButtonText: "Borrow",
    });

    if (!days || days <= 0) return;

    try {
      await borrowBook(book._id, Number(days));

      Swal.fire({
        icon: "success",
        title: "Book Borrowed Successfully 🎉",
        text: `"${book.title}" has been borrowed.`,
      });

      navigate("/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Borrow Failed",
        text: err?.response?.data?.message || "Something went wrong",
      });
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading book details...
      </div>
    );

  if (error)
    return (
      <p className="text-center mt-20 text-red-500">
        {error}
      </p>
    );

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

          <p className="text-gray-600 mt-1">
            by {book.author}
          </p>

          <p className="mt-4 text-gray-700">
            {book.description || "No description available."}
          </p>

          <div className="mt-6 flex items-center gap-6">
            <span className="text-xl font-semibold text-indigo-600">
              ₹{book.pricePerDay} / day
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                book.availableCopies > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {book.availableCopies > 0
                ? `Available (${book.availableCopies})`
                : "Out of Stock"}
            </span>
          </div>

          <button
            onClick={handleBorrow}
            disabled={
              book.availableCopies === 0 || borrowLoading
            }
            className={`mt-6 w-full py-3 rounded-md font-medium transition ${
              book.availableCopies > 0
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {borrowLoading
              ? "Processing..."
              : "Borrow Book"}
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
