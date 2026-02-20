import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Users,
  BookOpen,
  RefreshCcw,
  CheckCircle,
  IndianRupee,
  AlertTriangle,
  TrendingUp,
  Clock
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/dashboard/admin");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Overview of library performance and activity
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard title="Total Users" value={stats.totalUsers} icon={<Users size={20} />} color="text-blue-600 bg-blue-100" />
          <StatCard title="Total Books" value={stats.totalBooks} icon={<BookOpen size={20} />} color="text-purple-600 bg-purple-100" />
          <StatCard title="Active Borrows" value={stats.activeBorrows} icon={<RefreshCcw size={20} />} color="text-yellow-600 bg-yellow-100" />
          <StatCard title="Returned Borrows" value={stats.returnedBorrows} icon={<CheckCircle size={20} />} color="text-green-600 bg-green-100" />
          <StatCard title="Total Rental ₹" value={stats.totalRental} icon={<IndianRupee size={20} />} color="text-indigo-600 bg-indigo-100" />
          <StatCard title="Total Overdue ₹" value={stats.totalOverdue} icon={<AlertTriangle size={20} />} color="text-red-600 bg-red-100" />
          <StatCard title="Total Revenue ₹" value={stats.totalRevenue} icon={<TrendingUp size={20} />} color="text-emerald-600 bg-emerald-100" />
          <StatCard title="Overdue Books" value={stats.overdueCount} icon={<Clock size={20} />} color="text-pink-600 bg-pink-100" />

        </div>
      </div>
    </div>
  );
}

/* ---------- Modern Icon Card ---------- */
function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-6 border border-gray-100">
      
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>

      <h2 className="text-sm text-gray-500 mb-1">
        {title}
      </h2>

      <p className="text-3xl font-bold text-gray-800">
        {value ?? 0}
      </p>
    </div>
  );
}
