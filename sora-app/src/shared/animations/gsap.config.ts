import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Global GSAP configuration
gsap.config({
	autoSleep: 60,
	force3D: true,
	nullTargetWarn: false,
});

// ScrollTrigger defaults
ScrollTrigger.defaults({
	toggleActions: 'play none none none',
	markers: false, // Set to true for debugging
});

export { gsap, ScrollTrigger, ScrollSmoother };
