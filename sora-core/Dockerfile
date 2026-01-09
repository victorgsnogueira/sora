FROM node:20-alpine

WORKDIR /app

# Dependências
COPY package*.json ./
RUN npm install

# Prisma
COPY src/infrastructure/database/prisma ./src/infrastructure/database/prisma
RUN npx prisma generate

# Código
COPY src ./src
COPY tsconfig.json ./

# Build
RUN npm run build

EXPOSE 3333

CMD ["node", "dist/server.js"]