import type { FastifyRequest, FastifyReply } from 'fastify';
import { AuthServiceImpl } from '../../domain/services/AuthServiceImpl.js';

const authService = new AuthServiceImpl();

export async function authMiddleware(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const authHeader = request.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return reply.status(401).send({ error: 'Token não fornecido' });
	}

	const token = authHeader.substring(7);
	const user = await authService.verifyJwt(token);

	if (!user) {
		return reply.status(401).send({ error: 'Token inválido ou expirado' });
	}

	request.user = user;
}
