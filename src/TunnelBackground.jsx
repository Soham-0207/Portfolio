import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TunnelBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Fog gives the illusion of infinite depth fading into darkness
    scene.fog = new THREE.FogExp2('#020108', 0.015);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance
    mountRef.current.appendChild(renderer.domElement);

    // Create the square segments of the tunnel
    const squares = [];
    const count = 50;
    const spacing = 4;
    const tunnelLength = count * spacing;
    const size = 15;
    const halfSize = size / 2;
    
    const geometry = new THREE.EdgesGeometry(new THREE.PlaneGeometry(size, size));
    const material = new THREE.LineBasicMaterial({ 
      color: 0x00f0ff, // Cyan neon
      transparent: true,
      opacity: 0.6
    });

    for (let i = 0; i < count; i++) {
      const square = new THREE.LineSegments(geometry, material);
      square.position.z = -i * spacing;
      scene.add(square);
      squares.push(square);
    }
    
    // Add 4 long connecting lines to form the walls of the tunnel
    const lineGeo = new THREE.BufferGeometry();
    const positions = new Float32Array([
      // Top Left
      -halfSize, halfSize, 10,
      -halfSize, halfSize, -tunnelLength,
      // Top Right
      halfSize, halfSize, 10,
      halfSize, halfSize, -tunnelLength,
      // Bottom Left
      -halfSize, -halfSize, 10,
      -halfSize, -halfSize, -tunnelLength,
      // Bottom Right
      halfSize, -halfSize, 10,
      halfSize, -halfSize, -tunnelLength
    ]);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const longLines = new THREE.LineSegments(lineGeo, material);
    scene.add(longLines);

    // Mouse movement interaction
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrameId;
    const speed = 0.2; // Speed of moving forward
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Move squares towards the camera to simulate moving forward
      squares.forEach(square => {
        square.position.z += speed;
        // Wrap around when it passes the camera
        if (square.position.z > 5) {
          square.position.z -= tunnelLength;
        }
      });
      
      // Smoothly rotate camera towards mouse position
      camera.rotation.y += (targetX * 0.1 - camera.rotation.y) * 0.05;
      camera.rotation.x += (targetY * 0.1 - camera.rotation.x) * 0.05;
      camera.position.x += (targetX * 1 - camera.position.x) * 0.05;
      camera.position.y += (targetY * 1 - camera.position.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeo.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none',
        background: '#020108'
      }}
    />
  );
}
