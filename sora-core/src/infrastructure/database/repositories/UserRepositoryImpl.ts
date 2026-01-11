import type { User } from '@prisma/client';
import type {
	CreateUserData,
	UserRepository,
} from '../../../domain/interfaces/UserRepository.js';
import { prisma } from '../prisma.js';

export class UserRepositoryImpl implements UserRepository {
	async findByDiscordId(discordId: string): Promise<User | null> {
		return prisma.user.findUnique({
			where: { discordId },
		});
	}

	async upsert(data: CreateUserData): Promise<User> {
		return prisma.user.upsert({
			where: { discordId: data.discordId },
			update: {
				email: data.email,
				avatar: data.avatar,
				globalName: data.globalName,
			},
			create: {
				discordId: data.discordId,
				email: data.email,
				avatar: data.avatar,
				globalName: data.globalName,
			},
		});
	}
}
