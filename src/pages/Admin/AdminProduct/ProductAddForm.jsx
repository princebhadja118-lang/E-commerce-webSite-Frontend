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
  });
  const [error, setError] = useState({
    title: "",
    brand: "",
    price: "",
    img: "",
    category: "",
  });

  const handleAddProduct = async () => {
    const newError = { title: "", brand: "", price: "", img: "", category: "" };

    if (!form.title.trim()) newError.title = "Title is required";
    else if (!form.brand.trim()) newError.brand = "Brand is required";
    else if (!form.price.trim()) newError.price = "Price is required";
    else if (!form.img.trim()) newError.img = "Image is required";
    else if (!form.category.trim()) newError.category = "Category is required";

    setError(newError);

    if (Object.values(newError).some((value) => value !== "")) {
      return;
    }

    await fetch("http://localhost:5000/api/products/add-product", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
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
    });
    setShowPopup(false);
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5 z-40">
        <div className="bg-white p-3 md:p-6 rounded h-fit w-sm flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Add New Product</h2>
            <button onClick={() => setShowPopup(false)}>
              <IoClose size={25} />
            </button>
          </div>

          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded"
          />
          {error.title && <p className="text-red-500">{error.title}</p>}
          <input
            type="text"
            placeholder="Brand"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="border p-2 rounded"
          />
          {error.brand && <p className="text-red-500">{error.brand}</p>}
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 rounded"
          />
          {error.price && <p className="text-red-500">{error.price}</p>}
          <input
            type="number"
            placeholder="Discount %"
            value={form.discount}
            onChange={(e) => setForm({ ...form, discount: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={form.img}
            onChange={(e) => setForm({ ...form, img: e.target.value })}
            className="border p-2 rounded"
          />
          {error.img && <p className="text-red-500">{error.img}</p>}
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value.toUpperCase() })
            }
            className="border p-2 rounded"
          />
          {error.category && <p className="text-red-500">{error.category}</p>}
          <div className="flex gap-3">
            <button
              onClick={handleAddProduct}
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Confirm
            </button>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-red-600 text-white px-4 py-2 rounded w-full"
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
