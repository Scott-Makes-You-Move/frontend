import React from 'react';

interface LogoProps {
  variant?: 'default' | 'white' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'md',
  showText = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  // SVG markup for the logo
  const logoSvg = (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        strokeWidth="10"
        className={
          variant === 'white'
            ? 'stroke-background'
            : variant === 'blue'
              ? 'stroke-primary'
              : 'stroke-primary'
        }
      />
      <circle
        cx="50"
        cy="50"
        r="35"
        strokeWidth="10"
        className={
          variant === 'white'
            ? 'stroke-background'
            : variant === 'blue'
              ? 'stroke-primary'
              : 'stroke-primary'
        }
      />
    </svg>
  );

  return (
    <div className="flex items-center gap-3">
      {logoSvg}
      {showText && (
        <span
          className={`font-title ${textSizeClasses[size]} ${
            variant === 'white'
              ? 'text-background'
              : variant === 'blue'
                ? 'text-primary'
                : 'text-primary'
          }`}
        >
          SMYM
        </span>
      )}
    </div>
  );
};

export default Logo;
