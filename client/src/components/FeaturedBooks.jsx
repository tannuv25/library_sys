export default function FeaturedBooks() {
  const books = [
    {
      title: "Atomic Habits",
      image: "/featured/p1.jpg",
      tag: "Best Seller",
    },
    {
      title: "Clean Code",
      image: "/featured/p2.jpg",
      tag: "Top Rated",
    },
    {
      title: "Deep Work",
      image: "/featured/p3.jpg",
      tag: "Trending",
    },
    {
      title: "The Pragmatic Programmer",
      image: "/featured/p4.jpg",
      tag: "Editor’s Pick",
    },
  ];

  return (
    <section className="bg-linear-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Featured Books
          </h2>
          <p className="text-gray-500 mt-2">
            Hand-picked books loved by our readers
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {books.map((book) => (
            <div
              key={book.title}
              className="group bg-white rounded-2xl shadow-md overflow-hidden
                         transform transition-all duration-300
                         hover:-translate-y-3 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold
                                 rounded-full bg-linear-to-r from-indigo-500 to-purple-600
                                 text-white shadow">
                  {book.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                  {book.title}
                </h3>

                <button
                  className="mt-4 w-full py-2 rounded-lg text-sm font-medium
                             bg-indigo-50 text-indigo-600
                             group-hover:bg-indigo-600 group-hover:text-white
                             transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
