import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Environment, Sparkles } from '@react-three/drei'

const LiquidWall = () => {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle continuous movement for the wall
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
        }
    })

    return (
        <mesh ref={meshRef} position={[0, 0, -5]} scale={[1.5, 1.5, 1]}>
            {/* A massive plane that fills the entire camera view */}
            <planeGeometry args={[30, 20, 128, 128]} />
            <MeshDistortMaterial 
                color="#0a0f18" 
                attach="material" 
                distort={0.4} 
                speed={1.5} 
                roughness={0.2} 
                metalness={0.9}
            />
        </mesh>
    )
}

const Background3D = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, backgroundColor: '#05080f' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                {/* Rich cinematic lighting */}
                <ambientLight intensity={0.2} />
                <directionalLight position={[5, 10, 5]} intensity={2} color="#ff2d78" />
                <directionalLight position={[-10, -10, 5]} intensity={3} color="#4facfe" />
                <pointLight position={[0, 0, 2]} intensity={1.5} color="#d400ff" />
                
                <Suspense fallback={null}>
                    <LiquidWall />
                    
                    {/* Add glowing floating particles for depth */}
                    <Sparkles count={300} scale={15} size={3} speed={0.4} opacity={0.6} color="#4facfe" noise={1} />
                    <Sparkles count={200} scale={15} size={4} speed={0.2} opacity={0.4} color="#ff2d78" noise={2} />
                    
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Background3D
