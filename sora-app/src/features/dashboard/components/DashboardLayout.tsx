import { Link, Outlet, useLocation } from '@tanstack/react-router';
import { Bot, Home, Sparkles } from 'lucide-react';
import { ThemeModeToggle } from '@/shared/components/ThemeModeToggle';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb';
import { Separator } from '@/shared/components/ui/separator';
import {
	Sidebar,
	SidebarContent,
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
