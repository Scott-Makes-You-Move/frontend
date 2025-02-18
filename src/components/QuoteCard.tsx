import React from "react";

interface QuoteCardProps {
  quote: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => (
  <div className="relative p-4 bg-primary text-white rounded-lg shadow-lg max-w-[300px]">
    <h2 className="text-lg font-title mb-2">Quote Of The Day</h2>
    <p className="text-md font-body italic">"{quote}"</p>
    <div className="absolute -bottom-4 left-8 w-8 h-8 bg-primary transform rotate-45"></div>
  </div>
);

export default QuoteCard;
