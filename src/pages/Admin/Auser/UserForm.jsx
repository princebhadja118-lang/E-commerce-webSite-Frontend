import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

const UserForm = ({ setShowForm, selectedUser, refreshUsers }) => {
  const [username, setUsername] = useState(selectedUser?.username || null);
  const [email, setEmail] = useState(selectedUser?.email || null);
  const [role, setRole] = useState(selectedUser?.role || null);
  const [errors, setErrors] = useState("");

  const handleUpdateData = async () => {
    const admin = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/update/${selectedUser._id}`,
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
        toast.success("User updated successfully");
        refreshUsers();
        setShowForm(false);
      } else {
        setErrors({ message: data.message || "Failed to Update Profile" });
      }
    } catch (err) {
      console.error("Error updating admin data:", err);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center transition-transform ease-in-out">
        <div className="md:min-w-md flex flex-col gap-2 items-center justify-center p-3 fixed bg-white rounded shadow-2xl">
          <div className="flex justify-left items-center w-full ">
            <h1 className="text-xl md:text-3xl font-semibold">
              Edit User Profile
            </h1>
            <div className="absolute flex justify-end items-end w-full pr-5">
              <button
                className="cursor-pointer"
                onClick={() => setShowForm(false)}
              >
                <IoClose size={25} md:size={35} />
              </button>
            </div>
          </div>
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
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border px-3 py-3 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-e-transparent transition "
          />
          <button
            onClick={handleUpdateData}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white w-full rounded cursor-pointer"
          >
            Update
          </button>
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserForm;
