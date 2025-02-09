import React from "react";

interface QuoteCardProps {
  quote: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => (
  <div className="relative m-8 max-w-80 rounded-lg bg-blue-400 p-4 text-white shadow-lg h-fit">
    <p className="text-lg font-semibold">Quote Of The Day</p>
    <p className="text-md  italic">"{quote}"</p>

    <div className="absolute -bottom-1 left-4">
      <div
        className="rounded-sm before:absolute before:-bottom-0.5 before:-left-2 before:h-8 before:w-before:-rotate-45 before:transform before:border-l-2 before:border-t-2 before:border-blue-400 before:bg-blue-400"
      ></div>
    </div>
  </div>
);

export default QuoteCard;
