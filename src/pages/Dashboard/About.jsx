import React from "react";
import { FaShieldAlt, FaLeaf, FaTruck, FaHandshake } from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        About <span className="text-blue-600">ShopKart</span>
      </h1>
      <p className="text-gray-500 mb-8 text-base leading-relaxed">
        ShopKart is a trusted online store for agrochemical packaging products.
        We deliver high-quality, durable PET bottles for pesticides and
        fertilizers — directly to your doorstep across India.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { value: "10+", label: "Years Experience" },
          { value: "500+", label: "Happy Clients" },
          { value: "50+", label: "Products" },
          { value: "15+", label: "States Served" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-extrabold text-blue-600">{s.value}</p>
            <p className="text-gray-500 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {[
          { icon: <FaShieldAlt className="text-blue-600" />, title: "Quality First", desc: "Every product tested before dispatch." },
          { icon: <FaLeaf className="text-green-500" />, title: "Eco Friendly", desc: "Recyclable and sustainable packaging." },
          { icon: <FaTruck className="text-orange-500" />, title: "Fast Delivery", desc: "Pan-India delivery, on time." },
          { icon: <FaHandshake className="text-red-500" />, title: "Customer First", desc: "Customized solutions for every client." },
        ].map((v, i) => (
          <div key={i} className="flex items-start gap-3 bg-white rounded-xl shadow p-4">
            <div className="text-xl mt-0.5">{v.icon}</div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{v.title}</p>
              <p className="text-gray-500 text-sm">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="bg-gray-800 text-white rounded-2xl p-6 text-center">
        <h2 className="text-xl font-bold mb-1">Get In Touch</h2>
        <p className="text-gray-400 text-sm mb-4">We'd love to hear from you.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="mailto:contact@shopkart.com" className="bg-white text-gray-800 font-semibold px-5 py-2 rounded-xl hover:bg-gray-100 transition text-sm">
            Email Us
          </a>
          <a href="tel:+919999999999" className="border border-white text-white font-semibold px-5 py-2 rounded-xl hover:bg-white hover:text-gray-800 transition text-sm">
            Call Now
          </a>
        </div>
      </div>

    </div>
  );
};

export default About;
