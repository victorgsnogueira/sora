import { Link } from '@tanstack/react-router';

export const Navbar = () => {
	return (
		<nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 md:py-4 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5">
			<div className="max-w-7xl mx-auto flex items-center justify-between">
				<span className="text-xl md:text-2xl font-black tracking-tight">
					SORA
				</span>
				<div className="flex items-center gap-4 md:gap-8">
					<a
						href="#recursos"
						className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors"
					>
						Recursos
					</a>
					<a
						href="#precos"
						className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors"
					>
						Preços
					</a>
					<a
						href="#docs"
						className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors"
					>
						Docs
					</a>
					<Link
						to="/dashboard/editor"
						className="px-3 py-1.5 md:px-4 md:py-2 bg-[#5865F2] rounded-lg text-xs md:text-sm font-medium hover:bg-[#4752c4] transition-colors"
					>
						Abrir Editor
					</Link>
				</div>
			</div>
		</nav>
	);
};
