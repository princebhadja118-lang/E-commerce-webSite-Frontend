import React from "react";
import { FaShieldAlt, FaTruck, FaHeadset, FaLeaf } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Hero */}
      <div className="bg-gray-800 text-white rounded-2xl p-8 mb-8 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
          About <span className="text-yellow-400">ShopKart</span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-xl mx-auto">
          Your one-stop destination for quality products at the best prices —
          delivered fast, right to your doorstep.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { value: "10K+", label: "Happy Customers" },
          { value: "500+", label: "Products" },
          { value: "50+", label: "Brands" },
          { value: "4.8", label: "Avg Rating", icon: <FaStar className="inline text-yellow-400 mb-0.5" size={14} /> },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-extrabold text-gray-800">
              {s.icon} {s.value}
            </p>
            <p className="text-gray-500 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[
          {
            icon: <FaShieldAlt className="text-blue-600" size={22} />,
            title: "100% Authentic Products",
            desc: "Every product is verified and sourced from trusted brands.",
          },
          {
            icon: <FaTruck className="text-orange-500" size={22} />,
            title: "Fast Delivery",
            desc: "Get your orders delivered quickly across India.",
          },
          {
            icon: <FaHeadset className="text-green-500" size={22} />,
            title: "24/7 Support",
            desc: "Our team is always here to help you with any issue.",
          },
          {
            icon: <FaLeaf className="text-teal-500" size={22} />,
            title: "Eco Friendly Packaging",
            desc: "We use sustainable and recyclable packaging materials.",
          },
        ].map((v, i) => (
          <div key={i} className="flex items-start gap-4 bg-white rounded-xl shadow p-4">
            <div className="mt-0.5">{v.icon}</div>
            <div>
              <p className="font-semibold text-gray-800">{v.title}</p>
              <p className="text-gray-500 text-sm mt-0.5">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl shadow p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Get In Touch</h2>
        <p className="text-gray-500 text-sm mb-5">Have questions? We'd love to hear from you.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:contact@shopkart.com"
            className="bg-gray-800 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-900 transition text-sm"
          >
            Email Us
          </a>
          <a
            href="tel:+919999999999"
            className="border-2 border-gray-800 text-gray-800 font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-100 transition text-sm"
          >
            Call Now
          </a>
        </div>
      </div>

    </div>
  );
};

export default About;
