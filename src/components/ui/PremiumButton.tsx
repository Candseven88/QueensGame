import React, { useState, useRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

export interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'neon' | 'cosmic' | 'aurora';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  effect?: 'ripple' | 'shimmer' | 'glow' | 'bounce' | 'magnetic';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
  secondary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
  accent: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
  neon: 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600',
  cosmic: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700',
  aurora: 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600'
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl'
};

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  effect = 'ripple',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleIdRef = useRef(0);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    // Create ripple effect
    if (effect === 'ripple' && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const newRipple = {
        id: rippleIdRef.current++,
        x,
        y
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    onClick?.();
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (effect === 'magnetic' && buttonRef.current && !disabled) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      
      buttonRef.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (effect === 'magnetic' && buttonRef.current) {
      buttonRef.current.style.transform = 'translate(0px, 0px) scale(1)';
    }
  };

  const getEffectClasses = () => {
    const effects = {
      ripple: 'relative overflow-hidden',
      shimmer: 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
      glow: 'shadow-lg hover:shadow-2xl hover:shadow-current/25',
      bounce: 'transform transition-transform hover:scale-110 active:scale-95',
      magnetic: 'transform transition-transform duration-200 ease-out'
    };
    
    return effects[effect] || '';
  };

  const getVariantClasses = () => {
    return variantStyles[variant];
  };

  const getSizeClasses = () => {
    return sizeStyles[size];
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      disabled={disabled || loading}
      className={`
        group relative inline-flex items-center justify-center
        font-semibold text-white rounded-xl
        border-0 cursor-pointer select-none
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-transparent
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${getEffectClasses()}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{
        background: loading ? 'linear-gradient(45deg, #666, #888)' : undefined
      }}
    >
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Button Content */}
      <div
        className={`flex items-center justify-center space-x-2 transition-opacity duration-200 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {Icon && iconPosition === 'left' && (
          <Icon 
            className={`transition-transform duration-200 ${
              isHovered ? 'transform scale-110' : ''
            } ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : size === 'xl' ? 'w-7 h-7' : 'w-5 h-5'}`} 
          />
        )}
        
        <span className="relative z-10">{children}</span>
        
        {Icon && iconPosition === 'right' && (
          <Icon 
            className={`transition-transform duration-200 ${
              isHovered ? 'transform scale-110' : ''
            } ${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : size === 'xl' ? 'w-7 h-7' : 'w-5 h-5'}`} 
          />
        )}
      </div>

      {/* Ripple Effects */}
      {effect === 'ripple' && ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animation: 'ripple 0.6s linear'
          }}
        />
      ))}

      {/* Shimmer Effect Overlay */}
      {effect === 'shimmer' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}

      {/* Glow Effect */}
      {effect === 'glow' && isHovered && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-current to-current opacity-20 blur-xl scale-110" />
      )}

      {/* Focus Ring */}
      <div className="absolute inset-0 rounded-xl ring-4 ring-offset-2 ring-offset-transparent ring-transparent group-focus:ring-white/50 transition-all duration-200" />
    </button>
  );
};

// Preset button variants for common use cases
export const PlayButton: React.FC<Omit<PremiumButtonProps, 'variant' | 'effect'>> = (props) => (
  <PremiumButton variant="neon" effect="glow" {...props} />
);

export const ActionButton: React.FC<Omit<PremiumButtonProps, 'variant' | 'effect'>> = (props) => (
  <PremiumButton variant="primary" effect="ripple" {...props} />
);

export const HighlightButton: React.FC<Omit<PremiumButtonProps, 'variant' | 'effect'>> = (props) => (
  <PremiumButton variant="aurora" effect="shimmer" {...props} />
);

export const MagneticButton: React.FC<Omit<PremiumButtonProps, 'effect'>> = (props) => (
  <PremiumButton effect="magnetic" {...props} />
); 