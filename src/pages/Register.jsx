import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required.";
    else if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";
    else if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    setErrors({});
    if (!validateForm()) return;
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        setErrors({ general: data.message || "Registration failed." });
      }
    } catch (error) {
      setErrors({ general: "An error occurred during registration." });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-r from-blue-50 to-indigo-100 p-3">
      <div className="flex flex-col gap-3 justify-center items-center rounded-2xl shadow-2xl p-6 bg-white w-full max-w-md">
        <p className="font-bold text-2xl md:text-4xl p-4 text-gray-800">
          Register
        </p>

        {/* Username */}
        <div className="w-full">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-600 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors({ ...errors, username: "" });
            }}
            className={`w-full border rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition ${errors.username ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"}`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-600 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: "" });
            }}
            className={`w-full border rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition ${errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-600 mb-1"
          >
            Password
          </label>
          <div
            className={`flex w-full border rounded-lg focus-within:ring-2 focus-within:border-transparent transition ${errors.password ? "border-red-500 focus-within:ring-red-400" : "border-gray-300 focus-within:ring-blue-500"}`}
          >
            <input
              type={showpassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
              className="px-3 py-3 w-full focus:outline-none rounded-lg text-sm"
            />
            <button
              onClick={() => setShowpassword((p) => !p)}
              className="pr-3 cursor-pointer text-gray-400"
            >
              {showpassword ? (
                <i className="fa-solid fa-eye-slash" />
              ) : (
                <i className="fa-solid fa-eye" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <button
          onClick={handleRegister}
          className="bg-blue-600 rounded-lg px-3 py-3 w-full font-bold text-white hover:bg-blue-700 cursor-pointer mt-1"
        >
          Register
        </button>

        {errors.general && (
          <p className="text-red-500 text-sm">{errors.general}</p>
        )}

        <p className="text-gray-600 text-sm md:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
