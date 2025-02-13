import React from "react";

interface QuoteCardProps {
  quote: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => (
  <div className="relative p-4 bg-blue-400 text-white rounded-lg shadow-lg max-w-[300px]">
    {/* Title */}
    <h2 className="text-lg font-semibold mb-2">Quote Of The Day</h2>

    {/* Quote text */}
    <p className="text-md italic">"{quote}"</p>

    {/* Speech bubble pointer */}
    <div className="absolute -bottom-4 left-8 w-8 h-8 bg-blue-400 transform rotate-45"></div>
  </div>
);

export default QuoteCard;
