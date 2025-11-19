import { ReactNode, CSSProperties } from 'react';
import { COLORS } from '../../constants';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className = '', style, onClick, hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl p-6 ${hover ? 'transition-all hover:shadow-xl cursor-pointer' : ''} ${className}`}
      style={{
        backgroundColor: COLORS.white,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
