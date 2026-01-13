import type { DiscordUser } from '../domain/interfaces/AuthService';

declare module 'fastify' {
	interface FastifyRequest {
		user?: DiscordUser;
	}
}
