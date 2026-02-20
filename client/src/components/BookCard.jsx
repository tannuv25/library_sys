import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useBorrow } from "../context/BorrowContext";
import { useAuth } from "../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function BookCard({ book }) {
 const isAvailable = book.isAvailable;


  const { activeBorrow, borrowBook, loading } = useBorrow();
  const { user } = useAuth();
  const navigate = useNavigate();

 
  const showAuthModal = () => {
    Swal.fire({
      icon: "info",
      title: "Login Required 🔐",
      text: "Please login or signup to continue.",
      showCancelButton: true,
      confirmButtonText: "Login",
      cancelButtonText: "Signup",
      backdrop: `
        rgba(0,0,0,0.35)
        backdrop-filter: blur(6px);
      `,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login", {
          state: { redirectTo: `/books/${book._id}` },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate("/signup", {
          state: { redirectTo: `/books/${book._id}` },
        });
      }
    });
  };

  /* 📘 CARD / IMAGE CLICK */
  const handleCardClick = () => {
    if (!user) {
      showAuthModal();
      return;
    }

    navigate(`/books/${book._id}`);
  };

  /* 📚 BORROW CLICK */
  const handleBorrowClick = async (e) => {
    e.stopPropagation(); // 👈 VERY IMPORTANT
    e.preventDefault();

    if (!user) {
      showAuthModal();
      return;
    }

    if (activeBorrow) {
      Swal.fire({
        icon: "warning",
        title: "Already Borrowed 📚",
        text: "You already have an active borrowed book. Please return it first.",
        showCancelButton: true,
        confirmButtonText: "Go to My Borrow",
      }).then((result) => {
        if (result.isConfirmed) navigate("/borrow");
      });
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
        title: "Book Borrowed 🎉",
        text: `"${book.title}" has been borrowed for ${days} days.`,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Borrow Failed",
        text: err?.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group cursor-pointer"
    >
      {/* Image */}
      <div className="h-44 w-full bg-gray-100 overflow-hidden">
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

        {/* Borrow Button */}
        <button
          onClick={handleBorrowClick}
          disabled={!isAvailable || loading}
          className={`w-full mt-4 py-2 rounded-md text-sm font-medium transition ${
            isAvailable
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Borrow Book
        </button>
      </div>
    </div>
  );
}
