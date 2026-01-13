import { createFileRoute, redirect } from '@tanstack/react-router';
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout';
import {
	getStoredToken,
	getAuthenticatedUser,
} from '@/features/auth/services/auth-service';

export const Route = createFileRoute('/dashboard')({
	beforeLoad: async () => {
		const token = getStoredToken();

		if (!token) {
			throw redirect({ to: '/' });
		}

		try {
			await getAuthenticatedUser(token);
		} catch {
			throw redirect({ to: '/' });
		}
	},
	component: DashboardLayout,
});
