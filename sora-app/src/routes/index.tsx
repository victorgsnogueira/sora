import { createFileRoute } from '@tanstack/react-router';
import { FeaturesSection } from '@/features/landing/components/FeaturesSection';
import { Footer } from '@/features/landing/components/Footer';
import { HeroSection } from '@/features/landing/components/HeroSection';
import { Navbar } from '@/features/landing/components/Navbar';
import { SmoothScrollWrapper } from '@/features/landing/components/SmoothScrollWrapper';

export const Route = createFileRoute('/')({
	component: LandingPage,
});

function LandingPage() {
	return (
		<SmoothScrollWrapper>
			<div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
				<Navbar />
				<HeroSection />
				<FeaturesSection />
				<Footer />
			</div>
		</SmoothScrollWrapper>
	);
}
