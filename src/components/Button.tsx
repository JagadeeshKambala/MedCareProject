import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  className = ''
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
        variant === 'primary'
          ? 'bg-blue-700 text-white hover:bg-blue-800 disabled:bg-blue-300'
          : 'bg-white text-blue-700 border-2 border-blue-700 hover:bg-blue-50 disabled:border-blue-300 disabled:text-blue-300'
      } disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;