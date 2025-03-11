import * as React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        className={`
          flex h-10 w-full rounded-button border 
          border-primary/20 bg-background px-3 py-2 
          text-sm font-body ring-offset-background
          file:border-0 file:bg-transparent 
          file:text-sm file:font-medium
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
Input.displayName = 'Input';

export { Input };
