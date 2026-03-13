import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "../../auth/AuthContext";

const OrdersDetails = ({ setShowOrders }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  const userOrders = () => {
    fetch(`http://localhost:5000/api/orders/get-orders/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
      });
  };

  useEffect(() => userOrders(), []);

  return (
    <div>
      <div
        className="fixed inset-0 flex justify-center items-center w-full h-full bg-black/70 z-50 p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-2xl bg-white p-3 rounded ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Orders Summary</h2>
            <button
              onClick={() => setShowOrders(false)}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <IoClose size={25} />
            </button>
          </div>
          <div className="h-90 md:h-full md:max-h-100 overflow-y-scroll">
            {orders.map((order) => (
              <ul
                key={order._id}
                className="flex  justify-between items-center mb-2 border-b py-2 "
              >
                <ul className="flex flex-col md:flex-row md:justify-between w-full">
                  <div className="flex flex-col">
                    <li className="font-semibold">Order# </li>
                    <li>{order._id}</li>
                  </div>
                  <div className="flex flex-col pt-3 md:pt-0 gap-2">
                    {order.products.map((product) => (
                      <div
                        key={product._id}
                        className="flex flex-col justify-center md:items-center h-full"
                      >
                        <li className="text-sm text-gray-600">
                          {product.title} - ${product.price.toFixed(2)}
                        </li>
                      </div>
                    ))}
                  </div>
                </ul>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDetails;
