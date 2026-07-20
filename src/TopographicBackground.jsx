import { useEffect, useRef } from 'react';

export default function TopographicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let time = 0;

    const draw = () => {
      time += 0.0015; // Very slow, ambient animation
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      
      ctx.fillStyle = '#07070a'; // Dark background
      ctx.fillRect(0, 0, width, height);
      
      ctx.lineWidth = 1.5;
      
      // Draw lines radiating from a few "peaks"
      const peaks = [
        { x: width * 0.15, y: height * 0.2, color: 'rgba(0, 240, 255, 0.12)' }, // Cyan peak
        { x: width * 0.85, y: height * 0.8, color: 'rgba(189, 0, 255, 0.12)' }  // Purple peak
      ];

      const maxRadius = Math.max(width, height) * 1.2;
      
      peaks.forEach((peak, index) => {
        ctx.strokeStyle = peak.color;
        
        for (let radius = 30; radius < maxRadius; radius += 35) {
          ctx.beginPath();
          for (let angle = 0; angle <= Math.PI * 2 + 0.1; angle += 0.05) {
            
            // Complex noise-like distortion using multiple sine waves for a topographic look
            const offset = (index + 1) * 100;
            const distortion = 
              Math.sin(angle * 3 + time + offset) * (radius * 0.08) +
              Math.sin(angle * 7 - time * 1.5) * 8 +
              Math.sin(angle * 4 + time * 0.8) * 12;
            
            const r = Math.max(1, radius + distortion);
            const x = peak.x + Math.cos(angle) * r;
            const y = peak.y + Math.sin(angle) * r;
            
            if (angle === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.stroke();
        }
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none'
      }}
    />
  );
}
