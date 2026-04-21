import React, { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function ProductDetailsPage() {
  const { addToCart } = useCart();

  // TEMP PRODUCT (replace later with API data)
  const product = {
    id: 1,
    name: "Embroidered Silk Blend Kurta",
    brand: "Manyavar",
    price: 2999,
    discountedPrice: 1499,
    discountPersent: 50,
    description:
      "Premium ethnic wear perfect for festive and daily use. Designed with comfort and style in mind.",
    imageUrl:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80",
    sizes: ["S", "M", "L", "XL"],
  };

  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({
      ...product,
      size: selectedSize,
    });
  };

  return (
    <div className="bg-white py-10">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4">

        {/* IMAGE */}
        <div className="bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[500px] object-cover hover:scale-105 transition duration-500"
          />
        </div>

        {/* DETAILS */}
        <div>

          {/* BRAND */}
          <p className="text-gray-500 uppercase text-sm tracking-wide">
            {product.brand}
          </p>

          {/* TITLE */}
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            {product.name}
          </h1>

          {/* PRICE */}
          <div className="flex items-center gap-3 mt-3">
            <span className="text-2xl font-bold">
              ₹{product.discountedPrice}
            </span>

            <span className="line-through text-gray-400">
              ₹{product.price}
            </span>

            <span className="text-green-600 text-sm font-semibold">
              {product.discountPersent}% OFF
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 mt-4">
            {product.description}
          </p>

          {/* SIZE SELECTOR */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Select Size</h3>

            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md transition ${
                    selectedSize === size
                      ? "bg-indigo-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* DELIVERY */}
          <p className="text-green-600 text-sm mt-4">
            Free Delivery available
          </p>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}