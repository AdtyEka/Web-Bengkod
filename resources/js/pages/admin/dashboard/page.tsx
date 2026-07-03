import { Head, usePage } from '@inertiajs/react';
import { BarChart2, MessageSquare, Activity, Send } from 'lucide-react';
import AdminLayout from '@/components/layouts/admin-layout';
import { StatsCard } from './_components/stats-card';
import { CvMatcherCard } from './_components/cv-matcher-card';
import { InterviewPerformanceCard } from './_components/interview-performance-card';
import { ActivityHistoryTable } from './_components/activity-history-table';

type ActivityRecord = {
    id: number;
    type: 'CV MATCH' | 'COACHING';
    action: string;
    company: string;
    date: string;
    result: string;
    resultVariant: 'primary' | 'success' | 'error' | 'warning';
};

type Stats = {
    cvMatchScore: string;
    interviewsCompleted: number;
    avgCommunication: string;
    totalActivities: number;
};

type Props = {
    userName: string;
    recentActivities: ActivityRecord[];
    stats: Stats;
};

export default function Dashboard() {
    const { userName, recentActivities, stats } = usePage<{ props: Props }>().props as unknown as Props;

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="p-6 md:p-10 space-y-10">
                {/* Welcome Header */}
                <section>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Welcome back, {userName}!
                    </h1>
                    <p className="mt-2 text-base text-muted-foreground">
                        You have{' '}
                        <span className="font-bold text-[#004ac6]">{stats.totalActivities} activities</span>{' '}
                        recorded. Keep training to improve your readiness.
                    </p>
                </section>

                {/* Stats Row */}
                <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        icon={BarChart2}
                        iconClassName="text-[#004ac6]"
                        iconBgClassName="bg-[#dbe1ff]"
                        value={stats.cvMatchScore}
                        label="Avg CV Match Score"
                    />
                    <StatsCard
                        icon={MessageSquare}
                        iconClassName="text-[#632ecd]"
                        iconBgClassName="bg-[#e9ddff]"
                        value={String(stats.interviewsCompleted)}
                        label="Interviews Completed"
                    />
                    <StatsCard
                        icon={Activity}
                        iconClassName="text-orange-500"
                        iconBgClassName="bg-orange-50"
                        value={stats.avgCommunication}
                        label="Avg Interview Rating"
                    />
                    <StatsCard
                        icon={Send}
                        iconClassName="text-[#004ac6]"
                        iconBgClassName="bg-[#d8e3fb]"
                        value={String(stats.totalActivities)}
                        label="Total Activities"
                    />
                </section>

                {/* Bento Grid — CV Matcher + Interview */}
                <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <CvMatcherCard />
                    <InterviewPerformanceCard />
                </section>

                {/* Activity History Table */}
                <section>
                    <ActivityHistoryTable activities={recentActivities} />
                </section>
            </div>
        </AdminLayout>
    );
}
