import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const FEATURES = [
    {
        id: 'cv-matcher',
        number: '90%',
        title: 'AI CV Matcher',
        subtitle: 'Machine Learning',
        desc: 'Upload CV PDF-mu, pilih posisi (Data Analyst, Backend, dll), dan lihat skor kecocokanmu dalam hitungan detik.',
        tags: ['Akurasi hingga 90%', 'Scikit-learn'],
        ctaHref: '/cv-matcher',
        icon: (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                <circle cx="17" cy="17" r="3" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 19l1.5 1.5" />
            </svg>
        ),
    },
    {
        id: 'interview-coach',
        number: '24/7',
        title: 'AI Interview Coach',
        subtitle: 'Gemini AI',
        desc: 'Latihan wawancara dengan AI Coach. Dapatkan pertanyaan spesifik posisi, feedback langsung, skor komunikasi, dan tips perbaikan.',
        tags: ['Gemini AI', 'Role-specific'],
        ctaHref: '/interview-coach',
        icon: (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
        ),
    },
    {
        id: 'dashboard',
        number: '100%',
        title: 'Dashboard & Riwayat',
        subtitle: 'Progress Tracking',
        desc: 'Lihat riwayat analisis CV dan sesi interview sebelumnya. Evaluasi progresmu dari waktu ke waktu.',
        tags: ['Visual Grafik', 'Riwayat Lengkap'],
        ctaHref: '/dashboard',
        icon: (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
        ),
    },
];

function FeatureCard({ feature }: { feature: typeof FEATURES[0] }) {
    return (
        <motion.div
            className="flex-shrink-0 w-[280px] md:w-[340px]"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: EASE }}
        >
            <div className="relative h-full bg-white rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] transition-shadow duration-300 border border-[#F3F4ED] overflow-hidden group">
                {/* Subtle liquid blob background on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                    <div 
                        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl"
                        style={{ backgroundColor: '#F3F4ED' }}
                    />
                </div>

                <div className="relative z-10">
                    {/* Icon badge - top right */}
                    <div className="absolute top-0 right-0">
                        <div className="w-10 h-10 rounded-xl bg-[#F3F4ED] flex items-center justify-center">
                            <span className="text-[#1a1a1a]">
                                {feature.icon}
                            </span>
                        </div>
                    </div>

                    {/* Big number */}
                    <div className="mb-4">
                        <div className="font-instrument text-[52px] leading-none tracking-tight text-[#1a1a1a]">
                            {feature.number}
                        </div>
                    </div>

                    {/* Subtitle badge */}
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F4ED] px-2.5 py-1 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
                        <span className="font-sans text-[10px] font-medium tracking-wide uppercase text-[#1a1a1a]/70">
                            {feature.subtitle}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans text-[18px] font-semibold text-[#1a1a1a] mb-2 leading-tight">
                        {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-[13px] text-[#1a1a1a]/60 leading-relaxed mb-4">
                        {feature.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                        {feature.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-md bg-[#1a1a1a]/5 px-2 py-0.5 font-sans text-[11px] text-[#1a1a1a]/50"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Features() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scrollSpeed = 0.5;
        let scrollPosition = 0;

        const animate = () => {
            if (scrollContainer) {
                scrollPosition += scrollSpeed;
                
                // Get one set width (original features, not duplicated)
                const singleSetWidth = scrollContainer.scrollWidth / 3;
                
                // When we've scrolled past one complete set, jump back seamlessly
                if (scrollPosition >= singleSetWidth) {
                    scrollPosition = 0;
                }
                
                scrollContainer.scrollLeft = scrollPosition;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // Triple features for truly seamless loop
    const triplicatedFeatures = [...FEATURES, ...FEATURES, ...FEATURES];

    return (
        <section 
            id="features" 
            className="relative bg-[#FAFAFA] overflow-hidden py-24 md:py-32 rounded-t-[48px] rounded-b-[48px]"
            style={{ 
                boxShadow: 'inset 0 4px 0 0 rgba(0, 0, 0, 0.15), 0 -2px 8px 0 rgba(0, 0, 0, 0.12), inset 0 -4px 0 0 rgba(0, 0, 0, 0.15), 0 2px 8px 0 rgba(0, 0, 0, 0.12)' 
            }}
        >
            <div className="relative z-10 mx-auto max-w-7xl px-6">
                
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: EASE }}
                >
                    <motion.h2
                        className="font-instrument text-[36px] md:text-[54px] lg:text-[68px] leading-[0.92] tracking-tight text-[#1a1a1a] mb-5"
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: EASE }}
                    >
                        Dua kekuatan AI <br />
                        <span className="italic">dalam satu platform.</span>
                    </motion.h2>

                    <motion.p
                        className="font-sans text-[15px] md:text-[17px] text-[#1a1a1a]/60 leading-relaxed max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: EASE }}
                    >
                        Maksimalkan potensimu dengan kombinasi Machine Learning untuk analisis CV dan Gemini AI untuk simulasi interview.
                    </motion.p>
                </motion.div>

            </div>

            {/* Scrolling carousel - never stops */}
            <div className="relative">
                {/* Left fade gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
                
                {/* Right fade gradient */}
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-hidden px-6"
                    style={{ scrollBehavior: 'auto' }}
                >
                    {triplicatedFeatures.map((feature, index) => (
                        <FeatureCard key={`${feature.id}-${index}`} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}
