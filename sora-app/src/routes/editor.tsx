import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { DiscordPreview } from '@/features/editor/components/DiscordPreview';
import { EditorPanel } from '@/features/editor/components/EditorPanel';
import { PlaygroundToolbar } from '@/features/editor/components/PlaygroundToolbar';
import type { MessageConfig } from '@/types/discord';
import { DEFAULT_MESSAGE } from '@/types/discord';

export const Route = createFileRoute('/editor')({
	component: EditorPage,
});

function EditorPage() {
	const [message, setMessage] = useState<MessageConfig>(DEFAULT_MESSAGE);
	const [activePanel, setActivePanel] = useState<string | null>(null);

	return (
		<div className="min-h-screen bg-[#36393f] flex flex-col">
			<header className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center px-4 shrink-0">
				<div className="flex items-center gap-2">
					<span className="text-[#8e9297] text-sm font-medium">#</span>
					<span className="text-[#fff] font-semibold">bot-preview</span>
				</div>
			</header>

			<main className="flex-1 flex items-start justify-center overflow-auto p-8 pb-24">
				<div className="w-full max-w-3xl">
					<DiscordPreview message={message} />
				</div>
			</main>

			<EditorPanel
				message={message}
				onChange={setMessage}
				activePanel={activePanel}
				onClose={() => setActivePanel(null)}
			/>

			<PlaygroundToolbar
				message={message}
				onChange={setMessage}
				activePanel={activePanel}
				onPanelChange={setActivePanel}
			/>
		</div>
	);
}
