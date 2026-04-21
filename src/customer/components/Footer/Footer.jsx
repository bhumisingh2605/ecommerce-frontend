import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-300 mt-10">

      {/* 🔥 TOP SECTION */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 lg:px-20 py-10">

        {/* ABOUT */}
        <div>
          <h2 className="text-white font-semibold mb-4">About</h2>
          <p className="text-sm">Contact Us</p>
          <p className="text-sm">About Us</p>
          <p className="text-sm">Careers</p>
          <p className="text-sm">Press</p>
        </div>

        {/* HELP */}
        <div>
          <h2 className="text-white font-semibold mb-4">Help</h2>
          <p className="text-sm">Payments</p>
          <p className="text-sm">Shipping</p>
          <p className="text-sm">Cancellation</p>
          <p className="text-sm">FAQ</p>
        </div>

        {/* POLICY */}
        <div>
          <h2 className="text-white font-semibold mb-4">Policy</h2>
          <p className="text-sm">Return Policy</p>
          <p className="text-sm">Terms Of Use</p>
          <p className="text-sm">Security</p>
          <p className="text-sm">Privacy</p>
        </div>

        {/* SOCIAL */}
        <div>
          <h2 className="text-white font-semibold mb-4">Social</h2>
          <p className="text-sm">Instagram</p>
          <p className="text-sm">Facebook</p>
          <p className="text-sm">Twitter</p>
          <p className="text-sm">YouTube</p>
        </div>

      </div>

      {/* 🔥 DIVIDER */}
      <div className="border-t border-gray-700"></div>

      {/* 🔥 BOTTOM */}
      <div className="text-center py-4 text-sm text-gray-400">
        © 2026 YourStore. All rights reserved.
      </div>

    </div>
  );
};

export default Footer;