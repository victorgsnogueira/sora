import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { AuthServiceImpl } from '../../domain/services/AuthServiceImpl.js';
import { UserRepositoryImpl } from '../../infrastructure/database/repositories/UserRepositoryImpl.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const authService = new AuthServiceImpl();
const userRepository = new UserRepositoryImpl();

const callbackQuerySchema = z.object({
	code: z.string(),
});

const authResponseSchema = z.object({
	token: z.string(),
	user: z.object({
		discordId: z.string(),
		email: z.string().nullable(),
		avatar: z.string().nullable(),
		globalName: z.string().nullable(),
	}),
});

const errorResponseSchema = z.object({
	error: z.string(),
});

const meResponseSchema = z.object({
	discordId: z.string(),
	email: z.string().nullable(),
	avatar: z.string().nullable(),
	globalName: z.string().nullable(),
});

export async function authRoutes(app: FastifyInstance) {
	app.get(
		'/api/auth/discord/callback',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Callback do Discord OAuth2',
				description:
					'Recebe o code do Discord, troca por token, cria/atualiza usuário e retorna JWT',
				querystring: callbackQuerySchema,
				response: {
					200: authResponseSchema,
					400: errorResponseSchema,
				},
			},
		},
		async (request, reply) => {
			const { code } = callbackQuerySchema.parse(request.query);

			try {
				const accessToken = await authService.exchangeCodeForToken(code);
				const discordUser = await authService.getUserInfo(accessToken);

				const user = await userRepository.upsert({
					discordId: discordUser.id,
					email: discordUser.email,
					avatar: discordUser.avatar,
					globalName: discordUser.global_name,
				});

				const token = await authService.generateJwt(discordUser);

				return reply.send({
					token,
					user: {
						discordId: user.discordId,
						email: user.email,
						avatar: user.avatar,
						globalName: user.globalName,
					},
				});
			} catch (error) {
				console.error('Auth error:', error);
				return reply.status(400).send({
					error: 'Falha na autenticação com o Discord',
				});
			}
		},
	);

	app.get(
		'/api/auth/me',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Retorna usuário autenticado',
				description: 'Valida o JWT e retorna os dados do usuário logado',
				security: [{ bearerAuth: [] }],
				response: {
					200: meResponseSchema,
					401: errorResponseSchema,
					404: errorResponseSchema,
				},
			},
			preHandler: authMiddleware,
		},
		async (request, reply) => {
			const discordUser = request.user;

			if (!discordUser) {
				return reply.status(401).send({ error: 'Não autenticado' });
			}

			const user = await userRepository.findByDiscordId(discordUser.id);

			if (!user) {
				return reply.status(404).send({ error: 'Usuário não encontrado' });
			}

			return reply.send({
				discordId: user.discordId,
				email: user.email,
				avatar: user.avatar,
				globalName: user.globalName,
			});
		},
	);
}
