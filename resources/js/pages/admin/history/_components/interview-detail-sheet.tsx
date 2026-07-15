import { MessageSquare, Star, Mic, Brain, AlertCircle } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import type { Activity } from './types';

interface InterviewDetailSheetProps {
    activity: Activity | null;
    open: boolean;
    onClose: () => void;
}

export function InterviewDetailSheet({ activity, open, onClose }: InterviewDetailSheetProps) {
    if (!activity) {
return null;
}

    const rating = activity.ratingValue ?? 0;

    const transcript = activity.details?.transcript || [];
    const questionFeedback = activity.details?.question_feedback || [];
    const fillerWords = activity.details?.filler_words || [];
    
    // Convert sentiment raw values to the expected object shape
    const rawSentiment = activity.details?.sentiment || {};
    const sentimentMetrics = [
        { label: 'Confidence Level', value: rawSentiment.confidence || 0, icon: Brain },
        { label: 'Speech Clarity', value: rawSentiment.clarity || 0, icon: Mic },
        { label: 'Filler Words Usage', value: rawSentiment.filler_words_score || 0, icon: AlertCircle, inverse: true },
    ];

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
                                <MessageSquare className="size-5 text-[#0871E7]" />
                            </div>
                            <div>
                                <SheetTitle className="text-lg font-bold">
                                    Interview Session Report
                                </SheetTitle>
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
                    {/* Overall Rating */}
                    <div className="rounded-2xl border border-border bg-muted/30 p-6 text-center">
                        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Overall Rating
                        </p>
                        <div className="flex items-center justify-center gap-1.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        'size-7',
                                        i < Math.floor(rating)
                                            ? 'fill-[#0871E7] text-[#0871E7]'
                                            : i < rating
                                              ? 'fill-[#b4c5ff] text-[#0871E7]'
                                              : 'fill-muted text-muted-foreground/30',
                                    )}
                                />
                            ))}
                        </div>
                        <p className="mt-2 text-4xl font-extrabold text-foreground">{Number(rating.toFixed(1))}/5</p>
                        <Badge
                            className={`mt-3 px-3 py-1 text-xs ${rating >= 4 ? 'bg-green-500/10 text-green-600 hover:bg-green-500/10' : rating >= 3 ? 'bg-[#0871E7]/10 text-[#0871E7] hover:bg-[#0871E7]/10' : 'bg-red-500/10 text-red-600 hover:bg-red-500/10'}`}
                        >
                            {rating >= 4 ? 'High Performance' : rating >= 3 ? 'Moderate' : 'Needs Improvement'}
                        </Badge>
                    </div>

                    {/* Session Transcript */}
                    <div>
                        <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Session Transcript
                        </h3>
                        <div className="space-y-3">
                            {transcript.map((msg: { role: string; text: string }, i: number) => (
                                <div
                                    key={i}
                                    className={cn(
                                        'rounded-xl px-4 py-4 text-sm leading-relaxed',
                                        msg.role === 'Coach'
                                            ? 'bg-[#dbe1ff]/50'
                                            : 'bg-muted/50',
                                    )}
                                >
                                    <p className={cn('mb-1.5 text-xs font-bold', msg.role === 'Coach' ? 'text-[#2563eb]' : 'text-foreground')}>
                                        {msg.role}
                                    </p>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Feedback Per Question */}
                    <div>
                        <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Feedback Per Question
                        </h3>
                        <div className="space-y-4">
                            {questionFeedback.map((item: { question: string; score: number; feedback: string; good?: boolean }, i: number) => (
                                <div
                                    key={i}
                                    className={cn(
                                        'rounded-xl border p-5',
                                        item.good
                                            ? 'border-green-200 bg-green-50/50'
                                            : 'border-[#b4c5ff] bg-[#dbe1ff]/20',
                                    )}
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-bold capitalize text-foreground">
                                            {item.question}
                                        </span>
                                        <span className={cn('text-sm font-extrabold', item.good ? 'text-green-600' : 'text-[#0871E7]')}>
                                            {item.score}%
                                        </span>
                                    </div>
                                    <Progress
                                        value={item.score}
                                        className={cn('mb-3 h-1.5 bg-muted', item.good ? '[&>div]:bg-green-500' : '[&>div]:bg-[#0871E7]')}
                                    />
                                    <p className="text-xs leading-relaxed text-muted-foreground">
                                        {item.feedback}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Sentiment & Confidence */}
                    <div>
                        <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Sentiment & Confidence Analysis
                        </h3>
                        <div className="space-y-4">
                            {sentimentMetrics.map((metric) => (
                                <div key={metric.label}>
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <metric.icon className="size-4 text-muted-foreground" />
                                            <span className="font-medium">{metric.label}</span>
                                        </div>
                                        <span className={cn('font-bold', metric.inverse ? 'text-[#0871E7]' : 'text-[#004ac6]')}>
                                            {metric.value}%
                                        </span>
                                    </div>
                                    <Progress
                                        value={metric.value}
                                        className={cn('h-2 bg-muted', metric.inverse ? '[&>div]:bg-[#b4c5ff]' : '[&>div]:bg-[#2563eb]')}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Filler Words */}
                        <div className="mt-6 rounded-xl border border-border bg-muted/20 p-5">
                            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Filler Words Detected
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {fillerWords.map((fw: { word: string; count: number }, i: number) => (
                                    <div
                                        key={fw.word}
                                        className="flex items-center gap-1.5 rounded-lg border border-[#b4c5ff] bg-[#dbe1ff]/40 px-3 py-1.5"
                                    >
                                        <span className="text-sm font-bold text-[#0871E7]">{fw.word}</span>
                                        <span className="text-xs text-[#0871E7]/60">×{fw.count}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-3 text-xs text-muted-foreground">
                                Reducing filler words improves perceived confidence significantly.
                            </p>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
