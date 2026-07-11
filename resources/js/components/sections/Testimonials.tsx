import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const TESTIMONIALS_TOP = [
    {
        id: 'testimoni-1',
        rating: 5,
        quote: 'SkillSync benar-benar keren! Ternyata CV-ku kurang banyak menyebutkan kata kunci yang dicari HRD. Setelah diperbaiki, aku dipanggil 3 perusahaan sekaligus!',
        name: 'Andi Saputra',
        role: 'Mahasiswa Akhir, Universitas Indonesia',
    },
    {
        id: 'testimoni-2',
        rating: 5,
        quote: 'Fitur interview coach-nya menegangkan tapi sangat membantu! Aku jadi tahu harus menjawab seperti apa yang struktural dan berbobot.',
        name: 'Siti Rahma',
        role: 'Fresh Graduate, Telkom University',
        featured: true,
    },
    {
        id: 'testimoni-3',
        rating: 5,
        quote: 'Dulu aku takut banget sama interview teknikal. Sekarang setelah latihan pakai SkillSync, rasa percaya diriku meningkat drastis!',
        name: 'Rizky Fadillah',
        role: 'Mahasiswa S2, ITB',
    },
];

const TESTIMONIALS_BOTTOM = [
    {
        id: 'testimoni-4',
        rating: 5,
        quote: 'Dashboard progress-nya bikin aku lebih termotivasi untuk terus belajar dan memperbaiki kemampuan interview.',
        name: 'Dimas Prakoso',
        role: 'Mahasiswa, UGM',
    },
    {
        id: 'testimoni-5',
        rating: 5,
        quote: 'CV Matcher-nya akurat banget! Aku jadi paham skill apa yang harus dipelajari untuk role yang aku incar.',
        name: 'Maya Kusuma',
        role: 'Fresh Graduate, BINUS',
        featured: true,
    },
    {
        id: 'testimoni-6',
        rating: 5,
        quote: 'Platform ini benar-benar game changer untuk persiapan kerja. Sangat recommended untuk teman-teman yang mau apply kerja!',
        name: 'Farhan Ahmad',
        role: 'Mahasiswa Akhir, ITS',
    },
];

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS_TOP[0] }) {
    return (
        <motion.div
            className="flex-shrink-0 w-[320px] md:w-[380px] h-full"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: EASE }}
        >
            <div
                className="relative h-full bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] transition-shadow duration-300 border border-[#F3F4ED] overflow-hidden group"
            >
                {/* Subtle liquid blob background on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl" style={{ backgroundColor: '#F3F4ED' }} />
                </div>

                <div className="relative z-10">
                    {/* Rating stars */}
                    <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#1a1a1a" className="opacity-80">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="font-sans text-[14px] md:text-[15px] text-[#1a1a1a]/70 leading-relaxed mb-5 italic">
                        "{testimonial.quote}"
                    </blockquote>

                    {/* Divider */}
                    <div className="w-12 h-[2px] bg-[#F3F4ED] mb-4" />

                    {/* Author info */}
                    <div>
                        <p className="font-sans text-[15px] font-semibold text-[#1a1a1a] mb-1">{testimonial.name}</p>
                        <p className="font-sans text-[12px] text-[#1a1a1a]/50">{testimonial.role}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Testimonials() {
    const scrollRefTop = useRef<HTMLDivElement>(null);
    const scrollRefBottom = useRef<HTMLDivElement>(null);
    const animationRefTop = useRef<number | null>(null);
    const animationRefBottom = useRef<number | null>(null);

    // Top row - scroll left
    useEffect(() => {
        const scrollContainer = scrollRefTop.current;
        if (!scrollContainer) return;

        const scrollSpeed = 0.5;
        let scrollPosition = 0;

        const animate = () => {
            if (scrollContainer) {
                scrollPosition += scrollSpeed;

                const singleSetWidth = scrollContainer.scrollWidth / 3;

                if (scrollPosition >= singleSetWidth) {
                    scrollPosition = 0;
                }

                scrollContainer.scrollLeft = scrollPosition;
            }
            animationRefTop.current = requestAnimationFrame(animate);
        };

        animationRefTop.current = requestAnimationFrame(animate);

        return () => {
            if (animationRefTop.current) {
                cancelAnimationFrame(animationRefTop.current);
            }
        };
    }, []);

    // Bottom row - scroll right
    useEffect(() => {
        const scrollContainer = scrollRefBottom.current;
        if (!scrollContainer) return;

        const scrollSpeed = 0.5;

        // Start from the end for reverse scroll
        if (scrollContainer.scrollWidth > 0) {
            scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
        }

        let scrollPosition = scrollContainer.scrollWidth / 3;

        const animate = () => {
            if (scrollContainer) {
                scrollPosition -= scrollSpeed;

                const singleSetWidth = scrollContainer.scrollWidth / 3;

                // Reset when scrolled back to start
                if (scrollPosition <= 0) {
                    scrollPosition = singleSetWidth;
                    scrollContainer.scrollLeft = scrollPosition;
                }

                scrollContainer.scrollLeft = scrollPosition;
            }
            animationRefBottom.current = requestAnimationFrame(animate);
        };

        // Delay to ensure scrollWidth is calculated
        setTimeout(() => {
            animationRefBottom.current = requestAnimationFrame(animate);
        }, 100);

        return () => {
            if (animationRefBottom.current) {
                cancelAnimationFrame(animationRefBottom.current);
            }
        };
    }, []);

    // Triple testimonials for seamless loop
    const triplicatedTop = [...TESTIMONIALS_TOP, ...TESTIMONIALS_TOP, ...TESTIMONIALS_TOP];
    const triplicatedBottom = [...TESTIMONIALS_BOTTOM, ...TESTIMONIALS_BOTTOM, ...TESTIMONIALS_BOTTOM];

    return (
        <section id="testimonials" className="relative bg-[#FAFAFA] overflow-x-hidden py-24 md:py-32 rounded-t-[48px] rounded-b-[48px]"
            style={{
                boxShadow: 'inset 0 4px 0 0 rgba(0, 0, 0, 0.15), 0 -2px 8px 0 rgba(0, 0, 0, 0.12), inset 0 -4px 0 0 rgba(0, 0, 0, 0.15), 0 2px 8px 0 rgba(0, 0, 0, 0.12)',
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
                        Apa Kata Mereka?
                    </motion.h2>

                    <motion.p
                        className="font-sans text-[15px] md:text-[17px] text-[#1a1a1a]/60 leading-relaxed max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: EASE }}
                    >
                        Lebih dari 500 mahasiswa telah merasakan manfaatnya.
                    </motion.p>
                </motion.div>
            </div>

            {/* Top carousel - scrolls left */}
            <div className="relative mb-6 py-4">
                {/* Left fade gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

                {/* Right fade gradient */}
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

                <div ref={scrollRefTop} className="flex items-stretch gap-6 overflow-x-hidden px-6" style={{ scrollBehavior: 'auto' }}>
                    {triplicatedTop.map((testimonial, index) => (
                        <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
                    ))}
                </div>
            </div>

            {/* Bottom carousel - scrolls right */}
            <div className="relative py-4">
                {/* Left fade gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

                {/* Right fade gradient */}
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

                <div ref={scrollRefBottom} className="flex items-stretch gap-6 overflow-x-hidden px-6" style={{ scrollBehavior: 'auto' }}>
                    {triplicatedBottom.map((testimonial, index) => (
                        <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}
