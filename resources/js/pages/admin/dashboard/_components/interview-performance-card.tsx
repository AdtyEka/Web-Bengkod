import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardActivity } from '../page';

interface Props {
    activity: DashboardActivity | null;
}

export function InterviewPerformanceCard({ activity }: Props) {
    if (!activity) {
        return (
            <Card className="flex flex-col shadow-[0_4px_20px_rgba(37,99,235,0.08)] lg:col-span-5">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-xl font-bold">Interview Performance</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-center">
                    <div className="rounded-xl bg-muted/50 p-6 text-center text-sm text-muted-foreground">
                        No interview activity found yet. Start an AI interview session to see your performance here.
                    </div>
                </CardContent>
            </Card>
        );
    }

    const metrics = activity.details?.metrics || [
        { label: 'Overall Rating', value: (activity.rating_value ?? 0) * 20 },
    ];
    
    const recentFeedback = activity.details?.recent_feedback || "Complete an interview to receive detailed feedback on your performance.";

    return (
        <Card className="flex flex-col shadow-[0_4px_20px_rgba(37,99,235,0.08)] lg:col-span-5">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-xl font-bold">Interview Performance</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col space-y-6">
                <div>
                    <p className="text-lg font-bold text-foreground">{activity.role}</p>
                    <p className="text-xs text-muted-foreground">{activity.created_at}</p>
                </div>

                {/* Progress Bars */}
                <div className="space-y-5">
                    {metrics.map((metric: {label: string, value: number}) => (
                        <div key={metric.label}>
                            <div className="mb-2 flex justify-between text-sm font-medium">
                                <span>{metric.label}</span>
                                <span className="font-bold text-[#004ac6]">{metric.value}%</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-[#2563eb] transition-all duration-700"
                                    style={{ width: `${metric.value}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Feedback */}
                <div className="mt-auto rounded-xl bg-muted/50 p-5">
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Recent Feedback
                    </p>
                    <p className="text-sm leading-relaxed text-foreground">
                        "{recentFeedback}"
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
