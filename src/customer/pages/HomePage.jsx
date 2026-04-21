import React from "react";
import { useNavigate } from "react-router-dom";

import MainCarousel from "../components/HomeCarousel/MainCarousel";
import HomeSectionCarousel from "../components/HomeSectionCarousel/HomeSectionCarousel";

import mens_kurta from "../../Data/mens_kurta";
import womens_data from "../../Data/women_data";
import footwear_data from "../../Data/footwear_data";
import makeup_data from "../../Data/makeup_data";

const HomePage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Men",
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
      route: "/category/men",
    },
    {
      name: "Women",
      image:
        "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03",
      route: "/category/women",
    },
    {
      name: "Footwear",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      route: "/category/footwear",
    },
    {
      name: "Beauty",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
      route: "/category/makeup",
    },
  ];

  return (
    <div className="bg-gray-50">

      {/* HERO CAROUSEL */}
      <MainCarousel />

      {/* CATEGORY SECTION */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <h2 className="text-xl font-bold mb-4">Shop by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => navigate(cat.route)}
              className="cursor-pointer group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <img
                src={cat.image}
                className="h-40 w-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="text-center py-3 font-semibold text-gray-700 group-hover:text-indigo-600">
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SALE BANNER */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-12 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold">Mega Fashion Sale 🔥</h2>
          <p className="mt-2 text-sm opacity-90">
            Up to 70% OFF on top brands
          </p>
        </div>
      </div>

      {/* PRODUCT SECTIONS */}
      <div className="space-y-14 py-14 max-w-7xl mx-auto px-4">

        <HomeSectionCarousel
          sectionName="🔥 Trending Men's Wear"
          data={mens_kurta}
        />

        <HomeSectionCarousel
          sectionName="✨ Women's Fashion"
          data={womens_data}
        />

        <HomeSectionCarousel
          sectionName="👟 Footwear Deals"
          data={footwear_data}
        />

        <HomeSectionCarousel
          sectionName="💄 Beauty & Makeup"
          data={makeup_data}
        />

      </div>

      {/* BOTTOM BANNER */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-black text-white text-center py-12 rounded-2xl">
          <h2 className="text-2xl font-bold">New Season Arrivals 🚀</h2>
          <p className="text-gray-300 mt-2 text-sm">
            Discover latest fashion trends now
          </p>
        </div>
      </div>

    </div>
  );
};

export default HomePage;