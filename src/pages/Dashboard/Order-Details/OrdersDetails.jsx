import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "../../../auth/AuthContext";
import OrderCard from "./OrderCard";
import DeliveryStatus from "./DeliveryStatus";

const OrdersDetails = ({ setShowOrders }) => {
  const [orders, setOrders] = useState([]);
  const [idProduct, setIdProduct] = useState();
  const [selectedOrder, setSelectedOrder] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchProductById = (id) => {
    fetch(`http://localhost:5000/api/products/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIdProduct(data.product);
        setLoading(false);
      });
  };

  const userOrders = () => {
    fetch(`http://localhost:5000/api/orders/get-orders/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => userOrders(), []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center h-screen w-full bg-black/70">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-white " />
      </div>
    );
  }

  return (
    <div>
      <div
        className="fixed inset-0 flex justify-center items-center w-full h-full bg-black/70 z-50 p-4 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-2xl bg-gray-50 p-3 rounded ">
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
                className="flex bg-white shadow justify-between items-center mb-4 py-2 rounded "
              >
                <ul className="w-full">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:px-2 py-1">
                    <div className="flex gap-1">
                      <li className="font-semibold">Order# </li>
                      <li>{order._id}</li>
                    </div>
                    <div className="flex gap-1 items-center">
                      <li className="font-semibold">TotalAmount:</li>
                      <li>₹{order.totalAmount}</li>
                    </div>
                  </div>
                  <div className="flex flex-col pt-3 md:pt-0 gap-2">
                    {order.products.map((product) => (
                      <span
                        key={product._id}
                        onClick={() => {
                          fetchProductById(product._id) ||
                            setSelectedOrder(true);
                        }}
                        className="w-full border-t border-gray-300 py-2 cursor-pointer"
                      >
                        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-2 py-1">
                          <div className="flex items-center justify-center md:justify-center md:items-start px-2">
                            <img
                              src={product.img}
                              alt={product.title}
                              className="h-16 w-16 object-contain"
                            />
                            <div className="flex flex-col justify-center items-start h-full px-2 py-1.5">
                              <li className="text-xl font-semibold">
                                {product.title}
                              </li>
                              <li>
                                Placed on:{" "}
                                {new Date(order.date).toLocaleDateString()}{" "}
                              </li>
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center py-1.5 px-2">
                            <li className="text-lg font-semibold text-gray-700">
                              ₹{product.price.toFixed(2)}
                            </li>
                            <li>
                              <DeliveryStatus
                                date={order.date}
                                time={order.time}
                              />
                            </li>
                          </div>
                        </div>
                      </span>
                    ))}
                  </div>
                </ul>
              </ul>
            ))}
          </div>
          <div>
            {selectedOrder && (
              <OrderCard
                idProduct={idProduct}
                setIdProduct={setIdProduct}
                setSelectedOrder={setSelectedOrder}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDetails;
