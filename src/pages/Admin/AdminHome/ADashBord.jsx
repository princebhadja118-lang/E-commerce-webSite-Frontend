import React, { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { FiUsers, FiBox, FiShoppingCart } from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ADashBord = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/admin/get-users").then((res) =>
        res.json(),
      ),
      fetch("http://localhost:5000/api/admin/products").then((res) =>
        res.json(),
      ),
      fetch("http://localhost:5000/api/admin/orders").then((res) => res.json()),
    ])
      .then(([usersData, productsData, ordersData]) => {
        setUsers(usersData);
        setProducts(productsData.products);
        setOrders(ordersData.orders);
        setRevenue(ordersData.revenue);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-blue-600"></div>
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="flex gap-3 flex-col border-2 w-full pt-4 pb-0 rounded bg-blue-500 text-white shadow-lg">
          <div className="flex items-center justify-between px-2">
            <p className="text-2xl md:text-4xl font-semibold">
              {users.totalUsers}
            </p>
            <FiUsers size={36} className="opacity-80" />
          </div>
          <p className="font-semibold pl-2">Total Users</p>
          <button
            onClick={() => navigate("/admin/user")}
            className="bg-blue-400 text-white py-1 px-4 w-full rounded-b hover:bg-blue-600 flex items-center justify-center gap-2 cursor-pointer"
          >
            More Info <FaArrowCircleRight size={25} />
          </button>
        </div>
        <div className="flex gap-3 flex-col border-2 w-full pt-4 pb-0 rounded bg-green-500 text-white shadow">
          <div className="flex items-center justify-between px-2">
            <p className="text-2xl md:text-4xl font-semibold">
              ₹{revenue?.toFixed(2)}
            </p>
            <FaIndianRupeeSign size={36} className="opacity-80" />
          </div>
          <p className="font-semibold pl-2">Total Revenue</p>
          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-green-400 text-white py-1 px-4 w-full rounded-b hover:bg-green-600 flex items-center justify-center gap-2 cursor-pointer"
          >
            More Info <FaArrowCircleRight size={25} />
          </button>
        </div>
        <div className="flex gap-3 flex-col border-2 w-full pt-4 pb-0 rounded bg-red-500 text-white shadow">
          <div className="flex items-center justify-between px-2">
            <p className="text-2xl md:text-4xl font-semibold">
              {products.length}
            </p>
            <FiBox size={36} className="opacity-80" />
          </div>
          <p className="font-semibold pl-2">Total Products</p>
          <button
            onClick={() => navigate("/admin/product")}
            className="bg-red-400 text-white py-1 px-4 w-full rounded-b hover:bg-red-600 flex items-center justify-center gap-2 cursor-pointer"
          >
            More Info <FaArrowCircleRight size={25} />
          </button>
        </div>
        <div className="flex gap-3 flex-col border-2 w-full pt-4 pb-0 rounded bg-yellow-500 text-white shadow">
          <div className="flex items-center justify-between px-2">
            <p className="text-2xl md:text-4xl font-semibold">
              {orders.length}
            </p>
            <FiShoppingCart size={36} className="opacity-80" />
          </div>
          <p className="font-semibold pl-2">Total Orders</p>
          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-yellow-400 text-white py-1 px-4 w-full rounded-b hover:bg-yellow-600 flex items-center justify-center gap-2 cursor-pointer"
          >
            More Info <FaArrowCircleRight size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ADashBord;
