import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBoxOpen,
  FaClipboardList,
  FaUserShield,
} from "react-icons/fa";

const navItems = [
  { to: "/admin/Ahome", label: "Dashboard", icon: FaHome },
  { to: "/admin/profile", label: "Profile", icon: FaUserShield },
  { to: "/admin/users", label: "Users", icon: FaUser },
  { to: "/admin/products", label: "Products", icon: FaBoxOpen },
  { to: "/admin/orders", label: "Orders", icon: FaClipboardList },
];

const AdminSidebar = () => {
  return (
    <>
      <aside className="w-64 min-h-screen bg-gray-900 text-white border-r border-gray-800 hidden md:block">
        <div className="p-4 mb-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-xs text-gray-400">Manage store data</p>
        </div>

        <nav className="flex flex-col gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50 flex justify-around p-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 px-3 rounded-lg transition ${
                  isActive ? "text-blue-400" : "text-gray-300 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};

export default AdminSidebar;
