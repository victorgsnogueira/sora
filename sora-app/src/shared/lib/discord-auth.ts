const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI;

export function getDiscordAuthUrl(): string {
	const params = new URLSearchParams({
		client_id: DISCORD_CLIENT_ID,
		redirect_uri: DISCORD_REDIRECT_URI,
		response_type: 'code',
		scope: 'identify email',
	});

	return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

export function redirectToDiscordAuth(): void {
	window.location.href = getDiscordAuthUrl();
}
