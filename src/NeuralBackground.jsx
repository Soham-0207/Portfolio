import { useEffect, useRef } from 'react';

export default function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let layers = [];
    let connections = [];
    let pulses = [];
    
    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      layers = [];
      connections = [];
      pulses = [];
      
      // Calculate how many layers we can fit, spaced about 250px apart
      const numLayers = Math.max(3, Math.floor(canvas.width / 250) + 2); 
      
      // 1. Create nodes in layers
      for (let i = 0; i < numLayers; i++) {
        // Distribute layers evenly across the screen width (slightly overflowing so edges look natural)
        const layerX = (i / (numLayers - 1)) * (canvas.width + 200) - 100;
        
        // Random number of nodes per layer (more in the middle layers)
        const isMiddleLayer = i > 0 && i < numLayers - 1;
        const numNodes = isMiddleLayer ? Math.floor(Math.random() * 8) + 8 : Math.floor(Math.random() * 5) + 5;
        
        const nodes = [];
        for (let j = 0; j < numNodes; j++) {
          nodes.push({
            x: layerX + (Math.random() * 60 - 30), // Stagger X slightly so it's not a perfectly straight line
            y: (j / (numNodes - 1)) * (canvas.height - 100) + 50 + (Math.random() * 40 - 20), // Distribute Y
            radius: Math.random() * 2 + 1.5,
            pulseIntensity: 0
          });
        }
        layers.push(nodes);
      }
      
      // 2. Create connections (synapses) between adjacent layers
      for (let i = 0; i < layers.length - 1; i++) {
        const currentLayer = layers[i];
        const nextLayer = layers[i + 1];
        
        currentLayer.forEach((node1) => {
          // Connect this node to 2-4 random nodes in the NEXT layer
          const numConnections = Math.floor(Math.random() * 3) + 2;
          for (let k = 0; k < numConnections; k++) {
            const node2 = nextLayer[Math.floor(Math.random() * nextLayer.length)];
            
            // Only add connection if it doesn't already exist to avoid drawing duplicate lines
            const exists = connections.find(c => c.start === node1 && c.end === node2);
            if (!exists) {
              connections.push({
                start: node1,
                end: node2
              });
            }
          }
        });
      }
    };
    
    init();
    
    // Mouse interaction
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Deep tech background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, '#020108');
      bgGradient.addColorStop(1, '#050314');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Spawn new data pulses randomly along connections
      if (Math.random() < 0.1 && connections.length > 0) { // Frequency of pulses
        const conn = connections[Math.floor(Math.random() * connections.length)];
        pulses.push({
          connection: conn,
          progress: 0,
          speed: Math.random() * 0.01 + 0.005 // Travel speed
        });
        conn.start.pulseIntensity = 1; // Light up the origin node
      }
      
      // Draw all connections (faint lines)
      ctx.lineWidth = 0.5;
      connections.forEach(conn => {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)'; // Very faint cyan
        ctx.moveTo(conn.start.x, conn.start.y);
        ctx.lineTo(conn.end.x, conn.end.y);
        ctx.stroke();
      });
      
      // Update and draw data pulses traveling along lines
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        
        if (p.progress >= 1) {
          p.connection.end.pulseIntensity = 1; // Pulse reached target node, light it up
          pulses.splice(i, 1); // Remove pulse
        } else {
          // Calculate current position of pulse
          const px = p.connection.start.x + (p.connection.end.x - p.connection.start.x) * p.progress;
          const py = p.connection.start.y + (p.connection.end.y - p.connection.start.y) * p.progress;
          
          // Draw the glowing pulse dot
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 240, 255, 1)';
          ctx.fill();
          
          // Glow effect for pulse
          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
          ctx.fill();
        }
      }
      
      // Draw nodes (neurons)
      layers.forEach(layer => {
        layer.forEach(node => {
          // Mouse interaction: push nodes away
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let renderX = node.x;
          let renderY = node.y;
          
          if (dist < 150) {
            const force = (150 - dist) / 150;
            renderX -= (dx / dist) * force * 20; // Push away
            renderY -= (dy / dist) * force * 20;
            node.pulseIntensity = 1; // Force glow when hovered/pushed
          }
          
          // Fade node glow over time
          if (node.pulseIntensity > 0) {
            node.pulseIntensity -= 0.03;
          }
          if (node.pulseIntensity < 0) node.pulseIntensity = 0;
          
          // Draw the node
          ctx.beginPath();
          // Node gets slightly bigger when pulsing
          ctx.arc(renderX, renderY, node.radius + (node.pulseIntensity * 1.5), 0, Math.PI * 2);
          
          if (node.pulseIntensity > 0.01) {
            // Pulsing color (Purple)
            ctx.fillStyle = `rgba(189, 0, 255, ${0.4 + node.pulseIntensity * 0.6})`;
            ctx.shadowColor = 'rgba(189, 0, 255, 0.8)';
            ctx.shadowBlur = 12 * node.pulseIntensity;
          } else {
            // Idle color (Cyan)
            ctx.fillStyle = 'rgba(0, 240, 255, 0.3)';
            ctx.shadowBlur = 0;
          }
          
          ctx.fill();
        });
      });
      
      ctx.shadowBlur = 0; // Reset shadow for next frame
      
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
