export const DiscordFooter = () => {
	return (
		<footer className="discord-footer">
			<div className="footer-content">
				<div className="footer-top">
					<div className="footer-brand">
						<h2 className="footer-logo">SORA</h2>
						<p className="footer-tagline">
							Seu bot de tickets de próxima geração
						</p>
					</div>

					<div className="footer-links-grid">
						<div className="footer-column">
							<h3 className="footer-column-title">Produto</h3>
							<ul className="footer-links">
								<li>
									<a href="#features">Recursos</a>
								</li>
								<li>
									<a href="#pricing">Preços</a>
								</li>
								<li>
									<a href="#docs">Documentação</a>
								</li>
								<li>
									<a href="#changelog">Changelog</a>
								</li>
							</ul>
						</div>

						<div className="footer-column">
							<h3 className="footer-column-title">Empresa</h3>
							<ul className="footer-links">
								<li>
									<a href="#about">Sobre</a>
								</li>
								<li>
									<a href="#blog">Blog</a>
								</li>
								<li>
									<a href="#careers">Carreiras</a>
								</li>
								<li>
									<a href="#contact">Contato</a>
								</li>
							</ul>
						</div>

						<div className="footer-column">
							<h3 className="footer-column-title">Recursos</h3>
							<ul className="footer-links">
								<li>
									<a href="#support">Suporte</a>
								</li>
								<li>
									<a href="#community">Comunidade</a>
								</li>
								<li>
									<a href="#status">Status</a>
								</li>
								<li>
									<a href="#api">API</a>
								</li>
							</ul>
						</div>

						<div className="footer-column">
							<h3 className="footer-column-title">Legal</h3>
							<ul className="footer-links">
								<li>
									<a href="#privacy">Privacidade</a>
								</li>
								<li>
									<a href="#terms">Termos</a>
								</li>
								<li>
									<a href="#security">Segurança</a>
								</li>
								<li>
									<a href="#license">Licença</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="footer-bottom">
					<div className="footer-divider" />
					<div className="footer-bottom-content">
						<p className="footer-copyright">
							© 2026 SORA. Todos os direitos reservados.
						</p>
						<div className="footer-social">
							<a href="#twitter" className="social-link">
								Twitter
							</a>
							<a href="#github" className="social-link">
								GitHub
							</a>
							<a href="#discord" className="social-link">
								Discord
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
