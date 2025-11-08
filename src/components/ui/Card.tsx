import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false
}) => {
  const hoverStyles = hoverable
    ? 'cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl'
    : '';

  return (
    <div
      className={`bg-surface rounded-lg p-8 shadow-lg ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
