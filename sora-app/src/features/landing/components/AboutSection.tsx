import { useEffect, useRef } from 'react';
import { fadeInOnScroll } from '@/shared/animations/pageAnimations';

export const AboutSection = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!contentRef.current) return;
		fadeInOnScroll(contentRef.current);
	}, []);

	return (
		<section ref={sectionRef} className="about-section" data-speed="0.98">
			<div className="about-container">
				<div ref={contentRef} className="about-content">
					<h2 className="section-title">Por que escolher SORA?</h2>
					<p className="about-text">
						SORA é uma solução completa para gerenciamento de tickets,
						desenvolvida com foco em performance e experiência do usuário.
						Criado por desenvolvedores que entendem as necessidades reais de
						comunidades no Discord.
					</p>
					<p className="about-text">
						Nossa plataforma oferece controle total sobre seu sistema de
						suporte, permitindo que você se concentre no que realmente importa:
						atender seus clientes com excelência e construir uma comunidade
						forte.
					</p>

					<div className="about-features-list">
						<div className="about-feature-item">
							<span className="feature-check">✓</span>
							<span>Configuração em menos de 5 minutos</span>
						</div>
						<div className="about-feature-item">
							<span className="feature-check">✓</span>
							<span>Painel de controle intuitivo</span>
						</div>
						<div className="about-feature-item">
							<span className="feature-check">✓</span>
							<span>Logs completos e análises detalhadas</span>
						</div>
						<div className="about-feature-item">
							<span className="feature-check">✓</span>
							<span>Atualizações frequentes e novos recursos</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
