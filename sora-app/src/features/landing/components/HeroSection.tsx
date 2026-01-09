import { Canvas } from '@react-three/fiber';
import { Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { gsap } from '@/shared/animations/gsap.config';
import { DiscordMessagePreview } from './DiscordMessagePreview';
import { Scene } from './FloatingParticles';

export const HeroSection = () => {
	const heroRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				titleRef.current,
				{ opacity: 0, y: 100 },
				{ opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' },
			);

			gsap.fromTo(
				subtitleRef.current,
				{ opacity: 0, y: 50 },
				{ opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' },
			);

			gsap.fromTo(
				ctaRef.current,
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power2.out' },
			);
		}, heroRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={heroRef}
			className="relative min-h-screen flex items-center justify-center pt-16 md:pt-0"
		>
			<div className="absolute inset-0 z-0">
				<Canvas
					camera={{ position: [0, 0, 5], fov: 75 }}
					gl={{
						antialias: true,
						alpha: true,
						powerPreference: 'high-performance',
					}}
				>
					<Scene />
				</Canvas>
			</div>

			<div className="relative z-20 text-center px-4 md:px-6 max-w-4xl mx-auto">
				<h1
					ref={titleRef}
					className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight mb-4 md:mb-6"
					style={{ opacity: 0 }}
				>
					SORA
				</h1>
				<p
					ref={subtitleRef}
					className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto px-2"
					style={{ opacity: 0 }}
				>
					Seu bot de tickets de próxima geração. Construa mensagens Discord
					incríveis com nosso editor visual.
				</p>
				<div
					ref={ctaRef}
					className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 px-4"
					style={{ opacity: 0 }}
				>
					<Link
						to="/dashboard/editor"
						className="px-6 py-3 md:px-8 md:py-4 bg-[#5865F2] rounded-xl text-base md:text-lg font-semibold hover:bg-[#4752c4] transition-all hover:scale-105"
					>
						Começar Agora
					</Link>
					<a
						href="https://discord.js.org"
						target="_blank"
						rel="noopener noreferrer"
						className="px-6 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-base md:text-lg font-semibold hover:bg-white/20 transition-all hover:scale-105"
					>
						Ver Documentação
					</a>
				</div>

				<DiscordMessagePreview />
			</div>
		</section>
	);
};
