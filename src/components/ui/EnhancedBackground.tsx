import React from 'react';
import { CosmicBackground as CosmicParticles, GamingParticles } from '../effects/ParticleSystem';

interface EnhancedBackgroundProps {
  variant?: 'gaming' | 'cosmic' | 'minimal' | 'hero';
  animated?: boolean;
  interactive?: boolean;
  overlay?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const EnhancedBackground: React.FC<EnhancedBackgroundProps> = ({
  variant = 'gaming',
  animated = true,
  interactive = false,
  overlay = true,
  children,
  className = ''
}) => {
  const getBackgroundPattern = () => {
    switch (variant) {
      case 'cosmic':
        return (
          <div className="absolute inset-0">
            {/* Cosmic Gradient Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
            
            {/* Animated Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
            
            {/* Cosmic Particles */}
            <CosmicParticles particleCount={80} intensity="high" interactive={interactive} />
          </div>
        );
      
      case 'hero':
        return (
          <div className="absolute inset-0">
            {/* Hero Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
            
            {/* Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
            
            {/* Animated Beams */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent animate-pulse" />
              <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent animate-pulse delay-500" />
              <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-pink-500/50 to-transparent animate-pulse delay-1000" />
            </div>
            
            {/* Hero Particles */}
            <GamingParticles particleCount={60} intensity="medium" interactive={interactive} />
          </div>
        );
        
      case 'minimal':
        return (
          <div className="absolute inset-0">
            {/* Clean Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
            
            {/* Subtle Pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}
            />
            
            {/* Minimal Particles */}
            {animated && (
              <GamingParticles particleCount={20} intensity="low" interactive={interactive} />
            )}
          </div>
        );
        
      default: // gaming
        return (
          <div className="absolute inset-0">
            {/* Gaming Gradient Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900" />
            
            {/* Animated Gaming Elements */}
            <div className="absolute inset-0">
              {/* Floating Geometric Shapes */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-500/30 rotate-45 animate-spin-slow" />
              <div className="absolute top-1/2 right-1/4 w-24 h-24 border border-purple-500/30 rotate-12 animate-bounce-slow" />
              <div className="absolute bottom-1/4 left-1/2 w-20 h-20 border border-pink-500/30 rotate-45 animate-pulse" />
              
              {/* Circuit Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                      <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
                      <circle cx="50" cy="50" r="3" fill="currentColor"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#circuit)" className="text-blue-400"/>
                </svg>
              </div>
            </div>
            
            {/* Gaming Particles */}
            <GamingParticles particleCount={100} intensity="high" interactive={interactive} />
          </div>
        );
    }
  };

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Background Pattern */}
      {getBackgroundPattern()}
      
      {/* Animated Gradient Overlay */}
      {animated && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
      )}
      
      {/* Content Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      )}
      
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {children}
    </div>
  );
};

// Preset background variants
export const GamingBackground: React.FC<Omit<EnhancedBackgroundProps, 'variant'>> = (props) => (
  <EnhancedBackground variant="gaming" {...props} />
);

export const CosmicBackground: React.FC<Omit<EnhancedBackgroundProps, 'variant'>> = (props) => (
  <EnhancedBackground variant="cosmic" {...props} />
);

export const HeroBackground: React.FC<Omit<EnhancedBackgroundProps, 'variant'>> = (props) => (
  <EnhancedBackground variant="hero" {...props} />
);

export const MinimalBackground: React.FC<Omit<EnhancedBackgroundProps, 'variant'>> = (props) => (
  <EnhancedBackground variant="minimal" {...props} />
);

// Custom CSS for additional animations
const additionalStyles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0px) rotate(12deg); }
    50% { transform: translateY(-20px) rotate(12deg); }
  }
  
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
  
  .animate-bounce-slow {
    animation: bounce-slow 4s ease-in-out infinite;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = additionalStyles;
  document.head.appendChild(styleSheet);
} 