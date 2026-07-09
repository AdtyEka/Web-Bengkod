const SOCIAL_LINKS = [
    {
        name: 'Instagram',
        href: 'https://instagram.com/skillsyncai',
        icon: (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        name: 'LinkedIn',
        href: 'https://linkedin.com/company/skillsyncai',
        icon: (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="4" cy="4" r="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        name: 'YouTube',
        href: 'https://youtube.com/@skillsyncai',
        icon: (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

const FOOTER_LINKS = [
    {
        title: 'Navigasi',
        links: [
            { label: 'Tentang', href: '#about' },
            { label: 'Fitur', href: '#features' },
            { label: 'Cara Kerja', href: '#how-it-works' },
            { label: 'Testimoni', href: '#testimonials' },
        ],
    },
    {
        title: 'Auth',
        links: [
            { label: 'Login', href: '/auth/login' },
            { label: 'Register', href: '/auth/register' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Kebijakan Privasi', href: '/privacy' },
            { label: 'Syarat & Ketentuan', href: '/terms' },
        ],
    },
];

function scrollToSection(href: string) {
    if (href.startsWith('#')) {
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else {
        window.location.href = href;
    }
}

export default function Footer() {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            scrollToSection(href);
        }
    };

    return (
        <footer className="relative w-full bg-[#1a1a1a] rounded-t-[48px] pt-20 pb-10">
            <div className="mx-auto max-w-7xl px-6">
                {/* Top row: brand + nav columns */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)] mb-16">
                    {/* Brand column */}
                    <div>
                        <p className="font-instrument text-[26px] text-white mb-3 tracking-tight">
                            SynnAI.
                        </p>
                        <p className="font-sans text-[13px] text-white/40 leading-relaxed max-w-[220px] mb-6">
                            Empowering the Next Generation of Professionals.
                        </p>

                        {/* Social links */}
                        <div className="flex items-center gap-3">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-200 hover:border-white/25 hover:text-white/80"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {FOOTER_LINKS.map((col) => (
                        <div key={col.title}>
                            <p className="font-sans text-[11px] font-semibold tracking-widest uppercase text-white/30 mb-4">
                                {col.title}
                            </p>
                            <ul className="flex flex-col gap-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                            className="font-sans text-[13px] text-white/50 transition-colors duration-200 hover:text-white/90"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/8 mb-8" />

                {/* Bottom row: copyright + contact */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <p className="font-sans text-[12px] text-white/25">
                        © 2026 SynnAI. All Rights Reserved.
                    </p>
                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6">
                        <a
                            href="mailto:support@synnai.ai"
                            className="font-sans text-[12px] text-white/30 transition-colors hover:text-white/60"
                        >
                            support@synnai.ai
                        </a>
                        <a
                            href="tel:+6281234567890"
                            className="font-sans text-[12px] text-white/30 transition-colors hover:text-white/60"
                        >
                            +62 812-3456-7890
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
