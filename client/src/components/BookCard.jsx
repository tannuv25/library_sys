import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useBorrow } from "../context/BorrowContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function BookCard({ book }) {
  const isAvailable = book.isAvailable !== false;
  const { activeBorrow, borrowBook, loading } = useBorrow();
  const navigate = useNavigate();

  const handleBorrowClick = async (e) => {
    e.preventDefault(); // 👈 stop card navigation

    // ❌ already has active borrow
    if (activeBorrow) {
      Swal.fire({
        icon: "warning",
        title: "Already Borrowed",
        text: "You already have an active borrowed book. Please return it first.",
        showCancelButton: true,
        confirmButtonText: "Go to My Borrow",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/borrow");
        }
      });
      return;
    }

    // ✅ ask days
    const { value: days } = await Swal.fire({
      title: "Borrow Book",
      input: "number",
      inputLabel: "Number of days",
      inputPlaceholder: "Enter days",
      inputAttributes: { min: 1 },
      showCancelButton: true,
    });

    if (!days || days <= 0) return;

    await borrowBook(book._id, Number(days));
  };

  return (
    <Link to={`/books/${book._id}`} className="block">
      <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group cursor-pointer">

        {/* Image */}
        <div className="h-44 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={
              book.image
                ? `${BACKEND_URL}${book.image}`
                : "/book-placeholder.png"
            }
            alt={book.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-800">
            {book.title}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            by {book.author}
          </p>

          <p className="text-sm text-gray-500 mt-2 line-clamp-3">
            {book.description || "No description available"}
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium text-indigo-600">
              ₹{book.pricePerDay} / day
            </span>

            <span
              className={`text-xs px-2 py-1 rounded-full ${
                isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>

          {/* Borrow Button (logic injected) */}
          <button
            onClick={handleBorrowClick}
            disabled={!isAvailable || loading}
            className={`w-full mt-4 py-2 rounded-md text-sm font-medium transition pointer-cursor ${
              isAvailable
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Borrow Book
          </button>
        </div>
      </div>
    </Link>
  );
}
