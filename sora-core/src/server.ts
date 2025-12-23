import { fastify } from 'fastify';
import { env } from 'process';

const port = env.PORT;

const app = fastify();

app.listen({ port: Number(port), host: '0.0.0.0' }).then(() => {
  console.log(`Server running on http://localhost:${port}`);
});
