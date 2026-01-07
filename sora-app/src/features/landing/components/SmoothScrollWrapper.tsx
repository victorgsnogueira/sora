import { type ReactNode, useEffect, useRef } from 'react';
import { ScrollSmoother } from '@/shared/animations/gsap.config';

interface SmoothScrollWrapperProps {
	children: ReactNode;
}

export const SmoothScrollWrapper = ({ children }: SmoothScrollWrapperProps) => {
	const smootherRef = useRef<ScrollSmoother | null>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!wrapperRef.current || !contentRef.current) return;

		smootherRef.current = ScrollSmoother.create({
			wrapper: wrapperRef.current,
			content: contentRef.current,
			smooth: 2,
			effects: true,
			smoothTouch: 0.2,
		});

		return () => {
			smootherRef.current?.kill();
		};
	}, []);

	return (
		<div id="smooth-wrapper" ref={wrapperRef}>
			<div id="smooth-content" ref={contentRef}>
				{children}
			</div>
		</div>
	);
};
