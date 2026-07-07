import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck, User } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePasswordToggle } from '@/hooks/use-password-toggle';

export default function Register() {
    const [role, setRole] = useState<'student' | 'professional'>('student');
    const [agreed, setAgreed] = useState(false);

    const pw = usePasswordToggle();
    const pwConfirm = usePasswordToggle();

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        role: 'student' as 'student' | 'professional',
        password: '',
        password_confirmation: '',
    });

    function handleRoleChange(value: 'student' | 'professional') {
        setRole(value);
        setData('role', value);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/auth/register');
    }

    return (
        <>
            <Head title="Create Account — SkillSync AI" />

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
                            Join the future of
                            <br />
                            enterprise talent.
                        </h1>
                        <p className="mt-5 text-lg leading-relaxed text-white/75">
                            SkillSync AI uses advanced machine learning to bridge the gap between human potential and
                            corporate strategic goals.
                        </p>

                        {/* Testimonial */}
                        <div className="mt-12 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                                    ER
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Elena Rodriguez</p>
                                    <p className="text-xs text-white/65">Chief People Officer, Global Tech</p>
                                </div>
                            </div>
                            <p className="mt-4 text-sm leading-relaxed text-white/80 italic">
                                "SkillSync AI transformed our talent acquisition workflow. We reduced time-to-hire by
                                40% while significantly increasing skill alignment."
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
                                {/* Full Name */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="John Doe"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="h-11 rounded-xl border-gray-200 bg-gray-50 pl-10 focus:border-[#2563eb] focus:ring-[#2563eb]/20"
                                        />
                                    </div>
                                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                                </div>

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

                                {/* Account Role */}
                                <div className="space-y-1.5">
                                    <Label className="text-sm font-semibold text-gray-700">Account Role</Label>
                                    <div className="grid grid-cols-2 rounded-xl border border-gray-200 bg-gray-100 p-1">
                                        <button
                                            type="button"
                                            onClick={() => handleRoleChange('student')}
                                            className={`rounded-lg py-2 text-sm font-semibold transition-all ${
                                                role === 'student'
                                                    ? 'bg-white text-[#2563eb] shadow-sm'
                                                    : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        >
                                            Student/Graduate
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleRoleChange('professional')}
                                            className={`rounded-lg py-2 text-sm font-semibold transition-all ${
                                                role === 'professional'
                                                    ? 'bg-white text-[#2563eb] shadow-sm'
                                                    : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        >
                                            Professional
                                        </button>
                                    </div>
                                </div>

                                {/* Password row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                            Password
                                        </Label>
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
                                        {errors.password && (
                                            <p className="text-xs text-red-500">{errors.password}</p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label
                                            htmlFor="password_confirmation"
                                            className="text-sm font-semibold text-gray-700"
                                        >
                                            Confirm Password
                                        </Label>
                                        <div className="relative">
                                            <ShieldCheck className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                            <Input
                                                id="password_confirmation"
                                                type={pwConfirm.inputType}
                                                placeholder="••••••••"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                className="h-11 rounded-xl border-gray-200 bg-gray-50 pl-10 pr-10 focus:border-[#2563eb] focus:ring-[#2563eb]/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={pwConfirm.toggle}
                                                className="absolute top-1/2 right-3.5 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                tabIndex={-1}
                                            >
                                                {pwConfirm.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        {errors.password_confirmation && (
                                            <p className="text-xs text-red-500">{errors.password_confirmation}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Terms */}
                                <div className="flex items-start gap-2.5">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                        className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 accent-[#2563eb]"
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="cursor-pointer text-sm leading-relaxed text-gray-600"
                                    >
                                        I agree to the{' '}
                                        <a href="#" className="font-semibold text-[#2563eb] hover:underline">
                                            Terms of Service
                                        </a>{' '}
                                        and{' '}
                                        <a href="#" className="font-semibold text-[#2563eb] hover:underline">
                                            Privacy Policy
                                        </a>{' '}
                                        regarding data usage and AI analysis.
                                    </label>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    disabled={processing || !agreed}
                                    className="h-12 w-full rounded-xl bg-[#2563eb] text-sm font-bold text-white hover:bg-[#1d4ed8] disabled:opacity-60"
                                >
                                    {processing ? (
                                        'Creating account...'
                                    ) : (
                                        <>
                                            Create Account <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>

                                <p className="text-center text-sm text-gray-500">
                                    Already have an account?{' '}
                                    <Link href="/auth/login" className="font-bold text-[#2563eb] hover:underline">
                                        Log in
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
