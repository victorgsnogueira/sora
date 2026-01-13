import { CharacterCounter } from '@/shared/components/CharacterCounter';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';

interface MessageContentEditorProps {
	content: string;
	onChange: (content: string) => void;
}

export function MessageContentEditor({
	content,
	onChange,
}: MessageContentEditorProps) {
	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label className="text-sm text-muted-foreground">
						Texto da Mensagem
					</Label>
					<CharacterCounter current={content.length} max={2000} />
				</div>
				<Textarea
					value={content}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Escreva sua mensagem aqui..."
					className="min-h-[200px] resize-none"
					maxLength={2000}
				/>
			</div>

			<div className="p-3 rounded-xl bg-secondary/50 space-y-2">
				<p className="text-xs font-medium text-foreground">
					Dicas de Formatação (funciona na pré-visualização!)
				</p>
				<div className="text-xs text-muted-foreground space-y-1">
					<p>
						<code className="bg-muted px-1 rounded">**negrito**</code> →{' '}
						<strong>negrito</strong>
					</p>
					<p>
						<code className="bg-muted px-1 rounded">*itálico*</code> →{' '}
						<em>itálico</em>
					</p>
					<p>
						<code className="bg-muted px-1 rounded">__sublinhado__</code> →{' '}
						<u>sublinhado</u>
					</p>
					<p>
						<code className="bg-muted px-1 rounded">~~tachado~~</code> →{' '}
						<del>tachado</del>
					</p>
					<p>
						<code className="bg-muted px-1 rounded">`código`</code> →{' '}
						<code className="bg-muted px-1 rounded">código</code>
					</p>
					<p>
						<code className="bg-muted px-1 rounded">||spoiler||</code> → clique
						para revelar
					</p>
				</div>
			</div>
		</div>
	);
}
