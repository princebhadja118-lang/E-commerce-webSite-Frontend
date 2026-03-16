import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import logo from "../../assets/rklogo-removebg-preview.png";
import userIcon from "../../assets/profile.png";
import Products from "./products/Products";
import { NavLink } from "react-router-dom";
import OrdersDetails from "./Order-Details/OrdersDetails";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-2 md:p-6">
        <div className=" flex md:flex-row sm:text-sm flex-col justify-between gap-2 items-center bg-gray-700 text-white p-4 rounded border-b-2 border-black shadow-lg transition-all duration-300 ">
          <div className="flex md:gap-0 w-full justify-between items-center">
            <img
              src={logo}
              alt="Rk logo"
              className="w-20 h-10 md:w-35 md:h-15 "
            />
            <button
              onClick={() => setMenu((prev) => (!prev ? true : false))}
              className="flex md:hidden"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          <div className="md:flex-row md:flex hidden items-center md:gap-5 ">
            <div className="bg-gray-300 px-3 flex items-center  w-35 lg:w-full">
              <i className="fa-solid fa-magnifying-glass text-black"></i>
              <input
                type="search"
                placeholder="Search..."
                className="px-3 py-2 bg-transparent border-0 outline-0 rounded text-black"
              />
            </div>
            <div className="font-semibold flex gap-4 px-4">
              <NavLink>Home</NavLink>
              <NavLink>About</NavLink>
              <NavLink>Products</NavLink>
              <NavLink>Contact</NavLink>
            </div>
          </div>
          <div className="md:flex hidden  md:gap-2 items-center shadow py-1 px-2 rounded bg-gray-400 hover:shadow-lg mx-3 ">
            <button
              onClick={() => setShowOrders(true)}
              className="text-xl text-black font-semibold cursor-pointer rounded-full w-10 h-10"
            >
              <img src={userIcon} alt="user Icon" />
            </button>
            <button
              onClick={logout}
              className="bg-white font-bold text-red-500 px-4 py-2 h-10 rounded cursor-pointer"
            >
              Logout
            </button>
          </div>

          {menu && (
            <div className="md:hidden">
              <div className="md:flex-row flex flex-col items-center md:gap-5 transition-all duration-300 ">
                <div className="bg-gray-300 px-3 flex items-center w-50">
                  <i className="fa-solid fa-magnifying-glass text-black"></i>
                  <input
                    type="search"
                    placeholder="Search..."
                    className="px-3 py-2 border-0 outline-0 rounded text-black"
                  />
                </div>
                <div className="font-semibold flex flex-col gap-1 w-full items-center justify-center">
                  <NavLink>Home</NavLink>
                  <NavLink>About</NavLink>
                  <NavLink>Products</NavLink>
                  <NavLink>Contact</NavLink>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-3 items-center ">
                <button
                  onClick={() => setShowOrders(true)}
                  className="text-xl text-black font-semibold cursor-pointer rounded-full w-10 h-10 my-1"
                >
                  <img src={userIcon} alt="user Icon" />
                </button>
                <button
                  onClick={logout}
                  className="bg-white font-bold text-red-500 px-4 py-2 h-10 rounded cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
        {showOrders && <OrdersDetails setShowOrders={setShowOrders} />}
        <main className="pt-5">
          <Products />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
