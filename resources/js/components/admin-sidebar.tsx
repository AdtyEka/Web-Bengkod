import * as React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, FileText, Brain, History, Settings, LogOut, Sparkles } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
    { title: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    { title: 'CV Matcher', href: '/admin/cv-matcher', icon: FileText, exact: false },
    { title: 'Interview Coach', href: '/admin/interview', icon: Brain, exact: false },
    { title: 'History', href: '/admin/history', icon: History, exact: false },
];

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { url } = usePage();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link href="/admin">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#004ac6] text-white">
                                    <Sparkles className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0 leading-none">
                                    <span className="font-bold text-[#004ac6]">SkillSync AI</span>
                                    <span className="text-xs text-muted-foreground">Premium Account</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu className="gap-1 px-2 py-3">
                    {navItems.map((item) => {
                        const isActive = item.exact
                            ? url === item.href
                            : url === item.href || url.startsWith(item.href + '/');
                        return (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    tooltip={item.title}
                                    className={cn(
                                        'h-11 rounded-xl px-3 text-[15px] font-medium transition-all [&_svg]:size-5',
                                        isActive
                                            ? 'bg-[#2563eb] text-white hover:bg-[#2563eb] hover:text-white'
                                            : 'hover:bg-[#2563eb]/10 hover:text-[#004ac6]',
                                    )}
                                >
                                    <Link href={item.href}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>

                <SidebarSeparator />

                <SidebarMenu className="gap-1 px-2 py-3">
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            tooltip="Settings"
                            className="h-11 rounded-xl px-3 text-[15px] font-medium [&_svg]:size-5 hover:bg-[#2563eb]/10 hover:text-[#004ac6]"
                        >
                            <Link href="/admin/settings">
                                <Settings />
                                <span>Settings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            tooltip="Log Out"
                            className="h-11 rounded-xl px-3 text-[15px] font-medium text-destructive hover:bg-destructive/10 hover:text-destructive [&_svg]:size-5"
                        >
                            <Link href="/logout" method="post" as="button">
                                <LogOut />
                                <span>Log Out</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}
