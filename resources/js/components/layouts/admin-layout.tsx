import * as React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Bell, Search } from 'lucide-react';
import { AdminSidebar } from '@/components/admin-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TooltipProvider } from '@/components/ui/tooltip';

type SharedProps = {
    auth: {
        user: { id: number; name: string; email: string; role: string } | null;
    };
};

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { auth } = usePage<SharedProps>().props;
    const user = auth?.user;
    const displayName = user?.name ?? 'User';
    const initials = getInitials(displayName);
    const roleLabel = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Member';

    return (
        <TooltipProvider>
            {title && <Head title={title} />}
            <SidebarProvider>
                <AdminSidebar />
                <SidebarInset>
                    {/* Top Header */}
                    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 gap-4">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                            />
                            {/* Search */}
                            <div className="hidden md:flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 w-80">
                                <Search className="size-4 text-muted-foreground shrink-0" />
                                <Input
                                    placeholder="Search analytics or documents..."
                                    className="h-auto border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* User Info */}
                             <div className="flex items-center gap-3 border-l border-border pl-4">
                                <div className="hidden text-right sm:block">
                                    <p className="text-sm font-semibold text-foreground">{displayName}</p>
                                    <p className="text-xs text-muted-foreground capitalize">{roleLabel}</p>
                                </div>
                                <Avatar className="h-9 w-9 border-2 border-[#b4c5ff]">
                                    <AvatarFallback className="bg-[#dbe1ff] text-[#004ac6] font-bold">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <div className="flex flex-1 flex-col">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
}
