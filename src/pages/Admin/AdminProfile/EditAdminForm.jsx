import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

const EditAdminForm = ({ setShowEditForm, selectedAdmin, fectchAdmin }) => {
  const [username, setUsername] = useState(selectedAdmin?.username || "");
  const [email, setEmail] = useState(selectedAdmin?.email || "");
  const [role, setRole] = useState(selectedAdmin?.role || "");
  const [errors, setErrors] = useState({});

  const handleUpdateData = async () => {
    const admin = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${selectedAdmin?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`,
          },
          body: JSON.stringify({ username, email, role }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Admin updated successfully");
        fectchAdmin();
        setShowEditForm(false);
      } else {
        setErrors({ message: data.message || "Failed to Update Profile" });
      }
    } catch (err) {
      console.error("Error updating admin data:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center w-full h-full p-4 z-40">
      <div className="bg-white p-4 rounded-lg shadow-lg w-md">
        <div className="flex justify-between items-center px-2 ">
          <h2 className="text-xl font-bold">Edit Admin</h2>
          <button onClick={() => setShowEditForm(false)}>
            <IoClose size={25} />
          </button>
        </div>
        <div className="flex flex-col gap-3 pt-2">
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border px-3 py-3 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-3 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border px-3 py-3 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
          <button
            onClick={handleUpdateData}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white w-full rounded cursor-pointer"
          >
            Update
          </button>
        </div>
        {errors.message && (
          <p className="text-red-500 text-sm mt-2">{errors.message}</p>
        )}
      </div>
    </div>
  );
};

export default EditAdminForm;
