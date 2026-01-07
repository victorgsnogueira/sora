import { cn } from '@/shared/lib/utils';

interface CharacterCounterProps {
	current: number;
	max: number;
	className?: string;
}

export function CharacterCounter({
	current,
	max,
	className,
}: CharacterCounterProps) {
	const remaining = max - current;
	const percentage = (current / max) * 100;

	const getColorClass = () => {
		if (percentage >= 100) return 'text-destructive font-medium';
		if (percentage >= 90) return 'text-orange-500 font-medium';
		if (percentage >= 75) return 'text-yellow-600';
		return 'text-muted-foreground';
	};

	return (
		<div className={cn('text-xs', getColorClass(), className)}>
			{remaining <= 0 ? (
				<span>Limite atingido</span>
			) : remaining < 100 ? (
				<span>{remaining} restantes</span>
			) : (
				<span>
					{current}/{max}
				</span>
			)}
		</div>
	);
}
