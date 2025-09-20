import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'scale' | 'rotate' | 'cosmic' | 'gaming';
  duration?: number;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  type = 'fade',
  duration = 300,
  className = ''
}) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== currentLocation) {
      // Start exit animation
      setIsVisible(false);
      
      // After exit animation, update location and start enter animation
      setTimeout(() => {
        setCurrentLocation(location.pathname);
        setIsVisible(true);
      }, duration);
    } else {
      // Initial load
      setIsVisible(true);
    }
  }, [location.pathname, currentLocation, duration]);

  const getTransitionClasses = () => {
    const baseClasses = `transition-all duration-${duration} ease-out`;
    
    switch (type) {
      case 'slide':
        return `${baseClasses} ${isVisible 
          ? 'translate-x-0 opacity-100' 
          : 'translate-x-8 opacity-0'
        }`;
        
      case 'scale':
        return `${baseClasses} ${isVisible 
          ? 'scale-100 opacity-100' 
          : 'scale-95 opacity-0'
        }`;
        
      case 'rotate':
        return `${baseClasses} ${isVisible 
          ? 'rotate-0 opacity-100' 
          : 'rotate-1 opacity-0'
        }`;
        
      case 'cosmic':
        return `${baseClasses} ${isVisible 
          ? 'translate-y-0 scale-100 opacity-100 blur-0' 
          : 'translate-y-4 scale-98 opacity-0 blur-sm'
        }`;
        
      case 'gaming':
        return `${baseClasses} ${isVisible 
          ? 'translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100' 
          : 'translate-x-2 translate-y-2 rotate-1 scale-98 opacity-0'
        }`;
        
      default: // fade
        return `${baseClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
    }
  };

  return (
    <div className={`${getTransitionClasses()} ${className}`}>
      {children}
    </div>
  );
};

// Page-specific transition components
export const FadeTransition: React.FC<Omit<PageTransitionProps, 'type'>> = (props) => (
  <PageTransition type="fade" {...props} />
);

export const SlideTransition: React.FC<Omit<PageTransitionProps, 'type'>> = (props) => (
  <PageTransition type="slide" {...props} />
);

export const ScaleTransition: React.FC<Omit<PageTransitionProps, 'type'>> = (props) => (
  <PageTransition type="scale" {...props} />
);

export const CosmicTransition: React.FC<Omit<PageTransitionProps, 'type'>> = (props) => (
  <PageTransition type="cosmic" {...props} />
);

export const GamingTransition: React.FC<Omit<PageTransitionProps, 'type'>> = (props) => (
  <PageTransition type="gaming" {...props} />
);

// Staggered animations for lists
interface StaggeredTransitionProps {
  children: React.ReactElement[];
  delay?: number;
  type?: PageTransitionProps['type'];
  className?: string;
}

export const StaggeredTransition: React.FC<StaggeredTransitionProps> = ({
  children,
  delay = 100,
  type = 'fade',
  className = ''
}) => {
  const [visibleItems, setVisibleItems] = useState(new Set<number>());

  useEffect(() => {
    children.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, index]));
      }, index * delay);
    });
  }, [children, delay]);

  return (
    <div className={className}>
      {children.map((child, index) => (
        <PageTransition
          key={index}
          type={type}
          className={visibleItems.has(index) ? '' : 'opacity-0'}
        >
          {child}
        </PageTransition>
      ))}
    </div>
  );
};

// Loading transition component
interface LoadingTransitionProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  type?: PageTransitionProps['type'];
}

export const LoadingTransition: React.FC<LoadingTransitionProps> = ({
  isLoading,
  children,
  loadingComponent,
  type = 'fade'
}) => {
  return (
    <PageTransition type={type}>
      {isLoading ? (
        loadingComponent || (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="relative">
              {/* Gaming Loading Animation */}
              <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-blue-500/20 border-r-blue-500 rounded-full animate-spin animate-reverse" />
              
              {/* Pulsing Core */}
              <div className="absolute inset-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
            </div>
          </div>
        )
      ) : (
        children
      )}
    </PageTransition>
  );
};

// Route-specific transition wrapper
interface RouteTransitionProps {
  children: React.ReactNode;
  route?: string;
}

export const RouteTransition: React.FC<RouteTransitionProps> = ({
  children,
  route
}) => {
  const getTransitionType = (pathname: string): PageTransitionProps['type'] => {
    if (pathname.includes('/games/')) return 'cosmic';
    if (pathname.includes('/topic/')) return 'gaming';
    if (pathname === '/') return 'fade';
    return 'slide';
  };

  const location = useLocation();
  const transitionType = getTransitionType(location.pathname);

  return (
    <PageTransition type={transitionType} duration={400}>
      {children}
    </PageTransition>
  );
}; 