import type { LinkProps } from '@tanstack/react-router';
import { Link as RouterLink } from '@tanstack/react-router';
import { forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';

interface NavLinkCompatProps
	extends Omit<LinkProps, 'activeProps' | 'inactiveProps'> {
	className?: string;
	activeClassName?: string;
	pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
	({ className, activeClassName, pendingClassName, ...props }, ref) => {
		return (
			<RouterLink
				ref={ref}
				className={className}
				activeProps={{
					className: cn(className, activeClassName),
				}}
				inactiveProps={{
					className: cn(className),
				}}
				{...props}
			/>
		);
	},
);

NavLink.displayName = 'NavLink';

export { NavLink };
