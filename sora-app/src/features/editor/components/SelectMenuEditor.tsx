import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import { Textarea } from '@/shared/components/ui/textarea';
import type { SelectMenu, SelectOption } from '@/types/discord';
import { DEFAULT_SELECT_OPTION } from '@/types/discord';

interface SelectMenuEditorProps {
	selectMenus: SelectMenu[];
	onChange: (selectMenus: SelectMenu[]) => void;
}

export function SelectMenuEditor({
	selectMenus,
	onChange,
}: SelectMenuEditorProps) {
	const addSelectMenu = () => {
		if (selectMenus.length >= 5) return;

		const newSelect: SelectMenu = {
			id: crypto.randomUUID(),
			placeholder: 'Selecione uma opção',
			minValues: 1,
			maxValues: 1,
			disabled: false,
			options: [{ ...DEFAULT_SELECT_OPTION, id: crypto.randomUUID() }],
		};
		onChange([...selectMenus, newSelect]);
	};

	const updateSelectMenu = (index: number, updates: Partial<SelectMenu>) => {
		const newMenus = [...selectMenus];
		newMenus[index] = { ...newMenus[index], ...updates };
		onChange(newMenus);
	};

	const removeSelectMenu = (index: number) => {
		onChange(selectMenus.filter((_, i) => i !== index));
	};

	const addOption = (menuIndex: number) => {
		const menu = selectMenus[menuIndex];
		if (menu.options.length >= 25) return;

		const newOption: SelectOption = {
			...DEFAULT_SELECT_OPTION,
			id: crypto.randomUUID(),
		};
		updateSelectMenu(menuIndex, { options: [...menu.options, newOption] });
	};

	const updateOption = (
		menuIndex: number,
		optionIndex: number,
		updates: Partial<SelectOption>,
	) => {
		const menu = selectMenus[menuIndex];
		const newOptions = [...menu.options];
		newOptions[optionIndex] = { ...newOptions[optionIndex], ...updates };
		updateSelectMenu(menuIndex, { options: newOptions });
	};

	const removeOption = (menuIndex: number, optionIndex: number) => {
		const menu = selectMenus[menuIndex];
		if (menu.options.length === 1) return;
		updateSelectMenu(menuIndex, {
			options: menu.options.filter((_, i) => i !== optionIndex),
		});
	};

	return (
		<div className="space-y-4">
			<p className="text-sm text-muted-foreground">
				Adicione menus de seleção (dropdowns) à sua mensagem. O Discord permite
				até 5 menus de seleção por mensagem.
			</p>

			<Button
				onClick={addSelectMenu}
				variant="outline"
				className="w-full"
				disabled={selectMenus.length >= 5}
			>
				<Plus className="w-4 h-4 mr-2" />
				Adicionar Menu de Seleção ({selectMenus.length}/5)
			</Button>

			{selectMenus.map((menu, menuIndex) => (
				<div
					key={menu.id}
					className="p-3 bg-secondary/50 rounded-lg border border-border space-y-3"
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<GripVertical className="w-4 h-4 text-muted-foreground" />
							<span className="text-sm font-medium">
								Menu de Seleção {menuIndex + 1}
							</span>
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => removeSelectMenu(menuIndex)}
							className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
						>
							<Trash2 className="w-4 h-4" />
						</Button>
					</div>

					<div className="space-y-2">
						<Label className="text-xs">
							Texto de Espaço Reservado (Placeholder)
						</Label>
						<Input
							value={menu.placeholder}
							onChange={(e) =>
								updateSelectMenu(menuIndex, { placeholder: e.target.value })
							}
							placeholder="Selecione uma opção"
							maxLength={150}
						/>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-2">
							<Label className="text-xs">Valores Mínimos</Label>
							<Input
								type="number"
								value={menu.minValues}
								onChange={(e) =>
									updateSelectMenu(menuIndex, {
										minValues: Math.max(
											0,
											Math.min(25, parseInt(e.target.value, 10) || 0),
										),
									})
								}
								min={0}
								max={25}
							/>
						</div>
						<div className="space-y-2">
							<Label className="text-xs">Valores Máximos</Label>
							<Input
								type="number"
								value={menu.maxValues}
								onChange={(e) =>
									updateSelectMenu(menuIndex, {
										maxValues: Math.max(
											1,
											Math.min(25, parseInt(e.target.value, 10) || 1),
										),
									})
								}
								min={1}
								max={25}
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<Label className="text-xs">Desativado</Label>
						<Switch
							checked={menu.disabled}
							onCheckedChange={(checked) =>
								updateSelectMenu(menuIndex, { disabled: checked })
							}
						/>
					</div>

					<div className="pt-2 border-t border-border space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-xs font-medium text-muted-foreground">
								Opções ({menu.options.length}/25)
							</span>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => addOption(menuIndex)}
								disabled={menu.options.length >= 25}
								className="h-7 text-xs"
							>
								<Plus className="w-3 h-3 mr-1" />
								Adicionar Opção
							</Button>
						</div>

						{menu.options.map((option, optionIndex) => (
							<div
								key={option.id}
								className="p-2 bg-muted/50 rounded-lg space-y-2"
							>
								<div className="flex items-center justify-between">
									<span className="text-xs text-muted-foreground">
										Opção {optionIndex + 1}
									</span>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => removeOption(menuIndex, optionIndex)}
										disabled={menu.options.length === 1}
										className="h-6 w-6 text-muted-foreground hover:text-destructive"
									>
										<Trash2 className="w-3 h-3" />
									</Button>
								</div>

								<Input
									value={option.label}
									onChange={(e) =>
										updateOption(menuIndex, optionIndex, {
											label: e.target.value,
										})
									}
									placeholder="Rótulo da opção"
									maxLength={100}
									className="h-8 text-sm"
								/>

								<Input
									value={option.value}
									onChange={(e) =>
										updateOption(menuIndex, optionIndex, {
											value: e.target.value,
										})
									}
									placeholder="Valor da opção"
									maxLength={100}
									className="h-8 text-sm"
								/>

								<Textarea
									value={option.description || ''}
									onChange={(e) =>
										updateOption(menuIndex, optionIndex, {
											description: e.target.value,
										})
									}
									placeholder="Descrição (opcional)"
									maxLength={100}
									className="min-h-[50px] text-sm resize-none"
								/>

								<div className="flex gap-2">
									<Input
										value={option.emoji || ''}
										onChange={(e) =>
											updateOption(menuIndex, optionIndex, {
												emoji: e.target.value,
											})
										}
										placeholder="🎉"
										maxLength={2}
										className="h-8 text-sm w-16"
									/>
									<div className="flex items-center gap-2 flex-1">
										<Switch
											checked={option.default || false}
											onCheckedChange={(checked) =>
												updateOption(menuIndex, optionIndex, {
													default: checked,
												})
											}
										/>
										<Label className="text-xs">Padrão</Label>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			))}

			{selectMenus.length === 0 && (
				<div className="text-center py-6 text-muted-foreground text-sm">
					Nenhum menu de seleção adicionado ainda. Clique em "Adicionar Menu de
					Seleção" para começar.
				</div>
			)}
		</div>
	);
}
