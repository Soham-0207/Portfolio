import { useEffect, useRef } from 'react';

export default function HexagonBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let hexagons = [];
    const hexSize = 35; // Radius of hexagon
    const hexWidth = Math.sqrt(3) * hexSize;
    const hexHeight = 2 * hexSize;
    
    // Track mouse
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      hexagons = [];
      // Calculate how many columns and rows are needed to fill the screen
      const cols = Math.ceil(canvas.width / hexWidth) + 1;
      const rows = Math.ceil(canvas.height / (hexHeight * 0.75)) + 1;
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const xOffset = (y % 2 === 1) ? hexWidth / 2 : 0;
          hexagons.push({
            x: x * hexWidth + xOffset,
            y: y * hexHeight * 0.75,
            glow: 0,
            baseColor: Math.random() > 0.8 ? 'rgba(189, 0, 255' : 'rgba(0, 240, 255' // Mix of cyan and purple
          });
        }
      }
    };

    init();

    const drawHexagon = (x, y, size, glow, baseColor) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const xPos = x + size * Math.cos(angle);
        const yPos = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(xPos, yPos);
        else ctx.lineTo(xPos, yPos);
      }
      ctx.closePath();
      
      // Base very faint stroke for the grid
      ctx.strokeStyle = `${baseColor}, 0.05)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Glowing effect when hovered
      if (glow > 0) {
        ctx.fillStyle = `${baseColor}, ${glow * 0.15})`;
        ctx.fill();
        ctx.strokeStyle = `${baseColor}, ${glow * 0.8})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Deep dark background
      ctx.fillStyle = '#05030a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      hexagons.forEach(hex => {
        // Distance to mouse
        const dx = hex.x - mouse.x;
        const dy = hex.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Trigger glow if close to mouse
        if (dist < 120) {
          hex.glow += 0.1; // Fast light up
        } else {
          hex.glow -= 0.015; // Slow fade out (leaves a trail)
        }
        
        // Clamp glow value
        if (hex.glow > 1) hex.glow = 1;
        if (hex.glow < 0) hex.glow = 0;
        
        // Ambient random twinkling
        if (Math.random() < 0.0005 && hex.glow === 0) {
          hex.glow = 0.5; // Random flash
        }
        
        drawHexagon(hex.x, hex.y, hexSize - 2, hex.glow, hex.baseColor);
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    const handleResize = () => init();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
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
