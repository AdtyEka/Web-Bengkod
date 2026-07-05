import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const feedbackMetrics = [
    { label: 'Communication Score', value: 85 },
    { label: 'Clarity', value: 90 },
    { label: 'Technical Depth', value: 70 },
];

export function LiveFeedback() {
    return (
        <Card className="shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">Live Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                {feedbackMetrics.map((metric) => (
                    <div key={metric.label}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                            <span className="font-medium text-foreground">{metric.label}</span>
                            <span className="font-bold text-foreground">{metric.value}%</span>
                        </div>
                        <Progress
                            value={metric.value}
                            className="h-2 bg-muted [&>div]:bg-[#2563eb]"
                        />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
