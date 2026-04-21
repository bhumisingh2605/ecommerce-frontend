import React from "react";
import { useParams } from "react-router-dom";

// ✅ DATA IMPORT
import mens_kurta from "../../Data/mens_kurta";
import womens_data from "../../Data/women_data";
import footwear_data from "../../Data/footwear_data";
import makeup_data from "../../Data/makeup_data";

// ✅ PRODUCT CARD
import ProductCard from "../components/ProductCard/ProductCard";

const ProductListPage = () => {
  const { type, subtype } = useParams();

  let products = [];

  // ✅ CATEGORY SELECT
  if (type === "men") {
    products = mens_kurta;
  } else if (type === "women") {
    products = womens_data;
  } else if (type === "footwear") {
    products = footwear_data;
  } else if (type === "makeup") {
    products = makeup_data;
  }

  // ✅ FILTER BY SUBTYPE
  if (subtype) {
    products = products.filter(
      (item) =>
        item.category &&
        item.category.toLowerCase() === subtype.toLowerCase()
    );
  }

  return (
    <div className="p-5 lg:p-10">

      {/* 🔥 TITLE */}
      <h1 className="text-2xl font-bold mb-8 capitalize">
        {type} {subtype ? `- ${subtype}` : ""} Products
      </h1>

      {/* ❌ NO PRODUCTS */}
      {products.length === 0 ? (
        <p className="text-red-500 text-lg">No products found</p>
      ) : (
        
        /* ✅ GRID WITH PRODUCT CARD */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

      )}
    </div>
  );
};

export default ProductListPage;