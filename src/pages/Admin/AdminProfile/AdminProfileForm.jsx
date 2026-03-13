import React, { useContext, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

const AdminProfileForm = ({ setShowUForm }) => {
  const { user, login } = useContext(AuthContext);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleUpdateData = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/update/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ username, email }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        const updatedata = {
          ...user,
          username: data.user.username,
          email: data.user.email,
        };
        login(updatedata);
        localStorage.setItem("user", JSON.stringify(updatedata));
        toast.success("Profile updated successfully");
        setShowUForm(false);
      } else {
        toast.error(data.message || "Failed to Update Profile");
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
              Edit Admin Profile
            </h1>
            <div className="absolute flex justify-end items-end w-full pr-5">
              <button
                className="cursor-pointer"
                onClick={() => setShowUForm(false)}
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
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white w-full rounded cursor-pointer"
            onClick={handleUpdateData}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminProfileForm;
