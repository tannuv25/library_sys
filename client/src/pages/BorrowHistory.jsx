import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useBorrow } from "../context/BorrowContext";

export default function BorrowHistory() {
  const { history, loading } = useBorrow();

  return (
    <>
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Borrow History
        </h1>

        {loading && (
          <div className="text-center text-gray-500">
            Loading borrow history...
          </div>
        )}

        {!loading && history.length === 0 && (
          <div className="bg-white border rounded-xl p-6 text-gray-500">
            No borrow history found.
          </div>
        )}

        {!loading && history.length > 0 && (
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-gray-600">
                  <th className="px-4 py-3">Book</th>
                  <th className="px-4 py-3">Borrowed On</th>
                  <th className="px-4 py-3">Returned On</th>
                  <th className="px-4 py-3">Total Cost</th>
                  <th className="px-4 py-3">Overdue</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">
                        {item.bookId?.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.bookId?.author}
                      </p>
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {new Date(item.borrowDate).toDateString()}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {new Date(item.returnDate).toDateString()}
                    </td>

                    <td className="px-4 py-3 font-medium text-indigo-600">
                      ₹{item.totalCost}
                    </td>

                    <td className="px-4 py-3">
                      {item.overdueAmount > 0 ? (
                        <span className="text-red-600 font-medium">
                          ₹{item.overdueAmount}
                        </span>
                      ) : (
                        <span className="text-green-600 font-medium">
                          ₹0
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
