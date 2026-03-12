import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showpassword, setShowpassword] = useState(false);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.user, token: data.token }),
        );
        login({ ...data.user, token: data.token });
        setMessage("Login successful!");
        setIsSuccess(true);
        if (data.user.role === "admin") {
          navigate("/admin/Ahome");
        } else {
          navigate("/dashboard");
        }
      } else {
        setMessage(data.message || "Login failed.");
        setIsSuccess(false);
      }
    } catch (err) {
      setMessage("An error occurred during login.");
      setIsSuccess(false);
    }
  };

  const handleshowpassword = (e) => {
    e.preventDefault();
    if (showpassword === false) return setShowpassword(true);
    else return setShowpassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 w-full max-w-md">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome Back
        </h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <div className="flex border border-gray-300 rounded-lg focus:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus:border-transparent transition">
            <input
              type={showpassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 focus:outline-none"
            />
            <button
              onClick={handleshowpassword}
              className="pr-2  cursor-pointer"
            >
              {showpassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Login
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center font-medium ${isSuccess ? "text-green-600" : "text-red-600"}`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm md:text-lg text-gray-600">
          New User?{" "}
          <Link
            className="text-blue-600 font-semibold hover:underline"
            to="/register"
          >
            Start Your Journey
          </Link>{" "}
          with us!
        </p>
      </div>
    </div>
  );
};

export default Login;
