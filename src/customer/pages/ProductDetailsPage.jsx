import React, { useState } from "react";
import { useParams } from "react-router-dom";

// DATA
import mens_kurta from "../../Data/mens_kurta";
import womens_data from "../../Data/women_data";
import footwear_data from "../../Data/footwear_data";
import makeup_data from "../../Data/makeup_data";

// CART
import { useCart } from "../context/CartContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState("");

  const allProducts = [
    ...mens_kurta,
    ...womens_data,
    ...footwear_data,
    ...makeup_data,
  ];

  const product = allProducts.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h2 className="p-10">Product Not Found</h2>;
  }

  // fallback sizes if product doesn't have sizes
  const sizes = product.size || product.sizes || ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({
      ...product,
      selectedSize, // 🔥 IMPORTANT
    });
  };

  return (
    <div className="p-5 lg:p-10 flex flex-col lg:flex-row gap-10 bg-gray-50">

      {/* IMAGE */}
      <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg shadow">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-[450px] object-contain"
        />
      </div>

      {/* DETAILS */}
      <div className="w-full lg:w-1/2 space-y-5 bg-white p-6 rounded-lg shadow">

        <h1 className="text-2xl font-bold">{product.title}</h1>

        <p className="text-gray-600">
          Brand: <span className="font-medium">{product.brand}</span>
        </p>

        {/* PRICE */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-black">
            ₹{product.discountedPrice}
          </span>

          <span className="text-gray-400 line-through">
            ₹{product.price}
          </span>

          <span className="text-green-600 font-semibold">
            {product.discountPersent}% OFF
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-500">
          This is a high-quality product perfect for daily and festive use.
        </p>

        {/* SIZE SELECTOR 🔥 */}
        <div>
          <p className="font-semibold mb-2">Select Size</p>

          <div className="flex gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-md transition ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* SELECTED SIZE DISPLAY */}
        {selectedSize && (
          <p className="text-sm text-gray-600">
            Selected Size: <b>{selectedSize}</b>
          </p>
        )}

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductDetailsPage;