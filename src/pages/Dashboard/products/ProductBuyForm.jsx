import React from "react";
import { IoClose } from "react-icons/io5";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";

const ProductBuyForm = ({ setShowForm }) => {
  const stripePromise = loadStripe(
    "pk_test_51T9NlOAeER5tBs8aBq48732wCWF3aF13k653f6ygIqc1w2u4As3E4DhRMn2iZdSdckhQHfqNOixc7MysoDfTzTe100LWgXOXEX",
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-10 md:p-22">
      <div className="bg-white p-5 rounded shadow-lg overflow-y-scroll h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Buy Product</h2>
          <button
            onClick={() => setShowForm(false)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <IoClose size={20} md:size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 md:gap-2 mb-2 ">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-0.5 md:mb-2 text-sm md:text-base"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="border border-gray-300 p-1 md:p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-0.5 md:mb-2 text-sm md:text-base"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              className="border border-gray-300 p-1 md:p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-semibold mb-0.5 md:mb-2 text-sm md:text-base"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="phone"
              placeholder="Enter your number"
              className="border border-gray-300 p-1 md:p-2 rounded w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 md:gap-2 md:mb-4">
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-semibold mb-0.5 md:mb-2 text-sm md:text-base"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter your address"
              className="border border-gray-300 p-1 md:p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-gray-700 font-semibold mb-0.5 md:mb-1 text-sm md:text-base"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="Enter your city"
              className="border border-gray-300 p-1 md:p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-gray-700 font-semibold mb-0.5 md:mb-1 text-sm md:text-base"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              placeholder="Enter your state"
              className="border border-gray-300 p-1 md:p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="pincode"
              className="block text-gray-700 font-semibold mb-0.5 md:mb-1 text-sm md:text-base"
            >
              Pincode
            </label>
            <input
              type="tel"
              id="pincode"
              placeholder="Enter your pincode"
              className="border border-gray-300 p-1 md:p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block font-semibold text-gray-700 mb-0.5 md:mb-2 text-sm md:text-base"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              placeholder="Enter your country"
              className=" border border-gray-300 p-1 md:p-2 rounded w-full"
            />
          </div>
        </div>
        <Elements stripe={stripePromise}>
          <Checkout setShowForm={setShowForm} />
        </Elements>
      </div>
    </div>
  );
};

export default ProductBuyForm;
