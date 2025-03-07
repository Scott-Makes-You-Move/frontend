// components/ui/button.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    `
    inline-flex items-center justify-center 
    rounded-button text-sm font-medium 
    font-title ring-offset-background 
    transition-colors focus-visible:outline-none 
    focus-visible:ring-2 focus-visible:ring-secondary 
    focus-visible:ring-offset-2 disabled:pointer-events-none 
    disabled:opacity-50
  `,
    {
      variants: {
        variant: {
          default: "bg-white text-primary border border-primary hover:bg-primary/10",
          destructive: "bg-red-500 text-background hover:bg-red-600",
          outline:
              "border border-primary/20 bg-background hover:bg-primary/10 text-primary",
          secondary: "bg-secondary text-background hover:bg-secondary/90",
          ghost: "hover:bg-primary/10 text-primary",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-button px-3",
          lg: "h-11 rounded-button px-8",
          icon: "h-10 w-10",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant, size, ...props }, ref) => {
      return (
          <button
              className={`${buttonVariants({ variant, size })} ${className}`}
              ref={ref}
              {...props}
          />
      );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };