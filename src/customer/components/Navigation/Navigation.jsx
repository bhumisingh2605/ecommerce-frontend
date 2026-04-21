import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MagnifyingGlassIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

import { useCart } from "../../context/CartContext";
import AuthModal from "../../auth/AuthModal";

import mens_kurta from "../../../Data/mens_kurta";
import womens_data from "../../../Data/women_data";
import footwear_data from "../../../Data/footwear_data";
import makeup_data from "../../../Data/makeup_data";

import { LOGOUT } from "../../../state/auth/ActionType";

export default function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useCart();

  const auth = useSelector((state) => state.auth);
  const isLoggedIn = auth?.jwt !== null;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const allProducts = [
    ...mens_kurta,
    ...womens_data,
    ...footwear_data,
    ...makeup_data,
  ];

  const filteredProducts = allProducts
    .filter((item) =>
      (item.title + item.brand).toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT });
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">

      {/* TOP BAR */}
      <div className="bg-indigo-600 text-white text-center text-xs py-1">
        Get free delivery on orders over ₹1000
      </div>

      {/* MAIN NAV */}
      <div className="flex items-center justify-between px-6 md:px-10 py-3">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold text-indigo-600 cursor-pointer tracking-wide"
        >
          Shop
        </div>

        {/* MENU */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <p
            onClick={() => navigate("/category/men")}
            className="cursor-pointer hover:text-indigo-600"
          >
            Men
          </p>
          <p
            onClick={() => navigate("/category/women")}
            className="cursor-pointer hover:text-indigo-600"
          >
            Women
          </p>
        </div>

        {/* SEARCH BAR (CENTER FEEL LIKE MYNTRA) */}
        <div ref={searchRef} className="relative w-1/3 hidden md:block">

          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSearch(true);
              }}
              placeholder="Search for products, brands..."
              className="bg-transparent w-full ml-2 outline-none text-sm"
            />
          </div>

          {showSearch && search && (
            <div className="absolute top-12 w-full bg-white border rounded-lg shadow-lg max-h-72 overflow-y-auto z-50">

              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    navigate(`/product/${item.id}`);
                    setSearch("");
                    setShowSearch(false);
                  }}
                  className="flex gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={item.imageUrl}
                    className="w-10 h-10 object-contain"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.brand}</p>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>

        {/* RIGHT SIDE ICONS */}
        <div className="flex items-center gap-6">

          {/* CART */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <ShoppingBagIcon className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-1.5 rounded-full">
              {cart.length}
            </span>
          </div>

          {/* LOGIN */}
          {!isLoggedIn ? (
            <button
              onClick={() => setOpenAuthModal(true)}
              className="bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-indigo-700"
            >
              Login
            </button>
          ) : (
            <div className="relative">

              <div
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold cursor-pointer"
              >
                {auth?.user?.email?.charAt(0)?.toUpperCase() || "U"}
              </div>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border shadow-lg rounded-md overflow-hidden">

                  <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    My Profile
                  </p>

                  <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Orders
                  </p>

                  <p
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-red-100 text-red-500 cursor-pointer"
                  >
                    Logout
                  </p>

                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* AUTH MODAL */}
      <AuthModal
        open={openAuthModal}
        handleClose={() => setOpenAuthModal(false)}
      />
    </header>
  );
}