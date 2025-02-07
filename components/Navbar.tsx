import React from "react";

const Navbar: React.FC = () => (
  <header className="w-full flex justify-between items-center p-4 bg-white shadow-md">
    <h1 className="text-2xl font-bold">Scott Makes You Move</h1>
    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
      Login
    </button>
  </header>
);

export default Navbar;
