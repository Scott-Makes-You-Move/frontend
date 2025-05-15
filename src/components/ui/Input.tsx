import * as React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  describedBy?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, describedBy, ...props }, ref) => {
    const describedById = describedBy ?? (error ? `${props.name}-error` : undefined);

    return (
      <>
        <input
          ref={ref}
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
            ${error ? 'border-red-500 ring-red-500' : ''}
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={describedById}
          {...props}
        />
        {error && (
          <p id={describedById} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </>
    );
  },
);

Input.displayName = 'Input';

export { Input };
