import { useEffect, useRef } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const matrix = letters.split('');

    const fontSize = 16;
    let columns = width / fontSize;

    let drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Start offscreen
    }

    let animationFrameId;
    let lastTime = 0;
    const fps = 30; // 30 FPS for that retro matrix feel
    const interval = 1000 / fps;

    const draw = () => {
      // Dark background with slight transparency for the fade trail effect
      ctx.fillStyle = 'rgba(7, 7, 10, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Cyan to match the theme
      ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const render = (time) => {
      animationFrameId = requestAnimationFrame(render);
      if (time - lastTime >= interval) {
        lastTime = time;
        draw();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      const newColumns = width / fontSize;
      if (newColumns > drops.length) {
        for (let i = drops.length; i < newColumns; i++) {
          drops[i] = Math.random() * -100;
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
        pointerEvents: 'none',
        opacity: 0.6, // Keep it slightly subtle
        background: '#07070a' // Base background color
      }}
    />
  );
}
