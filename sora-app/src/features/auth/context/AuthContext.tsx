import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import type { ReactNode } from 'react';
import {
	type AuthUser,
	getAuthenticatedUser,
	getStoredToken,
	removeToken,
	saveToken,
} from '../services/auth-service';

interface AuthContextType {
	user: AuthUser | null;
	token: string | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (token: string, user: AuthUser) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		async function loadStoredAuth() {
			const storedToken = getStoredToken();

			if (storedToken && isMounted) {
				try {
					const user = await getAuthenticatedUser(storedToken);
					if (isMounted) {
						setUser(user);
						setToken(storedToken);
					}
				} catch {
					removeToken();
				}
			}

			if (isMounted) {
				setIsLoading(false);
			}
		}

		loadStoredAuth();

		return () => {
			isMounted = false;
		};
	}, []);

	const login = useCallback((newToken: string, newUser: AuthUser) => {
		saveToken(newToken);
		setToken(newToken);
		setUser(newUser);
	}, []);

	const logout = useCallback(() => {
		removeToken();
		setToken(null);
		setUser(null);
	}, []);

	const value = useMemo(
		() => ({
			user,
			token,
			isLoading,
			isAuthenticated: !!user,
			login,
			logout,
		}),
		[user, token, isLoading, login, logout],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}
