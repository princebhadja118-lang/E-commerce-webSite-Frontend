import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

const ProductAddForm = ({ setShowPopup, fetchProduct }) => {
  const [form, setForm] = useState({
    title: "",
    brand: "",
    price: "",
    discount: "",
    img: "",
    category: "",
    stock: "",
  });
  const [error, setError] = useState({
    title: "",
    brand: "",
    price: "",
    img: "",
    category: "",
    stock: "",
  });

  const handleAddProduct = async () => {
    const newError = {
      title: "",
      brand: "",
      price: "",
      img: "",
      category: "",
      stock: "",
    };

    if (!form.title.trim()) newError.title = "Title is required";
    else if (!form.brand.trim()) newError.brand = "Brand is required";
    else if (!form.price.trim()) newError.price = "Price is required";
    else if (!form.img.trim()) newError.img = "Image is required";
    else if (!form.category.trim()) newError.category = "Category is required";
    else if (!String(form.stock).trim() || isNaN(form.stock))
      newError.stock = "Stock is required";

    setError(newError);

    if (Object.values(newError).some((value) => value !== "")) {
      return;
    }

    const admin = JSON.parse(localStorage.getItem("user"));
    await fetch("http://localhost:5000/api/admin/products", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${admin?.token}`,
      },
      body: JSON.stringify(form),
    });
    fetchProduct();
    toast.success("Product added successfully!");
    setForm({
      title: "",
      brand: "",
      price: "",
      discount: "",
      img: "",
      category: "",
      stock: "",
    });
    setShowPopup(false);
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5 z-40">
        <div className="bg-white p-3 md:p-6 rounded h-fit w-sm flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Add New Product</h2>
            <button
              onClick={() => setShowPopup(false)}
              className="cursor-pointer"
            >
              <IoClose size={25} />
            </button>
          </div>

          <div className="h-70 md:h-fit overflow-scroll">
            <div>
              <label htmlFor="title">Title : </label>
              <input
                type="text"
                placeholder="Title"
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border p-2 rounded w-full"
              />
              {error.title && <p className="text-red-500">{error.title}</p>}
            </div>
            <div>
              <label htmlFor="brand">Brand : </label>
              <input
                type="text"
                placeholder="Brand"
                id="brand"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="border p-2 rounded w-full"
              />
              {error.brand && <p className="text-red-500">{error.brand}</p>}
            </div>
            <div>
              <label htmlFor="price">Price : </label>
              <input
                type="number"
                placeholder="Price"
                id="price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="border p-2 rounded w-full"
              />
              {error.price && <p className="text-red-500">{error.price}</p>}
            </div>
            <div>
              <label htmlFor="discount">Discount % : </label>
              <input
                type="number"
                placeholder="Discount %"
                id="discount"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                className="border p-2 rounded w-full"
              />
              {error.discount && (
                <p className="text-red-500">{error.discount}</p>
              )}
            </div>
            <div>
              <label htmlFor="img">Image URL : </label>
              <input
                type="text"
                placeholder="Image URL"
                id="img"
                value={form.img}
                onChange={(e) => setForm({ ...form, img: e.target.value })}
                className="border p-2 rounded w-full"
              />
              {error.img && <p className="text-red-500">{error.img}</p>}
            </div>
            <div>
              <label htmlFor="category">Category : </label>
              <input
                type="text"
                placeholder="Category"
                id="category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value.toUpperCase() })
                }
                className="border p-2 rounded w-full"
              />
              {error.category && (
                <p className="text-red-500">{error.category}</p>
              )}
            </div>
            <div>
              <label htmlFor="stock">Stock Quantity : </label>
              <input
                type="number"
                placeholder="Stock Quantity"
                id="stock"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="border p-2 rounded w-full"
              />
              {error.stock && <p className="text-red-500">{error.stock}</p>}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddProduct}
              className="bg-green-600 text-white px-4 py-2 rounded w-full cursor-pointer"
            >
              Confirm
            </button>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-red-600 text-white px-4 py-2 rounded w-full cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAddForm;
