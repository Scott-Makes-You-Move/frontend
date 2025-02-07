"use client";
import React from "react";

interface CTAButtonProps {
  text: string;
  onClick: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ text, onClick }) => (
  <button
    onClick={() => onClick()}
    className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
  >
    {text}
  </button>
);

export default CTAButton;
