export interface BotConfig {
	name: string;
	avatarUrl: string;
}

export interface EmbedAuthor {
	name: string;
	iconUrl: string;
	url: string;
}

export interface EmbedFooter {
	text: string;
	iconUrl: string;
}

export interface EmbedField {
	id: string;
	name: string;
	value: string;
	inline: boolean;
}

export interface Embed {
	id: string;
	title: string;
	description: string;
	url: string;
	color: string;
	author: EmbedAuthor;
	thumbnail: string;
	image: string;
	footer: EmbedFooter;
	fields: EmbedField[];
	timestamp?: string;
}

export interface ActionButton {
	id: string;
	style: 'primary' | 'secondary' | 'success' | 'danger' | 'link';
	label: string;
	url?: string;
	emoji?: string;
	disabled: boolean;
}

export interface ActionRow {
	id: string;
	buttons: ActionButton[];
}

export interface SelectOption {
	id: string;
	label: string;
	value: string;
	description?: string;
	emoji?: string;
	default?: boolean;
}

export interface SelectMenu {
	id: string;
	placeholder: string;
	minValues: number;
	maxValues: number;
	disabled: boolean;
	options: SelectOption[];
}

export interface MessageConfig {
	bot: BotConfig;
	content: string;
	embeds: Embed[];
	components: ActionRow[];
	selectMenus: SelectMenu[];
}

export const DEFAULT_BOT: BotConfig = {
	name: 'Sora Bot',
	avatarUrl: 'https://cdn.discordapp.com/embed/avatars/0.png',
};

export const DEFAULT_EMBED: Embed = {
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

export const DEFAULT_BUTTON: ActionButton = {
	id: crypto.randomUUID(),
	style: 'primary',
	label: 'Button',
	disabled: false,
};

export const DEFAULT_SELECT_OPTION: SelectOption = {
	id: crypto.randomUUID(),
	label: 'Option',
	value: 'option_value',
};

export const DEFAULT_MESSAGE: MessageConfig = {
	bot: DEFAULT_BOT,
	content: 'Olá! Esta é uma prévia da mensagem do seu bot.',
	embeds: [],
	components: [],
	selectMenus: [],
};

export const BUTTON_STYLES = [
	{ style: 'primary', label: 'Primary', color: '#5865F2' },
	{ style: 'secondary', label: 'Secondary', color: '#4f545c' },
	{ style: 'success', label: 'Success', color: '#3ba55c' },
	{ style: 'danger', label: 'Danger', color: '#ed4245' },
	{ style: 'link', label: 'Link', color: '#00a8fc' },
] as const;

export const PRESET_COLORS = [
	{ name: 'Blurple', value: '#5865F2' },
	{ name: 'Green', value: '#3ba55c' },
	{ name: 'Yellow', value: '#fee75c' },
	{ name: 'Fuchsia', value: '#eb459e' },
	{ name: 'Red', value: '#ed4245' },
	{ name: 'White', value: '#ffffff' },
	{ name: 'Black', value: '#23272a' },
] as const;
