import React from "react";
import Logo from "./Logo";

const Footer: React.FC = () => (
  <footer className="w-full text-center p-4 bg-primary shadow-md mt-auto border-t-2 border-primary">
    <nav className="flex justify-center gap-6 text-background font-body">
      <Logo variant="white" size="md" />
    </nav>
  </footer>
);

export default Footer;
