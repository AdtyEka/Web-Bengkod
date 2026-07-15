import { CheckCircle2, AlertCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import type { Activity } from './types';

interface CvDetailSheetProps {
    activity: Activity | null;
    open: boolean;
    onClose: () => void;
}

export function CvDetailSheet({ activity, open, onClose }: CvDetailSheetProps) {
    if (!activity) {
return null;
}

    const score = activity.matchValue ?? 0;
    const scoreColor = score >= 85 ? 'text-green-600' : score >= 70 ? 'text-[#0871E7]' : 'text-red-500';

    const rawBreakdown = activity.details?.breakdown || {};
    const matchBreakdown = [
        { label: 'Technical Match', value: rawBreakdown.technical ?? 0 },
        { label: 'Experience Match', value: rawBreakdown.experience ?? 0 },
        { label: 'Industry Match', value: rawBreakdown.industry ?? 0 },
    ];
    
    const foundKeywords = activity.details?.skills_found || [];
    const missingKeywords = activity.details?.skills_missing || [];
    const improvements = activity.details?.recommendations || [];

    return (
        <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
            <SheetContent
                className="w-full overflow-y-auto rounded-tl-2xl rounded-bl-2xl border-l border-border p-0 sm:max-w-2xl"
                side="right"
            >
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 border-b border-border bg-background/95 px-6 py-5 backdrop-blur">
                    <SheetHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-[#dbe1ff]">
                                <TrendingUp className="size-5 text-[#2563eb]" />
                            </div>
                            <div>
                                <SheetTitle className="text-lg font-bold">CV Match Report</SheetTitle>
                                <SheetDescription className="text-sm">{activity.role}</SheetDescription>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                            <span>{activity.date}</span>
                            <span>•</span>
                            <span>{activity.time}</span>
                        </div>
                    </SheetHeader>
                </div>

                <div className="space-y-8 px-6 py-6">
                    {/* Overall Score */}
                    <div className="rounded-2xl border border-border bg-muted/30 p-6 text-center">
                        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Overall Match Score
                        </p>
                        <p className={`text-6xl font-extrabold ${scoreColor}`}>{score}%</p>
                        <Badge
                            className={`mt-3 px-3 py-1 text-xs ${score >= 85 ? 'bg-green-500/10 text-green-600 hover:bg-green-500/10' : 'bg-[#0871E7]/10 text-[#0871E7] hover:bg-[#0871E7]/10'}`}
                        >
                            {score >= 85 ? 'Strong Match' : score >= 70 ? 'Good Match' : 'Needs Work'}
                        </Badge>
                    </div>

                    {/* Match Breakdown */}
                    <div>
                        <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Match Breakdown
                        </h3>
                        <div className="space-y-4">
                            {matchBreakdown.map((item) => (
                                <div key={item.label}>
                                    <div className="mb-2 flex justify-between text-sm">
                                        <span className="font-medium">{item.label}</span>
                                        <span className="font-bold text-[#004ac6]">{item.value}%</span>
                                    </div>
                                    <Progress value={item.value} className="h-2 bg-muted [&>div]:bg-[#2563eb]" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Keyword Analysis */}
                    <div>
                        <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Keyword Analysis
                        </h3>
                        <div className="space-y-5">
                            <div>
                                <div className="mb-3 flex items-center gap-2">
                                    <CheckCircle2 className="size-4 text-green-600" />
                                    <span className="text-xs font-bold text-green-600">
                                        Found in CV ({foundKeywords.length})
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {foundKeywords.map((kw: string) => (
                                        <span
                                            key={kw}
                                            className="rounded-lg border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
                                        >
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="mb-3 flex items-center gap-2">
                                    <AlertCircle className="size-4 text-[#0871E7]" />
                                    <span className="text-xs font-bold text-[#0871E7]">
                                        Missing Keywords ({missingKeywords.length})
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {missingKeywords.map((kw: string) => (
                                        <span
                                            key={kw}
                                            className="rounded-lg border border-[#b4c5ff] bg-[#dbe1ff]/40 px-3 py-1 text-xs font-medium text-[#0871E7]"
                                        >
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* AI Recommendations */}
                    <div>
                        <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            AI Recommendations
                        </h3>
                        <div className="space-y-3">
                            {improvements.map((tip: string, i: number) => (
                                <div
                                    key={i}
                                    className="flex gap-3 rounded-xl border border-border bg-muted/20 p-4"
                                >
                                    <Lightbulb className="mt-0.5 size-4 shrink-0 text-[#2563eb]" />
                                    <div>
                                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                            {tip}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
