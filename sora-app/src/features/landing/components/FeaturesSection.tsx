import { Eye, Terminal, Zap } from 'lucide-react';

export const FeaturesSection = () => {
	return (
		<section className="py-32 px-6">
			<div className="max-w-6xl mx-auto">
				<div className="grid md:grid-cols-3 gap-8">
					<div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#5865F2]/50 transition-colors">
						<div className="w-12 h-12 rounded-xl bg-[#5865F2]/20 flex items-center justify-center mb-6">
							<Zap className="w-6 h-6 text-[#5865F2]" />
						</div>
						<h3 className="text-xl font-bold mb-3">Editor Visual</h3>
						<p className="text-gray-400">
							Construa mensagens complexas com embeds, botões e select menus de
							forma intuitiva.
						</p>
					</div>

					<div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#5865F2]/50 transition-colors">
						<div className="w-12 h-12 rounded-xl bg-[#5865F2]/20 flex items-center justify-center mb-6">
							<Terminal className="w-6 h-6 text-[#5865F2]" />
						</div>
						<h3 className="text-xl font-bold mb-3">Código Pronto</h3>
						<p className="text-gray-400">
							Exporte código Discord.js pronto para usar no seu bot.
						</p>
					</div>

					<div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#5865F2]/50 transition-colors">
						<div className="w-12 h-12 rounded-xl bg-[#5865F2]/20 flex items-center justify-center mb-6">
							<Eye className="w-6 h-6 text-[#5865F2]" />
						</div>
						<h3 className="text-xl font-bold mb-3">Preview em Tempo Real</h3>
						<p className="text-gray-400">
							Veja exatamente como sua mensagem ficará no Discord antes de
							enviar.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
