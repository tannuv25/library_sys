export default function HowItWorks() {
  const steps = [
    { step: "1", title: "Search Book", desc: "Find books easily by title or category." },
    { step: "2", title: "Borrow Instantly", desc: "Borrow with one click if available." },
    { step: "3", title: "Track & Return", desc: "Track due dates and return on time." },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-10">
          How Smart Library Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-3">
                {s.step}
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
