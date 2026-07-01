import { Head } from '@inertiajs/react';
import AdminLayout from '@/components/layouts/admin-layout';
import { ChatSession } from './_components/chat-session';
import { LiveFeedback } from './_components/live-feedback';

export default function InterviewCoach() {
    return (
        <AdminLayout title="Interview Coach">
            <Head title="Interview Coach" />

            <div className="flex h-[calc(100vh-4rem)] flex-col p-6 md:p-10">
                {/* Page Header */}
                <div className="mb-6 shrink-0">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        AI Interview Coach
                    </h1>
                    <p className="mt-1 text-base text-muted-foreground">
                        Role: Senior Frontend Developer
                    </p>
                </div>

                {/* Main Layout */}
                <div className="flex min-h-0 flex-1 gap-6">
                    {/* Chat — takes most of the width */}
                    <div className="flex min-h-0 flex-1 flex-col">
                        <ChatSession />
                    </div>

                    {/* Live Feedback sidebar */}
                    <div className="w-72 shrink-0">
                        <LiveFeedback />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
