import * as React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
    { title: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    { title: 'CV Matcher', href: '/admin/cv-matcher', icon: FileText, exact: false },
    { title: 'Interview Coach', href: '/admin/interview', icon: Brain, exact: false },
    { title: 'History', href: '/admin/history', icon: History, exact: false },
];

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { url } = usePage();
    const [logoutOpen, setLogoutOpen] = React.useState(false);

    const handleLogout = async () => {
        setLogoutOpen(false);
        const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';
        await fetch('/auth/logout', {
            method: 'POST',
            headers: { 'X-CSRF-TOKEN': token },
        });
        window.location.href = '/';
    };

    return (
        <>
            <Sidebar collapsible="icon" style={{'--sidebar-accent': 'color-mix(in srgb, #2563eb 12%, transparent)', '--sidebar-accent-foreground': '#004ac6'} as React.CSSProperties} {...props}>
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
                    <SidebarMenu className="gap-1.5 px-2 py-3">
                        {navItems.map((item) => {
                            const isActive = item.exact
                                ? url === item.href
                                : url === item.href || url.startsWith(item.href + '/');
                            return (
                                <SidebarMenuItem key={item.href} className="relative">
                                    {isActive && (
                                        <span className="absolute right-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-l-full bg-[#2563eb]" />
                                    )}
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                        tooltip={item.title}
                                        className={cn(
                                            'h-12 rounded-xl px-3 text-[15px] font-medium transition-all [&_svg]:size-5',
                                            isActive
                                                ? '!bg-[#2563eb]/15 font-bold !text-[#004ac6] hover:!bg-[#2563eb]/15 hover:!text-[#004ac6] [&_svg]:!text-[#2563eb]'
                                                : 'text-muted-foreground hover:!bg-[#2563eb]/10 hover:!text-[#004ac6]',
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

                    <SidebarMenu className="gap-1.5 px-2 py-3">
                        {[{ title: 'Settings', href: '/admin/settings', icon: Settings }].map((item) => {
                            const isActive = url === item.href || url.startsWith(item.href + '/');
                            return (
                                <SidebarMenuItem key={item.href} className="relative">
                                    {isActive && (
                                        <span className="absolute right-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-l-full bg-[#2563eb]" />
                                    )}
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                        tooltip={item.title}
                                        className={cn(
                                            'h-12 rounded-xl px-3 text-[15px] font-medium transition-all [&_svg]:size-5',
                                            isActive
                                                ? '!bg-[#2563eb]/15 font-bold !text-[#004ac6] hover:!bg-[#2563eb]/15 hover:!text-[#004ac6] [&_svg]:!text-[#2563eb]'
                                                : 'text-muted-foreground hover:!bg-[#2563eb]/10 hover:!text-[#004ac6]',
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

                        {/* Log Out — opens dialog */}
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Log Out"
                                onClick={() => setLogoutOpen(true)}
                                className="h-12 cursor-pointer rounded-xl px-3 text-[15px] font-medium text-destructive hover:bg-destructive/10 hover:text-destructive [&_svg]:size-5"
                            >
                                <LogOut />
                                <span>Log Out</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>

                <SidebarRail />
            </Sidebar>

            {/* Logout Confirmation Dialog */}
            <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
                <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                        <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-destructive/10">
                            <LogOut className="size-6 text-destructive" />
                        </div>
                        <DialogTitle className="text-center text-xl font-bold">
                            Log Out?
                        </DialogTitle>
                        <DialogDescription className="text-center text-sm">
                            Are you sure you want to log out of SkillSync AI? Your session will be ended and you'll be redirected to the home page.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-2 flex-col gap-2 sm:flex-row">
                        <Button
                            variant="outline"
                            className="flex-1 rounded-xl"
                            onClick={() => setLogoutOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-1 rounded-xl bg-destructive text-white hover:bg-destructive/90"
                            onClick={handleLogout}
                        >
                            Yes, Log Out
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
