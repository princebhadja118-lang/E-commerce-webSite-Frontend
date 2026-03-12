import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const fetchUsers = () => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filterUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (userId) => {
    const admin = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        },
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <>
      <div className="bg-gray-100 my-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl md:text-3xl font-bold w-full p-4">
            User Management
          </h2>
          <input
            type="search"
            placeholder="Search users..."
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </div>
        {filterUsers.length > 0 ? (
          <p className="text-gray-600 py-2">
            Found {filterUsers.length} user(s).
          </p>
        ) : (
          <p className="text-gray-600 py-2">No users found.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filterUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white p-2 md:p-4 rounded-lg shadow-md mb-4 justify-between items-center"
            >
              <div>
                <h3 className="md:text-xl">
                  <span className="font-bold">Username:</span> {user.username}
                </h3>
                <p className="text-sm md:text-lg text-gray-600 mt-3 grid grid-cols-1 md:grid-cols-6 mb-3">
                  <span className="font-bold">Email:</span>
                  <span className=" col-span-5 border px-1 md:px-3 rounded border-gray-400">
                    {user.email}
                  </span>
                </p>
                <p className="text-sm md:text-lg text-gray-500 mb-3 grid grid-cols-1 md:grid-cols-6 ">
                  <span className="font-bold">Role:</span>
                  <span className=" col-span-5 border px-1 md:px-3 rounded border-gray-400">
                    {user.role}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2 my-3">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowForm(true);
                  }}
                  className="px-2 py-1 md:px-5 md:py-2 text-sm rounded bg-gray-700 text-gray-100 hover:bg-gray-800 font-bold cursor-pointer"
                >
                  Edit User
                </button>
                <button
                  className="px-2 py-1 md:px-5 md:py-2 text-sm rounded text-red-100 bg-red-900 hover:bg-red-950 cursor-pointer font-bold"
                  onClick={() => handleDelete(user._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          {showForm && selectedUser && (
            <UserForm
              selectedUser={selectedUser}
              setShowForm={setShowForm}
              refreshUsers={fetchUsers}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default User;
