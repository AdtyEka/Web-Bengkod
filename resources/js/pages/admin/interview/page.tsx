import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { Play } from 'lucide-react';
import AdminLayout from '@/components/layouts/admin-layout';
import { ChatSession } from './_components/chat-session';
import { LiveFeedback } from './_components/live-feedback';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface PageProps {
    cvMatchRole?: string;
    skillsFound?: string[];
    skillsMissing?: string[];
}

export default function InterviewCoach({ cvMatchRole = 'Software Engineer', skillsFound = [], skillsMissing = [] }: PageProps) {
    const [evaluation, setEvaluation] = useState<any>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isStarted, setIsStarted] = useState(false);
    const [level, setLevel] = useState<string>('mid');

    const handleEndSession = async (sessionSummary?: any) => {
        const payload = sessionSummary || evaluation;
        
        if (!payload) {
            router.visit('/admin/history');
            return;
        }

        try {
            await axios.post('/api/interview/save', {
                role: cvMatchRole,
                evaluation: payload
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
                    {/* Main Content Area */}
                    <div className="flex min-h-0 flex-1 flex-col">
                        {!isStarted ? (
                            <div className="flex h-full items-center justify-center">
                                <Card className="w-full max-w-md shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
                                    <CardContent className="flex flex-col items-center p-8 text-center">
                                        <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#dbe1ff]">
                                            <Play className="size-8 text-[#2563eb]" />
                                        </div>
                                        <h2 className="mb-2 text-2xl font-bold text-foreground">Persiapan Wawancara</h2>
                                        <p className="mb-6 text-sm text-muted-foreground">
                                            Role Anda ditetapkan sebagai <strong>{cvMatchRole}</strong>. Silakan pilih tingkat kesulitan untuk wawancara ini.
                                        </p>

                                        <div className="mb-6 w-full text-left">
                                            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                                Tingkat Kesulitan
                                            </p>
                                            <Select value={level} onValueChange={setLevel}>
                                                <SelectTrigger className="w-full rounded-xl border-border">
                                                    <SelectValue placeholder="Pilih tingkat kesulitan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="junior">Junior (Pemula)</SelectItem>
                                                    <SelectItem value="mid">Mid (Menengah)</SelectItem>
                                                    <SelectItem value="senior">Senior (Berpengalaman)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <Button
                                            className="w-full rounded-xl bg-[#2563eb] py-6 text-lg font-bold text-white hover:bg-[#1d4ed8]"
                                            onClick={() => setIsStarted(true)}
                                        >
                                            Mulai Wawancara
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            <ChatSession 
                                role={cvMatchRole}
                                level={level}
                                skillsFound={skillsFound}
                                skillsMissing={skillsMissing}
                                onFeedback={(evalData) => setEvaluation(evalData)} 
                                onSessionIdChange={(id) => setSessionId(id)}
                                onEndSession={handleEndSession}
                            />
                        )}
                    </div>

                    {/* Live Feedback sidebar (only visible when started) */}
                    {isStarted && (
                        <div className="w-72 shrink-0">
                            <LiveFeedback evaluation={evaluation} />
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
