import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// DATA
import mens_kurta from "../../Data/mens_kurta";
import womens_data from "../../Data/women_data";
import footwear_data from "../../Data/footwear_data";
import makeup_data from "../../Data/makeup_data";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("q") || "";

  // 🔥 ALL PRODUCTS
  const allProducts = [
    ...mens_kurta,
    ...womens_data,
    ...footwear_data,
    ...makeup_data,
  ];

  // 🔥 FILTER LOGIC
  const filteredProducts = allProducts.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-5 lg:p-10">

      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>

      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {filteredProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              className="cursor-pointer bg-white shadow p-3 rounded"
            >
              <img
                src={item.imageUrl}
                className="h-40 w-full object-contain"
              />

              <h2 className="text-sm font-semibold mt-2">
                {item.title}
              </h2>

              <p className="text-gray-500 text-xs">
                {item.brand}
              </p>

              <p className="font-bold mt-1">
                ₹{item.discountedPrice}
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default SearchPage;