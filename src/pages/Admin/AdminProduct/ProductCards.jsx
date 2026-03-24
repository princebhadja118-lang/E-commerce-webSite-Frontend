import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

const ProductCards = ({
  products,
  selectedCategory,
  setPopup,
  refreshProduct,
}) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    brand: "",
    price: "",
    discount: "",
    img: "",
    category: "",
    stock: "",
  });

  const handleDelete = async (productId) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/delete-product/${productId}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        toast.success("Product deleted!");
        refreshProduct();
      } else {
        toast.error("Failed to delete product.");
      }
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const handleEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/update-product/${form._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      if (res.ok) {
        toast.success("Product updated successfully!");
        refreshProduct();
        setShowEditForm(false);
      } else {
        toast.error("Failed to update product.");
      }
    } catch (err) {
      toast.error("Failed to update product.");
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-10 md:p-22 z-40"
        onClick={() => setPopup(false)}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-3 pt-20 overflow-y-scroll h-screen "
          onClick={(e) => e.stopPropagation()}
        >
          {products
            .filter(
              (product) =>
                product.category.toUpperCase() ===
                selectedCategory.toUpperCase(),
            )
            .map((product) => (
              <div
                key={product._id}
                className="transition-all hover:scale-105 duration-300 ease-in-out p-3 "
              >
                <div className="grid grid-rows-1 items-start flex-col gap-3 bg-white p-5 rounded shadow-2xl h-full">
                  <div className="flex justify-center items-center w-full">
                    <img
                      src={product.img}
                      alt="product"
                      className="hover:transition transform hover:scale-105 h-56 w-56 object-contain"
                    />
                  </div>

                  <div>
                    <h2 className="line-clamp-1 text-xl">{product.title}</h2>
                    <p className="line-clamp-1 text-gray-600 text-sm">
                      <span className="text-gray-600 font-semibold ">
                        Brand:
                      </span>
                      {product.brand}
                    </p>

                    <code className="text-green-600 font-bold text-xl flex items-center gap-3">
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
                    <p
                      className={`text-sm font-semibold mb-2 ${product.stock === 0 ? "text-red-500" : "text-gray-500"}`}
                    >
                      Stock: {product.stock ?? 0}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setForm(product);
                          setShowEditForm(true);
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex-1 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div>
            {showEditForm && (
              <div
                className="fixed inset-0 bg-black/70 flex items-center justify-center p-5 "
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white p-3 md:p-6 rounded w-sm flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Edit Product</h2>
                    <button
                      onClick={() => setShowEditForm(false)}
                      className="cursor-pointer"
                    >
                      <IoClose size={25} />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Brand"
                    value={form.brand}
                    onChange={(e) =>
                      setForm({ ...form, brand: e.target.value })
                    }
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Discount %"
                    value={form.discount}
                    onChange={(e) =>
                      setForm({ ...form, discount: e.target.value })
                    }
                    className="border p-2 rounded"
                  />

                  <input
                    type="text"
                    placeholder="Image URL"
                    value={form.img}
                    onChange={(e) => setForm({ ...form, img: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Stock Quantity"
                    value={form.stock ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, stock: e.target.value })
                    }
                    className="border p-2 rounded"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleEdit}
                      className="bg-green-600 text-white px-4 py-2 rounded w-full cursor-pointer"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => setShowEditForm(false)}
                      className="bg-red-600 text-white px-4 py-2 rounded w-full cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
