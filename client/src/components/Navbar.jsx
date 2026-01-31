import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/login");
  };

  if (loading) {
  return <div className="h-16 bg-white border-b"></div>;
}

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              SL
            </div>
            <span className="text-lg font-semibold text-gray-800">
              Smart Library
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <Link to="/books" className="hover:text-indigo-600">Books</Link>

            {user && (
              <Link to="/dashboard" className="hover:text-indigo-600">
                Dashboard
              </Link>
            )}

            <span className="h-5 w-px bg-gray-300"></span>

            {/* 🔐 AUTH SECTION */}
            {!user ? (
              <>
                <Link to="/login" className="hover:text-indigo-600">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                {/* PROFILE ICON */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold pointer-cursor"
                >
                  {user.name?.charAt(0).toUpperCase()}
                </button>

                {/* DROPDOWN */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg overflow-hidden">
                    <div className="px-4 py-2 text-sm text-gray-500">
                      {user.email}
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            <MobileLink to="/" label="Home" onClick={() => setOpen(false)} />
            <MobileLink to="/books" label="Books" onClick={() => setOpen(false)} />

            {user && (
              <MobileLink
                to="/dashboard"
                label="Dashboard"
                onClick={() => setOpen(false)}
              />
            )}

            {!user ? (
              <div className="pt-3 flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-4 py-2 border rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center px-4 py-2 bg-indigo-600 text-white rounded-md"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-2 text-red-500"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

/* ---------- Helper ---------- */
function MobileLink({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-2 text-gray-700 font-medium hover:text-indigo-600"
    >
      {label}
    </Link>
  );
}
