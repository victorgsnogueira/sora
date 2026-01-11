export interface DiscordUser {
	id: string;
	email: string | null;
	avatar: string | null;
	global_name: string | null;
}

export interface AuthTokens {
	accessToken: string;
	user: DiscordUser;
}

export interface AuthService {
	exchangeCodeForToken(code: string): Promise<string>;
	getUserInfo(accessToken: string): Promise<DiscordUser>;
	generateJwt(user: DiscordUser): Promise<string>;
	verifyJwt(token: string): Promise<DiscordUser | null>;
}
