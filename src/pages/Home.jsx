import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { FaLeaf, FaShieldAlt, FaIndustry, FaTruck } from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt size={30} className="text-blue-600" />,
    title: "Leak-Proof & Safe",
    desc: "Chemically compatible bottles engineered for safe storage of pesticides and fertilizers.",
  },
  {
    icon: <FaIndustry size={30} className="text-blue-600" />,
    title: "Advanced Manufacturing",
    desc: "State-of-the-art facility with strict quality control for consistent, reliable output.",
  },
  {
    icon: <FaTruck size={30} className="text-blue-600" />,
    title: "Pan-India Delivery",
    desc: "Serving clients across domestic and international markets with timely dispatch.",
  },
  {
    icon: <FaLeaf size={30} className="text-blue-600" />,
    title: "Eco-Friendly Focus",
    desc: "Actively exploring recyclable and sustainable packaging solutions for a greener future.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-4 bg-gray-800 shadow-md">
        <Logo width={150} />
        <div className="flex gap-3 md:gap-4">
          <Link
            to="/login"
            className="text-white border border-white px-4 py-2 rounded-lg text-sm md:text-base hover:bg-white hover:text-gray-800 transition font-semibold"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm md:text-base hover:bg-blue-700 transition font-semibold"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-linear-to-br from-gray-800 to-gray-900 text-white py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm mb-3">
            Premium Agrochemical Packaging
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            PET Bottles for <span className="text-red-500">Agrochemicals</span>{" "}
            &amp; Pesticides
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            RK Polyplast delivers durable, leak-proof, and UV-resistant
            packaging trusted by agriculture businesses across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl text-lg transition shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold px-8 py-3 rounded-xl text-lg transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose <span className="text-blue-500">ShopKart?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition"
              >
                <div className="mb-4">{f.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              About <span className="text-red-500">Us</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
              <span className="font-bold text-blue-500">ShopKart</span> is a
              trusted name in agrochemical packaging, delivering superior
              solutions that combine functionality, durability, and design
              excellence.
            </p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              From small-volume packaging to bulk containers, we offer a
              comprehensive range of bottle sizes and designs to suit various
              product requirements — all with a customer-centric approach.
            </p>
            <Link
              to="/register"
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition inline-block"
            >
              Explore Products →
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <Logo width={280} />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-blue-600 py-14 px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Ready to Order Premium Packaging?
        </h2>
        <p className="text-blue-100 text-lg mb-8">
          Join hundreds of satisfied clients. Register now and browse our full
          product catalog.
        </p>
        <Link
          to="/register"
          className="bg-white text-blue-600 font-bold px-10 py-3 rounded-xl text-lg hover:bg-blue-50 transition shadow-lg"
        >
          Create Free Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-6 text-sm">
        © {new Date().getFullYear()} ShopKart. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
