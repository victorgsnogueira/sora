import { gsap } from './gsap.config';

/**
 * Hover scale animation
 */
export const hoverScale = (element: HTMLElement, scale: number = 1.05) => {
	element.addEventListener('mouseenter', () => {
		gsap.to(element, {
			scale,
			duration: 0.3,
			ease: 'power2.out',
		});
	});

	element.addEventListener('mouseleave', () => {
		gsap.to(element, {
			scale: 1,
			duration: 0.3,
			ease: 'power2.out',
		});
	});
};

/**
 * Slide in from left
 */
export const slideInLeft = (element: HTMLElement, duration: number = 0.8) => {
	return gsap.from(element, {
		x: -100,
		opacity: 0,
		duration,
		ease: 'power3.out',
	});
};

/**
 * Slide in from right
 */
export const slideInRight = (element: HTMLElement, duration: number = 0.8) => {
	return gsap.from(element, {
		x: 100,
		opacity: 0,
		duration,
		ease: 'power3.out',
	});
};

/**
 * Fade in animation
 */
export const fadeIn = (element: HTMLElement, duration: number = 0.6) => {
	return gsap.from(element, {
		opacity: 0,
		duration,
		ease: 'power2.out',
	});
};

/**
 * Scale in animation
 */
export const scaleIn = (element: HTMLElement, duration: number = 0.6) => {
	return gsap.from(element, {
		scale: 0.8,
		opacity: 0,
		duration,
		ease: 'back.out(1.7)',
	});
};
