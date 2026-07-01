import { Head } from '@inertiajs/react';
import AdminLayout from '@/components/layouts/admin-layout';
import { StatsRow } from './_components/stats-row';
import { ActivityTable } from './_components/activity-table';
import { BottomPanels } from './_components/bottom-panels';

export default function History() {
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
                <StatsRow />

                {/* Activity Table */}
                <ActivityTable />

                {/* Bottom Panels */}
                <BottomPanels />
            </div>
        </AdminLayout>
    );
}
