import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";

const EditUserProfile = ({ setOpenModel }) => {
  const User = JSON.parse(localStorage.getItem("user"));
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: User.username,
    password: "",
    email: User.email,
  });
  const [error, setError] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleEditUserProfile = async () => {
    if (!formData.username || !formData.email) {
      setError({
        username: !formData.username ? "Username is required" : "",
        email: !formData.email ? "Email is required" : "",
        password: "",
      });
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/dashboard/get-profile/${User.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${User.token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();
      setUser(data.user);

      // merge old + new
      const updatedUser = {
        ...User,
        ...data.user,
      };

      // safe save
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setOpenModel(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center h-screen z-100">
      <div className="bg-white p-5 rounded shadow md:w-md">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-xl font-bold">Edit User Profile</h2>
          <button
            onClick={() => setOpenModel(false)}
            className="text-gray-500 hover:text-gray-700 text-4xl cursor-pointer "
          >
            <code>&times;</code>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-semibold">
            User Name
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="User Name"
            className="p-2 bg-gray-300/50 border rounded border-gray-200 backdrop-blur-2xl"
          />
          {error.username && (
            <span className="text-red-500 text-sm">{error.username}</span>
          )}
          <label htmlFor="email" className="font-semibold ">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 bg-gray-300/50 border rounded border-gray-200 backdrop-blur-2xl"
          />
          {error.email && (
            <span className="text-red-500 text-sm">{error.email}</span>
          )}

          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-2 bg-gray-300/50 border rounded border-gray-200 backdrop-blur-2xl"
          />
          {error.password && (
            <span className="text-red-500 text-sm">{error.password}</span>
          )}
          <button
            onClick={handleEditUserProfile}
            className="bg-blue-500 hover:bg-blue-600 rounded shadow p-2 text-white font-bold mt-2"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
