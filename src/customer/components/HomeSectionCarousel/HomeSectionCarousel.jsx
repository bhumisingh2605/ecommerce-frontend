import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeSectionCarosel = ({ data = [], sectionName, category }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // ✅ Responsive
  const responsive = {
    0: { items: 2 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  // ✅ Safe navigation
  const slidePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const slideNext = () => {
    setActiveIndex((prev) =>
      Math.min(prev + 1, data.length - 5)
    );
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  // ✅ CLICK HANDLER (IMPORTANT)
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  // ✅ SAFETY
  const safeData = Array.isArray(data) ? data : [];

  // ✅ ITEMS
  const items = safeData.map((item) => (
    <div key={item.id} className="px-2 md:px-3">
      <HomeSectionCard
        product={item}
        onClick={handleProductClick}
      />
    </div>
  ));

  return (
    <div className="px-4 lg:px-8 my-10">

      {/* 🔥 CLICKABLE TITLE */}
      <h2
        onClick={() => navigate(`/products/${category}`)}
        className="text-2xl font-bold text-gray-800 mb-6 cursor-pointer hover:text-blue-600"
      >
        {sectionName}
      </h2>

      <div className="relative">

        {/* ✅ CAROUSEL */}
        <AliceCarousel
          items={items}
          responsive={responsive}
          mouseTracking
          infinite={false}
          disableDotsControls
          disableButtonsControls
          activeIndex={activeIndex}
          onSlideChanged={syncActiveIndex}
        />

        {/* 👉 RIGHT BUTTON */}
        {activeIndex < safeData.length - 5 && (
          <Button
            onClick={slideNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translate(50%, -50%)",
              bgcolor: "white",
              minWidth: "40px",
              height: "40px",
              borderRadius: "50%",
              boxShadow: 2,
              zIndex: 10,
            }}
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(180deg)", color: "black" }}
            />
          </Button>
        )}

        {/* 👉 LEFT BUTTON */}
        {activeIndex > 0 && (
          <Button
            onClick={slidePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              minWidth: "40px",
              height: "40px",
              borderRadius: "50%",
              boxShadow: 2,
              zIndex: 10,
            }}
          >
            <KeyboardArrowLeftIcon sx={{ color: "black" }} />
          </Button>
        )}

      </div>
    </div>
  );
};

export default HomeSectionCarosel;