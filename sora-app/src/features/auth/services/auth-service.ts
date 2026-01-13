export interface AuthUser {
	discordId: string;
	email: string | null;
	avatar: string | null;
	globalName: string | null;
}

export interface AuthResponse {
	token: string;
	user: AuthUser;
}

const API_URL = import.meta.env.VITE_API_URL;

export async function exchangeCodeForToken(
	code: string,
): Promise<AuthResponse> {
	const response = await fetch(
		`${API_URL}/api/auth/discord/callback?code=${code}`,
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Falha na autenticação');
	}

	return response.json();
}

export async function getAuthenticatedUser(token: string): Promise<AuthUser> {
	const response = await fetch(`${API_URL}/api/auth/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error('Não autenticado');
	}

	return response.json();
}

const TOKEN_KEY = 'sora_auth_token';

export function saveToken(token: string): void {
	localStorage.setItem(TOKEN_KEY, token);
}

export function getStoredToken(): string | null {
	return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
	localStorage.removeItem(TOKEN_KEY);
}
