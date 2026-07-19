import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Leader (Dot)
  const xDot = useSpring(-100, { stiffness: 1000, damping: 28 });
  const yDot = useSpring(-100, { stiffness: 1000, damping: 28 });
  
  // Follower (Ring)
  const xRing = useSpring(-100, { stiffness: 150, damping: 20 });
  const yRing = useSpring(-100, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const moveCursor = (e) => {
      // Dot is 8x8, center is -4
      xDot.set(e.clientX - 4);
      yDot.set(e.clientY - 4);
      
      // Ring is 36x36, center is -18
      xRing.set(e.clientX - 18);
      yRing.set(e.clientY - 18);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const isClickable = 
        e.target.tagName?.toLowerCase() === 'a' ||
        e.target.tagName?.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('skill-tag');
      
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [xDot, yDot, xRing, yRing, isVisible]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ translateX: xDot, translateY: yDot }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0 : 1 // Hide dot when hovering to let ring take focus
        }}
      />
      <motion.div
        className="cursor-ring"
        style={{ translateX: xRing, translateY: yRing }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(0, 240, 255, 0.5)' : 'rgba(0, 240, 255, 0.8)'
        }}
      />
    </>
  );
}
