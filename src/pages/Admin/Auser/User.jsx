import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import toast from "react-hot-toast";
import AddUserForm from "./AddUserForm";
import { IoMdPersonAdd } from "react-icons/io";
import {
  FiEdit2,
  FiTrash2,
  FiMail,
  FiSearch,
  FiUsers,
  FiUser,
} from "react-icons/fi";

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [addUserForm, setAddUserForm] = useState(false);
  const [search, setSearch] = useState("");

  const fetchUsers = () => {
    fetch("http://localhost:5000/api/data")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filterUsers = users.filter(
    (user) =>
      user.role === "user" &&
      (user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())),
  );

  const handleDelete = async (userId) => {
    const admin = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/delete/${userId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${admin.token}` },
        },
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else toast.error(data.message);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <>
      <div className="md:p-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">
            User Management
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({filterUsers.length} users)
            </span>
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 bg-white w-full">
              <FiSearch size={14} className="text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none text-sm w-40 text-gray-700 placeholder-gray-400"
              />
            </div>
            <button
              onClick={() => {
                setSelectedUser(null);
                setAddUserForm(true);
              }}
              className="flex justify-center items-center gap-1.5 w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer"
            >
              <IoMdPersonAdd size={16} /> Add User
            </button>
          </div>
        </div>

        {filterUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FiUsers size={40} className="mb-2 opacity-40" />
            <p className="text-base">No users found</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filterUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold text-sm">
                          {user.username?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">
                          {user.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <FiMail size={13} className="text-gray-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
                        <FiUser size={10} /> {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowForm(true);
                          }}
                          className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-xs font-medium cursor-pointer"
                        >
                          <FiEdit2 size={13} /> Edit
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="flex items-center gap-1 text-gray-600 hover:text-red-600 text-xs font-medium cursor-pointer"
                        >
                          <FiTrash2 size={13} /> Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {addUserForm && (
        <AddUserForm fetchUsers={fetchUsers} setAddUserForm={setAddUserForm} />
      )}
      {showForm && selectedUser && (
        <UserForm
          selectedUser={selectedUser}
          setShowForm={setShowForm}
          refreshUsers={fetchUsers}
        />
      )}
    </>
  );
};

export default User;
