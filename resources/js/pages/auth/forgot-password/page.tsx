import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, CheckCircle, KeyRound, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassword() {
    const { data, setData, post, processing, errors, wasSuccessful } = useForm({
        email: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/auth/forgot-password');
    }

    return (
        <>
            <Head title="Forgot Password — SkillSync AI" />

            <div className="flex min-h-screen">
                {/* Left panel — 60% */}
                <div className="relative hidden w-3/5 shrink-0 overflow-hidden bg-[#2563eb] lg:flex lg:flex-col lg:justify-between lg:px-16 lg:py-14">
                    {/* Background circles */}
                    <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-white/5" />
                    <div className="absolute -right-16 -bottom-16 h-72 w-72 rounded-full bg-white/10" />
                    <div className="absolute top-1/2 left-1/3 h-48 w-48 -translate-y-1/2 rounded-full bg-white/5" />

                    {/* Top content */}
                    <div className="relative z-10 max-w-lg">
                        <h1 className="text-5xl leading-tight font-extrabold text-white">
                            Secure account
                            <br />
                            recovery.
                        </h1>
                        <p className="mt-5 text-lg leading-relaxed text-white/75">
                            We'll send a secure reset link to your registered email address. Your account and data
                            remain fully protected.
                        </p>

                        {/* Steps */}
                        <div className="mt-12 space-y-4">
                            {[
                                { step: '01', title: 'Enter your email', desc: 'Provide the email linked to your SkillSync AI account.' },
                                { step: '02', title: 'Check your inbox', desc: 'A reset link will arrive within a few minutes.' },
                                { step: '03', title: 'Set a new password', desc: 'Follow the link to create a strong new password.' },
                            ].map(({ step, title, desc }) => (
                                <div key={step} className="flex items-start gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                                    <span className="mt-0.5 text-xs font-extrabold tracking-widest text-white/50">
                                        {step}
                                    </span>
                                    <div>
                                        <p className="text-sm font-bold text-white">{title}</p>
                                        <p className="mt-0.5 text-xs leading-relaxed text-white/65">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="relative z-10 flex max-w-lg gap-4">
                        <div className="flex-1 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                            <p className="text-4xl font-extrabold text-white">15k+</p>
                            <p className="mt-1.5 text-xs font-semibold tracking-widest text-white/65 uppercase">
                                Active Professionals
                            </p>
                        </div>
                        <div className="flex-1 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                            <p className="text-4xl font-extrabold text-white">98%</p>
                            <p className="mt-1.5 text-xs font-semibold tracking-widest text-white/65 uppercase">
                                Skill Match Rate
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right panel — 40%, vertically centered */}
                <div className="flex flex-1 flex-col bg-white">
                    <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 sm:px-12">
                        <div className="w-full max-w-sm">
                            {/* Logo */}
                            <Link href="/" className="flex w-fit items-center gap-2.5">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563eb]">
                                    <ArrowLeft className="h-4 w-4 text-white" strokeWidth={2.5} />
                                </div>
                                <span className="text-xl font-bold text-[#2563eb]">SkillSync AI</span>
                            </Link>
                            <p className="mt-1.5 text-sm text-gray-500">Empowering enterprise talent management.</p>

                            {wasSuccessful ? (
                                /* Success state */
                                <div className="mt-10 text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                                        <CheckCircle className="h-8 w-8 text-green-500" />
                                    </div>
                                    <h2 className="mt-5 text-xl font-bold text-gray-900">Check your inbox</h2>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                        We've sent a password reset link to{' '}
                                        <span className="font-semibold text-gray-700">{data.email}</span>. The link
                                        expires in 60 minutes.
                                    </p>
                                    <p className="mt-4 text-xs text-gray-400">
                                        Didn't receive it? Check your spam folder or{' '}
                                        <button
                                            type="button"
                                            onClick={() => post('/auth/forgot-password')}
                                            className="font-semibold text-[#2563eb] hover:underline"
                                        >
                                            resend the email
                                        </button>
                                        .
                                    </p>
                                    <Link
                                        href="/auth/login"
                                        className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-[#2563eb] hover:underline"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to Log In
                                    </Link>
                                </div>
                            ) : (
                                /* Form state */
                                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                    {/* Icon + heading */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                                            <KeyRound className="h-5 w-5 text-[#2563eb]" />
                                        </div>
                                        <div>
                                            <h2 className="text-base font-bold text-gray-900">Reset your password</h2>
                                            <p className="text-xs text-gray-500">
                                                Enter your email and we'll send a reset link.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                            Work Email
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="name@company.com"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="h-11 rounded-xl border-gray-200 bg-gray-50 pl-10 focus:border-[#2563eb] focus:ring-[#2563eb]/20"
                                            />
                                        </div>
                                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                    </div>

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="h-12 w-full rounded-xl bg-[#2563eb] text-sm font-bold text-white hover:bg-[#1d4ed8] disabled:opacity-60"
                                    >
                                        {processing ? (
                                            'Sending...'
                                        ) : (
                                            <>
                                                Send Reset Link <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>

                                    <Link
                                        href="/auth/login"
                                        className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#2563eb]"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to Log In
                                    </Link>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Footer links */}
                    <div className="flex justify-center gap-6 px-8 pb-8">
                        <a href="#" className="text-xs text-gray-400 hover:text-gray-600">
                            Enterprise FAQ
                        </a>
                        <a href="#" className="text-xs text-gray-400 hover:text-gray-600">
                            Security Center
                        </a>
                        <a href="#" className="text-xs text-gray-400 hover:text-gray-600">
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
