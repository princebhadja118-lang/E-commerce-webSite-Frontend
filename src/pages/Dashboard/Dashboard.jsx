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
import { FaClipboardList } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import EditUserProfile from "../../components/EditUserProfile";

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [activePage, setActivePage] = useState("products");
  const [orders, setOrders] = useState([]);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openModel, setOpenModel] = useState(false);

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
      return <Products setShowUserProfile={setShowUserProfile} />;
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

  useEffect(() => {
    const userOrders = () => {
      const res = fetch(
        `http://localhost:5000/api/orders/get-orders/${user.id}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.orders);
          setTotalOrders(data.totalOrders);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    };
    userOrders();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-90">
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
            <div className="flex items-center gap-1 md:gap-3">
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

              {/*Order */}
              <div className="hidden md:block">
                <button
                  onClick={() => setShowOrders(true)}
                  className="relative cursor-pointer p-2 hover:bg-gray-700 rounded-lg transition"
                >
                  <FaClipboardList size={22} />
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {totalOrders}
                  </span>
                </button>
              </div>

              <div>
                <p></p>
              </div>

              {/* User*/}
              <div className="flex flex-col gap-1 relative">
                <button
                  onClick={() => setShowUserProfile(!showUserProfile)}
                  className=" md:flex items-center gap-2 bg-gray-700 hover:bg-gray-600 md:pr-3 rounded-full transition cursor-pointer"
                >
                  <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block text-sm font-semibold">
                    {user?.username}
                  </span>
                </button>
                <div className="absolute top-full right-0 mt-1">
                  {showUserProfile && (
                    <div className="bg-gray-700 p-4 flex flex-col items-center justify-center gap-2 w-60">
                      <div className="bg-gray-800/80 backdrop:blur-2xl border border-gray-600 p-2 flex shadow rounded gap-2 w-full">
                        <span className="font-bold bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center">
                          {user?.username?.charAt(0).toUpperCase()}
                        </span>
                        <span className="text-white flex items-center">
                          Name: {user?.username}
                        </span>
                      </div>
                      <span className="bg-gray-800/80 backdrop:blur-2xl border border-gray-600 p-2 flex items-center shadow rounded gap-2 w-full">
                        <HiOutlineMail size={23} />
                        {user?.email}
                      </span>
                      <hr className="w-full text-gray-400 mt-3" />
                      <div className="flex items-center justify-between w-full gap-3 mt-3">
                        <button
                          onClick={() => {
                            setOpenModel(!openModel) ||
                              setShowUserProfile(false);
                          }}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition cursor-pointer text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={logout}
                          className=" w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition cursor-pointer text-sm"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

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
            <div className="md:hidden bg-gray-700 px-4 pb-4 flex flex-col gap-1">
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
                className="relative flex gap-2 text-left py-2 font-semibold text-white border-b border-gray-600"
              >
                <FaClipboardList size={22} /> Order Summary
                <span className="absolute -top-1 left-3 bg-green-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalOrders}
                </span>
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
        <main onClick={() => setShowUserProfile(false)}>{Pages()}</main>
      </div>
      {showCart && (
        <ShopingCard setShowCart={setShowCart} showCart={showCart} />
      )}
      <div>
        {showOrders && (
          <OrdersDetails
            setShowOrders={setShowOrders}
            orders={orders}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </div>
      <div>{openModel && <EditUserProfile setOpenModel={setOpenModel} />}</div>
    </>
  );
};

export default Dashboard;
