import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import HowItWorks from "../components/HowItWorks";
import LibraryRules from "../components/LibraryRules";
import FeaturedBooks from "../components/FeaturedBooks";
import HeroStats from "../components/HeroStats";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroStats />
      <Categories />
      <HowItWorks />
      <LibraryRules />
      <FeaturedBooks />

      <Footer />
    </>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-indigo-600 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
