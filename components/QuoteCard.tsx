import React from "react";

interface QuoteCardProps {
  quote: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => (
  <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
    <p className="text-lg font-semibold text-gray-800">{quote}</p>
  </div>
);

export default QuoteCard;
