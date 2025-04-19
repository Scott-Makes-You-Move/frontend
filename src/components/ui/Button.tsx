import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  createPolymorphicComponent,
  PolymorphicComponentProp,
} from '@/utils/createPolymorphicComponent';
import { cn } from '@/utils/cn';
import Spinner from '@/components/ui/Spinner';

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

// -----------------------------
// 🔧 Button Props
// -----------------------------
type ButtonOwnProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  loading?: boolean;
};

type ButtonProps<C extends React.ElementType> = PolymorphicComponentProp<C, ButtonOwnProps>;

// -----------------------------
// ✅ Button Component
// -----------------------------
const ButtonBase = <C extends React.ElementType = 'button'>(
  {
    as,
    variant,
    size,
    className = '',
    loading = false,
    disabled,
    children,
    type,
    ...props
  }: ButtonProps<C>,
  ref: React.Ref<any>,
) => {
  const Component = as || 'button';
  const isButton = Component === 'button';
  const isDisabled = disabled || loading;

  // 🔒 Dev-time warning for icon-only buttons without label
  if (
    process.env.NODE_ENV === 'development' &&
    size === 'icon' &&
    typeof children === 'object' &&
    !('aria-label' in props) &&
    !('title' in props) &&
    !('aria-labelledby' in props)
  ) {
    console.warn(
      '[Accessibility] Icon-only buttons should have an accessible label via `aria-label`, `title`, or `aria-labelledby`.',
    );
  }

  return (
    <Component
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...(isButton ? { type: type ?? 'button' } : {})}
      {...props}
    >
      {loading && (
        <span className="mr-2 flex items-center">
          <Spinner className="h-4 w-4 animate-spin" />
        </span>
      )}
      <span className={loading ? 'opacity-0' : ''}>{children}</span>
    </Component>
  );
};

const Button = createPolymorphicComponent<'button', ButtonOwnProps>(ButtonBase);
Button.displayName = 'Button';

export { Button, buttonVariants };
