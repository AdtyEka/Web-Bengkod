import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function CTA() {
    return (
        <section
            id="cta"
            className="relative bg-[#F3F4ED] overflow-hidden"
        >
            <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 md:py-28">
                {/* Headline */}
                <motion.h2
                    className="font-instrument text-center text-[36px] md:text-[54px] lg:text-[68px] leading-[0.92] tracking-tight text-[#1a1a1a] mb-6"
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: EASE }}
                >
                    Siap Mendarat di <br />
                    <span className="italic">Perusahaan Impian?</span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    className="font-sans text-center text-[15px] md:text-[17px] text-[#1a1a1a]/70 leading-relaxed max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: EASE }}
                >
                    Mulai gunakan SkillSync AI secara gratis. Tingkatkan karirmu hari ini!
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
                >
                    {/* Primary */}
                    <a
                        href="/auth/register"
                        className="group relative overflow-hidden rounded-full bg-[#0871E7] px-7 py-3.5 font-sans text-[14px] font-medium text-white shadow-[inset_0_-4px_4px_rgba(255,255,255,0.39)] outline outline-1 outline-[#0871E7] -outline-offset-1 transition-opacity duration-200 hover:opacity-90"
                    >
                        <span
                            className="pointer-events-none absolute left-[10%] top-[1px] h-4 w-[80%] rounded-[12px] bg-gradient-to-b from-[#DEF0FC] to-transparent transition-transform duration-200 group-hover:scale-x-105"
                            aria-hidden="true"
                        />
                        <span className="relative">Mulai Sekarang</span>
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
