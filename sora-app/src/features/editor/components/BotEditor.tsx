import { ImageIcon, KeyRound, Upload, User } from 'lucide-react';
import { useRef } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import type { BotConfig } from '@/types/discord';

interface BotEditorProps {
	bot: BotConfig;
	onChange: (bot: BotConfig) => void;
}

export function BotEditor({ bot, onChange }: BotEditorProps) {
	const avatarInputRef = useRef<HTMLInputElement>(null);
	const bannerInputRef = useRef<HTMLInputElement>(null);

	const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				onChange({ ...bot, avatarUrl: reader.result as string });
			};
			reader.readAsDataURL(file);
		}
	};

	const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				onChange({ ...bot, bannerUrl: reader.result as string });
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="space-y-4">
			<Accordion type="multiple" className="space-y-2">
				<AccordionItem value="profile" className="border-none">
					<AccordionTrigger className="py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 hover:no-underline">
						<div className="flex items-center gap-2">
							<User className="w-4 h-4 text-primary" />
							<span className="text-sm">Perfil do Bot</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pt-3 space-y-3">
						<div className="space-y-2">
							<Label
								htmlFor="bot-name"
								className="text-xs text-muted-foreground"
							>
								Nome do Bot
							</Label>
							<Input
								id="bot-name"
								value={bot.name}
								onChange={(e) => onChange({ ...bot, name: e.target.value })}
								placeholder="Bot"
							/>
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="images" className="border-none">
					<AccordionTrigger className="py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 hover:no-underline">
						<div className="flex items-center gap-2">
							<ImageIcon className="w-4 h-4 text-primary" />
							<span className="text-sm">Imagens do Bot</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pt-3 space-y-4">
						<div className="space-y-2">
							<Label className="text-xs text-muted-foreground">
								Avatar do Bot
							</Label>
							<div className="flex gap-2">
								<Input
									id="bot-avatar"
									value={bot.avatarUrl}
									onChange={(e) =>
										onChange({ ...bot, avatarUrl: e.target.value })
									}
									placeholder="https://example.com/avatar.png"
									className="flex-1"
								/>
								<input
									ref={avatarInputRef}
									type="file"
									accept="image/*"
									onChange={handleAvatarUpload}
									className="hidden"
								/>
								<Button
									variant="outline"
									size="icon"
									onClick={() => avatarInputRef.current?.click()}
									title="Enviar imagem"
								>
									<Upload className="w-4 h-4" />
								</Button>
							</div>
							{bot.avatarUrl && (
								<div className="mt-2 flex items-center gap-3">
									<img
										src={bot.avatarUrl}
										alt="Avatar do bot"
										className="w-16 h-16 rounded-full shadow-clay-sm object-cover border-2 border-border"
										onError={(e) => {
											(e.target as HTMLImageElement).src =
												'https://cdn.discordapp.com/embed/avatars/0.png';
										}}
									/>
									<span className="text-xs text-muted-foreground">
										Pré-visualização do avatar
									</span>
								</div>
							)}
						</div>

						<div className="space-y-2">
							<Label className="text-xs text-muted-foreground">
								Banner do Bot
							</Label>
							<div className="flex gap-2">
								<Input
									id="bot-banner"
									value={bot.bannerUrl || ''}
									onChange={(e) =>
										onChange({ ...bot, bannerUrl: e.target.value })
									}
									placeholder="https://example.com/banner.png"
									className="flex-1"
								/>
								<input
									ref={bannerInputRef}
									type="file"
									accept="image/*"
									onChange={handleBannerUpload}
									className="hidden"
								/>
								<Button
									variant="outline"
									size="icon"
									onClick={() => bannerInputRef.current?.click()}
									title="Enviar imagem"
								>
									<Upload className="w-4 h-4" />
								</Button>
							</div>
							{bot.bannerUrl && (
								<div className="mt-2 space-y-1">
									<img
										src={bot.bannerUrl}
										alt="Banner do bot"
										className="w-full h-24 rounded-lg shadow-clay-sm object-cover border border-border"
										onError={(e) => {
											(e.target as HTMLImageElement).style.display = 'none';
										}}
									/>
									<span className="text-xs text-muted-foreground">
										Pré-visualização do banner
									</span>
								</div>
							)}
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="token" className="border-none">
					<AccordionTrigger className="py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 hover:no-underline">
						<div className="flex items-center gap-2">
							<KeyRound className="w-4 h-4 text-primary" />
							<span className="text-sm">Token do Bot</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pt-3 space-y-3">
						<div className="space-y-2">
							<Label
								htmlFor="bot-token"
								className="text-xs text-muted-foreground"
							>
								Token
							</Label>
							<div className="flex gap-2">
								<Input
									id="bot-token"
									type="password"
									value={bot.token || ''}
									onChange={(e) => onChange({ ...bot, token: e.target.value })}
									placeholder="Token"
									className="flex-1 font-mono"
								/>
								<Button
									variant="outline"
									size="sm"
									className="shrink-0"
									onClick={() => {
										// TODO: Implementar validação do token
									}}
								>
									Salvar e Validar
								</Button>
							</div>
							<p className="text-xs text-muted-foreground">
								O token é usado para conectar ao Discord. Mantenha-o seguro e
								nunca compartilhe.
							</p>
							<p className="text-xs text-muted-foreground">
								Caso não tenha um token, você pode gerar um no Discord Developer Portal seguindo nosso passo a passo <a className="underline text-primary" href="/">aqui</a>.
							</p>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<p className="text-xs text-muted-foreground">
				Para alterar o bot, é necessário colocar o token primeiro.
			</p>
		</div>
	);
}
