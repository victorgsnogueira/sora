import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
	component: DashboardHome,
});

function DashboardHome() {
	return <div className="flex flex-col gap-4"></div>;
}
