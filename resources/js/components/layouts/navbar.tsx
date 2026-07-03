import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900/95">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                <div className="flex items-center gap-8">
                    {/* Brand Link with Logo hover effect */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2 text-2xl font-black tracking-tight text-[#004ac6] dark:text-blue-400"
                    >
                        <span className="bg-linear-to-r from-[#004ac6] to-blue-500 bg-clip-text text-transparent transition-all duration-300 group-hover:opacity-90 dark:from-blue-400 dark:to-blue-300">
                            SkillSync AI
                        </span>
                    </Link>

                    {/* Navigation Links with sliding underline animation */}
                    <div className="hidden gap-8 md:flex">
                        <a
                            className="relative pb-1 text-sm font-semibold text-[#545f73] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#004ac6] after:transition-transform after:duration-300 hover:text-[#004ac6] hover:after:scale-x-100 dark:text-zinc-400 dark:after:bg-blue-400 dark:hover:text-blue-400"
                            href="#features"
                        >
                            Features
                        </a>
                        <a
                            className="relative pb-1 text-sm font-semibold text-[#545f73] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#004ac6] after:transition-transform after:duration-300 hover:text-[#004ac6] hover:after:scale-x-100 dark:text-zinc-400 dark:after:bg-blue-400 dark:hover:text-blue-400"
                            href="#solutions"
                        >
                            Solutions
                        </a>
                        <a
                            className="relative pb-1 text-sm font-semibold text-[#545f73] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#004ac6] after:transition-transform after:duration-300 hover:text-[#004ac6] hover:after:scale-x-100 dark:text-zinc-400 dark:after:bg-blue-400 dark:hover:text-blue-400"
                            href="#pricing"
                        >
                            Pricing
                        </a>
                        <a
                            className="relative pb-1 text-sm font-semibold text-[#545f73] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#004ac6] after:transition-transform after:duration-300 hover:text-[#004ac6] hover:after:scale-x-100 dark:text-zinc-400 dark:after:bg-blue-400 dark:hover:text-blue-400"
                            href="#resources"
                        >
                            Resources
                        </a>
                    </div>
                </div>

                {/* Action Buttons with rich interactive hover states */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        asChild
                        className="hidden rounded-xl font-bold text-[#545f73] transition-all duration-300 hover:scale-105 hover:bg-blue-50/50 hover:text-[#004ac6] active:scale-95 md:inline-flex dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-blue-400"
                    >
                        <Link href="/auth/login">Log In</Link>
                    </Button>
                    <Button asChild className="rounded-xl bg-[#2563eb] px-6 py-6 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-blue-700 hover:shadow-blue-500/25 active:scale-95">
                        <Link href="/auth/register">Register</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
