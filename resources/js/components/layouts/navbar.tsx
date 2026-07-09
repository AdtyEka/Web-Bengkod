import { Link } from '@inertiajs/react';
import { useState } from 'react';

const NAV_LINKS = [
    { label: 'Tentang', href: '#about' },
    { label: 'Fitur', href: '#features' },
    { label: 'Cara Kerja', href: '#how-it-works' },
    { label: 'Testimoni', href: '#testimonials' },
];

function scrollToSection(href: string) {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        scrollToSection(href);
    };

    return (
        <>
            <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 pointer-events-none">
                <nav className="pointer-events-auto backdrop-blur-md rounded-full bg-transparent border border-black/10 flex items-center justify-between px-5 py-3">
                    {/* Logo */}
                    <span
                        className="text-[28px] tracking-tight text-[#1a1a1a] select-none"
                        style={{ fontFamily: 'var(--font-instrument)' }}
                    >
                        SynnAI.
                    </span>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex gap-10">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="font-sans text-[14px] text-[#1a1a1a] transition-opacity duration-200 hover:opacity-50"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Auth buttons - desktop */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link
                            href="/login"
                            className="rounded-full border border-black/15 bg-white/60 px-5 py-2 font-sans text-[14px] text-[#1a1a1a] backdrop-blur-sm transition-colors duration-200 hover:bg-white/90"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="group relative overflow-hidden rounded-full bg-[#0871E7] px-5 py-2 font-sans text-[14px] text-white shadow-[inset_0_-4px_4px_rgba(255,255,255,0.39)] outline outline-1 outline-[#0871E7] -outline-offset-1 transition-opacity duration-200 hover:opacity-90"
                        >
                            <span
                                className="pointer-events-none absolute left-[10%] top-[1px] h-4 w-[80%] rounded-[12px] bg-gradient-to-b from-[#DEF0FC] to-transparent transition-transform duration-200 group-hover:scale-x-105"
                                aria-hidden="true"
                            />
                            <span className="relative">Register</span>
                        </Link>
                    </div>

                    {/* Mobile burger button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`w-5 h-0.5 bg-[#1a1a1a] transition-all duration-200 ${
                                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                        />
                        <span
                            className={`w-5 h-0.5 bg-[#1a1a1a] transition-all duration-200 ${
                                mobileMenuOpen ? 'opacity-0' : ''
                            }`}
                        />
                        <span
                            className={`w-5 h-0.5 bg-[#1a1a1a] transition-all duration-200 ${
                                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                        />
                    </button>
                </nav>
            </div>

            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <div
                        className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/95 backdrop-blur-md rounded-3xl border border-black/10 p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Mobile nav links */}
                        <div className="flex flex-col gap-4 mb-6">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="font-sans text-[16px] text-[#1a1a1a] py-2 transition-opacity duration-200 hover:opacity-50"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Mobile auth buttons */}
                        <div className="flex flex-col gap-2 pt-4 border-t border-black/10">
                            <Link
                                href="/login"
                                className="w-full text-center rounded-full border border-black/15 bg-white/60 px-5 py-2.5 font-sans text-[14px] text-[#1a1a1a] backdrop-blur-sm transition-colors duration-200 hover:bg-white/90"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="w-full text-center group relative overflow-hidden rounded-full bg-[#0871E7] px-5 py-2.5 font-sans text-[14px] text-white shadow-[inset_0_-4px_4px_rgba(255,255,255,0.39)] outline outline-1 outline-[#0871E7] -outline-offset-1 transition-opacity duration-200 hover:opacity-90"
                            >
                                <span
                                    className="pointer-events-none absolute left-[10%] top-[1px] h-4 w-[80%] rounded-[12px] bg-gradient-to-b from-[#DEF0FC] to-transparent transition-transform duration-200 group-hover:scale-x-105"
                                    aria-hidden="true"
                                />
                                <span className="relative">Register</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
