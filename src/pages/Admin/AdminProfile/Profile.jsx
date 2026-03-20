import React, { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { FiEdit2, FiTrash2, FiMail, FiShield, FiUsers } from "react-icons/fi";
import AddAdminForm from "./AddAdminForm";
import EditAdminForm from "./EditAdminForm";
import toast from "react-hot-toast";

const Profile = () => {
  const [admins, setAdmins] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [addAdminForm, setAddAdminForm] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const fectchAdmin = () => {
    fetch("http://localhost:5000/api/data")
      .then((res) => res.json())
      .then((data) => setAdmins(data));
  };

  useEffect(() => {
    fectchAdmin();
  }, []);

  const filterAdmin = admins.filter((admin) => admin.role === "admin");

  const handleDelete = async (id) => {
    const admin = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetch(`http://localhost:5000/api/admin/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Admin deleted successfully");
        fectchAdmin();
      } else toast.error(data.message);
    } catch (err) {
      console.error("Error deleting admin:", err);
    }
  };

  return (
    <div>
      <div className="md:p-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h1 className="text-lg md:text-2xl font-bold text-gray-800">
            Admin Profiles
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({filterAdmin.length} admins)
            </span>
          </h1>
          <button
            onClick={() => setAddAdminForm(true)}
            className="flex justify-center items-center gap-1.5 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer"
          >
            <IoMdPersonAdd size={16} /> Add Admin
          </button>
        </div>

        {/* Table */}
        {filterAdmin.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FiUsers size={40} className="mb-2 opacity-40" />
            <p className="text-base">No admins found</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Admin</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filterAdmin.map((admin) => (
                  <tr
                    key={admin._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-sm">
                          {admin.username?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">
                          {admin.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <FiMail size={13} className="text-gray-400" />
                        {admin.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                        <FiShield size={10} /> {admin.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedAdmin(admin);
                            setShowEditForm(true);
                          }}
                          className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-xs font-medium cursor-pointer"
                        >
                          <FiEdit2 size={13} /> Edit
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleDelete(admin._id)}
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
      <div>
        {showEditForm && (
          <EditAdminForm
            setShowEditForm={setShowEditForm}
            selectedAdmin={selectedAdmin}
            fectchAdmin={fectchAdmin}
          />
        )}
      </div>
      {addAdminForm && (
        <AddAdminForm
          setAddAdminForm={setAddAdminForm}
          fectchAdmin={fectchAdmin}
        />
      )}
    </div>
  );
};

export default Profile;
