export default function LibraryRules() {
  const rules = [
    "Maximum 2 books can be borrowed at a time",
    "Borrow duration is 14 days",
    "Late fine: ₹5 per day",
    "Books must be returned in good condition",
  ];

  return (
    <section className="py-16 max-w-5xl mx-auto px-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Library Rules & Policies
      </h2>

      <ul className="bg-white rounded-xl shadow p-6 space-y-3">
        {rules.map((rule, i) => (
          <li key={i} className="text-gray-700">
            • {rule}
          </li>
        ))}
      </ul>
    </section>
  );
}
