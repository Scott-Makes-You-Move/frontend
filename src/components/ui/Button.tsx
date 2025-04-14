import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

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
        default: 'bg-primary text-background hover:bg-secondary',
        destructive: 'bg-red-500 text-background hover:bg-red-600',
        outline: 'border border-primary/20 bg-background hover:bg-primary/10 text-primary',
        secondary: 'bg-secondary text-background hover:bg-secondary/90',
        ghost: 'hover:bg-primary/10 text-primary',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-button px-3',
        lg: 'h-11 rounded-button px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

// --- 🔧 Polymorphic Types ---
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = React.PropsWithChildren<
  Props & AsProp<C>
> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type ButtonOwnProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

type ButtonProps<C extends React.ElementType> = PolymorphicComponentProp<C, ButtonOwnProps>;

// --- ✅ Component ---
const Button = <C extends React.ElementType = 'button'>(
  { as, variant, size, className = '', type, ...props }: ButtonProps<C>,
  ref: React.Ref<any>,
) => {
  const Component = as || 'button';
  const isButton = Component === 'button';

  return (
    <Component
      ref={ref}
      className={`${buttonVariants({ variant, size })} ${className}`}
      {...(isButton ? { type: type ?? 'button' } : {})}
      {...props}
    />
  );
};

const ForwardedButton = React.forwardRef(Button) as React.NamedExoticComponent<
  <C extends React.ElementType = 'button'>(props: ButtonProps<C> & { ref?: React.Ref<any> }) => React.ReactElement
>;

ForwardedButton.displayName = 'Button';

export { ForwardedButton as Button, buttonVariants };
