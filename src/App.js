import React from "react";
import { Routes, Route } from "react-router-dom";

// COMPONENTS
import Navigation from "./customer/components/Navigation/Navigation";
import Footer from "./customer/components/Footer/Footer";

// PAGES
import HomePage from "./customer/pages/HomePage";
import ProductListPage from "./customer/pages/ProductListPage";
import ProductDetailsPage from "./customer/pages/ProductDetailsPage";
import OrdersPage from "./customer/pages/OrdersPage";
import CartPage from "./customer/pages/CartPage";
import SearchPage from "./customer/pages/SearchPage";
import MenPage from "./customer/pages/MenPage";
import WomenPage from "./customer/pages/WomenPage";

// AUTH
import SignInPage from "./customer/pages/SignInPage";
import SignUpPage from "./customer/pages/SignUpPage";

// CHECKOUT FLOW
import CheckoutAddress from "./customer/pages/CheckoutAddress";
import CheckoutPayment from "./customer/pages/CheckoutPayment";

import PaymentSuccess from "./customer/pages/PaymentSuccess";

function App() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* NAVBAR */}
      <Navigation />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Routes>

          {/* HOME */}
          <Route path="/" element={<HomePage />} />

          {/* PRODUCTS */}
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/category/:type" element={<ProductListPage />} />
          <Route path="/category/:type/:subtype" element={<ProductListPage />} />

          {/* CART */}
          <Route path="/cart" element={<CartPage />} />

          {/* CHECKOUT FLOW (REAL ECOM STYLE) */}
          <Route path="/checkout/address" element={<CheckoutAddress />} />
          <Route path="/checkout/payment" element={<CheckoutPayment />} />

          {/* ORDERS */}
          <Route path="/orders" element={<OrdersPage />} />

          {/* AUTH */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* SEARCH */}
          <Route path="/search" element={<SearchPage />} />

          {/* CATEGORY SHORTCUTS */}
          <Route path="/category/men" element={<MenPage />} />
          <Route path="/category/women" element={<WomenPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default App;