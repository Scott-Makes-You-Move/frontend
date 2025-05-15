import React from 'react';

interface QuoteCardProps {
  quote: string;
  title?: string;
  author?: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, title, author }) => (
  <figure
    className="relative p-4 bg-primary text-white rounded-lg shadow-lg max-w-[300px]"
    role="group"
    aria-labelledby="quote-title"
  >
    {title && (
      <figcaption id="quote-title" className="text-lg font-title mb-2 font-semibold">
        {title}
      </figcaption>
    )}

    <blockquote className="text-md font-body italic" cite={author ? `#${author}` : undefined}>
      {quote}
    </blockquote>

    {author && <figcaption className="mt-2 text-sm font-body text-right">— {author}</figcaption>}

    {/* Decorative element */}
    <div
      aria-hidden="true"
      className="absolute -bottom-4 left-8 w-8 h-8 bg-primary transform rotate-45"
    ></div>
  </figure>
);

export default QuoteCard;
