import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { MessageSquare } from 'lucide-react';
import { CharacterCounter } from '@/shared/components/CharacterCounter';

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
			<div className="flex items-center gap-3 mb-4">
				<div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shadow-clay-sm">
					<MessageSquare className="w-5 h-5 text-primary" />
				</div>
				<div>
					<h3 className="font-semibold text-foreground">Message Content</h3>
					<p className="text-xs text-muted-foreground">
						The main text of your message
					</p>
				</div>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label className="text-sm text-muted-foreground">Message Text</Label>
					<CharacterCounter current={content.length} max={2000} />
				</div>
				<Textarea
					value={content}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Write your message here..."
					className="min-h-[200px] resize-none"
					maxLength={2000}
				/>
			</div>

			<div className="p-3 rounded-xl bg-secondary/50 space-y-2">
				<p className="text-xs font-medium text-foreground">
					Formatting Tips (works in preview!)
				</p>
				<div className="text-xs text-muted-foreground space-y-1">
					<p>
						<code className="bg-muted px-1 rounded">**bold**</code> →{' '}
						<strong>bold</strong>
					</p>
					<p>
						<code className="bg-muted px-1 rounded">*italic*</code> →{' '}
						<em>italic</em>
					</p>
					<p>
						<code className="bg-muted px-1 rounded">__underline__</code> →{' '}
						<u>underline</u>
					</p>
					<p>
						<code className="bg-muted px-1 rounded">~~strikethrough~~</code> →{' '}
						<del>strikethrough</del>
					</p>
					<p>
						<code className="bg-muted px-1 rounded">`code`</code> →{' '}
						<code className="bg-muted px-1 rounded">code</code>
					</p>
					<p>
						<code className="bg-muted px-1 rounded">||spoiler||</code> → click
						to reveal
					</p>
				</div>
			</div>
		</div>
	);
}
