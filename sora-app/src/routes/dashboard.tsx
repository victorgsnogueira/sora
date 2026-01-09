import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout';

export const Route = createFileRoute('/dashboard')({
	component: DashboardLayout,
});
