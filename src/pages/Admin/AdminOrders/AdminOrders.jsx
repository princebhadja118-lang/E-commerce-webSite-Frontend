import React, { useEffect, useState } from "react";
import DeliveryStatus from "../../Dashboard/Order-Details/DeliveryStatus";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/all-orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = orders.filter(
    (o) =>
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      o.userId?.toString().toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-gray-100 my-5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-xl md:text-3xl font-bold w-full p-4">
          Order Management
        </h2>
        <input
          type="search"
          placeholder="Search by order ID or user..."
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      {loading ? (
        <p className="text-gray-500 p-4">Loading orders...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 p-4">No orders found.</p>
      ) : (
        <p className="text-gray-600 py-2">Found {filtered.length} order(s).</p>
      )}

      <div className="flex flex-col gap-4">
        {filtered.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-2">
              <div>
                <p className="text-xs text-gray-400">Order ID</p>
                <p className="font-mono text-sm font-semibold">{order._id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">User ID</p>
                <p className="font-mono text-sm">{order.userId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Date</p>
                <p className="text-sm">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Total</p>
                <p className="text-lg font-bold text-green-600">
                  ₹{order.totalAmount}
                </p>
              </div>
              <DeliveryStatus date={order.date} time={order.time} />
            </div>

            <div className="border-t pt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {order.products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-3 border rounded p-2"
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    className="h-14 w-14 object-contain"
                  />
                  <div>
                    <p className="font-semibold line-clamp-1">
                      {product.title}
                    </p>
                    <p className="text-green-600 font-bold">₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
