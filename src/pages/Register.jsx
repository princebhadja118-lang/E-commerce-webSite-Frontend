import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [message, setMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSucessMessage("Registration successful!");
        navigate("/login");
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred during registration.");
    }
  };

  const handleshowpassword = () => {
    if (showpassword === false) return setShowpassword(true);
    else return setShowpassword(false);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-linear-to-r from-blue-50 to-indigo-100 p-3">
        <div className="flex flex-col gap-3 justify-center items-center rounded-2xl shadow-2xl p-4 bg-white w-full max-w-md">
          <p className="font-bold text-2xl md:text-4xl p-4 text-gray-800">
            Register
          </p>
          <input
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border px-3 py-3 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-3 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <div className="flex w-full border rounded-lg border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
            <input
              type={showpassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-3 border-r-0 rounded-r-none w-full focus:outline-none"
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
            onClick={handleRegister}
            className="bg-blue-600 rounded-lg px-3 py-3 w-full font-bold text-white hover:bg-blue-700 cursor-pointer"
          >
            Register
          </button>
          {message && <p className="text-red-600">{message}</p>}
          {sucessMessage && <p className="text-green-600">{sucessMessage}</p>}
          <p className="text-gray-600 m-2 text-sm md:text-lg">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-600 hover:underline font-bold"
            >
              Login{" "}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
