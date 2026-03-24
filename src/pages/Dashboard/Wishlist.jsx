import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/wishlistSlice";
import { addToCart } from "../../redux/cartSlice";
import { AuthContext } from "../../auth/AuthContext";
import toast from "react-hot-toast";
import { FaTrash, FaCartShopping } from "react-icons/fa6";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const cart = useSelector((state) => state.cart.cartItems);

  const handleRemove = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/wishlist/remove/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );
      if (res.ok) {
        dispatch(removeFromWishlist(productId));
        toast.success("Removed from wishlist");
      }
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  const handleAddToCart = (product) => {
    if (product.stock === 0) return toast.error("Out of stock");
    dispatch(addToCart(product));
    toast.success("Added to cart!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg font-semibold">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {wishlist.map((product) => {
            const inCart = cart.find((i) => i._id === product._id);
            const outOfStock = product.stock === 0;
            const originalPrice =
              product.discount > 0
                ? Math.floor(product.price / (1 - product.discount / 100))
                : null;

            return (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
              >
                <div className="relative flex justify-center items-center h-40 p-4">
                  {product.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      -{product.discount}%
                    </span>
                  )}

                  <img
                    src={product.img}
                    alt={product.title}
                    className="h-full object-contain"
                  />
                </div>

                <div className="flex flex-col flex-1 p-3 gap-1">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    {product.brand}
                  </p>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
                    {product.title}
                  </h3>

                  <div className="mt-auto pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-green-600 font-bold text-base">
                        ₹{product.price}
                      </span>
                      {originalPrice && (
                        <span className="text-gray-400 line-through text-xs">
                          ₹{originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!!inCart || outOfStock}
                        className={`flex-1 flex items-center justify-center gap-1 py-2 rounded text-xs font-semibold transition cursor-pointer ${
                          outOfStock
                            ? "bg-gray-200 text-gray-400 disabled:cursor-not-allowed"
                            : inCart
                              ? "bg-green-100 text-green-700 cursor-default"
                              : "bg-gray-800 hover:bg-gray-900 text-white"
                        }`}
                      >
                        <FaCartShopping size={12} />
                        {outOfStock
                          ? "Out of Stock"
                          : inCart
                            ? "In Cart"
                            : "Add to Cart"}
                      </button>
                      <button
                        onClick={() => handleRemove(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition cursor-pointer"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
