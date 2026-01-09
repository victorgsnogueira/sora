import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
	component: DashboardHome,
});

function DashboardHome() {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Dashboard</h1>
			<p className="text-muted-foreground">
				Bem-vindo ao Sora! Selecione uma opção no menu lateral.
			</p>
		</div>
	);
}
