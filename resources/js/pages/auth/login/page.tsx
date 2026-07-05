import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';

import { usePasswordToggle } from '@/hooks/use-password-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const pw = usePasswordToggle();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/auth/login');
    }

    return (
        <>
            <Head title="Log In — SkillSync AI" />

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
                            Welcome back to
                            <br />
                            SkillSync AI.
                        </h1>
                        <p className="mt-5 text-lg leading-relaxed text-white/75">
                            Continue your journey toward smarter talent management and AI-powered career growth.
                        </p>

                        {/* Testimonial */}
                        <div className="mt-12 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                                    MK
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Marcus Kim</p>
                                    <p className="text-xs text-white/65">VP of Engineering, NexaCloud</p>
                                </div>
                            </div>
                            <p className="mt-4 text-sm leading-relaxed text-white/80 italic">
                                "Every session with SkillSync AI sharpens my team's interview process. The real-time
                                feedback is unlike anything else on the market."
                            </p>
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

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                {/* Work Email */}
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

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                            Password
                                        </Label>
                                        <a href="/auth/forgot-password" className="text-xs font-semibold text-[#2563eb] hover:underline">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="password"
                                            type={pw.inputType}
                                            placeholder="••••••••"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="h-11 rounded-xl border-gray-200 bg-gray-50 pl-10 pr-10 focus:border-[#2563eb] focus:ring-[#2563eb]/20"
                                        />
                                        <button
                                            type="button"
                                            onClick={pw.toggle}
                                            className="absolute top-1/2 right-3.5 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            tabIndex={-1}
                                        >
                                            {pw.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                                </div>

                                {/* Remember me */}
                                <div className="flex items-center gap-2.5">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-[#2563eb]"
                                    />
                                    <label htmlFor="remember" className="cursor-pointer text-sm text-gray-600">
                                        Keep me signed in
                                    </label>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="h-12 w-full rounded-xl bg-[#2563eb] text-sm font-bold text-white hover:bg-[#1d4ed8] disabled:opacity-60"
                                >
                                    {processing ? (
                                        'Signing in...'
                                    ) : (
                                        <>
                                            Log In <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>

                                <p className="text-center text-sm text-gray-500">
                                    Don't have an account?{' '}
                                    <Link href="/auth/register" className="font-bold text-[#2563eb] hover:underline">
                                        Create one
                                    </Link>
                                </p>
                            </form>
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
