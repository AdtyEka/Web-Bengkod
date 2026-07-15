import { Head, usePage } from '@inertiajs/react';
import { BarChart2, MessageSquare, Activity, Send } from 'lucide-react';
import AdminLayout from '@/components/layouts/admin-layout';
import { CvMatcherChart } from './_components/cv-matcher-chart';
import { InterviewPerformanceCard } from './_components/interview-performance-card';
import { StatsCard } from './_components/stats-card';

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

export type DashboardActivity = {
    id: number;
    role: string;
    company: string | null;
    match_value: number | null;
    rating_value: number | null;
    created_at: string;
    details: any;
};

type Props = {
    userName: string;
    recentActivities: ActivityRecord[];
    stats: Stats;
    lastCvMatch: DashboardActivity | null;
    lastInterview: DashboardActivity | null;
    chartData: { date: string; desktop: number; mobile: number }[];
};

export default function Dashboard() {
    const { userName, stats, lastInterview, chartData } = usePage<{ props: Props }>().props as unknown as Props;

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="h-[calc(100vh-4rem)] overflow-hidden p-6 md:p-10 space-y-10">
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
                        iconClassName="text-[#0871E7]"
                        iconBgClassName="bg-[#dbe1ff]"
                        value={String(stats.interviewsCompleted)}
                        label="Interviews Completed"
                    />
                    <StatsCard
                        icon={Activity}
                        iconClassName="text-[#0871E7]"
                        iconBgClassName="bg-[#dbe1ff]"
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

                {/* Bento Grid — CV Matcher Chart + Interview */}
                <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <CvMatcherChart chartData={chartData} />
                    <InterviewPerformanceCard activity={lastInterview} />
                </section>
            </div>
        </AdminLayout>
    );
}
