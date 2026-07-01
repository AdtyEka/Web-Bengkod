import { Button } from '@/components/ui/button';

export default function Okrs() {
    return (
        <section className="bg-gray-50 py-24 transition-colors dark:bg-zinc-950/60">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-5xl dark:text-zinc-50">
                        Align Your Career with Company Priorities
                    </h2>
                    <p className="text-base text-[#545f73] md:text-lg dark:text-zinc-400">
                        Our OKR tracking module bridges the gap between
                        individual growth and enterprise goals, ensuring every
                        skill learned contributes to shared success.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                    <div className="dark:border-zinc-850 col-span-12 flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:col-span-8 dark:bg-zinc-900">
                        <div className="mb-8 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                                Current Goal Progress
                            </h3>
                            <Button
                                variant="link"
                                className="p-0 font-semibold text-[#004ac6] dark:text-blue-400"
                            >
                                View Details
                            </Button>
                        </div>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-semibold text-zinc-800 dark:text-zinc-300">
                                        Advanced Cloud Certification
                                    </span>
                                    <span className="font-bold text-[#004ac6] dark:text-blue-400">
                                        82%
                                    </span>
                                </div>
                                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800">
                                    <div
                                        className="h-full rounded-full bg-blue-600 transition-all duration-1000"
                                        style={{ width: '82%' }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-semibold text-zinc-800 dark:text-zinc-300">
                                        Team Management Training
                                    </span>
                                    <span className="font-bold text-[#004ac6] dark:text-blue-400">
                                        45%
                                    </span>
                                </div>
                                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800">
                                    <div
                                        className="h-full rounded-full bg-blue-600 transition-all duration-1000"
                                        style={{ width: '45%' }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-semibold text-zinc-800 dark:text-zinc-300">
                                        Machine Learning Foundation
                                    </span>
                                    <span className="font-bold text-[#004ac6] dark:text-blue-400">
                                        12%
                                    </span>
                                </div>
                                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800">
                                    <div
                                        className="h-full rounded-full bg-blue-600 transition-all duration-1000"
                                        style={{ width: '12%' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 flex flex-col justify-between rounded-3xl bg-linear-to-br from-[#004ac6] to-blue-700 p-8 text-white shadow-sm md:col-span-4 dark:from-blue-900 dark:to-blue-950">
                        <div>
                            <span className="material-symbols-outlined mb-6 text-5xl text-blue-200">
                                insights
                            </span>
                            <h3 className="mb-4 text-2xl leading-tight font-bold">
                                Strategic Insight
                            </h3>
                            <p className="mb-8 text-sm leading-relaxed text-blue-100/90">
                                SkillSync AI identifies that cloud certification
                                is the highest priority for your department this
                                quarter. You are ahead of 70% of your peers.
                            </p>
                        </div>
                        <Button className="w-full rounded-xl bg-white py-6 font-bold text-[#004ac6] shadow-md hover:bg-blue-50">
                            Optimize Learning Path
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
