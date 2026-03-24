import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../../redux/cartSlice";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const ShopingCard = ({ setShowCart }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const checkForm = () => {
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is Required";
    else if (!formData.email) newErrors.email = "Email is Required";
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email";
    else if (!formData.phone) newErrors.phone = "Phone is Required";
    else if (String(formData.phone).length !== 10)
      newErrors.phone = "Must be 10 digits";
    else if (!formData.address) newErrors.address = "Address is Required";
    else if (!formData.city) newErrors.city = "City is Required";
    else if (!formData.state) newErrors.state = "State is Required";
    else if (!formData.pincode) newErrors.pincode = "Pincode is Required";
    else if (String(formData.pincode).length !== 6)
      newErrors.pincode = "Must be 6 digits";
    else if (!formData.country) newErrors.country = "Country is Required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = () => {
    if (checkForm()) setStep(3);
  };

  const steps = ["Cart", "Address", "Payment"];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex justify-end">
      <div className="bg-white w-full max-w-lg h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b bg-gray-800 text-white">
          <div>
            <h2 className="text-lg font-bold">Shopping Cart</h2>
            <p className="text-xs text-gray-300">{cart.length} item(s)</p>
          </div>
          <button
            onClick={() => setShowCart(false)}
            className="hover:bg-gray-700 p-1 rounded cursor-pointer"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-50 border-b">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div
                className={`flex items-center gap-1.5 text-sm font-semibold ${step === i + 1 ? "text-gray-800" : step > i + 1 ? "text-green-600" : "text-gray-400"}`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === i + 1 ? "bg-gray-800 text-white" : step > i + 1 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </span>
                {s}
              </div>
              {i < 2 && <div className="flex-1 h-px bg-gray-200" />}
            </React.Fragment>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
              <i className="fa-solid fa-cart-shopping text-6xl" />
              <p className="text-lg font-semibold">Your cart is empty</p>
              <button
                onClick={() => setShowCard(false)}
                className="bg-gray-800 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-900 cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : step === 1 ? (
            /* Step 1 — Cart Items */
            <div className="flex flex-col gap-3">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-16 h-16 object-contain bg-white rounded-lg border border-gray-400 p-1"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800 line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400">{item.brand}</p>
                    <p className="text-green-600 font-bold text-sm mt-1">
                      ₹{item.price * (item.quantity || 1)}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          const q = (item.quantity || 1) - 1;
                          q === 0
                            ? dispatch(removeFromCart(item._id))
                            : dispatch(
                                updateQuantity({ id: item._id, quantity: q }),
                              );
                        }}
                        className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 flex items-center justify-center cursor-pointer"
                      >
                        <i class="fa-solid fa-minus"></i>
                      </button>
                      <span className="w-5 text-center text-sm font-semibold">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item._id,
                              quantity: (item.quantity || 1) + 1,
                            }),
                          )
                        }
                        disabled={
                          (item.quantity || 1) >= (item.stock ?? Infinity)
                        }
                        className="h-7 w-7 rounded-full bg-gray-800 hover:bg-gray-900 text-white font-bold flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : step === 2 ? (
            /* Step 2 — Address */
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "name", label: "Full Name", type: "text", span: 2 },
                { name: "email", label: "Email", type: "email", span: 2 },
                { name: "phone", label: "Phone", type: "number", span: 1 },
                { name: "address", label: "Address", type: "text", span: 1 },
                { name: "city", label: "City", type: "text", span: 1 },
                { name: "state", label: "State", type: "text", span: 1 },
                { name: "pincode", label: "Pincode", type: "number", span: 1 },
                { name: "country", label: "Country", type: "text", span: 1 },
              ].map((field) => (
                <div
                  key={field.name}
                  className={field.span === 2 ? "col-span-2" : ""}
                >
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleForm}
                    placeholder={field.label}
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition ${errors[field.name] ? "border-red-400" : "border-gray-300"}`}
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Step 3 — Payment */
            <div>
              <div className="bg-gray-50 rounded-xl p-4 mb-4 border">
                <h3 className="font-semibold text-gray-700 mb-2 text-sm">
                  Order Summary
                </h3>
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between text-sm text-gray-600 py-1 border-b border-gray-100"
                  >
                    <span className="line-clamp-1 flex-1 pr-2">
                      {item.title}{" "}
                      {item.quantity > 1 && (
                        <span className="text-gray-400">x{item.quantity}</span>
                      )}
                    </span>
                    <span className="font-semibold text-gray-800">
                      ₹{item.price * (item.quantity || 1)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-base mt-3 pt-2 border-t border-gray-300">
                  <span>Total</span>
                  <span className="text-green-600">₹{total}</span>
                </div>
              </div>
              <Elements stripe={stripePromise}>
                <Checkout
                  setShowCard={setShowCard}
                  checkForm={() => true}
                  formData={formData}
                />
              </Elements>
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t px-5 py-4 bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-500 text-sm">
                {cart.length} item(s)
              </span>
              <span className="font-bold text-lg text-green-600">₹{total}</span>
            </div>
            <div className="flex gap-2">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1) || setErrors({})}
                  className="flex-1 border-2 border-gray-800 text-gray-800 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition cursor-pointer"
                >
                  Back
                </button>
              )}
              {step === 1 && (
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2.5 rounded-xl transition cursor-pointer"
                >
                  Proceed to Address →
                </button>
              )}
              {step === 2 && (
                <button
                  onClick={handleProceed}
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2.5 rounded-xl transition cursor-pointer"
                >
                  Proceed to Payment →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopingCard;
