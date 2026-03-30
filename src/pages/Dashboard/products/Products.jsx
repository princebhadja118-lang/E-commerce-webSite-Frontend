import React, { useEffect, useState } from "react";
import ProducrCard from "./ProducrCard";
import ShopingCard from "./ShopingCard";
import SideBar from "./SideBar";

const Products = ({ showCart, setShowCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const [activeMenu, setActiveMenu] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [rangeFilter, setRangeFilter] = useState([]);

  const fetchProduct = async () => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:5000/api/products/get-products?minPrice=${minPrice}&maxPrice=${maxPrice}`,
    );
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
  }, [maxPrice, minPrice]);

  const filtered = products.filter((p) => {
    const matchCat =
      activeCategory === "ALL" || p.category.toUpperCase() === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const sorted = filtered.sort((a, b) => {
    const aOut = a.stock === 0;
    const bOut = b.stock === 0;

    if (aOut !== bOut) {
      return aOut ? 1 : -1;
    }

    switch (sortOrder) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
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

  const filterByAll = () => {
    if (groupedByCategory) {
      return groupedByCategory;
    }
    if (sorted) {
      return [{ cat: "ALL", items: sorted }];
    }
    if (range) {
      return [
        {
          cat: "ALL",
          items: products.filter((p) => setRangeFilter(p.price <= range)),
        },
      ];
    }
  };

  return (
    <div className="flex">
      <div>
        <SideBar
          setActiveMenu={setActiveMenu}
          activeMenu={activeMenu}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
      </div>
      <div
        className={`w-full  px-4 py-6 md:ml-65 ${activeMenu ? "ml-32" : "ml-20"}`}
      >
        {/* Search + Filter Bar */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6 w-full">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="relative w-full">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search products or brands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-2 md:pr-4 text-sm md:text-lg py-1.5 md:py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="flex justify-start gap-0 md:gap-2 items-center w-full">
              <label
                htmlFor="sort"
                className="text-sm md:text-lg w-20 font-semibold"
              >
                Sort By:
              </label>
              <select
                id="sort"
                name="Sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 rounded-xl w-full px-1 md:px-2 py-1 md:py-2 outline-none hover:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm md:text-lg"
              >
                <option value="">Select</option>
                <option value="price-low">Price -- Low to High</option>
                <option value="price-high">Price -- High to Low</option>
              </select>
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
          <ProducrCard
            filterByAll={filterByAll}
            setRangeFilter={setRangeFilter}
          />
        )}
        {showCart && <ShopingCard setShowCart={setShowCart} />}
      </div>
    </div>
  );
};

export default Products;
