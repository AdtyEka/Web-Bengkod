import { Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ImprovementRecommendationsProps {
    recommendations: string[];
}

export function ImprovementRecommendations({ recommendations }: ImprovementRecommendationsProps) {
    return (
        <Card className="shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-[#dbe1ff]">
                            <Lightbulb className="size-4 text-[#2563eb]" />
                        </div>
                        <CardTitle className="text-xl font-bold">
                            Improvement Recommendations
                        </CardTitle>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {recommendations.length} suggestions
                    </span>
                </div>
                <p className="text-sm text-muted-foreground">
                    Apply these recommendations to increase your match score and improve your chances of passing the ATS screening.
                </p>
            </CardHeader>

            <CardContent className="space-y-3 pt-2">
                {recommendations.length > 0 ? recommendations.map((rec, idx) => (
                    <div
                        key={idx}
                        className="group flex gap-4 rounded-xl border border-border bg-muted/20 p-4 transition-all duration-200 hover:border-[#2563eb]/30 hover:bg-[#2563eb]/5 hover:shadow-sm"
                    >
                        {/* Icon */}
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background border border-border group-hover:border-[#2563eb]/30 group-hover:bg-[#dbe1ff]">
                            <Sparkles className="size-5 text-muted-foreground group-hover:text-[#2563eb] transition-colors" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 flex items-center">
                            <p className="text-sm leading-relaxed text-foreground font-medium">
                                {rec}
                            </p>
                        </div>

                        {/* Action */}
                        <div className="flex shrink-0 flex-col items-end justify-center gap-2">
                            <ArrowRight className="size-4 text-muted-foreground/40 group-hover:text-[#2563eb] transition-colors" />
                        </div>
                    </div>
                )) : (
                    <div className="p-4 rounded-xl border border-dashed text-center text-muted-foreground text-sm">
                        No specific improvements recommended. Your CV matches perfectly!
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
