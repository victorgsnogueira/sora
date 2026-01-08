import {
	FileText,
	Grid3X3,
	GripVertical,
	Image,
	Link,
	Palette,
	Plus,
	Trash2,
	User,
} from 'lucide-react';
import { CharacterCounter } from '@/shared/components/CharacterCounter';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import { Textarea } from '@/shared/components/ui/textarea';
import { DISCORD_LIMITS } from '@/shared/constants/discordLimits';
import type { Embed, EmbedField } from '@/types/discord';

interface EmbedEditorProps {
	embed: Embed;
	onChange: (embed: Embed) => void;
	onRemove: () => void;
	index: number;
}

export function EmbedEditor({
	embed,
	onChange,
	onRemove,
	index,
}: EmbedEditorProps) {
	const addField = () => {
		const newField: EmbedField = {
			id: crypto.randomUUID(),
			name: '',
			value: '',
			inline: false,
		};
		onChange({ ...embed, fields: [...embed.fields, newField] });
	};

	const updateField = (fieldId: string, updates: Partial<EmbedField>) => {
		onChange({
			...embed,
			fields: embed.fields.map((f) =>
				f.id === fieldId ? { ...f, ...updates } : f,
			),
		});
	};

	const removeField = (fieldId: string) => {
		onChange({
			...embed,
			fields: embed.fields.filter((f) => f.id !== fieldId),
		});
	};

	const PRESET_COLORS_ARRAY = [
		{ name: 'Roxo Discord', value: '#5865F2' },
		{ name: 'Verde', value: '#3ba55c' },
		{ name: 'Amarelo', value: '#fee75c' },
		{ name: 'Fúcsia', value: '#eb459e' },
		{ name: 'Vermelho', value: '#ed4245' },
		{ name: 'Branco', value: '#ffffff' },
		{ name: 'Preto', value: '#23272a' },
	] as const;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div
						className="w-3 h-10 rounded-full shadow-clay-sm"
						style={{ backgroundColor: embed.color }}
					/>
					<div>
						<h4 className="font-medium text-foreground">
							{embed.title || `Embed ${index + 1}`}
						</h4>
						<p className="text-xs text-muted-foreground">
							Conteúdo rico incorporado
						</p>
					</div>
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={onRemove}
					className="text-destructive hover:bg-destructive/10 hover:text-destructive"
				>
					<Trash2 className="w-4 h-4 mr-1" />
					Remover
				</Button>
			</div>

			<Accordion type="multiple" className="space-y-2">
				<AccordionItem value="basic" className="border-none">
					<AccordionTrigger className="py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 hover:no-underline">
						<div className="flex items-center gap-2">
							<FileText className="w-4 h-4 text-primary" />
							<span className="text-sm">Informações Básicas</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pt-3 space-y-3">
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label className="text-xs text-muted-foreground">Título</Label>
								<CharacterCounter
									current={embed.title.length}
									max={DISCORD_LIMITS.EMBED_TITLE}
								/>
							</div>
							<Input
								value={embed.title}
								onChange={(e) => onChange({ ...embed, title: e.target.value })}
								placeholder="Título do embed"
								maxLength={DISCORD_LIMITS.EMBED_TITLE}
							/>
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label className="text-xs text-muted-foreground">
									Descrição
								</Label>
								<CharacterCounter
									current={embed.description.length}
									max={DISCORD_LIMITS.EMBED_DESCRIPTION}
								/>
							</div>
							<Textarea
								value={embed.description}
								onChange={(e) =>
									onChange({ ...embed, description: e.target.value })
								}
								placeholder="Descrição do embed (suporta markdown)"
								className="min-h-[80px] resize-none"
								maxLength={DISCORD_LIMITS.EMBED_DESCRIPTION}
							/>
						</div>
						<div className="space-y-2">
							<Label className="text-xs text-muted-foreground">
								URL (torna o título clicável)
							</Label>
							<Input
								value={embed.url}
								onChange={(e) => onChange({ ...embed, url: e.target.value })}
								placeholder="https://example.com"
							/>
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="color" className="border-none">
					<AccordionTrigger className="py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 hover:no-underline">
						<div className="flex items-center gap-2">
							<Palette className="w-4 h-4 text-primary" />
							<span className="text-sm">Cor</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pt-3 space-y-3">
						<div className="flex flex-wrap gap-2">
							{PRESET_COLORS_ARRAY.map((color) => (
								<button
									type="button"
									key={color.value}
									onClick={() => onChange({ ...embed, color: color.value })}
									className={`w-8 h-8 rounded-lg shadow-clay-sm transition-all hover:scale-110 ${
										embed.color === color.value
											? 'ring-2 ring-primary ring-offset-2 ring-offset-card'
											: ''
									}`}
									style={{ backgroundColor: color.value }}
									title={color.name}
								/>
							))}
						</div>
						<div className="flex items-center gap-2">
							<input
								type="color"
								value={embed.color}
								onChange={(e) => onChange({ ...embed, color: e.target.value })}
								className="w-10 h-10 rounded-lg cursor-pointer shadow-clay-sm"
							/>
							<Input
								value={embed.color}
								onChange={(e) => onChange({ ...embed, color: e.target.value })}
								placeholder="#5865F2"
								className="flex-1"
							/>
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="author" className="border-none">
					<AccordionTrigger className="py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 hover:no-underline">
						<div className="flex items-center gap-2">
							<User className="w-4 h-4 text-primary" />
							<span className="text-sm">Autor</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pt-3 space-y-3">
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label className="text-xs text-muted-foreground">
									Nome do Autor
								</Label>
								<CharacterCounter
									current={embed.author.name.length}
									max={DISCORD_LIMITS.EMBED_AUTHOR_NAME}
								/>
							</div>
							<Input
								value={embed.author.name}
								onChange={(e) =>
									onChange({
										...embed,
										author: { ...embed.author, name: e.target.value },
									})
								}
								placeholder="Nome do autor"
								maxLength={DISCORD_LIMITS.EMBED_AUTHOR_NAME}
							/>
						</div>
						<div className="space-y-2">
							<Label className="text-xs text-muted-foreground">
								URL do Ícone do Autor
							</Label>
							<Input
								value={embed.author.iconUrl}
								onChange={(e) =>
									onChange({
										...embed,
										author: { ...embed.author, iconUrl: e.target.value },
									})
								}
								placeholder="https://example.com/icon.png"
							/>
						</div>
						<div className="space-y-2">
							<Label className="text-xs text-muted-foreground">
								URL do Autor
							</Label>
							<Input
								value={embed.author.url}
								onChange={(e) =>
									onChange({
										...embed,
										author: { ...embed.author, url: e.target.value },
									})
								}
								placeholder="https://example.com"
							/>
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="images" className="border-none">
					<AccordionTrigger className="py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 hover:no-underline">
						<div className="flex items-center gap-2">
							<Image className="w-4 h-4 text-primary" />
							<span className="text-sm">Imagens</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pt-3 space-y-3">
						<div className="space-y-2">
							<Label className="text-xs text-muted-foreground">
								URL da Thumbnail (pequena, lado direito)
							</Label>
							<Input
								value={embed.thumbnail}
								onChange={(e) =>
									onChange({ ...embed, thumbnail: e.target.value })
								}
								placeholder="https://example.com/thumbnail.png"
							/>
						</div>
						<div className="space-y-2">
							<Label className="text-xs text-muted-foreground">
								URL da Imagem (grande, parte inferior)
							</Label>
							<Input
								value={embed.image}
								onChange={(e) => onChange({ ...embed, image: e.target.value })}
								placeholder="https://example.com/image.png"
							/>
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="footer" className="border-none">
					<AccordionTrigger className="py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 hover:no-underline">
						<div className="flex items-center gap-2">
							<Link className="w-4 h-4 text-primary" />
							<span className="text-sm">Rodapé</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pt-3 space-y-3">
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label className="text-xs text-muted-foreground">
									Texto do Rodapé
								</Label>
								<CharacterCounter
									current={embed.footer.text.length}
									max={DISCORD_LIMITS.EMBED_FOOTER_TEXT}
								/>
							</div>
							<Input
								value={embed.footer.text}
								onChange={(e) =>
									onChange({
										...embed,
										footer: { ...embed.footer, text: e.target.value },
									})
								}
								placeholder="Texto do rodapé"
								maxLength={DISCORD_LIMITS.EMBED_FOOTER_TEXT}
							/>
						</div>
						<div className="space-y-2">
							<Label className="text-xs text-muted-foreground">
								URL do Ícone do Rodapé
							</Label>
							<Input
								value={embed.footer.iconUrl}
								onChange={(e) =>
									onChange({
										...embed,
										footer: { ...embed.footer, iconUrl: e.target.value },
									})
								}
								placeholder="https://example.com/footer-icon.png"
							/>
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="fields" className="border-none">
					<AccordionTrigger className="py-2 px-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 hover:no-underline">
						<div className="flex items-center gap-2">
							<Grid3X3 className="w-4 h-4 text-primary" />
							<span className="text-sm">Campos ({embed.fields.length})</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="pt-3 space-y-3">
						{embed.fields.map((field, fieldIndex) => (
							<div
								key={field.id}
								className="p-3 rounded-xl bg-muted/50 space-y-2 shadow-inset"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<GripVertical className="w-4 h-4 text-muted-foreground" />
										<span className="text-xs text-muted-foreground">
											Campo {fieldIndex + 1}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<CharacterCounter
											current={field.name.length}
											max={DISCORD_LIMITS.EMBED_FIELD_NAME}
											className="text-[10px]"
										/>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => removeField(field.id)}
											className="w-6 h-6 text-muted-foreground hover:text-destructive"
										>
											<Trash2 className="w-3 h-3" />
										</Button>
									</div>
								</div>
								<Input
									value={field.name}
									onChange={(e) =>
										updateField(field.id, { name: e.target.value })
									}
									placeholder="Nome do campo"
									maxLength={DISCORD_LIMITS.EMBED_FIELD_NAME}
								/>
								<Textarea
									value={field.value}
									onChange={(e) =>
										updateField(field.id, { value: e.target.value })
									}
									placeholder="Valor do campo"
									className="min-h-[60px] resize-none"
									maxLength={DISCORD_LIMITS.EMBED_FIELD_VALUE}
								/>
								<div className="flex items-center gap-2">
									<Switch
										id={`inline-${field.id}`}
										checked={field.inline}
										onCheckedChange={(checked) =>
											updateField(field.id, { inline: checked })
										}
									/>
									<Label
										htmlFor={`inline-${field.id}`}
										className="text-xs text-muted-foreground cursor-pointer"
									>
										Na mesma linha (Inline)
									</Label>
								</div>
							</div>
						))}
						<Button
							variant="outline"
							onClick={addField}
							className="w-full shadow-clay bg-secondary hover:bg-secondary/80"
						>
							<Plus className="w-4 h-4 mr-2" />
							Adicionar Campo
							{embed.fields.length >= DISCORD_LIMITS.EMBED_FIELDS_MAX_COUNT
								? ' (Máx 25)'
								: ''}
						</Button>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
