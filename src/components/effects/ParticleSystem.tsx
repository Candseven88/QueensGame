import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleSystemProps {
  particleCount?: number;
  variant?: 'stars' | 'floating' | 'interactive' | 'gaming' | 'cosmic';
  intensity?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  className?: string;
}

const particleConfigs = {
  stars: {
    colors: ['#ffffff', '#b3d9ff', '#ffeb3b', '#ff9800'],
    sizeRange: [1, 3],
    speedRange: [0.1, 0.5],
    lifeRange: [5000, 10000]
  },
  floating: {
    colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
    sizeRange: [2, 6],
    speedRange: [0.2, 0.8],
    lifeRange: [8000, 15000]
  },
  interactive: {
    colors: ['#4facfe', '#00f2fe', '#a8edea', '#fed6e3'],
    sizeRange: [3, 8],
    speedRange: [0.5, 1.5],
    lifeRange: [3000, 8000]
  },
  gaming: {
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'],
    sizeRange: [2, 5],
    speedRange: [0.3, 1.0],
    lifeRange: [6000, 12000]
  },
  cosmic: {
    colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'],
    sizeRange: [1, 4],
    speedRange: [0.1, 0.7],
    lifeRange: [10000, 20000]
  }
};

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  particleCount = 50,
  variant = 'stars',
  intensity = 'medium',
  interactive = false,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(true);

  const config = particleConfigs[variant];
  const intensityMultiplier = intensity === 'low' ? 0.5 : intensity === 'high' ? 2 : 1;
  const finalParticleCount = Math.floor(particleCount * intensityMultiplier);

  // Create a new particle
  const createParticle = (x?: number, y?: number): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Particle;

    const [minSize, maxSize] = config.sizeRange;
    const [minSpeed, maxSpeed] = config.speedRange;
    const [minLife, maxLife] = config.lifeRange;
    
    return {
      id: Math.random(),
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
      vy: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
      size: Math.random() * (maxSize - minSize) + minSize,
      opacity: Math.random() * 0.8 + 0.2,
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      life: Math.random() * (maxLife - minLife) + minLife,
      maxLife: Math.random() * (maxLife - minLife) + minLife
    };
  };

  // Initialize particles
  const initParticles = () => {
    particlesRef.current = Array.from({ length: finalParticleCount }, () => createParticle());
  };

  // Update particle positions and properties
  const updateParticles = (deltaTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = particlesRef.current.map(particle => {
      // Update position
      particle.x += particle.vx * deltaTime * 0.016;
      particle.y += particle.vy * deltaTime * 0.016;

      // Interactive behavior
      if (interactive) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
        }
      }

      // Boundary wrapping
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Update life
      particle.life -= deltaTime;
      particle.opacity = Math.max(0, particle.life / particle.maxLife);

      return particle;
    }).filter(particle => particle.life > 0);

    // Add new particles to maintain count
    while (particlesRef.current.length < finalParticleCount) {
      particlesRef.current.push(createParticle());
    }
  };

  // Render particles
  const renderParticles = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    particlesRef.current.forEach(particle => {
      ctx.save();
      
      // Set particle properties
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      
      // Draw particle based on variant
      if (variant === 'stars') {
        // Star shape
        const spikes = 5;
        const outerRadius = particle.size;
        const innerRadius = particle.size * 0.5;
        
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i / (spikes * 2)) * Math.PI * 2;
          const x = particle.x + Math.cos(angle) * radius;
          const y = particle.y + Math.sin(angle) * radius;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      } else if (variant === 'cosmic') {
        // Glowing orb
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Simple circle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    });
  };

  // Animation loop
  const animate = (currentTime: number) => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    updateParticles(16); // ~60fps
    renderParticles(ctx);

    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle mouse movement for interactive particles
  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !interactive) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  // Handle clicks for interactive particles
  const handleClick = (event: MouseEvent) => {
    if (!interactive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Create burst of particles at click location
    for (let i = 0; i < 10; i++) {
      const particle = createParticle(x, y);
      particle.vx = (Math.random() - 0.5) * 4;
      particle.vy = (Math.random() - 0.5) * 4;
      particle.life = 2000;
      particle.maxLife = 2000;
      particlesRef.current.push(particle);
    }
  };

  // Resize canvas
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  };

  // Initialize and cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    initParticles();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('click', handleClick);
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('click', handleClick);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [variant, particleCount, intensity, interactive]);

  // Pause/resume based on page visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-${interactive ? 'auto' : 'none'} ${className}`}
      style={{ zIndex: -1 }}
    />
  );
};

// Preset particle system variants
export const StarField: React.FC<Omit<ParticleSystemProps, 'variant'>> = (props) => (
  <ParticleSystem variant="stars" {...props} />
);

export const FloatingParticles: React.FC<Omit<ParticleSystemProps, 'variant'>> = (props) => (
  <ParticleSystem variant="floating" {...props} />
);

export const InteractiveParticles: React.FC<Omit<ParticleSystemProps, 'variant'>> = (props) => (
  <ParticleSystem variant="interactive" interactive={true} {...props} />
);

export const GamingParticles: React.FC<Omit<ParticleSystemProps, 'variant'>> = (props) => (
  <ParticleSystem variant="gaming" {...props} />
);

export const CosmicBackground: React.FC<Omit<ParticleSystemProps, 'variant'>> = (props) => (
  <ParticleSystem variant="cosmic" {...props} />
); 