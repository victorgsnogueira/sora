import { ImageIcon } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import type { BotConfig } from '@/types/discord';

interface BotEditorProps {
	bot: BotConfig;
	onChange: (bot: BotConfig) => void;
}

export function BotEditor({ bot, onChange }: BotEditorProps) {
	return (
		<div className="space-y-4">
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="bot-name" className="text-sm text-muted-foreground">
						Nome do Bot
					</Label>
					<Input
						id="bot-name"
						value={bot.name}
						onChange={(e) => onChange({ ...bot, name: e.target.value })}
						placeholder="Meu Bot Incrível"
					/>
				</div>

				<div className="space-y-2">
					<Label
						htmlFor="bot-avatar"
						className="text-sm text-muted-foreground flex items-center gap-2"
					>
						<ImageIcon className="w-4 h-4" />
						URL do Avatar
					</Label>
					<Input
						id="bot-avatar"
						value={bot.avatarUrl}
						onChange={(e) => onChange({ ...bot, avatarUrl: e.target.value })}
						placeholder="https://example.com/avatar.png"
					/>
					{bot.avatarUrl && (
						<div className="mt-2 flex items-center gap-2">
							<img
								src={bot.avatarUrl}
								alt="Pré-visualização"
								className="w-10 h-10 rounded-full shadow-clay-sm object-cover"
								onError={(e) => {
									(e.target as HTMLImageElement).src =
										'https://cdn.discordapp.com/embed/avatars/0.png';
								}}
							/>
							<span className="text-xs text-muted-foreground">
								Pré-visualização
							</span>
						</div>
					)}
				</div>

				<div className="p-3 rounded-xl bg-muted/30 border border-border/50">
					<p className="text-xs text-muted-foreground text-center">
						Essas configurações são apenas para fins de pré-visualização
					</p>
				</div>
			</div>
		</div>
	);
}
