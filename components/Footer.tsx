import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full text-center p-4 bg-white shadow-md mt-8">
    <nav className="flex justify-center gap-6 text-gray-700">
      <a href="/about" className="hover:underline">
        About Us
      </a>
      <a href="/contact" className="hover:underline">
        Contact
      </a>
    </nav>
  </footer>
);

export default Footer;
