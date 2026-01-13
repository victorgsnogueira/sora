import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select';
import { Switch } from '@/shared/components/ui/switch';
import type { ActionButton } from '@/types/discord';
import { type ActionRow, DEFAULT_BUTTON } from '@/types/discord';

interface ButtonEditorProps {
	components: ActionRow[];
	onChange: (components: ActionRow[]) => void;
}

export function ButtonEditor({ components, onChange }: ButtonEditorProps) {
	const addButton = () => {
		const newButton: ActionButton = {
			...DEFAULT_BUTTON,
			id: crypto.randomUUID(),
		};

		if (components.length === 0) {
			onChange([{ id: crypto.randomUUID(), buttons: [newButton] }]);
		} else {
			const firstRow = components[0];
			if (firstRow.buttons.length < 5) {
				const updatedRow = {
					...firstRow,
					buttons: [...firstRow.buttons, newButton],
				};
				onChange([updatedRow, ...components.slice(1)]);
			} else if (components.length < 5) {
				onChange([
					...components,
					{ id: crypto.randomUUID(), buttons: [newButton] },
				]);
			}
		}
	};

	const updateButton = (
		rowIndex: number,
		buttonIndex: number,
		updates: Partial<ActionButton>,
	) => {
		const newComponents = [...components];
		newComponents[rowIndex] = {
			...newComponents[rowIndex],
			buttons: newComponents[rowIndex].buttons.map((btn, i) =>
				i === buttonIndex ? { ...btn, ...updates } : btn,
			),
		};
		onChange(newComponents);
	};

	const removeButton = (rowIndex: number, buttonIndex: number) => {
		const newComponents = [...components];
		const row = newComponents[rowIndex];

		if (row.buttons.length === 1) {
			onChange(components.filter((_, i) => i !== rowIndex));
		} else {
			newComponents[rowIndex] = {
				...row,
				buttons: row.buttons.filter((_, i) => i !== buttonIndex),
			};
			onChange(newComponents);
		}
	};

	const totalButtons = components.reduce(
		(sum, row) => sum + row.buttons.length,
		0,
	);

	const BUTTON_STYLES_ARRAY = [
		{ style: 'primary', label: 'Primário', color: '#5865F2' },
		{ style: 'secondary', label: 'Secundário', color: '#4f545c' },
		{ style: 'success', label: 'Sucesso', color: '#3ba55c' },
		{ style: 'danger', label: 'Perigo', color: '#ed4245' },
		{ style: 'link', label: 'Link', color: '#00a8fc' },
	] as const;

	return (
		<div className="space-y-4">
			<p className="text-sm text-muted-foreground">
				Adicione botões interativos à sua mensagem. O Discord permite até 5
				botões por linha e 5 linhas no total.
			</p>

			<Button
				onClick={addButton}
				variant="outline"
				className="w-full"
				disabled={totalButtons >= 25}
			>
				<Plus className="w-4 h-4 mr-2" />
				Adicionar Botão ({totalButtons}/25)
			</Button>

			{components.map((row, rowIndex) => (
				<div key={row.id} className="space-y-3">
					<div className="text-xs text-muted-foreground font-medium">
						Linha {rowIndex + 1}
					</div>

					{row.buttons.map((button, buttonIndex) => (
						<div
							key={button.id}
							className="p-3 bg-secondary/50 rounded-lg border border-border space-y-3"
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<GripVertical className="w-4 h-4 text-muted-foreground" />
									<span className="text-sm font-medium">
										Botão {buttonIndex + 1}
									</span>
								</div>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => removeButton(rowIndex, buttonIndex)}
									className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</div>

							<div className="grid gap-3">
								<div className="space-y-2">
									<Label className="text-xs">Rótulo</Label>
									<Input
										value={button.label}
										onChange={(e) =>
											updateButton(rowIndex, buttonIndex, {
												label: e.target.value,
											})
										}
										placeholder="Texto do botão"
										maxLength={80}
									/>
								</div>

								<div className="space-y-2">
									<Label className="text-xs">Estilo</Label>
									<Select
										value={button.style}
										onValueChange={(value) =>
											updateButton(rowIndex, buttonIndex, {
												style: value as ActionButton['style'],
												url: value === 'link' ? button.url || '' : undefined,
											})
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{BUTTON_STYLES_ARRAY.map((style) => (
												<SelectItem key={style.style} value={style.style}>
													<div className="flex items-center gap-2">
														<div
															className="w-3 h-3 rounded-sm"
															style={{ backgroundColor: style.color }}
														/>
														{style.label}
													</div>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								{button.style === 'link' && (
									<div className="space-y-2">
										<Label className="text-xs">URL</Label>
										<Input
											value={button.url || ''}
											onChange={(e) =>
												updateButton(rowIndex, buttonIndex, {
													url: e.target.value,
												})
											}
											placeholder="https://example.com"
											type="url"
										/>
									</div>
								)}

								<div className="space-y-2">
									<Label className="text-xs">Emoji (opcional)</Label>
									<Input
										value={button.emoji || ''}
										onChange={(e) =>
											updateButton(rowIndex, buttonIndex, {
												emoji: e.target.value,
											})
										}
										placeholder="🎉"
										maxLength={2}
									/>
								</div>

								<div className="flex items-center justify-between">
									<Label className="text-xs">Desativado</Label>
									<Switch
										checked={button.disabled}
										onCheckedChange={(checked) =>
											updateButton(rowIndex, buttonIndex, {
												disabled: checked,
											})
										}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			))}

			{components.length === 0 && (
				<div className="text-center py-6 text-muted-foreground text-sm">
					Nenhum botão adicionado ainda. Clique em "Adicionar Botão" para
					começar.
				</div>
			)}
		</div>
	);
}
