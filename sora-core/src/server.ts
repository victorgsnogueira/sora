import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import ScalarApiReference from '@scalar/fastify-api-reference';
import { fastify } from 'fastify';
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
	origin: true,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Sora Core',
			description:
				'API REST construída com Fastify para gerenciamento de usuários, compradores e bots de ticket. Responsável por autenticação, configuração de mensagens personalizadas e integração com múltiplas instâncias de bots.',
			version: '1.0.0',
		},
	},
	transform: jsonSchemaTransform,
});

app.register(ScalarApiReference, {
	routePrefix: '/docs',
});

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
	console.log(`Server running on http://localhost:3333`);
	console.log(`Docs avaliable at http://localhost:3333/docs`);
});
