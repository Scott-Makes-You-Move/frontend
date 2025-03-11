import * as React from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <textarea
        className={`
          flex min-h-[80px] w-full rounded-button 
          border border-primary/20 bg-background 
          px-3 py-2 text-sm font-body
          ring-offset-background
          placeholder:text-gray-500
          focus-visible:outline-none 
          focus-visible:ring-2 
          focus-visible:ring-secondary 
          focus-visible:ring-offset-2
          disabled:cursor-not-allowed 
          disabled:opacity-50
          ${className}
        `}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
