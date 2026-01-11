import { jwtVerify, SignJWT } from 'jose';
import { env } from '../../infrastructure/config/env.js';
import type { AuthService, DiscordUser } from '../interfaces/AuthService.js';

export class AuthServiceImpl implements AuthService {
	private readonly jwtSecret: Uint8Array;

	constructor() {
		this.jwtSecret = new TextEncoder().encode(env.JWT_SECRET);
	}

	async exchangeCodeForToken(code: string): Promise<string> {
		const response = await fetch('https://discord.com/api/oauth2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				client_id: env.DISCORD_CLIENT_ID,
				client_secret: env.DISCORD_CLIENT_SECRET,
				grant_type: 'authorization_code',
				code,
				redirect_uri: `${env.FRONTEND_URL}/auth/discord/callback`,
			}),
		});

		if (!response.ok) {
			const error = await response.text();
			throw new Error(`Failed to exchange code: ${error}`);
		}

		const data = (await response.json()) as { access_token: string };
		return data.access_token;
	}

	async getUserInfo(accessToken: string): Promise<DiscordUser> {
		const response = await fetch('https://discord.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw new Error('Failed to get user info from Discord');
		}

		return response.json() as Promise<DiscordUser>;
	}

	async generateJwt(user: DiscordUser): Promise<string> {
		return new SignJWT({
			sub: user.id,
			email: user.email,
			avatar: user.avatar,
			globalName: user.global_name,
		})
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime('7d')
			.sign(this.jwtSecret);
	}

	async verifyJwt(token: string): Promise<DiscordUser | null> {
		try {
			const { payload } = await jwtVerify(token, this.jwtSecret);
			return {
				id: payload.sub as string,
				email: payload.email as string | null,
				avatar: payload.avatar as string | null,
				global_name: payload.globalName as string | null,
			};
		} catch {
			return null;
		}
	}
}
