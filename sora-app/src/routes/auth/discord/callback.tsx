import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { exchangeCodeForToken } from '@/features/auth/services/auth-service';

export const Route = createFileRoute('/auth/discord/callback')({
	component: AuthCallback,
});

function AuthCallback() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const hasProcessedRef = useRef(false);

	useEffect(() => {
		async function handleCallback() {
			if (hasProcessedRef.current) {
				return;
			}
			hasProcessedRef.current = true;

			const urlParams = new URLSearchParams(window.location.search);
			const code = urlParams.get('code');

			if (!code) {
				setError('Código de autorização não encontrado');
				return;
			}

			try {
				const { token, user } = await exchangeCodeForToken(code);
				login(token, user);
				navigate({ to: '/dashboard' });
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Falha na autenticação');
			}
		}

		handleCallback();
	}, [login, navigate]);

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-red-500 mb-4">
						Erro na autenticação
					</h1>
					<p className="text-gray-400 mb-6">{error}</p>
					<a
						href="/"
						className="px-6 py-3 bg-[#5865F2] rounded-xl text-white font-semibold hover:bg-[#4752c4] transition-colors"
					>
						Voltar ao início
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
			<div className="text-center">
				<div className="animate-spin w-12 h-12 border-4 border-[#5865F2] border-t-transparent rounded-full mx-auto mb-4" />
				<p className="text-gray-400">Autenticando...</p>
			</div>
		</div>
	);
}
