'use client';

import { Head, Link, useForm } from '@inertiajs/react';
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

const STEPS = [
    { num: '01', title: 'Masukkan email', desc: 'Email yang terdaftar di akun SynnAI kamu.' },
    { num: '02', title: 'Cek inbox', desc: 'Link reset akan tiba dalam beberapa menit.' },
    { num: '03', title: 'Buat password baru', desc: 'Ikuti link untuk membuat password yang kuat.' },
];

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
                    Reset password <br />
                    <span className="italic">dengan mudah.</span>
                </h2>

                <p className="font-sans text-[15px] text-white/70 leading-relaxed max-w-xs mb-10">
                    Cukup tiga langkah dan akun kamu kembali aman.
                </p>

                {/* Steps */}
                <div className="space-y-3">
                    {STEPS.map(({ num, title, desc }, i) => (
                        <motion.div
                            key={num}
                            className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm"
                            initial={shouldReduce ? {} : { opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: EASE }}
                        >
                            <span className="mt-0.5 font-sans text-[11px] font-bold tracking-widest text-white/40">
                                {num}
                            </span>
                            <div>
                                <p className="font-sans text-[13px] font-semibold text-white">{title}</p>
                                <p className="font-sans text-[12px] leading-relaxed text-white/60 mt-0.5">{desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div
                className="relative z-10 flex gap-3"
                initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: EASE }}
            >
                <StatPill value="10K+" label="CV dianalisis" delay={0.6} />
                <StatPill value="94%" label="Lolos screening ATS" delay={0.75} />
                <StatPill value="3 dtk" label="Waktu analisis" delay={0.9} />
            </motion.div>
        </div>
    );
}

export default function ForgotPassword() {
    const { data, setData, post, processing, errors, wasSuccessful } = useForm({
        email: '',
    });

    const shouldReduce = useReducedMotion();

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
        post('/auth/forgot-password');
    }

    return (
        <>
            <Head title="Lupa Password - SynnAI" />

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

                    {/* Card */}
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

                            {wasSuccessful ? (
                                /* Success state */
                                <motion.div
                                    className="text-center py-4"
                                    initial={shouldReduce ? {} : { opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, ease: EASE }}
                                >
                                    {/* Icon */}
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0871E7]/10">
                                        <CheckCircle className="h-8 w-8 text-[#0871E7]" />
                                    </div>

                                    <h2
                                        className="font-instrument text-[28px] leading-[0.95] tracking-tight text-[#1a1a1a] mb-3"
                                        style={{ fontFamily: 'var(--font-instrument)' }}
                                    >
                                        Cek <span className="italic">inbox-mu</span>
                                    </h2>
                                    <p className="font-sans text-[14px] text-[#1a1a1a]/55 leading-relaxed mb-2">
                                        Link reset sudah dikirim ke{' '}
                                        <span className="font-medium text-[#1a1a1a]/80">{data.email}</span>.
                                        Link berlaku selama 60 menit.
                                    </p>
                                    <p className="font-sans text-[13px] text-[#1a1a1a]/40 leading-relaxed mt-4">
                                        Tidak menerima email? Cek folder spam atau{' '}
                                        <button
                                            type="button"
                                            onClick={() => post('/auth/forgot-password')}
                                            className="font-medium text-[#0871E7] hover:opacity-75 transition-opacity"
                                        >
                                            kirim ulang
                                        </button>
                                        .
                                    </p>

                                    <Link
                                        href="/auth/login"
                                        className="mt-8 inline-flex items-center gap-2 font-sans text-[13px] font-medium text-[#1a1a1a]/50 hover:text-[#1a1a1a]/80 transition-colors"
                                    >
                                        <ArrowLeft className="h-3.5 w-3.5" />
                                        Kembali ke halaman masuk
                                    </Link>
                                </motion.div>
                            ) : (
                                /* Form state */
                                <>
                                    {/* Heading */}
                                    <div className="mb-8">
                                        <motion.h1
                                            className="font-instrument text-[34px] leading-[0.95] tracking-tight text-[#1a1a1a] mb-2"
                                            style={{ fontFamily: 'var(--font-instrument)' }}
                                            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                                        >
                                            Lupa <span className="italic">password?</span>
                                        </motion.h1>
                                        <motion.p
                                            className="font-sans text-[14px] text-[#1a1a1a]/50"
                                            initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
                                        >
                                            Masukkan email dan kami kirimkan link reset.
                                        </motion.p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Email */}
                                        <motion.div
                                            className="space-y-1.5"
                                            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
                                        >
                                            <Label
                                                htmlFor="email"
                                                className="font-sans text-[13px] font-medium text-[#1a1a1a]/70"
                                            >
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

                                        {/* Submit */}
                                        <motion.div
                                            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
                                        >
                                            <Button
                                                type="submit"
                                                disabled={processing}
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
                                                                transition={{
                                                                    duration: 0.8,
                                                                    repeat: Infinity,
                                                                    ease: 'linear',
                                                                }}
                                                            />
                                                            Mengirim...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Kirim Link Reset
                                                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                                        </>
                                                    )}
                                                </span>
                                            </Button>
                                        </motion.div>

                                        {/* Back to login */}
                                        <motion.div
                                            initial={shouldReduce ? {} : { opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.8, delay: 0.34, ease: EASE }}
                                        >
                                            <Link
                                                href="/auth/login"
                                                className="flex items-center justify-center gap-2 font-sans text-[13px] font-medium text-[#1a1a1a]/45 hover:text-[#1a1a1a]/70 transition-colors"
                                            >
                                                <ArrowLeft className="h-3.5 w-3.5" />
                                                Kembali ke halaman masuk
                                            </Link>
                                        </motion.div>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        className="mt-8 flex gap-5"
                        initial={shouldReduce ? {} : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
                    >
                        <a
                            href="#"
                            className="font-sans text-[12px] text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70 transition-colors"
                        >
                            Kebijakan Privasi
                        </a>
                        <a
                            href="#"
                            className="font-sans text-[12px] text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70 transition-colors"
                        >
                            Syarat Penggunaan
                        </a>
                        <a
                            href="#"
                            className="font-sans text-[12px] text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70 transition-colors"
                        >
                            Bantuan
                        </a>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
