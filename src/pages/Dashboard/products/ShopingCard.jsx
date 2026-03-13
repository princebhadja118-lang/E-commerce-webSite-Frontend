import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../redux/cartSlice";

const stripePromise = loadStripe(
  "pk_test_51T9NlOAeER5tBs8aBq48732wCWF3aF13k653f6ygIqc1w2u4As3E4DhRMn2iZdSdckhQHfqNOixc7MysoDfTzTe100LWgXOXEX",
);

const ShopingCard = ({ setShowCard }) => {
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
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const handleform = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const checkForm = () => {
    let isValid = true;
    if (!formData.name) {
      setErrors({ ...errors, name: "Name is required" });
      isValid = false;
    } else if (!formData.email) {
      setErrors({ ...errors, email: "Email is required" });
      isValid = false;
    } else if (!formData.phone) {
      setErrors({ ...errors, phone: "Phone is required" });
      isValid = false;
    } else if (formData.phone.length !== 10) {
      setErrors({ ...errors, phone: "Phone number must be 10 digits" });
      isValid = false;
    } else if (!formData.address) {
      setErrors({ ...errors, address: "Address is required" });
      isValid = false;
    } else if (!formData.city) {
      setErrors({ ...errors, city: "City is required" });
      isValid = false;
    } else if (!formData.state) {
      setErrors({ ...errors, state: "State is required" });
      isValid = false;
    } else if (!formData.pincode) {
      setErrors({ ...errors, pincode: "Pincode is required" });
      isValid = false;
    } else if (formData.pincode.length !== 6) {
      setErrors({ ...errors, pincode: "Pincode must be 6 digits" });
      isValid = false;
    } else if (!formData.country) {
      setErrors({ ...errors, country: "Country is required" });
      isValid = false;
    }
    return isValid;
  };

  return (
    <div className="fixed inset-0 bg-black/50 w-full h-full flex justify-center items-center p-4 md:p-8">
      <div className="bg-white w-full md:w-fit py-3 pr-3 rounded shadow flex flex-col md:flex-row gap-5">
        <div>
          {cart.length > 0 ? (
            <div className="h-55 md:h-120 overflow-y-scroll p-2 md:w-100 grid grid-cols-1 gap-2">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center border-b-gray-200 border-b-2 md:flex-row justify-between md:items-center w-full"
                >
                  <div>
                    <div className="flex flex-col md:flex-row justify-start md:justify-between gap-1 md:gap-3 ">
                      <div className="flex md:items-center md:justify-center ">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-10 h-10 md:w-20 md:h-20 object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold line-clamp-1 text-sm md:text-base text-gray-500">
                          {item.title}
                        </span>
                        <span className="text-gray-500 text-sm md:text-base">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="bg-red-600 hover:bg-red-700 px-2 py-1 md:px-4 md:py-2 rounded text-sm md:text-base text-white font-semibold cursor-pointer"
                    >
                      <span className="hidden md:flex">Remove</span>{" "}
                      <span className="md:hidden">X</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            " "
          )}
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center mb-2 w-99">
            <h2 className="text-sm md:text-xl font-bold">Shopping Cart</h2>
            <button
              className="cursor-pointer"
              onClick={() => setShowCard(false)}
            >
              <IoClose className="text-lg md:text-2xl" />
            </button>
          </div>
          {cart.length > 0 ? (
            <div>
              <div className=" h-50 md:h-fit overflow-y-scroll ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 md:gap-2 mb-2 ">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-semibold mb-0.5  text-sm md:text-base"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={handleform}
                      placeholder="Enter your name"
                      className="border border-gray-300 p-1 md:p-1.5 rounded w-full"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-semibold mb-0.5  text-sm md:text-base"
                    >
                      Email Address
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      onChange={handleform}
                      placeholder="Enter your email"
                      className="border border-gray-300 p-1 md:p-1.5 rounded w-full"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-gray-700 font-semibold mb-0.5  text-sm md:text-base"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      onChange={handleform}
                      placeholder="Enter your number"
                      className="border border-gray-300 p-1 md:p-1.5 rounded w-full"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-gray-700 font-semibold mb-0.5  text-sm md:text-base"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      onChange={handleform}
                      placeholder="Enter your address"
                      className="border border-gray-300 p-1 md:p-1.5 rounded w-full"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-gray-700 font-semibold mb-0.5  text-sm md:text-base"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      onChange={handleform}
                      placeholder="Enter your city"
                      className="border border-gray-300 p-1 md:p-1.5 rounded w-full"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-gray-700 font-semibold mb-0.5  text-sm md:text-base"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      onChange={handleform}
                      placeholder="Enter your state"
                      className="border border-gray-300 p-1 md:p-1.5 rounded w-full"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="pincode"
                      className="block text-gray-700 font-semibold mb-0.5  text-sm md:text-base"
                    >
                      Pincode
                    </label>
                    <input
                      type="number"
                      id="pincode"
                      name="pincode"
                      onChange={handleform}
                      placeholder="Enter your pincode"
                      className="border border-gray-300 p-1 md:p-1.5 rounded w-full"
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-sm">{errors.pincode}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block font-semibold text-gray-700 mb-0.5 text-sm md:text-base"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      onChange={handleform}
                      placeholder="Enter your country"
                      className=" border border-gray-300 p-1 md:p-1.5 rounded w-full"
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm">{errors.country}</p>
                    )}
                  </div>
                </div>
                <Elements stripe={stripePromise}>
                  <Checkout
                    setShowCard={setShowCard}
                    checkForm={checkForm}
                    formData={formData}
                  />
                </Elements>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 font-semibold py-5">
              Your cart is empty.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopingCard;
