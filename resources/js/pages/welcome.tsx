import { Head } from '@inertiajs/react';
import Footer from '@/components/layouts/footer';
import Navbar from '@/components/layouts/navbar';
import Cta from '@/components/sections/Cta';
import FeatureGrid from '@/components/sections/FeatureGrid';
import Features from '@/components/sections/Features';
import Hero from '@/components/sections/Hero';
import Integrations from '@/components/sections/Integrations';
import Okrs from '@/components/sections/Okrs';
import Stats from '@/components/sections/Stats';

export default function Welcome() {
    return (
        <>
            <Head title="SkillSync AI | The AI-Powered Career Platform" />
            <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-blue-500/20 selection:text-[#004ac6] dark:selection:text-blue-300">
                <Navbar />
                <main className="grow">
                    <Hero />
                    <Stats />
                    <Features />
                    <Okrs />
                    <Integrations />
                    <FeatureGrid />
                    <Cta />
                </main>
                <Footer />
            </div>
        </>
    );
}
