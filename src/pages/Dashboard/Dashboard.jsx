import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import Logo from "../../components/Logo";
import Products from "./products/Products";
import OrdersDetails from "./Order-Details/OrdersDetails";
import Wishlist from "./Wishlist";
import About from "./About";
import { FaCartShopping, FaBars, FaXmark, FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "../../redux/wishlistSlice";
import ShopingCard from "./products/ShopingCard";

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [activePage, setActivePage] = useState("products");

  const cart = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/wishlist/get", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        if (data.success) dispatch(setWishlist(data.wishlist));
      } catch (err) {}
    };
    fetchWishlist();
  }, [user, dispatch]);

  const Pages = () => {
    if (activePage === "products") {
      return <Products />;
    }
    if (activePage === "wishlist") {
      return <Wishlist />;
    }
    if (activePage === "about") {
      return <About />;
    }
  };

  const navLinks = [
    { key: "about", label: "About" },
    { key: "products", label: "Products" },
    { key: "wishlist", label: "Wishlist" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-40">
          <div className="flex justify-between items-center px-4 md:px-8 py-3">
            {/* Logo */}
            <Logo width={130} />

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6 font-semibold">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => setActivePage(link.key)}
                  className={`pb-1 transition border-b-2 ${
                    activePage === link.key
                      ? "border-blue-400 text-blue-400"
                      : "border-transparent hover:text-blue-300"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Wishlist */}
              <button
                onClick={() => setActivePage("wishlist")}
                className="relative cursor-pointer p-2 hover:bg-gray-700 rounded-lg transition"
              >
                <FaHeart size={22} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => {
                  setActivePage("products") || setShowCart(true);
                }}
                className="relative cursor-pointer p-2 hover:bg-gray-700 rounded-lg transition"
              >
                <FaCartShopping size={22} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* User + Orders */}
              <button
                onClick={() => setShowOrders(true)}
                className="hidden md:flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition cursor-pointer"
              >
                <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold">{user?.username}</span>
              </button>

              <button
                onClick={logout}
                className="hidden md:block bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition cursor-pointer text-sm"
              >
                Logout
              </button>

              {/* Mobile */}
              <button
                onClick={() => setMenu((p) => !p)}
                className="md:hidden p-2 hover:bg-gray-700 rounded-lg transition cursor-pointer"
              >
                {menu ? <FaXmark size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menu && (
            <div className="md:hidden bg-gray-700 px-4 pb-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => {
                    setActivePage(link.key);
                    setMenu(false);
                  }}
                  className={`text-left py-2 font-semibold border-b border-gray-600 ${
                    activePage === link.key ? "text-blue-400" : "text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setShowOrders(true);
                  setMenu(false);
                }}
                className="text-left py-2 font-semibold text-white border-b border-gray-600"
              >
                My Orders ({user?.username})
              </button>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition cursor-pointer text-sm w-full"
              >
                Logout
              </button>
            </div>
          )}
        </nav>

        {/* Page Content */}
        <main>{Pages()}</main>
      </div>
      {showCart && <ShopingCard setShowCart={setShowCart} />}
      <div>{showOrders && <OrdersDetails setShowOrders={setShowOrders} />}</div>
    </>
  );
};

export default Dashboard;
