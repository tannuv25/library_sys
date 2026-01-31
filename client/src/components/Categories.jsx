export default function Categories() {
  const categories = [
    "Programming",
    "Fiction",
    "Self Help",
    "Academic",
    "Kids",
    "Business",
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Book Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat) => (
          <div
            key={cat}
            className="bg-white rounded-xl shadow p-6 text-center hover:shadow-md transition"
          >
            <p className="font-medium text-indigo-600">{cat}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
