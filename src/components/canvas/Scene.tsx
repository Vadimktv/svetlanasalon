'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

function ScrollTiedObjects() {
  const meshGroup = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (meshGroup.current) {
      // Get the current scroll percentage (0 to 1)
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
      
      // Interpolate rotation based purely on scroll
      const targetRotationY = scrollProgress * Math.PI * 4; // Rotate 2 full times over the page
      const targetRotationX = scrollProgress * Math.PI * 2;
      const targetPositionY = -scrollProgress * 5; // Move down slightly

      // Smoothly interpolate towards the target (lerp for that crisp but smooth feel)
      meshGroup.current.rotation.y = THREE.MathUtils.lerp(meshGroup.current.rotation.y, targetRotationY, 0.1);
      meshGroup.current.rotation.x = THREE.MathUtils.lerp(meshGroup.current.rotation.x, targetRotationX, 0.1);
      meshGroup.current.position.y = THREE.MathUtils.lerp(meshGroup.current.position.y, targetPositionY, 0.1);
    }
  });

  return (
    <group ref={meshGroup} position={[0, 0, 0]}>
      {/* Placeholder for real 3D Models (Scissors, Combs, etc.) */}
      {/* Currently using an elegant TorusKnot as a placeholder */}
      <mesh scale={1.2}>
        <torusKnotGeometry args={[3, 0.4, 256, 32, 2, 5]} />
        <MeshTransmissionMaterial 
          backside
          samples={8} // Lowered for optimization
          thickness={2.5}
          chromaticAberration={0.06}
          anisotropy={0.5}
          distortion={0.5} // Lowered for optimization
          distortionScale={0.3}
          temporalDistortion={0.0} // No auto-animation, only scroll!
          clearcoat={1}
          clearcoatRoughness={0.1}
          attenuationDistance={1}
          attenuationColor="#d4af37"
          color="#fdf5e6"
          roughness={0.15}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

export default function Scene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] bg-[#101312] pointer-events-none">
      {/* Added dpr for optimization on retina displays */}
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.1} />
        
        <directionalLight position={[5, 10, -5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -5, 5]} intensity={3} color="#d4af37" />
        <directionalLight position={[0, -10, -10]} intensity={1.5} color="#86aaa5" />
        
        <Environment preset="city" />
        
        <ScrollTiedObjects />
        
        {/* Sparkles give that premium dust/light effect */}
        <Sparkles 
          count={100} // Optimized count
          scale={20} 
          size={1.5} 
          speed={0} // No auto movement
          opacity={0.4} 
          color="#d4af37" 
        />
      </Canvas>
    </div>
  );
}


