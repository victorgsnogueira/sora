import { Link, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { Bot, Home, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { ThemeModeToggle } from '@/shared/components/ThemeModeToggle';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/shared/components/ui/avatar';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Separator } from '@/shared/components/ui/separator';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
} from '@/shared/components/ui/sidebar';

const navigationItems = [
	{
		label: 'Início',
		path: '/dashboard',
		icon: Home,
	},
	{
		label: 'Editor',
		path: '/dashboard/editor',
		icon: Sparkles,
	},
];

export function DashboardLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	function handleLogout() {
		logout();
		navigate({ to: '/' });
	}

	function getDiscordAvatarUrl() {
		if (user?.avatar && user?.discordId) {
			return `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`;
		}
		return undefined;
	}

	function isRouteActive(path: string) {
		if (path === '/dashboard') {
			return location.pathname === '/dashboard';
		}
		return location.pathname.startsWith(path);
	}

	function getCurrentPageLabel() {
		const currentPath = location.pathname;
		const item = navigationItems.find((item) => {
			if (item.path === '/dashboard') {
				return currentPath === '/dashboard';
			}
			return currentPath.startsWith(item.path);
		});
		return item?.label;
	}

	return (
		<SidebarProvider
			style={
				{
					'--sidebar-width': 'calc(var(--spacing) * 64)',
					'--header-height': 'calc(var(--spacing) * 12)',
				} as React.CSSProperties
			}
		>
			<Sidebar variant="inset" collapsible="icon">
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								asChild
								size="lg"
								className="justify-start group-data-[collapsible=icon]:justify-center"
							>
								<Link to="/dashboard">
									<Bot className="size-7" />
									<span className="font-semibold group-data-[collapsible=icon]:hidden">
										Sora
									</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Navegação</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{navigationItems.map((item) => {
									const Icon = item.icon;
									return (
										<SidebarMenuItem key={item.path}>
											<SidebarMenuButton
												asChild
												isActive={isRouteActive(item.path)}
												tooltip={item.label}
											>
												<Link to={item.path}>
													<Icon />
													<span>{item.label}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarSeparator />
				<SidebarFooter>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								type="button"
								className="w-full flex items-center gap-2 rounded-md border px-2 py-2 text-left hover:bg-accent cursor-pointer group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:hover:bg-transparent"
							>
								<Avatar className="size-7 group-data-[collapsible=icon]:size-9">
									<AvatarImage
										src={getDiscordAvatarUrl()}
										alt={user?.globalName ?? 'Usuário'}
									/>
									<AvatarFallback>
										{user?.globalName?.[0]?.toUpperCase() ?? 'U'}
									</AvatarFallback>
								</Avatar>
								<div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
									<div className="truncate text-sm font-medium">
										{user?.globalName ?? 'Usuário'}
									</div>
									<div className="truncate text-xs text-muted-foreground">
										{user?.email ?? ''}
									</div>
								</div>
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side="right"
							align="start"
							alignOffset={0}
							sideOffset={8}
							collisionPadding={12}
							className="w-64"
						>
							<DropdownMenuLabel>
								<div className="flex items-center gap-2">
									<Avatar className="size-8">
										<AvatarImage
											src={getDiscordAvatarUrl()}
											alt={user?.globalName ?? 'Usuário'}
										/>
										<AvatarFallback>
											{user?.globalName?.[0]?.toUpperCase() ?? 'U'}
										</AvatarFallback>
									</Avatar>
									<div className="min-w-0">
										<div className="text-sm font-medium leading-none truncate">
											{user?.globalName ?? 'Usuário'}
										</div>
										<div className="text-xs text-muted-foreground truncate">
											{user?.email ?? ''}
										</div>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={handleLogout}
								className="cursor-pointer"
							>
								<LogOut className="mr-2 size-4" />
								Sair
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>

			<SidebarInset>
				<header className="flex h-[--header-height] shrink-0 items-center gap-2 border-b px-4 lg:px-6">
					<SidebarTrigger />
					<Separator orientation="vertical" className="mx-1 h-6" />
					<div className="text-sm font-medium flex-1">
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link to="/dashboard">Dashboard</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								{getCurrentPageLabel() &&
									getCurrentPageLabel() !== 'Início' && (
										<>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbPage>{getCurrentPageLabel()}</BreadcrumbPage>
											</BreadcrumbItem>
										</>
									)}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<ThemeModeToggle />
				</header>
				<div className="flex flex-1 flex-col p-4 lg:p-6">
					<div className="@container/main flex flex-1 flex-col gap-4 md:gap-6">
						<Outlet />
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
