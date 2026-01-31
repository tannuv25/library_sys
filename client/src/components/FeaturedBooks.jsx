export default function FeaturedBooks() {
  const books = [
    "Atomic Habits",
    "Clean Code",
    "Deep Work",
    "The Pragmatic Programmer",
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Featured Books
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book}
              className="bg-white rounded-xl shadow p-5 text-center hover:shadow-md transition"
            >
              <p className="font-medium text-indigo-600">{book}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
