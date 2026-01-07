import { gsap } from './gsap.config';

/**
 * Hero section entrance animations
 */
export const heroEntrance = (container: HTMLElement) => {
	const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

	tl.from(container.querySelector('.hero-title'), {
		y: 100,
		opacity: 0,
		duration: 1.2,
		delay: 0.2,
	})
		.from(
			container.querySelector('.hero-subtitle'),
			{
				y: 50,
				opacity: 0,
				duration: 1,
			},
			'-=0.6',
		)
		.from(
			container.querySelector('.hero-cta'),
			{
				y: 30,
				opacity: 0,
				duration: 0.8,
			},
			'-=0.4',
		);

	return tl;
};

/**
 * Parallax effect for sections
 */
export const parallaxSection = (section: HTMLElement, speed: number = 0.5) => {
	gsap.to(section, {
		yPercent: -50 * speed,
		ease: 'none',
		scrollTrigger: {
			trigger: section,
			start: 'top bottom',
			end: 'bottom top',
			scrub: true,
		},
	});
};

/**
 * Fade in animation triggered by scroll
 */
export const fadeInOnScroll = (elements: HTMLElement | HTMLElement[]) => {
	gsap.from(elements, {
		y: 60,
		opacity: 0,
		duration: 1,
		stagger: 0.2,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: Array.isArray(elements) ? elements[0] : elements,
			start: 'top 85%',
			toggleActions: 'play none none reverse',
		},
	});
};

/**
 * Stagger animation for grid items
 */
export const staggerGrid = (container: HTMLElement, itemSelector: string) => {
	const items = container.querySelectorAll(itemSelector);

	gsap.from(items, {
		y: 80,
		opacity: 0,
		duration: 0.8,
		stagger: 0.15,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: container,
			start: 'top 75%',
			toggleActions: 'play none none reverse',
		},
	});
};

/**
 * Smooth reveal animation
 */
export const smoothReveal = (element: HTMLElement) => {
	gsap.from(element, {
		clipPath: 'inset(0 100% 0 0)',
		duration: 1.5,
		ease: 'power4.inOut',
		scrollTrigger: {
			trigger: element,
			start: 'top 80%',
			toggleActions: 'play none none reverse',
		},
	});
};
