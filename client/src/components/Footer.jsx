import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Smart Library
          </h2>
          <p className="text-sm text-gray-400">
            A modern library management system to borrow books,
            track history, and manage dues effortlessly.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white cursor-pointer">Home</Link></li>
            <li><Link to="/books" className="hover:text-white cursor-pointer">Books</Link></li>
            <li><Link to="/dashboard" className="hover:text-white cursor-pointer">Dashboard</Link></li>
            <li><Link to="/login" className="hover:text-white cursor-pointer">Login</Link></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Project Info
          </h3>
          <p className="text-sm text-gray-400">
            Built using React, Tailwind CSS, Node.js, and MongoDB
            as part of a full-stack assignment.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Smart Library System. All rights reserved.
      </div>
    </footer>
  );
}
