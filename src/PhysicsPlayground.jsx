import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { motion } from 'framer-motion';

export default function PhysicsPlayground() {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    // Setup Matter JS
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          World = Matter.World,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite;

    const engine = Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    const width = window.innerWidth;
    const height = 400; // Height of the playground area

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
      }
    });

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    // Add boundaries
    const wallOptions = { isStatic: true, render: { fillStyle: 'transparent' } };
    World.add(world, [
      Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions), // Bottom
      Bodies.rectangle(-25, height / 2, 50, height, wallOptions), // Left
      Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions) // Right
    ]);

    // Add fun shapes
    const shapes = [];
    const colors = ['#00f0ff', '#bd00ff', '#ffffff', '#222233'];

    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * -500 - 50; // spawn above screen
      const radius = 20 + Math.random() * 20;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const renderOptions = {
        fillStyle: color,
        strokeStyle: color === '#222233' ? '#00f0ff' : 'transparent',
        lineWidth: 2
      };

      if (Math.random() > 0.5) {
        shapes.push(Bodies.circle(x, y, radius, {
          restitution: 0.9,
          render: renderOptions
        }));
      } else {
        shapes.push(Bodies.rectangle(x, y, radius * 2, radius * 2, {
          restitution: 0.6,
          render: renderOptions
        }));
      }
    }
    
    // Add a big "SV" block
    shapes.push(Bodies.rectangle(width / 2, -600, 100, 100, {
      restitution: 0.5,
      render: {
        fillStyle: '#000',
        strokeStyle: '#bd00ff',
        lineWidth: 4,
        sprite: {
          // If we had a sprite, we could add it here
        }
      }
    }));

    World.add(world, shapes);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    World.add(world, mouseConstraint);
    render.mouse = mouse;

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (engineRef.current) {
        World.clear(engineRef.current.world);
        Engine.clear(engineRef.current);
      }
      if (render.canvas) {
        render.canvas.remove();
      }
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return (
    <motion.section 
      className="section" 
      style={{ padding: '4rem 0', position: 'relative', overflow: 'hidden' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 className="section-header" style={{ justifyContent: 'center', margin: 0, padding: '0 10%' }}>
          Interactive Physics Playground
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Grab, drag, and throw the shapes!
        </p>
      </div>
      
      {/* The physics canvas will attach here */}
      <div ref={sceneRef} style={{ width: '100%', height: '400px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'grab' }} />
    </motion.section>
  );
}
