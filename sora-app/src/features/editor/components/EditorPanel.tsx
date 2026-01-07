import type {
	MessageConfig,
	BotConfig,
	Embed,
	ActionRow,
	SelectMenu,
} from '@/types/discord';
import { Button } from '@/shared/components/ui/button';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { X } from 'lucide-react';
import { BotEditor } from './BotEditor';
import { MessageContentEditor } from './MessageContentEditor';
import { EmbedEditor } from './EmbedEditor';
import { ButtonEditor } from './ButtonEditor';
import { SelectMenuEditor } from './SelectMenuEditor';

interface EditorPanelProps {
	message: MessageConfig;
	onChange: (message: MessageConfig) => void;
	activePanel: string | null;
	onClose: () => void;
}

export function EditorPanel({
	message,
	onChange,
	activePanel,
	onClose,
}: EditorPanelProps) {
	if (!activePanel) return null;

	const updateBot = (bot: BotConfig) => {
		onChange({ ...message, bot });
	};

	const updateContent = (content: string) => {
		onChange({ ...message, content });
	};

	const updateEmbed = (index: number, embed: Embed) => {
		const newEmbeds = [...message.embeds];
		newEmbeds[index] = embed;
		onChange({ ...message, embeds: newEmbeds });
	};

	const removeEmbed = (index: number) => {
		onChange({
			...message,
			embeds: message.embeds.filter((_, i) => i !== index),
		});
		onClose();
	};

	const updateComponents = (components: ActionRow[]) => {
		onChange({ ...message, components });
	};

	const updateSelectMenus = (selectMenus: SelectMenu[]) => {
		onChange({ ...message, selectMenus });
	};

	const getPanelTitle = () => {
		if (activePanel === 'bot') return 'Bot Settings';
		if (activePanel === 'message') return 'Message Content';
		if (activePanel === 'buttons') return 'Buttons';
		if (activePanel === 'selectmenus') return 'Select Menus';
		if (activePanel.startsWith('embed-')) {
			const index = parseInt(activePanel.split('-')[1], 10);
			return `Embed ${index + 1}`;
		}
		return 'Editor';
	};

	const renderContent = () => {
		if (activePanel === 'bot') {
			return <BotEditor bot={message.bot} onChange={updateBot} />;
		}

		if (activePanel === 'message') {
			return (
				<MessageContentEditor
					content={message.content}
					onChange={updateContent}
				/>
			);
		}

		if (activePanel === 'buttons') {
			return (
				<ButtonEditor
					components={message.components}
					onChange={updateComponents}
				/>
			);
		}

		if (activePanel === 'selectmenus') {
			return (
				<SelectMenuEditor
					selectMenus={message.selectMenus}
					onChange={updateSelectMenus}
				/>
			);
		}

		if (activePanel.startsWith('embed-')) {
			const index = parseInt(activePanel.split('-')[1], 10);
			const embed = message.embeds[index];
			if (!embed) return null;

			return (
				<EmbedEditor
					embed={embed}
					onChange={(updated) => updateEmbed(index, updated)}
					onRemove={() => removeEmbed(index)}
					index={index}
				/>
			);
		}

		return null;
	};

	return (
		<div className="fixed top-4 left-4 bottom-20 w-[380px] max-w-[calc(100vw-2rem)] bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-clay z-40 flex flex-col overflow-hidden animate-scale-in">
			<div className="flex items-center justify-between p-4 border-b border-border">
				<h2 className="font-semibold text-foreground">{getPanelTitle()}</h2>
				<Button
					variant="ghost"
					size="icon"
					onClick={onClose}
					className="h-8 w-8 rounded-lg"
				>
					<X className="w-4 h-4" />
				</Button>
			</div>

			<div className="flex-1 overflow-hidden">
				<ScrollArea className="h-full">
					<div className="p-4">{renderContent()}</div>
				</ScrollArea>
			</div>
		</div>
	);
}
