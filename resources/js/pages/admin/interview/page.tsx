import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/components/layouts/admin-layout';
import { ChatSession } from './_components/chat-session';
import { LiveFeedback } from './_components/live-feedback';
import { useState } from 'react';
import axios from 'axios';

interface PageProps {
    cvMatchRole?: string;
    skillsFound?: string[];
    skillsMissing?: string[];
}

export default function InterviewCoach({ cvMatchRole = 'Software Engineer', skillsFound = [], skillsMissing = [] }: PageProps) {
    const [evaluation, setEvaluation] = useState<any>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);

    const handleEndSession = async (sessionSummary?: any) => {
        if (!evaluation) {
            router.visit('/admin/history');
            return;
        }

        try {
            await axios.post('/api/interview/save', {
                role: cvMatchRole,
                evaluation: sessionSummary || evaluation
            });
        } catch (error) {
            console.error('Failed to save session activity', error);
        } finally {
            router.visit('/admin/history');
        }
    };

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
                        Role: {cvMatchRole}
                    </p>
                </div>

                {/* Main Layout */}
                <div className="flex min-h-0 flex-1 gap-6">
                    {/* Chat — takes most of the width */}
                    <div className="flex min-h-0 flex-1 flex-col">
                        <ChatSession 
                            role={cvMatchRole}
                            skillsFound={skillsFound}
                            skillsMissing={skillsMissing}
                            onFeedback={(evalData) => setEvaluation(evalData)} 
                            onSessionIdChange={(id) => setSessionId(id)}
                            onEndSession={handleEndSession}
                        />
                    </div>

                    {/* Live Feedback sidebar */}
                    <div className="w-72 shrink-0">
                        <LiveFeedback evaluation={evaluation} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
