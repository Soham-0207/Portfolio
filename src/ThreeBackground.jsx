import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 30;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // 4. Create geometric object (Icosahedron looks very techy as a wireframe)
    const geometry = new THREE.IcosahedronGeometry(16, 1);
    
    // Tech glowing material
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x00f0ff, // Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add a second, slightly smaller inner geometry in purple for contrast
    const innerGeometry = new THREE.IcosahedronGeometry(10, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xbd00ff, // Purple
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);

    // 5. Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate objects slowly
      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.002;
      
      innerMesh.rotation.x -= 0.002;
      innerMesh.rotation.y -= 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 7. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
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
        background: '#07070a' // Sleek dark background
      }}
    />
  );
}
