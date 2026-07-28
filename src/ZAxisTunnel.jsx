import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function TunnelSection({ index, count, scrollYProgress, children }) {
  // Calculate the start, peak, and end for this section based on the total scroll height
  const peak = index / count;
  const step = 1 / count;
  
  const start = peak - step;
  const fadeUp = peak - (step * 0.5);
  const fadeDown = peak + (step * 0.5);
  const end = peak + step;
  
  const scale = useTransform(
    scrollYProgress, 
    [start, peak, end], 
    [0.1, 1, 10]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [start, fadeUp, peak, fadeDown, end],
    [0, 1, 1, 0, 0]
  );



  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        scale,
        opacity
      }}
    >
      {children}
    </motion.div>
  );
}

export default function ZAxisTunnel({ children }) {
  const { scrollYProgress } = useScroll(); // 0 to 1

  const sections = React.Children.toArray(children).filter(child => React.isValidElement(child));
  const count = sections.length;

  return (
    <div style={{ height: `${count * 150}vh`, position: 'relative', zIndex: 10 }}>
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden',
        perspective: '1000px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {sections.map((child, i) => (
          <TunnelSection key={i} index={i} count={count} scrollYProgress={scrollYProgress}>
            {child}
          </TunnelSection>
        ))}
      </div>
    </div>
  );
}
