import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface LiveFeedbackProps {
    evaluation?: any; // You can type this properly later if needed
}

export function LiveFeedback({ evaluation }: LiveFeedbackProps) {
    // Convert 1-10 scale to percentage, default to dummy data if no evaluation yet
    const feedbackMetrics = evaluation
        ? [
              { label: 'Communication Score', value: Math.min((evaluation.communication_score || 0) * 10, 100) },
              { label: 'Clarity', value: Math.min((evaluation.clarity_score || 0) * 10, 100) },
              { label: 'Technical Depth', value: Math.min((evaluation.technical_depth_score || 0) * 10, 100) },
          ]
        : [
              { label: 'Communication Score', value: 0 },
              { label: 'Clarity', value: 0 },
              { label: 'Technical Depth', value: 0 },
          ];

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
                
                {evaluation?.strengths && evaluation.strengths.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                        <h4 className="text-sm font-semibold text-green-600 mb-2">Strengths</h4>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                            {evaluation.strengths.map((str: string, i: number) => (
                                <li key={i}>{str}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {evaluation?.improvements && evaluation.improvements.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                        <h4 className="text-sm font-semibold text-amber-600 mb-2">Improvements</h4>
                        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                            {evaluation.improvements.map((imp: string, i: number) => (
                                <li key={i}>{imp}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
