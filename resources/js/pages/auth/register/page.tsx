'use client';

import { Head, Link, useForm } from '@inertiajs/react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePasswordToggle } from '@/hooks/use-password-toggle';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FloatingOrb({
    cx,
    cy,
    r,
    opacity,
    delay,
}: {
    cx: string;
    cy: string;
    r: number;
    opacity: number;
    delay: number;
}) {
    const shouldReduce = useReducedMotion();
    return (
        <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="white"
            fillOpacity={opacity}
            animate={shouldReduce ? {} : { cy: [cy, `${parseFloat(cy) - 18}%`, cy] }}
            transition={
                shouldReduce
                    ? {}
                    : { duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }
            }
        />
    );
}

function StatPill({ value, label, delay }: { value: string; label: string; delay: number }) {
    const shouldReduce = useReducedMotion();
    return (
        <motion.div
            className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm"
            initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay, ease: EASE }}
        >
            <span
                className="font-instrument text-[32px] leading-none tracking-tight text-white"
                style={{ fontFamily: 'var(--font-instrument)' }}
            >
                {value}
            </span>
            <span className="font-sans text-[12px] leading-snug text-white/65 max-w-[80px]">{label}</span>
        </motion.div>
    );
}

function TestimonialCard() {
    const shouldReduce = useReducedMotion();
    return (
        <motion.div
            className="rounded-[24px] border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
            initial={shouldReduce ? {} : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
        >
            <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                            d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.885 3.91 10.5l.59-3.43L2 4.635l3.455-.505L7 1z"
                            fill="white"
                            fillOpacity="0.9"
                        />
                    </svg>
                ))}
            </div>
            <p className="font-sans text-[14px] leading-relaxed text-white/80 italic mb-5">
                "Setelah daftar SynnAI, CV saya langsung dapat feedback yang actionable. Dalam 2 minggu udah dapat panggilan interview dari 4 perusahaan."
            </p>
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 font-sans text-xs font-bold text-white">
                    DP
                </div>
                <div>
                    <p className="font-sans text-[13px] font-semibold text-white">Dinda Pramesti</p>
                    <p className="font-sans text-[11px] text-white/55">Product Designer, Gojek</p>
                </div>
            </div>
        </motion.div>
    );
}

function VisualPanel() {
    const shouldReduce = useReducedMotion();
    return (
        <div className="relative hidden w-[55%] shrink-0 overflow-hidden lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-14">
            <div className="absolute inset-0 bg-transparent" />

            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
            >
                <FloatingOrb cx="85%" cy="15%" r={18} opacity={0.06} delay={0} />
                <FloatingOrb cx="10%" cy="75%" r={28} opacity={0.05} delay={1.5} />
                <FloatingOrb cx="50%" cy="50%" r={14} opacity={0.04} delay={0.8} />
                <FloatingOrb cx="75%" cy="80%" r={10} opacity={0.07} delay={2.2} />
            </svg>

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Brand + headline */}
            <motion.div
                className="relative z-10"
                initial={shouldReduce ? {} : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: EASE }}
            >
                <Link href="/" className="flex items-center gap-2 mb-10 w-fit">
                    <span
                        className="text-[26px] tracking-tight text-white"
                        style={{ fontFamily: 'var(--font-instrument)' }}
                    >
                        SynnAI.
                    </span>
                </Link>

                <h2
                    className="font-instrument text-[48px] md:text-[56px] leading-[0.92] tracking-tight text-white mb-5"
                    style={{ fontFamily: 'var(--font-instrument)' }}
                >
                    Mulai perjalanan <br />
                    <span className="italic">karirmu.</span>
                </h2>

                <p className="font-sans text-[15px] text-white/70 leading-relaxed max-w-xs">
                    Daftar gratis dan dapatkan analisis CV pertamamu dalam hitungan detik.
                </p>
            </motion.div>

            {/* Testimonial */}
            <div className="relative z-10">
                <TestimonialCard />
            </div>

            {/* Stats */}
            <motion.div
                className="relative z-10 flex gap-3"
                initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: EASE }}
            >
                <StatPill value="10K+" label="CV dianalisis" delay={0.6} />
                <StatPill value="94%" label="Lolos screening ATS" delay={0.75} />
                <StatPill value="Gratis" label="Untuk memulai" delay={0.9} />
            </motion.div>
        </div>
    );
}

export default function Register() {
    const [agreed, setAgreed] = useState(false);

    const pw = usePasswordToggle();
    const pwConfirm = usePasswordToggle();
    const shouldReduce = useReducedMotion();

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ['1.5deg', '-1.5deg']);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-1.5deg', '1.5deg']);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (shouldReduce || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/auth/register');
    }

    return (
        <>
            <Head title="Daftar - SynnAI" />

            <div className="relative flex min-h-[100dvh] overflow-hidden bg-[#0871E7]">
                {/* Seamless gradient overlay */}
                <div
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                        background:
                            'linear-gradient(105deg, transparent 0%, transparent 48%, rgba(243,244,237,0.18) 54%, rgba(243,244,237,0.72) 62%, #F3F4ED 72%)',
                    }}
                />

                {/* Visual panel — kiri 55% */}
                <VisualPanel />

                {/* Form panel — kanan 45% */}
                <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-10 lg:w-[45%] lg:flex-none">

                    {/* Mobile brand */}
                    <motion.div
                        className="lg:hidden mb-8"
                        initial={shouldReduce ? {} : { opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE }}
                    >
                        <Link href="/">
                            <span
                                className="text-[28px] tracking-tight text-[#1a1a1a]"
                                style={{ fontFamily: 'var(--font-instrument)' }}
                            >
                                SynnAI.
                            </span>
                        </Link>
                    </motion.div>

                    {/* Form card */}
                    <motion.div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={shouldReduce ? {} : { rotateX, rotateY, transformPerspective: 800 }}
                        className="w-full max-w-[420px]"
                        initial={shouldReduce ? {} : { opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: EASE }}
                    >
                        <div className="rounded-[32px] bg-white/90 border border-black/[0.05] shadow-[0_8px_48px_rgba(0,0,0,0.10)] backdrop-blur-xl px-8 py-10">

                            {/* Heading */}
                            <div className="mb-8">
                                <motion.h1
                                    className="font-instrument text-[34px] leading-[0.95] tracking-tight text-[#1a1a1a] mb-2"
                                    style={{ fontFamily: 'var(--font-instrument)' }}
                                    initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                                >
                                    Buat akun <span className="italic">SynnAI</span>
                                </motion.h1>
                                <motion.p
                                    className="font-sans text-[14px] text-[#1a1a1a]/50"
                                    initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
                                >
                                    Sudah punya akun?{' '}
                                    <Link
                                        href="/auth/login"
                                        className="font-medium text-[#0871E7] hover:opacity-75 transition-opacity"
                                    >
                                        Masuk di sini
                                    </Link>
                                </motion.p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Nama */}
                                <motion.div
                                    className="space-y-1.5"
                                    initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
                                >
                                    <Label htmlFor="name" className="font-sans text-[13px] font-medium text-[#1a1a1a]/70">
                                        Nama Lengkap
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Nama kamu"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="h-11 rounded-2xl border-black/[0.1] bg-[#F3F4ED]/60 font-sans text-[14px] text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 focus:border-[#0871E7]/50 focus:ring-2 focus:ring-[#0871E7]/15 transition-all"
                                    />
                                    {errors.name && (
                                        <p className="font-sans text-[12px] text-red-500">{errors.name}</p>
                                    )}
                                </motion.div>

                                {/* Email */}
                                <motion.div
                                    className="space-y-1.5"
                                    initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.27, ease: EASE }}
                                >
                                    <Label htmlFor="email" className="font-sans text-[13px] font-medium text-[#1a1a1a]/70">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="nama@email.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="h-11 rounded-2xl border-black/[0.1] bg-[#F3F4ED]/60 font-sans text-[14px] text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 focus:border-[#0871E7]/50 focus:ring-2 focus:ring-[#0871E7]/15 transition-all"
                                    />
                                    {errors.email && (
                                        <p className="font-sans text-[12px] text-red-500">{errors.email}</p>
                                    )}
                                </motion.div>

                                {/* Password */}
                                <motion.div
                                    className="space-y-1.5"
                                    initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
                                >
                                    <Label htmlFor="password" className="font-sans text-[13px] font-medium text-[#1a1a1a]/70">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={pw.inputType}
                                            placeholder="Min. 8 karakter"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="h-11 rounded-2xl border-black/[0.1] bg-[#F3F4ED]/60 font-sans text-[14px] text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 pr-10 focus:border-[#0871E7]/50 focus:ring-2 focus:ring-[#0871E7]/15 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={pw.toggle}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70 transition-colors"
                                            tabIndex={-1}
                                            aria-label={pw.visible ? 'Sembunyikan password' : 'Tampilkan password'}
                                        >
                                            {pw.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="font-sans text-[12px] text-red-500">{errors.password}</p>
                                    )}
                                </motion.div>

                                {/* Konfirmasi Password */}
                                <motion.div
                                    className="space-y-1.5"
                                    initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.37, ease: EASE }}
                                >
                                    <Label htmlFor="password_confirmation" className="font-sans text-[13px] font-medium text-[#1a1a1a]/70">
                                        Konfirmasi Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password_confirmation"
                                            type={pwConfirm.inputType}
                                            placeholder="Ulangi password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="h-11 rounded-2xl border-black/[0.1] bg-[#F3F4ED]/60 font-sans text-[14px] text-[#1a1a1a] placeholder:text-[#1a1a1a]/30 pr-10 focus:border-[#0871E7]/50 focus:ring-2 focus:ring-[#0871E7]/15 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={pwConfirm.toggle}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70 transition-colors"
                                            tabIndex={-1}
                                            aria-label={pwConfirm.visible ? 'Sembunyikan password' : 'Tampilkan password'}
                                        >
                                            {pwConfirm.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="font-sans text-[12px] text-red-500">{errors.password_confirmation}</p>
                                    )}
                                </motion.div>

                                {/* Terms */}
                                <motion.div
                                    className="flex items-start gap-2.5"
                                    initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
                                >
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                        className="mt-0.5 h-4 w-4 cursor-pointer rounded-md border-black/20 accent-[#0871E7]"
                                    />
                                    <label htmlFor="terms" className="cursor-pointer font-sans text-[13px] leading-relaxed text-[#1a1a1a]/55">
                                        Saya menyetujui{' '}
                                        <a href="#" className="font-medium text-[#0871E7] hover:opacity-75 transition-opacity">
                                            Syarat Penggunaan
                                        </a>{' '}
                                        dan{' '}
                                        <a href="#" className="font-medium text-[#0871E7] hover:opacity-75 transition-opacity">
                                            Kebijakan Privasi
                                        </a>
                                    </label>
                                </motion.div>

                                {/* Submit */}
                                <motion.div
                                    initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.47, ease: EASE }}
                                >
                                    <Button
                                        type="submit"
                                        disabled={processing || !agreed}
                                        className="group relative w-full h-12 overflow-hidden rounded-full bg-[#0871E7] font-sans text-[14px] font-medium text-white shadow-[inset_0_-4px_4px_rgba(255,255,255,0.39)] outline outline-1 outline-[#0871E7] -outline-offset-1 transition-opacity duration-200 hover:opacity-90 disabled:opacity-60 active:scale-[0.98]"
                                    >
                                        <span
                                            className="pointer-events-none absolute left-[10%] top-[1px] h-4 w-[80%] rounded-[12px] bg-gradient-to-b from-[#DEF0FC] to-transparent transition-transform duration-200 group-hover:scale-x-105"
                                            aria-hidden="true"
                                        />
                                        <span className="relative flex items-center justify-center gap-2">
                                            {processing ? (
                                                <>
                                                    <motion.span
                                                        className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                                    />
                                                    Mendaftar...
                                                </>
                                            ) : (
                                                <>
                                                    Daftar Sekarang
                                                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                                </>
                                            )}
                                        </span>
                                    </Button>
                                </motion.div>
                            </form>
                        </div>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        className="mt-8 flex gap-5"
                        initial={shouldReduce ? {} : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
                    >
                        <a href="#" className="font-sans text-[12px] text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70 transition-colors">
                            Kebijakan Privasi
                        </a>
                        <a href="#" className="font-sans text-[12px] text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70 transition-colors">
                            Syarat Penggunaan
                        </a>
                        <a href="#" className="font-sans text-[12px] text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70 transition-colors">
                            Bantuan
                        </a>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
