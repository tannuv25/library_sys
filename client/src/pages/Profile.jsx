import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No user data
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-indigo-50 via-white to-purple-50">

      {/* Decorative blur */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

      <div className="relative flex items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl w-full space-y-6">

          {/* 🔹 PROFILE CARD */}
          <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg p-8">

            {/* Header */}
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>

                <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  Active Member
                </span>
              </div>
            </div>

            <hr className="my-8" />

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileItem label="User ID" value={user._id} />
              <ProfileItem label="Email" value={user.email} />

              {/* Static */}
              <ProfileItem label="Role" value="Student" />
              <ProfileItem label="Library Card" value="Premium Member" />
            </div>
          </div>

          {/* 🔹 WALLET / BALANCE CARD */}
          <div className="bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            <div>
              <p className="text-sm text-gray-500">Wallet Balance</p>
              <h3 className="text-3xl font-bold text-indigo-600 mt-1">
                ₹{user.balance ?? 0}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Available for borrowing & fines
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/transactions"
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition"
              >
                View Transactions
              </Link>

              <button
                className="px-5 py-2 border border-indigo-600 text-indigo-600 rounded-lg text-sm hover:bg-indigo-50 transition"
              >
                Add Balance
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const ProfileItem = ({ label, value }) => (
  <div className="bg-gray-50/60 rounded-lg p-4">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="text-sm font-medium text-gray-800 break-all">
      {value}
    </p>
  </div>
);

export default Profile;
