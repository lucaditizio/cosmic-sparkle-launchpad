
import React, { useEffect, useRef } from 'react';

const SparkleEffect: React.FC = () => {
  const sparkleContainerRef = useRef<HTMLDivElement>(null);

  // Function to create a single sparkle
  const createSparkle = (x: number, y: number) => {
    if (!sparkleContainerRef.current) return;
    
    // Create sparkle element
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle sparkle-animation';
    
    // Random sparkle properties
    const size = Math.random() * 10 + 5; // 5-15px
    const brightness = Math.random() * 30 + 70; // 70-100%
    
    // Apply styles
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${x - size / 2}px`;
    sparkle.style.top = `${y - size / 2}px`;
    sparkle.style.filter = `brightness(${brightness}%)`;
    
    // Add to DOM
    sparkleContainerRef.current.appendChild(sparkle);
    
    // Remove after animation completes
    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 600); // Match animation duration
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only create sparkle sometimes for performance
      if (Math.random() > 0.5) {
        createSparkle(e.clientX, e.clientY);
      }
    };

    // Add mouse move listener
    document.addEventListener('mousemove', handleMouseMove);
    
    // Clean up
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={sparkleContainerRef} className="fixed inset-0 pointer-events-none z-50" />;
};

export default SparkleEffect;
