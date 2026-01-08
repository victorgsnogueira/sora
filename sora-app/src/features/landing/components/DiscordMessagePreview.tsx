import { ChevronDownIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/shared/animations/gsap.config';

export const DiscordMessagePreview = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [selectOpen, setSelectOpen] = useState(false);

	useEffect(() => {
		if (!containerRef.current) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				containerRef.current,
				{ opacity: 0, y: 40, scale: 0.95 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 1,
					delay: 0.8,
					ease: 'power3.out',
				},
			);
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative max-w-lg mx-auto px-2 md:px-0 scale-90 md:scale-100"
			style={{ opacity: 0 }}
		>
			<div className="bg-[#313338] rounded-lg p-3 md:p-4 shadow-2xl shadow-black/50">
				<div className="flex items-start gap-4">
					<div className="w-10 h-10 rounded-full bg-linear-to-br from-[#5865F2] to-[#7289da] flex items-center justify-center shrink-0">
						<span className="text-white font-bold text-sm">S</span>
					</div>

					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<span className="font-semibold text-white">Sora</span>
							<span className="text-xs text-[#949ba4]">Hoje às 14:32</span>
						</div>

						<div className="mt-2 border-l-4 border-[#5865F2] bg-[#2b2d31] rounded-r-md overflow-hidden max-w-md">
							<div className="p-3">
								<div className="flex items-center gap-2 mb-2">
									<span className="text-xs text-white font-medium">
										Sistema de Tickets
									</span>
								</div>

								<h4 className="text-[#00a8fc] font-semibold mb-2 text-left">
									👋 Bem-vindo ao Suporte!
								</h4>
								<p className="text-sm text-[#dbdee1] leading-relaxed mb-3 text-left">
									Olá! Precisa de ajuda? Selecione uma categoria abaixo para
									abrir um ticket e nossa equipe irá te atender.
								</p>

								<div className="flex gap-3">
									<div className="flex-1">
										<div className="text-xs font-semibold text-[#dbdee1] mb-1 text-left">
											⏰ Horário
										</div>
										<div className="text-xs text-[#949ba4] text-left">24/7</div>
									</div>
									<div className="flex-1">
										<div className="text-xs font-semibold text-[#dbdee1] mb-1 text-left">
											📊 Tempo médio
										</div>
										<div className="text-xs text-[#949ba4] text-left">
											~5 minutos
										</div>
									</div>
								</div>

								<div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
									<span className="text-[10px] text-[#949ba4]">
										Sora Tickets • {new Date().toLocaleDateString('pt-BR')}
									</span>
								</div>
							</div>
						</div>

						<div className="mt-3 relative">
							<button
								type="button"
								onClick={() => setSelectOpen(!selectOpen)}
								className="w-full max-w-md bg-[#1e1f22] border border-[#3f4147] rounded px-3 py-2 flex items-center justify-between text-left hover:border-[#5865F2] transition-colors"
							>
								<span className="text-sm text-[#949ba4]">
									📁 Selecione uma categoria...
								</span>
								<ChevronDownIcon
									className={`w-4 h-4 text-[#949ba4] transition-transform ${
										selectOpen ? 'rotate-180' : ''
									}`}
								/>
							</button>

							{selectOpen && (
								<div className="absolute top-full left-0 right-0 max-w-md mt-1 bg-[#2b2d31] border border-[#3f4147] rounded shadow-xl z-10">
									<div className="py-1">
										{[
											{
												emoji: '💬',
												label: 'Dúvidas Gerais',
												desc: 'Perguntas sobre o servidor',
											},
											{
												emoji: '🛒',
												label: 'Compras',
												desc: 'Suporte para compras',
											},
											{
												emoji: '🐛',
												label: 'Reportar Bug',
												desc: 'Encontrou um problema?',
											},
											{
												emoji: '💡',
												label: 'Sugestões',
												desc: 'Envie suas ideias',
											},
										].map((option) => (
											<div
												key={option.label}
												className="px-3 py-2.5 hover:bg-[#35373c] cursor-pointer transition-colors text-left flex items-start gap-2"
											>
												<span className="text-base shrink-0">
													{option.emoji}
												</span>
												<div>
													<div className="text-sm text-white font-semibold">
														{option.label}
													</div>
													<div className="text-xs text-[#b5bac1] mt-0.5">
														{option.desc}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
