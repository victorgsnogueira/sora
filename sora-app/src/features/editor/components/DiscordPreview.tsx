import { format } from 'date-fns';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import type { MessageConfig } from '@/types/discord';

interface DiscordPreviewProps {
	message: MessageConfig;
}

function parseDiscordMarkdown(text: string): React.ReactNode {
	if (!text) return null;

	const createKey = (prefix: string, content: string, index: number) => {
		const hash = content.split('').reduce((acc, char) => {
			return ((acc << 5) - acc + char.charCodeAt(0)) | 0;
		}, 0);
		return `${prefix}-${Math.abs(hash)}-${index}`;
	};

	const processText = (input: string): React.ReactNode[] => {
		const result: React.ReactNode[] = [];
		const text = input;

		const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
		boldParts.forEach((part, i) => {
			if (part.startsWith('**') && part.endsWith('**')) {
				const content = part.slice(2, -2);
				result.push(
					<strong key={createKey('bold', content, i)}>
						{processItalicAndMore(content)}
					</strong>,
				);
			} else if (part) {
				result.push(...processItalicAndMore(part));
			}
		});

		return result;
	};

	const processItalicAndMore = (input: string): React.ReactNode[] => {
		const result: React.ReactNode[] = [];
		const italicParts = input.split(/(\*[^*]+\*)/g);

		italicParts.forEach((part, i) => {
			if (
				part.startsWith('*') &&
				part.endsWith('*') &&
				!part.startsWith('**')
			) {
				const content = part.slice(1, -1);
				result.push(
					<em key={createKey('italic', content, i)}>
						{processUnderlineAndMore(content)}
					</em>,
				);
			} else if (part) {
				result.push(...processUnderlineAndMore(part));
			}
		});

		return result;
	};

	const processUnderlineAndMore = (input: string): React.ReactNode[] => {
		const result: React.ReactNode[] = [];
		const underlineParts = input.split(/(__[^_]+__)/g);

		underlineParts.forEach((part, i) => {
			if (part.startsWith('__') && part.endsWith('__')) {
				const content = part.slice(2, -2);
				result.push(
					<u key={createKey('underline', content, i)}>
						{processStrikeAndMore(content)}
					</u>,
				);
			} else if (part) {
				result.push(...processStrikeAndMore(part));
			}
		});

		return result;
	};

	const processStrikeAndMore = (input: string): React.ReactNode[] => {
		const result: React.ReactNode[] = [];
		const strikeParts = input.split(/(~~[^~]+~~)/g);

		strikeParts.forEach((part, i) => {
			if (part.startsWith('~~') && part.endsWith('~~')) {
				const content = part.slice(2, -2);
				result.push(
					<del key={createKey('strike', content, i)}>
						{processCodeAndMore(content)}
					</del>,
				);
			} else if (part) {
				result.push(...processCodeAndMore(part));
			}
		});

		return result;
	};

	const processCodeAndMore = (input: string): React.ReactNode[] => {
		const result: React.ReactNode[] = [];
		const codeParts = input.split(/(`[^`]+`)/g);

		codeParts.forEach((part, i) => {
			if (part.startsWith('`') && part.endsWith('`')) {
				const content = part.slice(1, -1);
				result.push(
					<code
						key={createKey('code', content, i)}
						className="bg-discord-light px-1 rounded text-sm"
					>
						{content}
					</code>,
				);
			} else if (part) {
				result.push(...processSpoiler(part));
			}
		});

		return result;
	};

	const processSpoiler = (input: string): React.ReactNode[] => {
		const result: React.ReactNode[] = [];
		const spoilerParts = input.split(/(\|\|[^|]+\|\|)/g);

		spoilerParts.forEach((part, i) => {
			if (part.startsWith('||') && part.endsWith('||')) {
				const content = part.slice(2, -2);
				result.push(
					<button
						key={createKey('spoiler', content, i)}
						type="button"
						className="bg-discord-light text-transparent hover:bg-discord-darker transition-colors rounded px-0.5"
						onClick={(e) => {
							const target = e.currentTarget;
							target.classList.toggle('text-transparent');
							target.classList.toggle('bg-discord-light');
							target.classList.toggle('bg-muted-foreground/20');
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								const target = e.currentTarget;
								target.classList.toggle('text-transparent');
								target.classList.toggle('bg-discord-light');
								target.classList.toggle('bg-muted-foreground/20');
							}
						}}
					>
						{content}
					</button>,
				);
			} else if (part) {
				result.push(part);
			}
		});

		return result;
	};

	return processText(text);
}

export function DiscordPreview({ message }: DiscordPreviewProps) {
	const { bot, content, embeds, components, selectMenus = [] } = message;
	const now = new Date();
	const [openSelectMenu, setOpenSelectMenu] = useState<string | null>(null);

	const getButtonClasses = (style: string, disabled: boolean) => {
		const baseClasses =
			'inline-flex items-center justify-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors min-w-[60px]';
		const disabledClasses = disabled
			? 'opacity-50 cursor-not-allowed'
			: 'cursor-pointer';

		const styleClasses = {
			primary: 'bg-[#5865F2] text-white hover:bg-[#4752C4]',
			secondary: 'bg-[#4f545c] text-white hover:bg-[#686d73]',
			success: 'bg-[#3ba55c] text-white hover:bg-[#2d7d46]',
			danger: 'bg-[#ed4245] text-white hover:bg-[#c03537]',
			link: 'bg-[#4f545c] text-white hover:bg-[#686d73]',
		};

		return `${baseClasses} ${styleClasses[style as keyof typeof styleClasses] || styleClasses.primary} ${disabledClasses}`;
	};

	return (
		<div className="bg-discord-dark min-h-full rounded-2xl overflow-visible">
			<div className="bg-discord-darker px-4 py-3 border-b border-border flex items-center gap-2">
				<span className="text-muted-foreground">#</span>
				<span className="text-foreground font-medium">canal-visualizacao</span>
			</div>

			<div className="p-4">
				<div className="discord-message group animate-slide-in">
					<img
						src={
							bot.avatarUrl || 'https://cdn.discordapp.com/embed/avatars/0.png'
						}
						alt={bot.name}
						className="discord-avatar object-cover"
						onError={(e) => {
							(e.target as HTMLImageElement).src =
								'https://cdn.discordapp.com/embed/avatars/0.png';
						}}
					/>

					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<span className="font-medium text-foreground hover:underline cursor-pointer">
								{bot.name || 'Bot'}
							</span>

							<span className="text-xs text-muted-foreground">
								Hoje às {format(now, 'HH:mm')}
							</span>
						</div>

						{content && (
							<p className="text-foreground whitespace-pre-wrap wrap-break-word">
								{parseDiscordMarkdown(content)}
							</p>
						)}

						{embeds.map((embed) => (
							<div
								key={embed.id}
								className="discord-embed"
								style={{ '--embed-color': embed.color } as React.CSSProperties}
							>
								<div className="p-4">
									{(embed.author.name || embed.author.iconUrl) && (
										<div className="flex items-center gap-2 mb-2">
											{embed.author.iconUrl && (
												<img
													src={embed.author.iconUrl}
													alt=""
													className="w-6 h-6 rounded-full"
													onError={(e) => {
														(e.target as HTMLImageElement).style.display =
															'none';
													}}
												/>
											)}
											{embed.author.url ? (
												<a
													href={embed.author.url}
													className="text-sm font-medium text-foreground hover:underline"
													target="_blank"
													rel="noopener noreferrer"
												>
													{embed.author.name}
												</a>
											) : (
												<span className="text-sm font-medium text-foreground">
													{embed.author.name}
												</span>
											)}
										</div>
									)}

									<div className="flex gap-4">
										<div className="flex-1 min-w-0">
											{embed.title &&
												(embed.url ? (
													<a
														href={embed.url}
														className="text-primary font-semibold hover:underline block mb-2"
														target="_blank"
														rel="noopener noreferrer"
													>
														{embed.title}
													</a>
												) : (
													<h3 className="font-semibold text-foreground mb-2">
														{embed.title}
													</h3>
												))}

											{embed.description && (
												<p className="text-sm text-secondary-foreground whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere mb-3">
													{parseDiscordMarkdown(embed.description)}
												</p>
											)}

											{embed.fields.length > 0 && (
												<div className="flex flex-wrap gap-2 mb-3">
													{embed.fields.map((field) => (
														<div
															key={field.id}
															className={
																field.inline ? 'flex-1 min-w-[30%]' : 'w-full'
															}
														>
															<div className="text-sm font-semibold text-foreground">
																{field.name}
															</div>
															<div className="text-sm text-secondary-foreground whitespace-pre-wrap">
																{parseDiscordMarkdown(field.value)}
															</div>
														</div>
													))}
												</div>
											)}
										</div>

										{embed.thumbnail && (
											<img
												src={embed.thumbnail}
												alt=""
												className="w-20 h-20 rounded object-cover shrink-0"
												onError={(e) => {
													(e.target as HTMLImageElement).style.display = 'none';
												}}
											/>
										)}
									</div>

									{embed.image && (
										<img
											src={embed.image}
											alt=""
											className="max-w-full rounded mt-2"
											onError={(e) => {
												(e.target as HTMLImageElement).style.display = 'none';
											}}
										/>
									)}

									{(embed.footer.text || embed.timestamp) && (
										<div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
											{embed.footer.iconUrl && (
												<img
													src={embed.footer.iconUrl}
													alt=""
													className="w-5 h-5 rounded-full"
													onError={(e) => {
														(e.target as HTMLImageElement).style.display =
															'none';
													}}
												/>
											)}
											{embed.footer.text && <span>{embed.footer.text}</span>}
											{embed.footer.text && embed.timestamp && <span>•</span>}
											{embed.timestamp && (
												<span>
													{format(
														new Date(embed.timestamp),
														"dd/MM/yyyy 'às' HH:mm",
													)}
												</span>
											)}
										</div>
									)}
								</div>
							</div>
						))}

						{selectMenus.length > 0 && (
							<div className="mt-2 space-y-1">
								{selectMenus.map((selectMenu) => (
									<div key={selectMenu.id} className="relative">
										<button
											type="button"
											className={`w-full max-w-[400px] flex items-center justify-between px-3 py-[10px] bg-discord-light rounded text-sm text-left transition-colors ${
												selectMenu.disabled
													? 'opacity-50 cursor-not-allowed'
													: 'hover:bg-discord-darker cursor-pointer'
											}`}
											onClick={() => {
												if (!selectMenu.disabled) {
													setOpenSelectMenu(
														openSelectMenu === selectMenu.id
															? null
															: selectMenu.id,
													);
												}
											}}
											disabled={selectMenu.disabled}
										>
											<span className="text-discord-muted">
												{selectMenu.options.find((o) => o.default)?.label ||
													selectMenu.placeholder}
											</span>
											<ChevronDown
												className={`w-5 h-5 text-muted-foreground transition-transform ${
													openSelectMenu === selectMenu.id ? 'rotate-180' : ''
												}`}
											/>
										</button>

										{openSelectMenu === selectMenu.id && (
											<div className="absolute top-full left-0 mt-1 w-full max-w-[400px] bg-discord-light rounded-md shadow-xl z-50 overflow-hidden py-1">
												{selectMenu.options.map((option) => (
													<div
														key={option.id}
														className="px-3 py-2 mx-1 rounded hover:bg-discord-darker cursor-pointer transition-colors"
														onClick={() => setOpenSelectMenu(null)}
														onKeyDown={(e) => {
															if (e.key === 'Enter' || e.key === ' ') {
																e.preventDefault();
																setOpenSelectMenu(null);
															}
														}}
														role="option"
														tabIndex={0}
														aria-selected={option.default}
													>
														<div className="flex items-center gap-2">
															{option.emoji && (
																<span className="text-lg">{option.emoji}</span>
															)}
															<div>
																<div className="text-sm text-discord">
																	{option.label}
																</div>
																{option.description && (
																	<div className="text-xs text-discord-muted">
																		{option.description}
																	</div>
																)}
															</div>
														</div>
													</div>
												))}
											</div>
										)}
									</div>
								))}
							</div>
						)}

						{components.length > 0 && (
							<div className="mt-2 space-y-1">
								{components.map((row) => (
									<div key={row.id} className="flex flex-wrap gap-2">
										{row.buttons.map((button) => (
											<button
												type="button"
												key={button.id}
												className={getButtonClasses(
													button.style,
													button.disabled,
												)}
												disabled={button.disabled}
												onClick={() => {
													if (button.style === 'link' && button.url) {
														window.open(button.url, '_blank');
													}
												}}
											>
												{button.emoji && <span>{button.emoji}</span>}
												{button.label}
												{button.style === 'link' && (
													<ExternalLink className="w-4 h-4 ml-1" />
												)}
											</button>
										))}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
