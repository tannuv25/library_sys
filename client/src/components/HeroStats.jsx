import { Link } from "react-router-dom";

export default function HeroStats() {
  return (
    <section
      className="relative h-[85vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/hero-books.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Smart Library Management System
        </h1>

        <p className="text-gray-200 mb-8 text-lg">
          Borrow books easily, track history, and manage everything digitally.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <Link to="/books" className="px-6 py-3 bg-indigo-600 text-white rounded-lg">
            Explore Books
          </Link>
          <Link to="/dashboard" className="px-6 py-3 bg-white text-indigo-600 rounded-lg">
            View Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
          <Stat label="Total Books" value="1200+" />
          <Stat label="Active Members" value="350+" />
          <Stat label="Borrowed Today" value="48" />
          <Stat label="Avg Rating" value="4.6★" />
        </div>
      </div>
    </section>
  );
}

const Stat = ({ label, value }) => (
  <div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm text-gray-300">{label}</p>
  </div>
);
