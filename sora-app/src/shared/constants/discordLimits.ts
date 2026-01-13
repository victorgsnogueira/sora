export const DISCORD_LIMITS = {
	MESSAGE_CONTENT: 2000,
	EMBED_TOTAL: 6000,
	EMBEDS_PER_MESSAGE: 10,
	EMBED_TITLE: 256,
	EMBED_DESCRIPTION: 4096,
	EMBED_AUTHOR_NAME: 256,
	EMBED_FOOTER_TEXT: 2048,
	EMBED_FIELDS_MAX_COUNT: 25,
	EMBED_FIELD_NAME: 256,
	EMBED_FIELD_VALUE: 1024,
	SELECT_OPTION_LABEL: 100,
	SELECT_OPTION_DESCRIPTION: 100,
	SELECT_OPTION_VALUE: 100,
} as const;

export function isOverLimit(text: string, limit: number): boolean {
	return text.length > limit;
}

export function getRemainingChars(text: string, limit: number): number {
	return limit - text.length;
}

export function truncateToLimit(text: string, limit: number): string {
	return text.slice(0, limit);
}
