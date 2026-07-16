import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  // Leader
  const x1 = useSpring(-100, { stiffness: 800, damping: 28 });
  const y1 = useSpring(-100, { stiffness: 800, damping: 28 });
  // Trail 1
  const x2 = useSpring(-100, { stiffness: 400, damping: 25 });
  const y2 = useSpring(-100, { stiffness: 400, damping: 25 });
  // Trail 2
  const x3 = useSpring(-100, { stiffness: 200, damping: 20 });
  const y3 = useSpring(-100, { stiffness: 200, damping: 20 });
  // Trail 3
  const x4 = useSpring(-100, { stiffness: 100, damping: 15 });
  const y4 = useSpring(-100, { stiffness: 100, damping: 15 });

  useEffect(() => {
    const moveCursor = (e) => {
      x1.set(e.clientX - 8);
      y1.set(e.clientY - 8);
      x2.set(e.clientX - 6);
      y2.set(e.clientY - 6);
      x3.set(e.clientX - 4);
      y3.set(e.clientY - 4);
      x4.set(e.clientX - 2);
      y4.set(e.clientY - 2);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName?.toLowerCase() === 'a' ||
        e.target.tagName?.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('skill-tag')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

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
  }, [x1, y1, x2, y2, x3, y3, x4, y4, isVisible]);

  return (
    <>
      <motion.div
        style={{ translateX: x1, translateY: y1, width: 16, height: 16, background: 'var(--accent-cyan)' }}
        animate={{ scale: isHovering ? 2 : 1, opacity: isVisible ? (isHovering ? 1 : 0.8) : 0 }}
        className="comet-dot"
      />
      <motion.div
        className="comet-dot"
        style={{ translateX: x2, translateY: y2, width: 12, height: 12, background: 'var(--accent-purple)' }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      />
      <motion.div
        className="comet-dot"
        style={{ translateX: x3, translateY: y3, width: 8, height: 8, background: 'var(--accent-cyan)' }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      />
      <motion.div
        className="comet-dot"
        style={{ translateX: x4, translateY: y4, width: 4, height: 4, background: 'var(--accent-purple)' }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
