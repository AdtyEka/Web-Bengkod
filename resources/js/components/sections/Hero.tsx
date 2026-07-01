import { Button } from '@/components/ui/button';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-blue-50/20 to-transparent pt-16 pb-24 transition-colors dark:from-zinc-950/20">
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 text-center md:flex-row md:text-left">
                <div className="flex-1">
                    <span className="mb-6 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-medium tracking-wider text-[#586377] uppercase dark:bg-blue-950/40 dark:text-blue-300">
                        The AI-Powered Career Platform
                    </span>
                    <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-zinc-900 md:text-6xl dark:text-zinc-50">
                        Master Your Career with Intelligent Precision
                    </h1>
                    <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#545f73] md:text-xl dark:text-zinc-400">
                        SkillSync AI leverages advanced ML to analyze CVs and
                        generative LLMs for realistic interview coaching.
                        Elevate your professional trajectory with data-driven
                        insights.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
                        <Button className="w-full rounded-xl bg-[#2563eb] px-8 py-6 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-500/20 sm:w-auto">
                            Request a Demo
                        </Button>
                        <div className="flex items-center gap-2 px-4 py-2">
                            <div className="flex -space-x-3">
                                <div
                                    className="h-10 w-10 rounded-full border-2 border-white bg-zinc-200 bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBOYCFlnr-rsbkHS2xMQ1Trqb_nkHbffVifQ_15_Pj2Y-BZpMm-FC4Ehgld0_YihnmYyM2n6g23aDrkmKOSmFdzYPXkhDUxCWsnojjfzdjScQX7BK2iBmbzWFWEgodficD_-oDKG1myTKwpgFdzgkvidP469w-AlxQ938gFN91j4XC2JOdNTbsw4_DHKdJqXSaDbTSO1WtkCYkwBctFYV3oYy1KQdfL6gPIa16diEr7yNJentRU44RaiA')",
                                    }}
                                />
                                <div
                                    className="h-10 w-10 rounded-full border-2 border-white bg-zinc-200 bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDblcdNN1b_XWbqypLykGbLsGXyMVYTSx9VBhF49O1LlzJ_Wz8nkl0vndG6ujUd-0xVD3KxZ9d1kUSHgrx0gLp_1vhe9PjluNcDu2lDzDUUkFvRtAXnAzCt-o2bKLuCL6mGN1OvDSzBh23sfQmljTGWVlZeXZlNfmZfGlW8dOMw8AvpTxlp5_68SAzKA9Ddr8XCDnlVrtYTdxbynyluuXkStFdHkdC1brFMX8NqbJKELtqCjQHkOcZ0iQ')",
                                    }}
                                />
                                <div
                                    className="h-10 w-10 rounded-full border-2 border-white bg-zinc-200 bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBKyP9zUH7OcKwc78n0N9o3Mqa3ZQOwhTovUNbCMUAG3ylSpB0XL5pX2UBbYVz6hDRuI05DKhwiYia3yJDNhV5OUfbDji_8hZPfua1RCBzkt3AWXo7Ht-XY0pPKNrPULRyqpgyket8DVZ-hF5-lVtvMKccH2u971CaexlLmBWcNzaX5aapOVO6qYt0-UnklsfElv7sBr6IXorL5FCDglauNpXjxukShsqGxc__SUYKPvwvyP7XqEg5fcQ')",
                                    }}
                                />
                            </div>
                            <span className="ml-2 text-sm font-semibold text-[#545f73] dark:text-zinc-400">
                                Trusted by 4.7M+ Users
                            </span>
                        </div>
                    </div>
                </div>
                <div className="relative w-full flex-1">
                    <div className="relative z-10 rounded-3xl border border-white/30 bg-white/80 p-6 shadow-2xl backdrop-blur-xl transition-colors dark:border-zinc-800 dark:bg-zinc-900/80">
                        <div className="mb-8 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500" />
                                <div className="h-3 w-3 rounded-full bg-amber-500" />
                                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                            </div>
                            <span className="text-xs font-semibold text-[#545f73] dark:text-zinc-400">
                                Live Analysis Dashboard
                            </span>
                        </div>
                        <div className="space-y-6">
                            <div className="h-12 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-zinc-800" />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex h-32 flex-col justify-between rounded-xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-950 dark:bg-blue-950/10">
                                    <span className="text-xs font-semibold text-[#004ac6] dark:text-blue-400">
                                        CV Match Score
                                    </span>
                                    <span className="text-4xl font-extrabold text-[#004ac6] dark:text-blue-400">
                                        94%
                                    </span>
                                </div>
                                <div className="flex h-32 flex-col justify-between rounded-xl border border-purple-100 bg-purple-50/50 p-4 dark:border-purple-950 dark:bg-purple-950/10">
                                    <span className="text-xs font-semibold text-[#632ecd] dark:text-purple-400">
                                        Interview Readiness
                                    </span>
                                    <span className="text-4xl font-extrabold text-[#632ecd] dark:text-purple-400">
                                        High
                                    </span>
                                </div>
                            </div>
                            <div className="flex h-40 w-full items-end gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
                                <div className="h-[60%] w-full rounded-t-md bg-[#004ac6] dark:bg-blue-600" />
                                <div className="h-[85%] w-full rounded-t-md bg-[#004ac6] dark:bg-blue-600" />
                                <div className="h-[40%] w-full rounded-t-md bg-[#004ac6] dark:bg-blue-600" />
                                <div className="h-[70%] w-full rounded-t-md bg-[#004ac6] dark:bg-blue-600" />
                                <div className="h-[95%] w-full rounded-t-md bg-[#004ac6] dark:bg-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-purple-400/10 blur-3xl" />
                </div>
            </div>
        </section>
    );
}
