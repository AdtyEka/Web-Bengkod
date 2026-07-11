import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Trash2,
    FileText,
    MessageSquare,
    CheckCircle2,
    AlertCircle,
    Lightbulb,
    Star,
    Mic,
    Brain,
    AlertTriangle,
} from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '@/components/layouts/admin-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import HistoryDestroyController from '@/actions/App/Http/Controllers/Admin/HistoryDestroyController';

type ActivityDetail = {
    id: number;
    type: 'cv_match' | 'interview_coach';
    role: string;
    company: string | null;
    date: string;
    time: string;
    resultType: 'match' | 'rating';
    matchValue?: number;
    ratingValue?: number;
    details?: any;
};

type Props = {
    activity: ActivityDetail;
};

function CvMatchDetail({ activity }: { activity: ActivityDetail }) {
    const score = activity.matchValue ?? 0;
    const scoreColor = score >= 85 ? 'text-green-600' : score >= 70 ? 'text-orange-500' : 'text-red-500';
    const scoreBg = score >= 85 ? 'bg-green-500/10 text-green-600' : score >= 70 ? 'bg-orange-500/10 text-orange-600' : 'bg-red-500/10 text-red-600';

    const rawBreakdown = activity.details?.breakdown || {};
    const matchBreakdown = [
        { label: 'Technical Match', value: rawBreakdown.technical ?? 0 },
        { label: 'Experience Match', value: rawBreakdown.experience ?? 0 },
        { label: 'Industry Match', value: rawBreakdown.industry ?? 0 },
    ];

    const foundKeywords: string[] = activity.details?.skills_found || [];
    const missingKeywords: string[] = activity.details?.skills_missing || [];
    const improvements: string[] = activity.details?.recommendations || [];

    return (
        <div className="space-y-8">
            {/* Overall Score */}
            <Card className="p-8 text-center">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Overall Match Score
                </p>
                <p className={cn('text-7xl font-extrabold', scoreColor)}>{score}%</p>
                <Badge className={cn('mt-4 px-4 py-1.5 text-sm font-semibold', scoreBg, 'hover:opacity-80')}>
                    {score >= 85 ? 'Strong Match' : score >= 70 ? 'Good Match' : 'Needs Work'}
                </Badge>
            </Card>

            {/* Match Breakdown */}
            <Card className="p-6">
                <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Match Breakdown
                </h3>
                <div className="space-y-5">
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
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Found Keywords */}
                <Card className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-green-600" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-green-600">
                            Found in CV ({foundKeywords.length})
                        </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {foundKeywords.length === 0 && (
                            <span className="text-sm text-muted-foreground">None detected</span>
                        )}
                        {foundKeywords.map((kw) => (
                            <span
                                key={kw}
                                className="rounded-lg border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
                            >
                                {kw}
                            </span>
                        ))}
                    </div>
                </Card>

                {/* Missing Keywords */}
                <Card className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                        <AlertCircle className="size-4 text-orange-500" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-orange-500">
                            Missing Keywords ({missingKeywords.length})
                        </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {missingKeywords.length === 0 && (
                            <span className="text-sm text-muted-foreground">None missing</span>
                        )}
                        {missingKeywords.map((kw) => (
                            <span
                                key={kw}
                                className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600"
                            >
                                {kw}
                            </span>
                        ))}
                    </div>
                </Card>
            </div>

            {/* AI Recommendations */}
            {improvements.length > 0 && (
                <Card className="p-6">
                    <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        AI Recommendations
                    </h3>
                    <div className="space-y-3">
                        {improvements.map((tip, i) => (
                            <div key={i} className="flex gap-3 rounded-xl border border-border bg-muted/20 p-4">
                                <Lightbulb className="mt-0.5 size-4 shrink-0 text-[#2563eb]" />
                                <p className="text-sm leading-relaxed text-muted-foreground">{tip}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}

function InterviewDetail({ activity }: { activity: ActivityDetail }) {
    const rating = activity.ratingValue ?? 0;

    const transcript: { role: string; text: string }[] = activity.details?.transcript || [];
    const questionFeedback: { question: string; score: number; feedback: string; good?: boolean }[] =
        activity.details?.question_feedback || [];
    const fillerWords: { word: string; count: number }[] = activity.details?.filler_words || [];

    const rawSentiment = activity.details?.sentiment || {};
    const sentimentMetrics = [
        { label: 'Confidence Level', value: rawSentiment.confidence || 0, icon: Brain, inverse: false },
        { label: 'Speech Clarity', value: rawSentiment.clarity || 0, icon: Mic, inverse: false },
        {
            label: 'Filler Words Usage',
            value: rawSentiment.filler_words_score || 0,
            icon: AlertCircle,
            inverse: true,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Overall Rating */}
            <Card className="p-8 text-center">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Overall Rating
                </p>
                <div className="flex items-center justify-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={cn(
                                'size-8',
                                i < Math.floor(rating)
                                    ? 'fill-orange-400 text-orange-400'
                                    : i < rating
                                      ? 'fill-orange-200 text-orange-400'
                                      : 'fill-muted text-muted-foreground/30',
                            )}
                        />
                    ))}
                </div>
                <p className="mt-3 text-5xl font-extrabold text-foreground">{Number(rating.toFixed(1))}/5</p>
                <Badge
                    className={cn(
                        'mt-4 px-4 py-1.5 text-sm font-semibold',
                        rating >= 4
                            ? 'bg-green-500/10 text-green-600 hover:bg-green-500/10'
                            : rating >= 3
                              ? 'bg-orange-500/10 text-orange-600 hover:bg-orange-500/10'
                              : 'bg-red-500/10 text-red-600 hover:bg-red-500/10',
                    )}
                >
                    {rating >= 4 ? 'High Performance' : rating >= 3 ? 'Moderate' : 'Needs Improvement'}
                </Badge>
            </Card>

            {/* Sentiment Analysis */}
            <Card className="p-6">
                <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Sentiment & Confidence Analysis
                </h3>
                <div className="space-y-5">
                    {sentimentMetrics.map((metric) => (
                        <div key={metric.label}>
                            <div className="mb-2 flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <metric.icon className="size-4 text-muted-foreground" />
                                    <span className="font-medium">{metric.label}</span>
                                </div>
                                <span className={cn('font-bold', metric.inverse ? 'text-orange-500' : 'text-[#004ac6]')}>
                                    {metric.value}%
                                </span>
                            </div>
                            <Progress
                                value={metric.value}
                                className={cn(
                                    'h-2 bg-muted',
                                    metric.inverse ? '[&>div]:bg-orange-400' : '[&>div]:bg-[#2563eb]',
                                )}
                            />
                        </div>
                    ))}
                </div>

                {fillerWords.length > 0 && (
                    <div className="mt-6 rounded-xl border border-border bg-muted/20 p-5">
                        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Filler Words Detected
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {fillerWords.map((fw) => (
                                <div
                                    key={fw.word}
                                    className="flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5"
                                >
                                    <span className="text-sm font-bold text-orange-600">{fw.word}</span>
                                    <span className="text-xs text-orange-400">×{fw.count}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-3 text-xs text-muted-foreground">
                            Reducing filler words improves perceived confidence significantly.
                        </p>
                    </div>
                )}
            </Card>

            {/* Feedback Per Question */}
            {questionFeedback.length > 0 && (
                <Card className="p-6">
                    <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Feedback Per Question
                    </h3>
                    <div className="space-y-4">
                        {questionFeedback.map((item, i) => (
                            <div
                                key={i}
                                className={cn(
                                    'rounded-xl border p-5',
                                    item.good
                                        ? 'border-green-200 bg-green-50/50'
                                        : 'border-orange-200 bg-orange-50/50',
                                )}
                            >
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-bold capitalize text-foreground">
                                        {item.question}
                                    </span>
                                    <span
                                        className={cn(
                                            'text-sm font-extrabold',
                                            item.good ? 'text-green-600' : 'text-orange-500',
                                        )}
                                    >
                                        {item.score}%
                                    </span>
                                </div>
                                <Progress
                                    value={item.score}
                                    className={cn(
                                        'mb-3 h-1.5 bg-muted',
                                        item.good ? '[&>div]:bg-green-500' : '[&>div]:bg-orange-400',
                                    )}
                                />
                                <p className="text-xs leading-relaxed text-muted-foreground">{item.feedback}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Session Transcript */}
            {transcript.length > 0 && (
                <Card className="p-6">
                    <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Session Transcript
                    </h3>
                    <div className="space-y-3">
                        {transcript.map((msg, i) => (
                            <div
                                key={i}
                                className={cn(
                                    'rounded-xl px-4 py-4 text-sm leading-relaxed',
                                    msg.role === 'Coach' ? 'bg-[#dbe1ff]/50' : 'bg-muted/50',
                                )}
                            >
                                <p
                                    className={cn(
                                        'mb-1.5 text-xs font-bold',
                                        msg.role === 'Coach' ? 'text-[#2563eb]' : 'text-foreground',
                                    )}
                                >
                                    {msg.role}
                                </p>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}

export default function HistoryDetail({ activity }: Props) {
    const [deleting, setDeleting] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const isCv = activity.type === 'cv_match';

    const confirmDelete = () => {
        setDeleting(true);
        router.delete(HistoryDestroyController.url(activity.id), {
            onFinish: () => {
                setDeleting(false);
                setShowDeleteDialog(false);
            },
        });
    };

    return (
        <AdminLayout title="Activity Detail">
            <Head title="Activity Detail" />

            <div className="space-y-8 p-6 md:p-10">
                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/history"
                            className="flex size-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <ArrowLeft className="size-4" />
                        </Link>

                        <div className="flex items-center gap-3">
                            <div
                                className={cn(
                                    'flex size-11 shrink-0 items-center justify-center rounded-xl',
                                    isCv ? 'bg-[#dbe1ff] text-[#2563eb]' : 'bg-purple-100 text-purple-600',
                                )}
                            >
                                {isCv ? (
                                    <FileText className="size-5" />
                                ) : (
                                    <MessageSquare className="size-5" />
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                    {isCv ? 'CV Match Report' : 'Interview Session Report'}
                                </h1>
                                <p className="mt-0.5 text-sm text-muted-foreground">
                                    {activity.role}
                                    {activity.company ? ` · ${activity.company}` : ''}
                                    <span className="mx-2 text-muted-foreground/40">•</span>
                                    {activity.date} at {activity.time}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowDeleteDialog(true)}
                        disabled={deleting}
                        className="shrink-0 gap-2 rounded-xl border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                    >
                        <Trash2 className="size-4" />
                        {deleting ? 'Menghapus...' : 'Hapus Aktivitas'}
                    </Button>
                </div>

                <Separator />

                {/* Content */}
                {isCv ? (
                    <CvMatchDetail activity={activity} />
                ) : (
                    <InterviewDetail activity={activity} />
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={(open) => !open && setShowDeleteDialog(false)}>
                <DialogContent showCloseButton={false} className="max-w-sm">
                    <DialogHeader>
                        <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-red-50">
                            <AlertTriangle className="size-5 text-red-500" />
                        </div>
                        <DialogTitle className="text-base font-bold">Hapus Aktivitas?</DialogTitle>
                        <DialogDescription>
                            Aktivitas <span className="font-semibold text-foreground">{activity.role}</span> akan
                            dihapus secara permanen dan tidak bisa dikembalikan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            className="rounded-xl"
                            onClick={() => setShowDeleteDialog(false)}
                            disabled={deleting}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            className="rounded-xl"
                            onClick={confirmDelete}
                            disabled={deleting}
                        >
                            {deleting ? 'Menghapus...' : 'Ya, Hapus'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
