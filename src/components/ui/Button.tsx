import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-md transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  const variantStyles = {
    primary: 'bg-primary text-white hover:brightness-110 shadow-md',
    secondary: 'bg-secondary text-white hover:brightness-110 shadow-md',
    success: 'bg-success text-white hover:brightness-110 shadow-md',
    error: 'bg-error text-white hover:brightness-110 shadow-md',
    outline: 'bg-white text-textPrimary border-2 border-border hover:border-primary hover:text-primary shadow-sm',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm min-h-[44px]',
    md: 'px-8 py-4 text-base min-h-[56px]',
    lg: 'px-10 py-5 text-lg min-h-[64px]',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
