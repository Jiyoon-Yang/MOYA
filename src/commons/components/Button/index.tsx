import { ButtonHTMLAttributes, ReactNode } from 'react';
import { COLORS } from '../../constants';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'rounded-full transition-all font-medium';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  };

  const variantStyles = {
    primary: disabled 
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'hover:shadow-lg active:scale-95',
    secondary: 'hover:shadow-md active:scale-95',
    outline: 'border-2 hover:shadow-md active:scale-95',
    ghost: 'hover:bg-gray-100 active:scale-95',
  };

  const getVariantColor = () => {
    if (disabled) return {};
    
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: COLORS.apricotCoral,
          color: COLORS.white,
        };
      case 'secondary':
        return {
          backgroundColor: COLORS.sageGreen,
          color: COLORS.white,
        };
      case 'outline':
        return {
          borderColor: COLORS.apricotCoral,
          color: COLORS.apricotCoral,
          backgroundColor: 'transparent',
        };
      case 'ghost':
        return {
          color: COLORS.charcoalNavy,
          backgroundColor: 'transparent',
        };
      default:
        return {};
    }
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      style={getVariantColor()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
