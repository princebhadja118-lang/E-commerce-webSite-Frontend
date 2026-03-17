import React, { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ADashBord = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
    fetch("http://localhost:5000/api/products/get-products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
    fetch("http://localhost:5000/api/orders/all-orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .catch(() => {});
  }, []);

  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="flex gap-3 flex-col border-2 w-full pt-4 pb-0 rounded bg-blue-500 text-white shadow-lg">
          <p className="text-2xl md:text-4xl font-semibold pl-2">
            {users.length}
          </p>
          <p className="font-semibold pl-2">Total Users</p>
          <button
            onClick={() => navigate("/admin/user")}
            className="bg-blue-400 text-white py-1 px-4 w-full rounded-b hover:bg-blue-600 flex items-center justify-center gap-2 cursor-pointer"
          >
            More Info <FaArrowCircleRight size={25} />
          </button>
        </div>
        <div className="flex gap-3 flex-col border-2 w-full pt-4 pb-0 rounded bg-green-500 text-white shadow">
          <p className="text-2xl md:text-4xl font-semibold pl-2">
            ₹{totalRevenue.toFixed(2)}
          </p>
          <p className="font-semibold pl-2">Total Revenue</p>
          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-green-400 text-white py-1 px-4 w-full rounded-b hover:bg-green-600 flex items-center justify-center gap-2 cursor-pointer"
          >
            More Info <FaArrowCircleRight size={25} />
          </button>
        </div>
        <div className="flex gap-3 flex-col border-2 w-full pt-4 pb-0 rounded bg-red-500 text-white shadow">
          <p className="text-2xl md:text-4xl font-semibold pl-2">
            {products.length}
          </p>
          <p className="font-semibold pl-2">Total Products</p>
          <button
            onClick={() => navigate("/admin/product")}
            className="bg-red-400 text-white py-1 px-4 w-full rounded-b hover:bg-red-600 flex items-center justify-center gap-2 cursor-pointer"
          >
            More Info <FaArrowCircleRight size={25} />
          </button>
        </div>
        <div className="flex gap-3 flex-col border-2 w-full pt-4 pb-0 rounded bg-yellow-500 text-white shadow">
          <p className="text-2xl md:text-4xl font-semibold pl-2">
            {orders.length}
          </p>
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
