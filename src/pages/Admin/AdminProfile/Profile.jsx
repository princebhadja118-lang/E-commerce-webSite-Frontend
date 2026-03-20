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
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fectchAdmin = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/data")
      .then((res) => res.json())
      .then((data) => {
        setAdmins(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
    setDeleteConfirm(null);
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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-blue-600"></div>
          </div>
        ) : filterAdmin.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FiUsers size={40} className="mb-2 opacity-40" />
            <p className="text-base">No admins found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterAdmin.map((admin) => (
              <div
                key={admin._id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-lg">
                    {admin.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-base">
                      {admin.username}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium mt-1">
                      <FiShield size={10} /> {admin.role}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                  <FiMail size={14} className="text-gray-400" />
                  <span className="truncate">{admin.email}</span>
                </div>
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedAdmin(admin);
                      setShowEditForm(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(admin)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-gray-700 hover:text-red-600 hover:bg-red-50 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <FiTrash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showEditForm && (
        <EditAdminForm
          setShowEditForm={setShowEditForm}
          selectedAdmin={selectedAdmin}
          fectchAdmin={fectchAdmin}
        />
      )}
      {addAdminForm && (
        <AddAdminForm
          setAddAdminForm={setAddAdminForm}
          fectchAdmin={fectchAdmin}
        />
      )}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl w-72 mx-4">
            <p className="text-sm text-gray-700 mb-3">
              Delete{" "}
              <span className="font-semibold">{deleteConfirm.username}</span>?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm._id)}
                className="flex-1 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
