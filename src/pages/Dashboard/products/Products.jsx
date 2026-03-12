import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import ProducrCard from "./ProducrCard";
import ShopingCard from "./ShopingCard";
import { useSelector } from "react-redux";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const cart = useSelector((state) => state.cart.cartItems);

  const fetchProduct = async () => {
    const res = await fetch("http://localhost:5000/api/products/get-products");
    const data = await res.json();

    setProducts(data.products);

    // unique categories
    setCategories([
      ...new Set(data.products.map((item) => item.category.toUpperCase())),
    ]);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="mb-5 md:m-5">
      <div className="max-w-6xl mx-auto bg-gray-200 rounded-2xl shadow-xl p-4 md:p-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-xl md:text-4xl">
            <u>PRODU</u>CTS
          </h1>
          <div
            className="relative flex justify-center"
            onClick={() => setShowCard(true)}
          >
            <button className="cursor-pointer">
              <FaCartShopping size={25} md:size={30} />
              <p className="text-sm font-bold absolute -top-3 -right-3 bg-red-500 w-5 h-5 items-center leading-5 text-center rounded-full text-white">
                {cart.length}
              </p>
            </button>
          </div>
        </div>
        <div>
          <ProducrCard categories={categories} products={products} />
        </div>
      </div>
      {showCard && <ShopingCard setShowCard={setShowCard} />}
    </div>
  );
};

export default Products;
