import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const createStarTexture = () => {
	const canvas = document.createElement('canvas');
	canvas.width = 64;
	canvas.height = 64;

	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Failed to get 2D context');

	const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);

	gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
	gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
	gradient.addColorStop(0.4, 'rgba(200, 200, 255, 0.5)');
	gradient.addColorStop(0.7, 'rgba(150, 150, 255, 0.2)');
	gradient.addColorStop(1, 'rgba(100, 100, 255, 0)');

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 64, 64);

	return new THREE.CanvasTexture(canvas);
};

export const FloatingParticles = () => {
	const particlesRef = useRef<THREE.Points>(null);
	const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
	const particlesCount = isMobile ? 150 : 500;

	const positions = new Float32Array(particlesCount * 3);
	for (let i = 0; i < particlesCount * 3; i++) {
		positions[i] = (Math.random() - 0.5) * 15;
	}

	const starTexture = useMemo(() => createStarTexture(), []);

	useFrame(({ clock }) => {
		if (particlesRef.current) {
			particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
			particlesRef.current.rotation.x = clock.getElapsedTime() * 0.02;
		}
	});

	return (
		<points ref={particlesRef}>
			<bufferGeometry>
				<bufferAttribute attach="attributes-position" args={[positions, 3]} />
			</bufferGeometry>
			<pointsMaterial
				map={starTexture}
				size={0.08}
				color="#ffffff"
				transparent={true}
				opacity={0.8}
				sizeAttenuation={true}
				depthWrite={false}
			/>
		</points>
	);
};

export const Scene = () => {
	return <FloatingParticles />;
};
