import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <div
      className={`h-screen bg-gray-700 transition-all  duration-300 ${menu ? "w-28 md:w-56" : "md:w-16"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-3 text-white">
        {menu && (
          <p className="font-bold text-sm md:text-2xl w-full" title="king">
            <i className="fa-solid fa-chess-king text-lg"></i>
          </p>
        )}

        <button
          onClick={() => setMenu(!menu)}
          className={`flex items-center justify-center ${!menu ? "w-full" : "w-fit"}`}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2 p-2 text-white">
        <NavLink
          to="Ahome"
          className={({ isActive }) =>
            `flex items-center justify-center md:justify-start gap-2 p-2  rounded ${
              isActive
                ? `bg-blue-500 ${menu ? "md:ml-5" : " w-fit"}`
                : "justify-start m-0"
            }`
          }
          title="Home"
        >
          <i className="fa-solid fa-house"></i>
          {menu && <span>Home</span>}
        </NavLink>

        <NavLink
          to="profile"
          className={({ isActive }) =>
            `flex items-center justify-center gap-2 p-2 md:justify-start rounded ${
              isActive
                ? `bg-blue-500 ${menu ? "md:ml-5" : "w-fit"}`
                : "justify-start "
            }`
          }
          title="Profile"
        >
          <i className="fa-solid fa-id-badge"></i>
          {menu && <span>Profile</span>}
        </NavLink>

        <NavLink
          to="user"
          className={({ isActive }) =>
            `flex items-center justify-center md:justify-start gap-2 p-2 rounded ${
              isActive
                ? `bg-blue-500 ${menu ? "md:ml-5" : "w-fit"}`
                : "justify-start"
            }`
          }
          title="User"
        >
          <i className="fa-solid fa-user"></i>
          {menu && <span>User</span>}
        </NavLink>

        <NavLink
          to="product"
          className={({ isActive }) =>
            `flex items-center justify-center md:justify-start gap-2 p-2 rounded ${
              isActive
                ? `bg-blue-500 flex ${menu ? "md:ml-5" : "w-fit"}`
                : "justify-start"
            }`
          }
          title="Products"
        >
          <i className="fa-solid fa-box-open"></i>
          {menu && <span>Products</span>}
        </NavLink>

        <NavLink
          to="orders"
          className={({ isActive }) =>
            `flex items-center justify-center md:justify-start gap-2 p-2 rounded ${
              isActive
                ? `bg-blue-500 flex ${menu ? "md:ml-5" : "w-fit"}`
                : "justify-start"
            }`
          }
          title="Orders"
        >
          <i className="fa-solid fa-receipt"></i>
          {menu && <span>Orders</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
