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
    // Array of all animated glass layer paths
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);

    const [isSafari, setIsSafari] = useState(false);
    const [pathData, setPathData] = useState('');

    useEffect(() => {
        setIsSafari(isSafariBrowser());
    }, []);

    // Build S-curve path — use offsetWidth/offsetHeight for reliable layout measurement
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const updatePath = () => {
            // offsetWidth/offsetHeight are reliable even before scroll/paint
            const w = section.offsetWidth || section.getBoundingClientRect().width;
            const h = section.offsetHeight || section.getBoundingClientRect().height;
            if (w > 0 && h > 0) {
                setPathData(buildSCurvePath(w, h));
            }
        };

        // Double-rAF: ensures browser has completed layout + paint
        let rafId: number;
        rafId = requestAnimationFrame(() => {
            rafId = requestAnimationFrame(updatePath);
        });

        const ro = new ResizeObserver(updatePath);
        ro.observe(section);

        return () => {
            cancelAnimationFrame(rafId);
            ro.disconnect();
        };
    }, []);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section || !pathData) return;

            // Animate all liquid glass layers together
            const animatedPaths = pathRefs.current.filter(Boolean) as SVGPathElement[];
            animatedPaths.forEach((path) => {
                const pathLength = path.getTotalLength();
                gsap.set(path, {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength,
                });
                gsap.to(path, {
                    strokeDashoffset: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        scrub: 1,
                    },
                });
            });

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
            {/* ═══ LIQUID GLASS S-CURVE SVG ═══ */}
            <svg
                ref={svgRef}
                className="pointer-events-none absolute left-0 top-0 w-full h-full"
                style={{ zIndex: 6 }}
                preserveAspectRatio="none"
            >
                <defs>
                    {/* The 3D liquid glass filter using lighting effects */}
                    <filter id="liquid-glass-filter" x="-30%" y="-30%" width="160%" height="160%">
                        {/* 1. Blur the source alpha to create a smooth height map (bump map) */}
                        <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
                        
                        {/* 2. Generate Specular Lighting for the bright, sharp glass reflection highlight */}
                        <feSpecularLighting in="blur" surfaceScale="5" specularConstant="2.2" specularExponent="38" lighting-color="#ffffff" result="specular">
                            <feDistantLight azimuth="225" elevation="55" />
                        </feSpecularLighting>
                        {/* Mask the specular highlight so it only appears inside the tube boundaries */}
                        <feComposite in="specular" in2="SourceAlpha" operator="in" result="specularOut" />
                        
                        {/* 3. Generate Diffuse Lighting to give the tube 3D volume and shading */}
                        <feDiffuseLighting in="blur" surfaceScale="5" diffuseConstant="1.2" lighting-color="#ffffff" result="diffuse">
                            <feDistantLight azimuth="225" elevation="55" />
                        </feDiffuseLighting>
                        {/* Mask the diffuse lighting to the tube boundaries */}
                        <feComposite in="diffuse" in2="SourceAlpha" operator="in" result="diffuseOut" />
                        
                        {/* 4. Overlay the highlights and shading onto the glass base */}
                        {/* Blend diffuse shading with the base glass color (SourceGraphic) using multiply */}
                        <feBlend in="diffuseOut" in2="SourceGraphic" mode="multiply" result="shaded" />
                        {/* Add the bright specular highlight on top using screen mode */}
                        <feBlend in="specularOut" in2="shaded" mode="screen" result="litGlass" />
                        
                        {/* 5. Drop shadow for depth, making the glass tube float */}
                        <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#1a1a1a" flood-opacity="0.07" />
                    </filter>

                    {/* Subtle outer blur for the glass refraction outline */}
                    <filter id="hiw-ambient" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
                    </filter>
                </defs>

                {pathData && (
                    <>
                        {/* ── STATIC: always-visible ghost paths so user sees the full tube path ── */}
                        {/* Ghost glass rim (subtle outer boundary refraction) */}
                        <path
                            d={pathData} fill="none"
                            stroke="rgba(26, 26, 26, 0.05)" strokeWidth="26"
                            strokeLinecap="round" strokeLinejoin="round"
                        />
                        {/* Ghost glass body (subtle 3D glass tube) */}
                        <path
                            d={pathData} fill="none"
                            stroke="rgba(255, 255, 255, 0.25)" strokeWidth="24"
                            strokeLinecap="round" strokeLinejoin="round"
                            filter="url(#liquid-glass-filter)"
                        />

                        {/* ── ANIMATED: scroll-draw layers ── */}
                        
                        {/* Layer 1: Dark outer rim (refractive edge of the glass tube) */}
                        <path
                            ref={(el) => { pathRefs.current[0] = el; }}
                            d={pathData} fill="none"
                            stroke="rgba(26, 26, 26, 0.16)" strokeWidth="26"
                            strokeLinecap="round" strokeLinejoin="round"
                        />

                        {/* Layer 2: Main 3D glass body (uses the lighting filter) */}
                        <path
                            ref={(el) => { pathRefs.current[1] = el; }}
                            d={pathData} fill="none"
                            stroke="rgba(255, 255, 255, 0.55)" strokeWidth="24"
                            strokeLinecap="round" strokeLinejoin="round"
                            filter="url(#liquid-glass-filter)"
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
                                    <p className="text-[clamp(3rem,7vw,5rem)] font-instrument leading-none text-[#1a1a1a] font-bold tracking-tight opacity-15 mb-2">
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
