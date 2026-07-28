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
  
  const rawScaleInput = [start, peak, end];
  const rawScaleOutput = [0.1, 1, 10];
  
  const scaleInput = [];
  const scaleOutput = [];
  rawScaleInput.forEach((val, i) => {
    if (val >= 0 && val <= 1) {
      scaleInput.push(val);
      scaleOutput.push(rawScaleOutput[i]);
    }
  });

  const rawOpacityInput = [start, fadeUp, peak, fadeDown, end];
  const rawOpacityOutput = [0, 1, 1, 0, 0];
  
  const opacityInput = [];
  const opacityOutput = [];
  rawOpacityInput.forEach((val, i) => {
    if (val >= 0 && val <= 1) {
      opacityInput.push(val);
      opacityOutput.push(rawOpacityOutput[i]);
    }
  });

  if (scaleInput.length === 1) {
    if (scaleInput[0] === 0) { scaleInput.push(1); scaleOutput.push(scaleOutput[0]); }
    else { scaleInput.unshift(0); scaleOutput.unshift(scaleOutput[0]); }
  }
  if (opacityInput.length === 1) {
    if (opacityInput[0] === 0) { opacityInput.push(1); opacityOutput.push(opacityOutput[0]); }
    else { opacityInput.unshift(0); opacityOutput.unshift(opacityOutput[0]); }
  }
  
  const scale = useTransform(scrollYProgress, scaleInput, scaleOutput);
  const opacity = useTransform(scrollYProgress, opacityInput, opacityOutput);
  const visibility = useTransform(opacity, v => v > 0.01 ? "visible" : "hidden");
  const pointerEvents = useTransform(opacity, v => v > 0.5 ? "auto" : "none");

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        scale,
        opacity,
        visibility,
        pointerEvents
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
