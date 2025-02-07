import React from "react";

interface QuoteCardProps {
  quote: string;
  author: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, author }) => (
  <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
    <p className="text-lg font-semibold text-gray-800">{quote}</p>
    <p className="text-sm text-gray-600 mt-2">- {author}</p>
  </div>
);

export default QuoteCard;
