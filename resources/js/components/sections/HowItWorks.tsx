'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function isSafariBrowser(): boolean {
    if (typeof window === 'undefined') return false;
    const ua = window.navigator.userAgent;
    const vendor = window.navigator.vendor || '';
    const isAppleVendor = /Apple/i.test(vendor);
    const isOtherIOSBrowser = /CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua);
    const isChromeFamily = /Chrome|Chromium|Android/i.test(ua);
    return isAppleVendor && !isOtherIOSBrowser && !isChromeFamily;
}

// S-curve weaves left→right→left across each timeline entry using cubic bezier segments
function buildSCurvePath(w: number, h: number): string {
    const cx = w * 0.5;
    return [
        `M ${w * -0.04} ${h * 0.32}`,
        `C ${w * 0.15} ${h * 0.28}, ${w * 0.35} ${h * 0.2}, ${cx} ${h * 0.22}`,
        `C ${w * 0.65} ${h * 0.24}, ${w * 0.78} ${h * 0.3}, ${w * 0.8} ${h * 0.38}`,
        `C ${w * 0.82} ${h * 0.46}, ${w * 0.7} ${h * 0.52}, ${cx} ${h * 0.52}`,
        `C ${w * 0.3} ${h * 0.52}, ${w * 0.18} ${h * 0.58}, ${w * 0.2} ${h * 0.65}`,
        `C ${w * 0.22} ${h * 0.72}, ${w * 0.35} ${h * 0.76}, ${cx} ${h * 0.74}`,
        `C ${w * 0.65} ${h * 0.72}, ${w * 0.75} ${h * 0.76}, ${w * 0.72} ${h * 0.85}`,
        `C ${w * 0.68} ${h * 0.94}, ${w * 0.4} ${h * 1.0}, ${w * -0.04} ${h * 0.98}`,
    ].join(' ');
}

const STEPS = [
    {
        number: '01',
        title: 'Upload CV-mu',
        subtitle: 'Ekstraksi Otomatis',
        description:
            'Unggah file PDF CV terbarumu ke platform. Sistem kami akan mengekstrak teks, mengidentifikasi keterampilan teknis, dan menganalisis struktur dokumen secara otomatis menggunakan Natural Language Processing. Proses ini memakan waktu kurang dari 5 detik.',
    },
    {
        number: '02',
        title: 'Cocokkan dengan Pekerjaan',
        subtitle: 'Machine Learning Analysis',
        description:
            'Pilih posisi yang kamu incar — Data Analyst, Backend Engineer, Frontend Developer, atau role lainnya. Model ML kami akan memproses CV-mu dan memberikan Match Score akurat berdasarkan kesesuaian skill, pengalaman, dan requirement posisi. Kamu juga akan mendapat daftar skill yang masih kurang beserta rekomendasi pembelajaran.',
    },
    {
        number: '03',
        title: 'Asah Kemampuan Interview',
        subtitle: 'AI Coach Real-time',
        description:
            'Hadapi sesi tanya-jawab simulasi dengan AI Coach yang disesuaikan dengan posisi pilihanmu. Dapatkan pertanyaan teknis dan behavioral yang relevan, feedback langsung atas jawabanmu, skor komunikasi, dan tips perbaikan sebelum wawancara asli. Rekam progresmu dari waktu ke waktu di dashboard personal.',
    },
] as const;

export default function HowItWorks() {
    const CENTER_LINE_START = '18%';
    const CENTER_LINE_END = '88%';

    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const centerLineRef = useRef<HTMLDivElement>(null);
    const centerGlowRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    const [isSafari, setIsSafari] = useState(false);
    const [pathData, setPathData] = useState('');

    useEffect(() => {
        setIsSafari(isSafariBrowser());
    }, []);

    // Build S-curve path on mount and resize
    useEffect(() => {
        const updatePath = () => {
            if (!svgRef.current) return;
            const { width, height } = svgRef.current.getBoundingClientRect();
            setPathData(buildSCurvePath(width, height));
        };

        updatePath();
        window.addEventListener('resize', updatePath);
        return () => window.removeEventListener('resize', updatePath);
    }, []);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section || !pathData) return;

            // Animate S-curve path drawing
            if (pathRef.current) {
                const pathLength = pathRef.current.getTotalLength();
                gsap.set(pathRef.current, {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength,
                });

                gsap.to(pathRef.current, {
                    strokeDashoffset: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        scrub: 1,
                    },
                });
            }

            // Glow layer grows over base line
            if (centerGlowRef.current) {
                gsap.fromTo(
                    centerGlowRef.current,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            scrub: 1,
                        },
                    }
                );
            }

            // Heading animation
            if (headingRef.current) {
                gsap.fromTo(
                    headingRef.current,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: isSafari ? 0.7 : 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: 'top 88%',
                            toggleActions: isSafari ? 'play none none none' : 'play none none reverse',
                        },
                    }
                );
            }

            // Step cards animation
            stepRefs.current.forEach((el) => {
                if (!el) return;
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 70 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: isSafari ? 0.55 : 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: isSafari ? 'play none none none' : 'play none none reverse',
                        },
                    }
                );
            });
        },
        { scope: sectionRef, dependencies: [isSafari, pathData] }
    );

    return (
        <section
            ref={sectionRef}
            id="how-it-works"
            className="relative w-full overflow-visible bg-[#F3F4ED]"
        >
            {/* S-Curve SVG with liquid glass effect */}
            <svg
                ref={svgRef}
                className="pointer-events-none absolute left-0 top-0 w-full h-full z-[3]"
                preserveAspectRatio="none"
            >
                <defs>
                    {/* Liquid glass blur filter */}
                    <filter id="liquid-glass" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                    
                    {/* Gradient for glass effect */}
                    <linearGradient id="glass-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.35" />
                        <stop offset="50%" stopColor="#1a1a1a" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.35" />
                    </linearGradient>
                </defs>

                {pathData && (
                    <>
                        {/* Base path for glow */}
                        <path
                            d={pathData}
                            fill="none"
                            stroke="url(#glass-gradient)"
                            strokeWidth="18"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#liquid-glass)"
                            opacity="0.5"
                        />
                        
                        {/* Main animated path */}
                        <path
                            ref={pathRef}
                            d={pathData}
                            fill="none"
                            stroke="url(#glass-gradient)"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#liquid-glass)"
                            opacity="1"
                        />
                    </>
                )}
            </svg>

            {/* Center Vertical Base Line */}
            <div
                ref={centerLineRef}
                className="pointer-events-none absolute left-[24px] md:left-1/2 z-[4] -translate-x-1/2"
                style={{
                    top: CENTER_LINE_START,
                    bottom: `${100 - Number.parseFloat(CENTER_LINE_END)}%`,
                    width: '2px',
                    background: '#1a1a1a',
                    opacity: 0.12,
                }}
            />

            {/* Center Vertical Glow Line */}
            <div
                ref={centerGlowRef}
                className="pointer-events-none absolute left-[24px] md:left-1/2 z-[5] -translate-x-1/2"
                style={{
                    top: CENTER_LINE_START,
                    bottom: `${100 - Number.parseFloat(CENTER_LINE_END)}%`,
                    width: '3px',
                    transformOrigin: 'top center',
                    background: '#1a1a1a',
                    opacity: 0.25,
                }}
            />

            <div className="relative z-10 flex flex-col items-center px-6 pt-28 pb-6 md:pt-36 md:pb-10 lg:pt-44 lg:pb-12">
                <div ref={headingRef} className="w-full">
                    <h2 className="mx-auto max-w-5xl text-center text-[clamp(2.2rem,5.8vw,4rem)] leading-[1.2] font-instrument tracking-tight text-[#1a1a1a]">
                        Hanya 3 langkah mudah <br />
                        <span className="italic">menuju karir impianmu.</span>
                    </h2>
                </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-10">
                <div className="flex flex-col" style={{ gap: 'clamp(80px, 12vh, 140px)' }}>
                    {STEPS.map((step, i) => {
                        const isLeft = i % 2 === 0;
                        const connectorTop = i === 0 ? 'calc(clamp(60px, 8vh, 100px) + 32px)' : '18px';

                        return (
                            <div
                                key={i}
                                ref={(el) => {
                                    stepRefs.current[i] = el;
                                }}
                                className={`relative flex w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                                style={{ paddingTop: i === 0 ? 'clamp(60px, 8vh, 100px)' : '0' }}
                            >
                                {/* Connector dot */}
                                <div
                                    className="absolute left-0 md:left-1/2 z-10 h-[16px] w-[16px] -translate-x-1/2 rounded-full bg-[#1a1a1a]"
                                    style={{
                                        top: connectorTop,
                                    }}
                                />

                                <div
                                    className={`relative w-full md:max-w-[440px] pl-[48px] pr-4 md:px-0 text-left ${
                                        isLeft ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                                    }`}
                                >
                                    {/* Number */}
                                    <p className="text-[clamp(3rem,7vw,5rem)] font-instrument leading-none text-[#1a1a1a] tracking-tight opacity-15 mb-2">
                                        {step.number}
                                    </p>

                                    {/* Title */}
                                    <h3 className="text-[clamp(1.75rem,5vw,3.2rem)] md:text-[clamp(2.2rem,5.5vw,3.2rem)] font-instrument leading-[1.06] text-[#1a1a1a] tracking-tight mb-3">
                                        {step.title}
                                    </h3>

                                    {/* Subtitle */}
                                    <p className="text-[clamp(0.85rem,1.5vw,1.1rem)] md:text-[clamp(0.95rem,1.9vw,1.1rem)] text-[#1a1a1a] opacity-50 font-sans font-medium leading-relaxed mb-5">
                                        {step.subtitle}
                                    </p>

                                    {/* Description */}
                                    <p
                                        className={`text-[clamp(0.8rem,1.2vw,1rem)] md:text-[clamp(0.88rem,1.5vw,1rem)] text-[#1a1a1a] opacity-60 leading-[1.8] font-sans font-light max-w-[420px] ${
                                            isLeft ? 'md:ml-auto' : ''
                                        }`}
                                    >
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{ height: 'clamp(80px, 10vh, 140px)' }} />
        </section>
    );
}
