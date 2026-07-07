import { Head } from '@inertiajs/react';
import AdminLayout from '@/components/layouts/admin-layout';
import { StatsRow } from './_components/stats-row';
import { ActivityTable } from './_components/activity-table';
import { BottomPanels } from './_components/bottom-panels';

export type ActivityItem = {
    id: number;
    type: 'cv_match' | 'interview_coach';
    role: string;
    company: string | null;
    date: string;
    time: string;
    resultType: 'match' | 'rating';
    matchValue?: number;
    ratingValue?: number;
    details?: any;
};

export type Pagination = {
    currentPage: number;
    lastPage: number;
    total: number;
    perPage: number;
};

export type HistoryStats = {
    totalActivities: number;
    cvMatchCount: number;
    interviewCount: number;
};

export type HistoryInsights = {
    avgCvMatch: number | null;
    avgInterviewScore: number | null;
};

type Props = {
    activities: ActivityItem[];
    pagination: Pagination;
    stats: HistoryStats;
    insights: HistoryInsights;
    activeFilter: string;
};

export default function History({ activities, pagination, stats, insights, activeFilter }: Props) {
    return (
        <AdminLayout title="History">
            <Head title="Activity History" />

            <div className="space-y-8 p-6 md:p-10">
                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Activity History
                    </h1>
                    <p className="mt-1 text-base text-muted-foreground">
                        Review and manage your past AI-driven evaluations and sessions.
                    </p>
                </div>

                {/* Stats Row */}
                <StatsRow stats={stats} />

                {/* Activity Table */}
                <ActivityTable
                    activities={activities}
                    pagination={pagination}
                    activeFilter={activeFilter}
                />

                {/* Bottom Panels */}
                <BottomPanels insights={insights} />
            </div>
        </AdminLayout>
    );
}
