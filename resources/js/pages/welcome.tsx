import { Head } from '@inertiajs/react';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';
import Cta from '@/components/sections/Cta';

export default function Welcome() {
    return (
        <>
            <Head title="SkillSync AI | CV Optimizer" />
            <div className="flex min-h-screen flex-col bg-[#F3F4ED] text-foreground selection:bg-blue-500/20 selection:text-[#004ac6] dark:selection:text-blue-300">
                <Navbar />
                <main className="grow">
                    <Hero />
                    <About />
                    <Features />
                    <HowItWorks />
                    <Testimonials />
                    <Cta />
                </main>
                <Footer />
            </div>
        </>
    );
}
