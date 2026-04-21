import React from "react";

const HomeSectionCard = ({ product, onClick }) => {

  // ✅ Safe image
  const imageSrc =
    product?.image ||
    product?.imageUrl ||
    "https://via.placeholder.com/200?text=No+Image";

  // ✅ Price
  const price = product?.price || 0;
  const discountedPrice = product?.discountedPrice || 0;

  // ✅ Discount auto calculate
  const discount =
    price > 0
      ? Math.round(((price - discountedPrice) / price) * 100)
      : 0;

  return (
    <div
      onClick={() => onClick(product)}   // 🔥 CLICK HANDLER
      className="cursor-pointer flex flex-col bg-white rounded-xl shadow-md overflow-hidden w-[12rem] hover:shadow-xl transition duration-300"
    >

      {/* 🔥 IMAGE */}
      <div className="h-[18rem] w-full bg-gray-100 flex items-center justify-center">
        <img
          src={imageSrc}
          alt={product?.title || "product"}
          className="h-full w-full object-contain hover:scale-105 transition duration-300"
        />
      </div>

      {/* 🔥 DETAILS */}
      <div className="p-3 text-center">

        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {product?.brand || "Brand"}
        </h3>

        <p className="text-xs text-gray-500 truncate">
          {product?.title || "Product"}
        </p>

        {/* 🔥 PRICE */}
        <div className="flex items-center justify-center gap-2 mt-1 flex-wrap">

          <span className="text-sm font-bold text-black">
            ₹{discountedPrice}
          </span>

          <span className="text-xs text-gray-400 line-through">
            ₹{price}
          </span>

          <span className="text-xs text-green-600 font-semibold">
            {discount}% off
          </span>

        </div>
      </div>
    </div>
  );
};

export default HomeSectionCard;