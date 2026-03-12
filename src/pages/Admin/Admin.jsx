import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import logo from "../../assets/rklogo-removebg-preview.png";

const Admin = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col md:flex-row justify-between items-center bg-gray-700 h-16 p-3 shadow-lg border-b-2 border-black gap-4">
            <div className="flex  md:flex-row items-center justify-between w-full ">
              <div>
                <img
                  src={logo}
                  alt="Rk logo"
                  className="h-10 w-20 md:h-14 md:w-28"
                />
              </div>
              <div className="flex gap-3 items-center">
                <h1 className="font-semibold md:text-2xl text-white">
                  {user?.username}
                </h1>
                <button
                  onClick={logout}
                  className="bg-white text-red-500 font-semibold p-1 md:px-5 md:py-2 rounded cursor-pointer shadow"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
            <div>
              <Sidebar />
            </div>
            <main className="w-full h-screen bg-gray-100 p-4 overflow-x-scroll flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
