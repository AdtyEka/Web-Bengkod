import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function About() {
    return (
        <section 
            id="about" 
            className="relative bg-[#F3F4ED] overflow-hidden"
            style={{ 
                boxShadow: 'inset 0 3px 0 0 rgba(0, 0, 0, 0.12), 0 -1px 4px 0 rgba(0, 0, 0, 0.08)' 
            }}
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
                    Platform CV terlengkap <br />
                    <span className="italic">untuk profesional Indonesia.</span>
                </motion.h2>

                {/* Description paragraphs */}
                <motion.div
                    className="space-y-5 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: EASE }}
                >
                    <p className="font-sans text-center text-[15px] md:text-[17px] text-[#1a1a1a]/70 leading-relaxed">
                        SkillSync AI menggunakan teknologi natural language processing terkini untuk menganalisis setiap aspek CV Anda mulai dari struktur, pemilihan kata, hingga kesesuaian dengan standar ATS (Applicant Tracking System).
                    </p>

                    <p className="font-sans text-center text-[15px] md:text-[17px] text-[#1a1a1a]/70 leading-relaxed">
                        Kami tidak hanya memberikan skor, tetapi juga rekomendasi spesifik yang dapat langsung diterapkan. Dari optimasi keyword hingga saran penyusunan pengalaman kerja yang lebih impactful.
                    </p>
                </motion.div>

                {/* Key stats - minimal and elegant */}
                <motion.div
                    className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
                >
                    <div className="text-center">
                        <div className="font-instrument text-[42px] md:text-[52px] leading-none tracking-tight text-[#1a1a1a] mb-1">
                            10K+
                        </div>
                        <div className="font-sans text-[13px] text-[#1a1a1a]/50">
                            CV dianalisis
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-[#1a1a1a]/10" />

                    <div className="text-center">
                        <div className="font-instrument text-[42px] md:text-[52px] leading-none tracking-tight text-[#1a1a1a] mb-1">
                            94%
                        </div>
                        <div className="font-sans text-[13px] text-[#1a1a1a]/50">
                            Lolos screening ATS
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-[#1a1a1a]/10" />

                    <div className="text-center">
                        <div className="font-instrument text-[42px] md:text-[52px] leading-none tracking-tight text-[#1a1a1a] mb-1">
                            3s
                        </div>
                        <div className="font-sans text-[13px] text-[#1a1a1a]/50">
                            Waktu analisis
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="flex justify-center mt-14"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                >
                    <a
                        href="/auth/register"
                        className="group relative overflow-hidden rounded-full bg-[#0871E7] px-7 py-3.5 font-sans text-[14px] font-medium text-white shadow-[inset_0_-4px_4px_rgba(255,255,255,0.39)] outline outline-1 outline-[#0871E7] -outline-offset-1 transition-opacity duration-200 hover:opacity-90"
                    >
                        <span
                            className="pointer-events-none absolute left-[10%] top-[1px] h-4 w-[80%] rounded-[12px] bg-gradient-to-b from-[#DEF0FC] to-transparent transition-transform duration-200 group-hover:scale-x-105"
                            aria-hidden="true"
                        />
                        <span className="relative">Mulai Analisis CV</span>
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
