import {
	Bot,
	Check,
	Copy,
	LayoutGrid,
	List,
	MessageSquare,
	MousePointerClick,
	Plus,
	Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { toast } from '@/shared/hooks/use-toast';
import type { Embed, MessageConfig } from '@/types/discord';

interface PlaygroundToolbarProps {
	message: MessageConfig;
	onChange: (message: MessageConfig) => void;
	activePanel: string | null;
	onPanelChange: (panel: string | null) => void;
}

export function PlaygroundToolbar({
	message,
	onChange,
	activePanel,
	onPanelChange,
}: PlaygroundToolbarProps) {
	const [copied, setCopied] = useState(false);

	const addEmbed = () => {
		if (message.embeds.length >= 10) {
			toast({
				title: 'Limite atingido',
				description: 'Você só pode adicionar até 10 embeds por mensagem.',
				variant: 'destructive',
			});
			return;
		}
		const DEFAULT_EMBED = {
			id: crypto.randomUUID(),
			title: '',
			description: '',
			url: '',
			color: '#5865F2',
			author: {
				name: '',
				iconUrl: '',
				url: '',
			},
			thumbnail: '',
			image: '',
			footer: {
				text: '',
				iconUrl: '',
			},
			fields: [],
		};
		const newEmbed: Embed = { ...DEFAULT_EMBED, id: crypto.randomUUID() };
		onChange({ ...message, embeds: [...message.embeds, newEmbed] });
		onPanelChange(`embed-${message.embeds.length}`);
	};

	const clearAll = () => {
		onChange({
			...message,
			content: '',
			embeds: [],
			components: [],
			selectMenus: [],
		});
		onPanelChange(null);
		toast({
			title: 'Limpo!',
			description:
				'Conteúdo da mensagem, embeds, botões e menus de seleção foram limpos.',
		});
	};

	const generateJSON = () => {
		const jsonOutput: {
			content: string | null;
			embeds: unknown[] | null;
			components?: unknown[];
		} = {
			content: message.content || null,
			embeds: message.embeds.length
				? message.embeds.map((embed) => ({
						title: embed.title || undefined,
						description: embed.description || undefined,
						url: embed.url || undefined,
						color: parseInt(embed.color.replace('#', ''), 16),
						author: embed.author.name
							? {
									name: embed.author.name,
									icon_url: embed.author.iconUrl || undefined,
									url: embed.author.url || undefined,
								}
							: undefined,
						thumbnail: embed.thumbnail ? { url: embed.thumbnail } : undefined,
						image: embed.image ? { url: embed.image } : undefined,
						footer: embed.footer.text
							? {
									text: embed.footer.text,
									icon_url: embed.footer.iconUrl || undefined,
								}
							: undefined,
						fields: embed.fields.length
							? embed.fields.map((field) => ({
									name: field.name,
									value: field.value,
									inline: field.inline,
								}))
							: undefined,
						timestamp: embed.timestamp || undefined,
					}))
				: null,
			components:
				[
					...(message.components.length
						? message.components.map((row) => ({
								type: 1,
								components: row.buttons.map((btn) => ({
									type: 2,
									style:
										btn.style === 'primary'
											? 1
											: btn.style === 'secondary'
												? 2
												: btn.style === 'success'
													? 3
													: btn.style === 'danger'
														? 4
														: 5,
									label: btn.label,
									url: btn.style === 'link' ? btn.url : undefined,
									custom_id: btn.style !== 'link' ? btn.id : undefined,
									disabled: btn.disabled || undefined,
									emoji: btn.emoji ? { name: btn.emoji } : undefined,
								})),
							}))
						: []),
					...(message.selectMenus.length
						? message.selectMenus.map((menu) => ({
								type: 1,
								components: [
									{
										type: 3,
										custom_id: menu.id,
										placeholder: menu.placeholder,
										min_values: menu.minValues,
										max_values: menu.maxValues,
										disabled: menu.disabled || undefined,
										options: menu.options.map((opt) => ({
											label: opt.label,
											value: opt.value,
											description: opt.description || undefined,
											emoji: opt.emoji ? { name: opt.emoji } : undefined,
											default: opt.default || undefined,
										})),
									},
								],
							}))
						: []),
				].filter((row) => row.components.length > 0) || undefined,
		};

		if (jsonOutput.components?.length === 0) {
			delete jsonOutput.components;
		}

		navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2));
		setCopied(true);
		toast({
			title: 'JSON Copiado!',
			description:
				'O JSON da mensagem foi copiado para sua área de transferência.',
		});
		setTimeout(() => setCopied(false), 2000);
	};

	const totalButtons = message.components.reduce(
		(sum, row) => sum + row.buttons.length,
		0,
	);

	const tools = [
		{
			id: 'bot',
			icon: Bot,
			label: 'Configurações do Bot',
			active: activePanel === 'bot',
		},
		{
			id: 'message',
			icon: MessageSquare,
			label: 'Conteúdo da Mensagem',
			active: activePanel === 'message',
		},
		{
			id: 'buttons',
			icon: MousePointerClick,
			label: `Botões (${totalButtons}/25)`,
			active: activePanel === 'buttons',
		},
		{
			id: 'selectmenus',
			icon: List,
			label: `Menus de Seleção (${message.selectMenus.length}/5)`,
			active: activePanel === 'selectmenus',
		},
		{
			id: 'add-embed',
			icon: Plus,
			label: `Adicionar Embed (${message.embeds.length}/10)`,
			action: addEmbed,
		},
	];

	return (
		<TooltipProvider delayDuration={200}>
			<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
				<div className="flex items-center gap-1 p-2 bg-card border border-border rounded-sm shadow-clay">
					{tools.map((tool) => (
						<Tooltip key={tool.id}>
							<TooltipTrigger asChild>
								<Button
									variant={tool.active ? 'default' : 'ghost'}
									size="icon"
									className={`w-12 h-12 rounded-sm transition-all ${
										tool.active
											? 'bg-primary text-primary-foreground shadow-clay-sm'
											: 'hover:bg-secondary'
									}`}
									onClick={() => {
										if (tool.action) {
											tool.action();
										} else {
											onPanelChange(tool.active ? null : tool.id);
										}
									}}
								>
									<tool.icon className="w-5 h-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="top" className="bg-card border-border">
								<p>{tool.label}</p>
							</TooltipContent>
						</Tooltip>
					))}

					{message.embeds.length > 0 && (
						<>
							<div className="w-px h-8 bg-border mx-1" />
							<div className="flex items-center gap-1">
								{message.embeds.map((embed, index) => (
									<Tooltip key={embed.id}>
										<TooltipTrigger asChild>
											<Button
												variant={
													activePanel === `embed-${index}` ? 'default' : 'ghost'
												}
												size="icon"
												className={`w-10 h-10 rounded-lg transition-all relative ${
													activePanel === `embed-${index}`
														? 'bg-primary text-primary-foreground shadow-clay-sm'
														: 'hover:bg-secondary'
												}`}
												onClick={() =>
													onPanelChange(
														activePanel === `embed-${index}`
															? null
															: `embed-${index}`,
													)
												}
											>
												<LayoutGrid className="w-4 h-4" />
												<span
													className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
													style={{
														backgroundColor: embed.color,
														color: '#fff',
													}}
												>
													{index + 1}
												</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent
											side="top"
											className="bg-card border-border"
										>
											<p>{embed.title || `Embed ${index + 1}`}</p>
										</TooltipContent>
									</Tooltip>
								))}
							</div>
						</>
					)}

					<div className="w-px h-8 bg-border mx-1" />

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="w-12 h-12 rounded-xl hover:bg-secondary"
								onClick={generateJSON}
							>
								{copied ? (
									<Check className="w-5 h-5 text-green-500" />
								) : (
									<Copy className="w-5 h-5" />
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent side="top" className="bg-card border-border">
							<p>{copied ? 'Copiado!' : 'Copiar JSON'}</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="w-12 h-12 rounded-lg hover:bg-destructive/10 hover:text-destructive"
								onClick={clearAll}
							>
								<Trash2 className="w-5 h-5" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="top" className="bg-card border-border">
							<p>Limpar Tudo</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
		</TooltipProvider>
	);
}
