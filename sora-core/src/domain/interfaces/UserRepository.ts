import type { User } from '@prisma/client';

export interface CreateUserData {
	discordId: string;	
	email: string | null;
	avatar: string | null;
	globalName: string | null;
}

export interface UserRepository {
	findByDiscordId(discordId: string): Promise<User | null>;
	upsert(data: CreateUserData): Promise<User>;
}
