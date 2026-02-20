import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate(); 

  const [loading, setLoading] = useState(true);
  const [activeBorrow, setActiveBorrow] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await api.get("/api/dashboard/user");

        const { activeBorrow, stats } = res.data;

        setActiveBorrow(activeBorrow);

        setStats([
          {
            title: "Active Borrows",
            value: activeBorrow ? 1 : 0,
            gradient: "from-indigo-500 to-indigo-700",
            icon: "📚",
          },
          {
            title: "Total Due",
            value: `₹${stats.totalOverdue}`,
            gradient: "from-red-500 to-red-700",
            icon: "💸",
          },
          {
            title: "Books Borrowed",
            value: stats.totalBorrowedBooks,
            gradient: "from-green-500 to-green-700",
            icon: "📖",
          },
          {
            title: "Balance",
            value: `₹${stats.totalSpent - stats.totalOverdue}`,
            gradient: "from-blue-500 to-blue-700",
            icon: "💰",
          },
        ]);
      } catch (error) {
        console.error("Dashboard error", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="py-20 text-center text-gray-500">
          Loading dashboard...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="bg-linear-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 py-12 text-white">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-indigo-100 mt-1">
            Track your borrowing activity and payments
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, idx) => (
          <StatCard key={idx} item={item} />
        ))}
      </section>

      {/* Active Borrow + Quick Actions */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-6">
        {/* Active Borrow */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Active Borrows
          </h2>

          {activeBorrow ? (
            <div className="border rounded-lg p-4 text-sm">
              <p className="font-medium">
                📘 {activeBorrow.bookId?.title}
              </p>
              <p className="text-gray-500">
                Due: {new Date(activeBorrow.dueDate).toDateString()}
              </p>
              <p className="text-gray-500">
                Cost: ₹{activeBorrow.totalCost}
              </p>
            </div>
          ) : (
            <div className="border rounded-lg p-4 text-gray-500 text-sm">
              No active borrows right now.
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/books")}
              disabled={!!activeBorrow}
              className={`w-full py-2 rounded-md transition ${
                activeBorrow
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Borrow New Book
            </button>

            <button
              onClick={() => navigate("/transactions")}
              className="w-full py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition"
            >
              View History
            </button>
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-6">
        {/* Borrow Trend */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Borrow Trend (Last 7 Days)
          </h2>

          <div className="flex items-end gap-4 h-40">
            {[2, 5, 3, 6, 4, 1, 2].map((value, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div
                  className="w-8 rounded-md bg-indigo-500"
                  style={{ height: `${value * 20}px` }}
                />
                <span className="text-xs text-gray-500">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Overview */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Payment Overview
          </h2>

          <Progress label="Paid" value={70} color="bg-green-500" />
          <Progress label="Pending" value={30} color="bg-red-500" />
        </div>
      </section>

      {/* Recent Activity */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>

          <div className="text-gray-500 text-sm">
            No recent activity found.
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ---------- Components ---------- */

function StatCard({ item }) {
  return (
    <div
      className={`rounded-xl text-white p-6 shadow-lg bg-linear-to-r ${item.gradient} hover:scale-[1.03] transition`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{item.title}</p>
          <h3 className="text-3xl font-bold mt-1">{item.value}</h3>
        </div>
        <div className="text-4xl">{item.icon}</div>
      </div>
    </div>
  );
}

function Progress({ label, value, color }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
