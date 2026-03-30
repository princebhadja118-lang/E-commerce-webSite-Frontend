import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { Outlet } from "react-router-dom";
import Logo from "../../components/Logo";

const Admin = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <div>
        <div className="flex flex-col w-full">
          <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-40">
            <div className="flex justify-between items-center px-4 md:px-8 py-3">
              <Logo width={130} />
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg">
                  <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold hidden md:block">
                    {user?.username}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition cursor-pointer text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
          <div className="flex">
            <main className="w-full h-screen bg-gray-100 p-1 md:p-4 overflow-x-scroll flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
