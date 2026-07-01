import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const metrics = [
    { label: 'Communication', value: 92 },
    { label: 'Relevance', value: 78 },
    { label: 'Clarity', value: 85 },
];

export function InterviewPerformanceCard() {
    return (
        <Card className="flex flex-col shadow-[0_4px_20px_rgba(37,99,235,0.08)] lg:col-span-5">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-xl font-bold">Interview Performance</CardTitle>
                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-[#004ac6] hover:text-[#004ac6]"
                >
                    View All <ArrowRight className="size-3" />
                </Button>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col space-y-6">
                <div>
                    <p className="text-lg font-bold text-foreground">Behavioral Round</p>
                    <p className="text-sm text-muted-foreground">Session ID: #IR-9021</p>
                </div>

                {/* Progress Bars */}
                <div className="space-y-5">
                    {metrics.map((metric) => (
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
                        "Great structure using the STAR method. Try to be more concise in your
                        technical answers; you tended to over-explain implementation details in the
                        second question."
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
