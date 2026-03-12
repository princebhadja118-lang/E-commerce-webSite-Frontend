import React from "react";

const CategorieCard = ({
  categories,
  products,
  setPopup,
  setSelectedCategory,
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {categories.map((cat) => {
          const firstProduct = products.find(
            (product) => product.category.toUpperCase() === cat.toUpperCase(),
          );

          return (
            <div
              key={cat}
              onClick={() => {
                setPopup(true);
                setSelectedCategory(cat);
              }}
              className="bg-white p-6 rounded shadow cursor-pointer hover:scale-105 flex flex-col items-center gap-3"
            >
              {firstProduct && (
                <img
                  src={firstProduct.img}
                  alt={cat}
                  className="w-24 h-24 object-contain"
                />
              )}

              <h2 className="text-xl font-bold">{cat}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorieCard;
