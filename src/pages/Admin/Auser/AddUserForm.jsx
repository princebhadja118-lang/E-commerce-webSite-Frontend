import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const AddUserForm = ({ setAddUserForm, fetchUsers }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setshowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const validForm = () => {
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

  const handleAddUser = async () => {
    if (!validForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/admin/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role: "user" }),
      });
      const data = await res.json();
      if (res.ok) {
        setAddUserForm(false);
        fetchUsers();
      } else {
        setErrors({ general: data.message || "Error adding user." });
      }
    } catch (err) {
      setErrors({ general: err.message });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 h-full w-full p-4 z-40">
      <div className="bg-white p-4 rounded-lg shadow-lg w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add User</h2>
          <button
            onClick={() => setAddUserForm(false)}
            className="cursor-pointer"
          >
            <IoClose className="h-6 w-6" />
          </button>
        </div>
        <div className="flex justify-center items-center flex-col gap-3">
          <div className="w-full">
            <input
              type="text"
              placeholder="UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`px-2 py-2 w-full outline-none focus:ring ${errors.username ? "focus:ring-red-500" : "focus:ring-blue-400"} rounded border border-gray-300 `}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`px-2 py-2 w-full outline-none focus:ring ${errors.email ? "focus:ring-red-500" : "focus:ring-blue-400"} rounded border border-gray-300 `}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="w-full">
            <div
              className={`flex justify-between items-center px-2 py-2 w-full outline-none focus-within:ring ${errors.password ? "focus-within:ring-red-500" : "focus-within:ring-blue-400"} rounded border border-gray-300 `}
            >
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none"
              />
              <button onClick={() => setshowPass(!showPass)}>
                {showPass ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none w-full"
          >
            Add
          </button>
          {errors.general && (
            <p className="text-red-500 text-sm">{errors.general}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
