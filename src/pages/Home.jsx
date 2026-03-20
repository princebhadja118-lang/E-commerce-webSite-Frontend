import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { FiArrowRight } from "react-icons/fi";

const Home = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 text-center">
    <Logo width={180} />
    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mt-8 mb-4">
      Shop Smart,{" "}
      <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-400">
        Save More
      </span>
    </h1>
    <p className="text-gray-500 text-lg max-w-xl mb-10">
      Discover thousands of products at the best prices — delivered fast, right
      to your doorstep.
    </p>
    <div className="flex gap-4">
      <Link
        to="/register"
        className="group bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold px-8 py-3 rounded-xl transition flex items-center gap-2 shadow-lg shadow-yellow-500/30"
      >
        Get Started{" "}
        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
      </Link>
      <Link
        to="/login"
        className="border border-yellow-500 hover:bg-yellow-50 text-yellow-600 font-bold px-8 py-3 rounded-xl transition"
      >
        Login
      </Link>
    </div>
  </div>
);

export default Home;
