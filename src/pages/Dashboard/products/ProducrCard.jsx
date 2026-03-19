import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import { FaCartShopping } from "react-icons/fa6";

const ProducrCard = ({ groupedByCategory }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = async (productId) => {
    const alreadyInCart = cart.find((item) => item._id === productId);
    if (alreadyInCart) {
      toast.error("Already in cart!");
      return;
    }
    const res = await fetch(
      `http://localhost:5000/api/products/add-to-cart/${productId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: 1 }),
      },
    );
    if (res.ok) {
      const data = await res.json();
      dispatch(addToCart(data.product));
      toast.success("Added to cart!");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {groupedByCategory.map(({ cat, items }) =>
        items.length === 0 ? (
          "Product not found"
        ) : (
          <div key={cat}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {cat}
              </h2>
              <span className="text-sm text-gray-400 font-medium">
                ({items.length} products)
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {items.map((product) => {
                const inCart = cart.find((i) => i._id === product._id);
                const originalPrice =
                  product.discount > 0
                    ? Math.floor(product.price / (1 - product.discount / 100))
                    : null;

                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl shadow hover:shadow-lg hover:transition hover:scale-105 duration-400 flex flex-col overflow-hidden"
                  >
                    {/* Image */}
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

                    {/* Info */}
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

                        <button
                          onClick={() => handleAddToCart(product._id)}
                          disabled={!!inCart}
                          className={`mt-2 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                            inCart
                              ? "bg-green-100 text-green-700 cursor-default"
                              : "bg-gray-800 hover:bg-gray-900 text-white"
                          }`}
                        >
                          <FaCartShopping size={14} />
                          {inCart ? "In Cart" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default ProducrCard;
