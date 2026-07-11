import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MESSAGES = [
    'CV kamu siap?',
    'Yuk, kita cek.',
    'ATS-friendly!',
    'Lamaran diterima.',
];
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_BEFORE_DELETE = 2000;

function TypingMessages() {
    const [messageIndex, setMessageIndex] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentMessage = MESSAGES[messageIndex];

        if (!isDeleting && displayed.length < currentMessage.length) {
            const timer = setTimeout(() => {
                setDisplayed(currentMessage.slice(0, displayed.length + 1));
            }, TYPING_SPEED);
            return () => clearTimeout(timer);
        }

        if (!isDeleting && displayed.length === currentMessage.length) {
            const timer = setTimeout(() => setIsDeleting(true), PAUSE_BEFORE_DELETE);
            return () => clearTimeout(timer);
        }

        if (isDeleting && displayed.length > 0) {
            const timer = setTimeout(() => {
                setDisplayed(displayed.slice(0, displayed.length - 1));
            }, DELETING_SPEED);
            return () => clearTimeout(timer);
        }

        if (isDeleting && displayed.length === 0) {
            setIsDeleting(false);
            setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
        }
    }, [displayed, isDeleting, messageIndex]);

    return (
        <div className="absolute left-[48.5%] md:left-[47.5%] lg:left-[48.5%] -translate-x-1/2 bottom-[34%] z-30 w-[110px] sm:w-[130px] flex justify-start text-left">
            <span
                className="text-[#2A3616] text-[9px] sm:text-[12px] leading-tight break-words min-h-[1.5em]"
                style={{ fontFamily: 'var(--font-nokia)' }}
            >
                {displayed}
            </span>
            <motion.span
                className="inline-block w-1.5 h-3 bg-[#2A3616] ml-0.5 align-middle"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
}

export default function Hero() {
    return (
        <section className="relative bg-[#F3F4ED] overflow-hidden flex flex-col rounded-b-[48px]" style={{ minHeight: '125vh' }}>
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center"
                >
                    <source
                        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260427_054418_a6d194f0-ac86-4df9-abe5-ded73e596d7c.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className="absolute inset-0 bg-white/5" />
            </div>

            {/* Typing messages overlaid on phone screen */}
            <TypingMessages />

            {/* Hero text — pinned to top portion, phone shows fully below */}
            <div className="relative z-20 flex flex-col items-center text-center px-6 pt-28 md:pt-36 pointer-events-none">
                <motion.h1
                    className="font-instrument text-[40px] md:text-[60px] lg:text-[76px] leading-[0.9] tracking-tight text-[#1a1a1a] mb-5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    CV-mu kurang greget? <br />
                    <span className="italic">Kita benerin.</span>
                </motion.h1>

                <motion.p
                    className="font-sans text-[15px] md:text-[17px] text-[#1a1a1a]/65 leading-relaxed font-normal max-w-lg mx-auto mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    Upload CV-mu, biarkan AI kami yang analisis. Skor ATS, saran konten, sampai template siap pakai semua dalam hitungan detik.
                </motion.p>
            </div>
        </section>
    );
}
