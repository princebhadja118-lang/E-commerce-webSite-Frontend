import React, { useEffect, useState } from "react";
import ProducrCard from "./ProducrCard";
import ShopingCard from "./ShopingCard";

const Products = ({ showCart, setShowCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/products/get-products");
    const data = await res.json();
    setProducts(data.products);
    setCategories([
      "ALL",
      ...new Set(data.products.map((item) => item.category.toUpperCase())),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const filtered = products.filter((p) => {
    const matchCat =
      activeCategory === "ALL" || p.category.toUpperCase() === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const groupedByCategory =
    activeCategory === "ALL"
      ? categories
          .filter((c) => c !== "ALL")
          .map((cat) => ({
            cat,
            items: filtered.filter((p) => p.category.toUpperCase() === cat),
          }))
      : [{ cat: activeCategory, items: filtered }];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search + Filter Bar */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="relative w-full md:w-96">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search products or brands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="flex overflow-x-scroll w-full gap-2 ">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                  activeCategory === cat
                    ? "bg-gray-800 text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      {loading ? (
        <div className="flex justify-center items-center py-28">
          <div className="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg font-semibold">
          No products found.
        </div>
      ) : (
        <ProducrCard groupedByCategory={groupedByCategory} />
      )}

      {showCart && <ShopingCard setShowCard={setShowCart} />}
    </div>
  );
};

export default Products;
