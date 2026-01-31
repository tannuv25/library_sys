import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Transactions() {
  // 🔹 STATIC DATA (for now)
  const transactions = [
    {
      _id: "1",
      type: "credit",
      reason: "Wallet Recharge",
      amount: 200,
      balanceAfter: 200,
      createdAt: "2026-01-10",
    },
    {
      _id: "2",
      type: "debit",
      reason: "Book Borrow - Clean Code",
      amount: 10,
      balanceAfter: 190,
      createdAt: "2026-01-12",
    },
    {
      _id: "3",
      type: "debit",
      reason: "Late Fine",
      amount: 5,
      balanceAfter: 185,
      createdAt: "2026-01-15",
    },
    {
      _id: "4",
      type: "credit",
      reason: "Admin Added Balance",
      amount: 100,
      balanceAfter: 285,
      createdAt: "2026-01-18",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 px-4 py-12">
        <div className="max-w-6xl mx-auto">

          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Transactions
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              View your wallet activity and payment history
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Description</th>
                    <th className="px-6 py-4 text-left">Type</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                    <th className="px-6 py-4 text-right">Balance</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((tx) => (
                    <tr
                      key={tx._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {tx.reason}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            tx.type === "credit"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {tx.type === "credit" ? "Credit" : "Debit"}
                        </span>
                      </td>

                      <td
                        className={`px-6 py-4 text-right font-semibold ${
                          tx.type === "credit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {tx.type === "credit" ? "+" : "-"}₹{tx.amount}
                      </td>

                      <td className="px-6 py-4 text-right text-gray-800 font-medium">
                        ₹{tx.balanceAfter}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Transactions;
