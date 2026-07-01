export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200/50 bg-gray-50 transition-colors dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-12 md:flex-row md:py-16">
                <div className="mb-8 text-center md:mb-0 md:text-left">
                    <span className="mb-2 block text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        SkillSync AI
                    </span>
                    <p className="max-w-sm text-sm text-[#545f73] dark:text-zinc-400">
                        © 2024 SkillSync AI. Empowering careers through
                        intelligent precision.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                    <a
                        className="text-sm text-[#545f73] underline underline-offset-4 opacity-80 transition-all hover:text-[#004ac6] hover:opacity-100 dark:text-zinc-400 dark:hover:text-blue-400"
                        href="#"
                    >
                        Privacy Policy
                    </a>
                    <a
                        className="text-sm text-[#545f73] underline underline-offset-4 opacity-80 transition-all hover:text-[#004ac6] hover:opacity-100 dark:text-zinc-400 dark:hover:text-blue-400"
                        href="#"
                    >
                        Terms of Service
                    </a>
                    <a
                        className="text-sm text-[#545f73] underline underline-offset-4 opacity-80 transition-all hover:text-[#004ac6] hover:opacity-100 dark:text-zinc-400 dark:hover:text-blue-400"
                        href="#"
                    >
                        Security
                    </a>
                    <a
                        className="text-sm text-[#545f73] underline underline-offset-4 opacity-80 transition-all hover:text-[#004ac6] hover:opacity-100 dark:text-zinc-400 dark:hover:text-blue-400"
                        href="#"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </footer>
    );
}
