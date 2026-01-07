import { useRef } from 'react';

/**
 * Hook to create a ref for GSAP animations with type safety
 */
export const useGsapRef = <T extends HTMLElement>() => {
	const ref = useRef<T>(null);

	return ref;
};
