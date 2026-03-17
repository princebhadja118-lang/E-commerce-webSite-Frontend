import React, { useEffect, useState } from "react";
import ProductAddForm from "./ProductAddForm";
import ProductCards from "./ProductCards";
import CategorieCard from "./CategorieCard";

const Product = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [Popup, setPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchProduct = () => {
    fetch("http://localhost:5000/api/products/get-products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setCategories([
          ...new Set(data.products.map((item) => item.category.toUpperCase())),
        ]);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="text-black">
      {/* Add Product Header */}
      <div className="bg-white/50 flex flex-col md:flex-row justify-between p-3 border-2 border-gray-400 border-dashed my-5">
        <code className="text-lg md:text-2xl px-1 md:px-3 py-2">
          Add Products
        </code>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-gray-600 text-white px-4 py-2 rounded shadow-lg hover:bg-gray-900 cursor-pointer"
        >
          Add Product
        </button>
      </div>

      {/* Categories Card */}
      <CategorieCard
        categories={categories}
        products={products}
        setPopup={setPopup}
        setSelectedCategory={setSelectedCategory}
      />

      {/*product Cards */}
      {Popup && (
        <ProductCards
          products={products}
          selectedCategory={selectedCategory}
          setPopup={setPopup}
          refreshProduct={fetchProduct}
        />
      )}

      {/* Add Product Form */}
      {showPopup && (
        <ProductAddForm
          setShowPopup={setShowPopup}
          fetchProduct={fetchProduct}
        />
      )}
    </div>
  );
};

export default Product;
