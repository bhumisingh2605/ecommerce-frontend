import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [liked, setLiked] = useState(false);

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* IMAGE SECTION */}
      <div className="relative bg-gray-100 overflow-hidden">

        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
        />

        {/* DISCOUNT BADGE */}
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-semibold">
          {product.discountPersent}% OFF
        </span>

        {/* WISHLIST */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          {liked ? "❤️" : "🤍"}
        </button>

        {/* QUICK VIEW OVERLAY */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          className="absolute bottom-0 left-0 w-full bg-black text-white text-sm py-2 opacity-0 group-hover:opacity-100 transition"
        >
          Quick View
        </button>
      </div>

      {/* DETAILS */}
      <div className="p-4">

        {/* BRAND */}
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {product.brand}
        </p>

        {/* TITLE */}
        <h2 className="text-sm font-semibold text-gray-800 truncate">
          {product.title}
        </h2>

        {/* RATING */}
        <p className="text-yellow-500 text-xs mt-1">
          ★★★★☆ <span className="text-gray-400">(4.2)</span>
        </p>

        {/* PRICE */}
        <div className="flex items-center gap-2 mt-2">

          <span className="font-bold text-gray-900 text-lg">
            ₹{product.discountedPrice}
          </span>

          <span className="text-gray-400 line-through text-sm">
            ₹{product.price}
          </span>

          <span className="text-green-600 text-xs font-semibold">
            ({product.discountPersent}% OFF)
          </span>

        </div>

        {/* DELIVERY */}
        <p className="text-green-600 text-xs mt-1 font-medium">
          Free Delivery
        </p>

        {/* ADD TO CART */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="w-full mt-3 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition text-sm font-medium"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductCard;