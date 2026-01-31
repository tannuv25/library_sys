import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useBorrow } from "../context/BorrowContext";

export default function BorrowPage() {
  const { activeBorrow, loading, returnBook } = useBorrow();

  return (
    <>
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          My Borrowed Book
        </h1>

        {!activeBorrow && (
          <div className="bg-white border rounded-xl p-6 text-gray-500">
            You have no active borrowed books.
          </div>
        )}

        {activeBorrow && (
          <div className="bg-white border rounded-xl shadow-sm p-6 grid md:grid-cols-2 gap-6">
            
            {/* Book Info */}
            <div>
              <h2 className="text-xl font-semibold">
                {activeBorrow.bookId.title}
              </h2>
              <p className="text-gray-600">
                by {activeBorrow.bookId.author}
              </p>

              <p className="mt-3 text-sm text-gray-500">
                Borrowed on:{" "}
                {new Date(activeBorrow.borrowDate).toDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Due date:{" "}
                {new Date(activeBorrow.dueDate).toDateString()}
              </p>

              <p className="mt-3 font-medium text-indigo-600">
                Total Cost: ₹{activeBorrow.totalCost}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-center">
              <button
                disabled={loading}
                onClick={() => returnBook(activeBorrow._id)}
                className="w-full py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Return Book
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
