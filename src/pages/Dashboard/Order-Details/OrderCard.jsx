import React from "react";
import { IoClose } from "react-icons/io5";

const OrderCard = ({ setSelectedOrder, idProduct }) => {
  return (
    <div className="fixed inset-0 flex flex-col gap-4 bg-black/80 justify-center items-center h-full w-full p-2 ">
      <div className="w-fit bg-white rounded flex flex-col justify-center items-center shadow shadow-gray-300">
        <button
          onClick={() => setSelectedOrder(false)}
          className="pr-2 py-2 w-full flex justify-end items-center text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <IoClose size={25} />
        </button>
        {idProduct && (
          <>
            <img
              src={idProduct.img}
              alt={idProduct.title}
              className="px-2 md:px-5 h-30 w-45 md:h-64 md:w-130 object-contain"
            />
            <div className="flex flex-col w-full md:px-5 px-2 py-2">
              <p className="text-xl font-bold">{idProduct.title}</p>
              <p className="text-lg font-semibold">{idProduct.brand}</p>
              <p className="text-2xl font-bold">
                ₹{idProduct.price.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
