import * as React from 'react';
import { Head } from '@inertiajs/react';
import { Bell, Search } from 'lucide-react';
import { AdminSidebar } from '@/components/admin-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TooltipProvider } from '@/components/ui/tooltip';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
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
                            {/* Notification Bell */}
                            <button className="relative p-2 text-muted-foreground transition-colors hover:text-foreground">
                                <Bell className="size-5" />
                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
                            </button>

                            {/* User Info */}
                            <div className="flex items-center gap-3 border-l border-border pl-4">
                                <div className="hidden text-right sm:block">
                                    <p className="text-sm font-semibold text-foreground">Jane Doe</p>
                                    <p className="text-xs text-muted-foreground">Premium Account</p>
                                </div>
                                <Avatar className="h-9 w-9 border-2 border-[#b4c5ff]">
                                    <AvatarImage
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpBhAhzfZByqnP-3LMETetRQEQq0nSfHD5wm1bMarbBbPGyrvTSozG2DxZCUp3uPhOsv9iUZ2gcC0hUqBbnzZ7yg1Vkkd8yZUWDKQXhgulNwa10GL5Uu6JNZUGPAXBOB2FggNPSuCz6pJJ3c-2EwyBsflL4OAVcNXp9hEJh1saFWfCJRmb382kwZRf7oDVnmSiY0P3BqSqMrrKKa4hXJ46dm81sJ5lMLYy--y8-0vlizB4SUZ7c7DJ8A"
                                        alt="Jane Doe"
                                    />
                                    <AvatarFallback className="bg-[#dbe1ff] text-[#004ac6] font-bold">
                                        JD
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
