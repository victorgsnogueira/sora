const footerLinks = {
	produto: [
		{ label: 'Recursos', href: '#' },
		{ label: 'Preços', href: '#' },
		{ label: 'Documentação', href: '#' },
		{ label: 'Changelog', href: '#' },
	],
	empresa: [
		{ label: 'Sobre', href: '#' },
		{ label: 'Blog', href: '#' },
		{ label: 'Carreiras', href: '#' },
		{ label: 'Contato', href: '#' },
	],
	recursos: [
		{ label: 'Suporte', href: '#' },
		{ label: 'Comunidade', href: '#' },
		{ label: 'Status', href: '#' },
		{ label: 'API', href: '#' },
	],
	legal: [
		{ label: 'Privacidade', href: '#' },
		{ label: 'Termos', href: '#' },
		{ label: 'Segurança', href: '#' },
		{ label: 'Licença', href: '#' },
	],
};

export const Footer = () => {
	return (
		<footer className="border-t border-white/10 bg-[#0d0d12]">
			<div className="max-w-7xl mx-auto px-6 py-16">
				<div className="grid grid-cols-2 md:grid-cols-6 gap-8">
					{/* Brand */}
					<div className="col-span-2">
						<span className="text-2xl font-black tracking-tight">SORA</span>
						<p className="text-gray-500 mt-4 text-sm">
							Seu bot de tickets de próxima geração
						</p>
					</div>

					{/* Links */}
					<div>
						<h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
							Produto
						</h4>
						<ul className="space-y-3">
							{footerLinks.produto.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-sm text-gray-500 hover:text-white transition-colors"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
							Empresa
						</h4>
						<ul className="space-y-3">
							{footerLinks.empresa.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-sm text-gray-500 hover:text-white transition-colors"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
							Recursos
						</h4>
						<ul className="space-y-3">
							{footerLinks.recursos.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-sm text-gray-500 hover:text-white transition-colors"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
							Legal
						</h4>
						<ul className="space-y-3">
							{footerLinks.legal.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-sm text-gray-500 hover:text-white transition-colors"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-sm text-gray-500">
						© 2026 SORA. Todos os direitos reservados.
					</p>
					<div className="flex items-center gap-6">
						<a
							href="#twitter"
							className="text-sm text-gray-500 hover:text-white transition-colors"
						>
							Twitter
						</a>
						<a
							href="#github"
							className="text-sm text-gray-500 hover:text-white transition-colors"
						>
							GitHub
						</a>
						<a
							href="#discord"
							className="text-sm text-gray-500 hover:text-white transition-colors"
						>
							Discord
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
