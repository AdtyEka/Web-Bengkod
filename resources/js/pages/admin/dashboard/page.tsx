import { Head } from '@inertiajs/react';
import { BarChart2, MessageSquare, Mic, Send } from 'lucide-react';
import AdminLayout from '@/components/layouts/admin-layout';
import { StatsCard } from './_components/stats-card';
import { CvMatcherCard } from './_components/cv-matcher-card';
import { InterviewPerformanceCard } from './_components/interview-performance-card';
import { ActivityHistoryTable } from './_components/activity-history-table';

export default function Dashboard() {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="p-6 md:p-10 space-y-10">
                {/* Welcome Header */}
                <section>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Welcome back, Jane!
                    </h1>
                    <p className="mt-2 text-base text-muted-foreground">
                        Your career readiness is currently{' '}
                        <span className="font-bold text-[#004ac6]">Top 15%</span> for Frontend
                        roles. Keep training to hit 100%.
                    </p>
                </section>

                {/* Stats Row */}
                <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        icon={BarChart2}
                        iconClassName="text-[#004ac6]"
                        iconBgClassName="bg-[#dbe1ff]"
                        value="82%"
                        label="CV Match Score"
                        badge="+4.2%"
                        badgeClassName="text-green-600"
                    />
                    <StatsCard
                        icon={MessageSquare}
                        iconClassName="text-[#632ecd]"
                        iconBgClassName="bg-[#e9ddff]"
                        value="12"
                        label="Interviews Completed"
                    />
                    <StatsCard
                        icon={Mic}
                        iconClassName="text-orange-500"
                        iconBgClassName="bg-orange-50"
                        value="High / 4.5"
                        label="Avg Communication"
                    />
                    <StatsCard
                        icon={Send}
                        iconClassName="text-[#004ac6]"
                        iconBgClassName="bg-[#d8e3fb]"
                        value="5"
                        label="Job Applications"
                    />
                </section>

                {/* Bento Grid — CV Matcher + Interview */}
                <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <CvMatcherCard />
                    <InterviewPerformanceCard />
                </section>

                {/* Activity History Table */}
                <section>
                    <ActivityHistoryTable />
                </section>
            </div>
        </AdminLayout>
    );
}
