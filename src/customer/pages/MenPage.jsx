import React, { useState } from "react";
import mens_kurta from "../../Data/mens_kurta";
import ProductCard from "../components/ProductCard/ProductCard";

const MenPage = () => {
  const [price, setPrice] = useState(5000);
  const [selectedSize, setSelectedSize] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // ✅ FILTER LOGIC
  const filteredProducts = mens_kurta.filter((item) => {
    return (
      item.price <= price &&
      (selectedSize === "" || item.size?.includes(selectedSize)) &&
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  // ✅ SORTING
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "low") return a.discountedPrice - b.discountedPrice;
    if (sort === "high") return b.discountedPrice - a.discountedPrice;
    return 0;
  });

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🔥 TOP BANNER */}
      <div className="bg-indigo-100 text-center py-6 mb-6">
        <h2 className="text-2xl font-bold">Men's Kurta Collection</h2>
        <p className="text-gray-600">Flat 50% OFF on all styles</p>
      </div>

      <div className="flex px-6 gap-6">

        {/* 🔹 LEFT FILTER */}
        <div className="w-64 bg-white p-4 rounded shadow-sm h-fit sticky top-20">

          <h2 className="font-bold text-lg mb-4">Filters</h2>

          {/* 🔍 SEARCH */}
          <input
            type="text"
            placeholder="Search products..."
            className="border px-3 py-2 w-full mb-4 rounded"
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* PRICE */}
          <p className="font-semibold">Price</p>
          <input
            type="range"
            min="0"
            max="5000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mb-4">
            Up to ₹{price}
          </p>

          {/* SIZE */}
          <p className="font-semibold">Size</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`border px-3 py-1 rounded text-sm ${
                  selectedSize === s
                    ? "bg-indigo-600 text-white"
                    : "bg-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

        </div>

        {/* 🔹 RIGHT PRODUCTS */}
        <div className="flex-1">

          {/* 🔥 TOP BAR (SORT + COUNT) */}
          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="text-2xl font-bold">Men's Kurta</h1>
              <p className="text-gray-500 text-sm">
                Showing {sortedProducts.length} results
              </p>
            </div>

            {/* SORT */}
            <select
              onChange={(e) => setSort(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="">Sort By</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>

          </div>

          {/* ✅ PRODUCT GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {sortedProducts.length > 0 ? (
              sortedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found
              </p>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default MenPage;