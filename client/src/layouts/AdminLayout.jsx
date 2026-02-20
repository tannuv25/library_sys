import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  UserCircle2,
  ChevronDown
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside
        className={`bg-white border-r transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b font-bold text-indigo-600 text-lg">
          {sidebarOpen ? "Smart Library" : "SL"}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">

          <SidebarLink
            to="/admin-dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            sidebarOpen={sidebarOpen}
          />

          <SidebarLink
            to="/admin-books"
            icon={<BookOpen size={20} />}
            label="Manage Books"
            sidebarOpen={sidebarOpen}
          />

          {/* Future Ready Links */}
          <SidebarLink
            to="#"
            icon={<Users size={20} />}
            label="Users"
            sidebarOpen={sidebarOpen}
          />

          <SidebarLink
            to="#"
            icon={<BarChart3 size={20} />}
            label="Analytics"
            sidebarOpen={sidebarOpen}
          />

          <SidebarLink
            to="#"
            icon={<Settings size={20} />}
            label="Settings"
            sidebarOpen={sidebarOpen}
          />

        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between">

          {/* Left */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-indigo-600"
          >
            <Menu size={22} />
          </button>

          {/* Right */}
          <div className="relative">

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition"
            >
              <UserCircle2 size={22} />
              <span className="text-sm font-medium">
                {user?.name}
              </span>
              <ChevronDown size={16} />
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setProfileOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                >
                  Logout
                </button>
              </div>
            )}

          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

/* Sidebar Link */
function SidebarLink({ to, icon, label, sidebarOpen }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
          isActive
            ? "bg-indigo-50 text-indigo-600 font-medium"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      {sidebarOpen && <span>{label}</span>}
    </NavLink>
  );
}
