import { Button } from '@/components/ui/button';

export default function Cta() {
    return (
        <section
            id="pricing"
            className="bg-white py-24 transition-colors dark:bg-zinc-900"
        >
            <div className="mx-auto max-w-7xl px-6">
                <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-linear-to-br from-zinc-900 to-zinc-950 p-12 text-center shadow-2xl md:p-20 dark:from-zinc-950 dark:to-black">
                    <div className="relative z-10">
                        <h2 className="mx-auto mb-6 max-w-3xl text-3xl leading-tight font-extrabold tracking-tight text-white md:text-5xl">
                            One Platform For All Your Career Needs
                        </h2>
                        <p className="mx-auto mb-10 max-w-2xl text-base text-zinc-400 md:text-lg">
                            Join thousands of organizations transforming their
                            workforce management with SkillSync AI today.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button className="scale-105 rounded-xl bg-[#2563eb] px-10 py-6 text-base font-semibold text-white shadow-xl transition-all hover:bg-blue-700 hover:shadow-blue-500/20 active:scale-95">
                                Request a Demo
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-xl border-white/20 bg-white/10 px-10 py-6 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/25"
                            >
                                Talk to Sales
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
