import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";

const ProducrCard = ({ products, categories }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const handleAddtoCard = async (productsid) => {
    try {
      const check = cart.find((item) => item._id === productsid);

      if (check) {
        toast.error("Product already in cart!");
        return;
      }
      const res = await fetch(
        `http://localhost:5000/api/products/add-to-cart/${productsid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: 1 }),
        },
      );
      if (res.ok) {
        const data = await res.json();
        dispatch(addToCart(data.product));
        toast.success("Product added to cart!");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  return (
    <div>
      {categories.map((cat) => {
        const categoryProducts = products.filter(
          (product) => product.category.toUpperCase() === cat.toUpperCase(),
        );

        return (
          <div key={cat} className="mb-10">
            <h2 className="text-lg md:text-2xl font-bold mb-1">{cat}</h2>

            <div className="flex flex-auto overflow-x-scroll gap-2 md:gap-5 w-full p-3 md:p-5 pb-10">
              {categoryProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white grid grid-rows-[1fr_auto] rounded shadow hover:scale-103 transition flex-1 md:min-w-64 p-5"
                >
                  <div className="flex justify-center items-center h-32">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="h-full object-contain"
                    />
                  </div>

                  <h3 className="text-sm md:text-xl font-semibold mt-2 line-clamp-2 md:line-clamp-1 hover:line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-gray-500 text-sm ">{product.brand}</p>
                  <code className="text-green-600 font-bold text-sm md:text-xl flex items-center gap-3">
                    ₹{product.price}
                    {product.discount > 0 && (
                      <span className="line-through text-gray-400 font-normal">
                        ₹
                        {Math.floor(
                          product.price / (1 - product.discount / 100),
                        )}
                      </span>
                    )}
                  </code>
                  <button
                    onClick={() => handleAddtoCard(product._id)}
                    className="w-full bg-gray-600 text-white text-sm md:text-base font-semibold py-2 rounded hover:bg-gray-700 transition ease-in-out cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProducrCard;
