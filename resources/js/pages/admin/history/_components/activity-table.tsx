import { useState } from 'react';
import { FileText, MessageSquare, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CvDetailSheet } from './cv-detail-sheet';
import { InterviewDetailSheet } from './interview-detail-sheet';
import type { Activity, ActivityType, FilterType } from './types';

const activities: Activity[] = [
    {
        id: 1,
        type: 'CV Matcher',
        role: 'Senior Frontend Engineer',
        date: 'Oct 24, 2023',
        time: '2:45 PM',
        resultType: 'match',
        matchValue: 92,
    },
    {
        id: 2,
        type: 'Interview Coach',
        role: 'Product Manager',
        date: 'Oct 23, 2023',
        time: '10:15 AM',
        resultType: 'rating',
        ratingValue: 4.5,
    },
    {
        id: 3,
        type: 'CV Matcher',
        role: 'Data Scientist (Mid-Level)',
        date: 'Oct 22, 2023',
        time: '4:20 PM',
        resultType: 'match',
        matchValue: 68,
    },
    {
        id: 4,
        type: 'CV Matcher',
        role: 'HR Director',
        date: 'Oct 21, 2023',
        time: '9:00 AM',
        resultType: 'match',
        matchValue: 85,
    },
    {
        id: 5,
        type: 'Interview Coach',
        role: 'Fullstack Developer',
        date: 'Oct 20, 2023',
        time: '1:30 PM',
        resultType: 'rating',
        ratingValue: 3.0,
    },
];

function MatchResult({ value }: { value: number }) {
    const color =
        value >= 85 ? 'text-green-600' : value >= 70 ? 'text-orange-500' : 'text-red-500';
    const barColor =
        value >= 85 ? 'bg-green-500' : value >= 70 ? 'bg-orange-400' : 'bg-red-400';

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                    <div className={cn('h-full rounded-full', barColor)} style={{ width: `${value}%` }} />
                </div>
                <span className={cn('text-sm font-bold', color)}>{value}%</span>
            </div>
            <span className={cn('text-xs font-semibold', color)}>Match</span>
        </div>
    );
}

function StarRating({ value }: { value: number }) {
    const full = Math.floor(value);
    const half = value % 1 >= 0.5;
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        'size-4',
                        i < full
                            ? 'fill-orange-400 text-orange-400'
                            : i === full && half
                              ? 'fill-orange-200 text-orange-400'
                              : 'fill-muted text-muted-foreground/30',
                    )}
                />
            ))}
            <span className="ml-1 text-sm font-bold text-foreground">{value}/5</span>
        </div>
    );
}

const filters: FilterType[] = ['All', 'CV Matches', 'Interviews'];

export function ActivityTable() {
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);
    const totalPages = 25;

    const filtered = activities.filter((a) => {
        if (activeFilter === 'CV Matches') return a.type === 'CV Matcher';
        if (activeFilter === 'Interviews') return a.type === 'Interview Coach';
        return true;
    });

    const handleViewDetails = (activity: Activity) => {
        setSelectedActivity(activity);
        setSheetOpen(true);
    };

    const handleClose = () => {
        setSheetOpen(false);
        setSelectedActivity(null);
    };

    return (
        <>
            <Card className="overflow-hidden shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
                {/* Filter Tabs */}
                <div className="flex items-center justify-end gap-1 border-b border-border px-6 py-3">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={cn(
                                'rounded-lg px-4 py-1.5 text-sm font-semibold transition-all',
                                activeFilter === f
                                    ? 'bg-[#2563eb] text-white'
                                    : 'text-muted-foreground hover:text-foreground',
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-[1.2fr_1.5fr_1.3fr_1.5fr_auto] gap-4 border-b border-border bg-muted/30 px-6 py-3">
                    {['Activity Type', 'Target Role', 'Date', 'Result', 'Action'].map((h) => (
                        <span key={h} className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {h}
                        </span>
                    ))}
                </div>

                {/* Rows */}
                <div className="divide-y divide-border">
                    {filtered.map((activity) => (
                        <div
                            key={activity.id}
                            className="grid grid-cols-[1.2fr_1.5fr_1.3fr_1.5fr_auto] items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/20"
                        >
                            {/* Type */}
                            <div className="flex items-center gap-3">
                                <div
                                    className={cn(
                                        'flex size-9 shrink-0 items-center justify-center rounded-xl',
                                        activity.type === 'CV Matcher'
                                            ? 'bg-[#dbe1ff] text-[#2563eb]'
                                            : 'bg-purple-100 text-purple-600',
                                    )}
                                >
                                    {activity.type === 'CV Matcher' ? (
                                        <FileText className="size-4" />
                                    ) : (
                                        <MessageSquare className="size-4" />
                                    )}
                                </div>
                                <span className="text-sm font-semibold leading-tight text-foreground">
                                    {activity.type}
                                </span>
                            </div>

                            {/* Role */}
                            <span className="text-sm text-foreground">{activity.role}</span>

                            {/* Date */}
                            <div className="text-sm text-muted-foreground">
                                <span>{activity.date}</span>
                                <span className="mx-1 text-muted-foreground/50">•</span>
                                <span>{activity.time}</span>
                            </div>

                            {/* Result */}
                            <div>
                                {activity.resultType === 'match' && activity.matchValue !== undefined ? (
                                    <MatchResult value={activity.matchValue} />
                                ) : activity.ratingValue !== undefined ? (
                                    <StarRating value={activity.ratingValue} />
                                ) : null}
                            </div>

                            {/* Action */}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(activity)}
                                className="rounded-xl border-[#2563eb]/30 text-xs font-bold text-[#2563eb] hover:bg-[#2563eb]/10 hover:text-[#2563eb]"
                            >
                                View
                                <br />
                                Details
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-border bg-muted/10 px-6 py-4">
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-bold text-foreground">1 to 5</span> of{' '}
                        <span className="font-bold text-foreground">124</span> results
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <ChevronLeft className="size-4" />
                        </button>
                        {[1, 2, 3].map((p) => (
                            <button
                                key={p}
                                onClick={() => setCurrentPage(p)}
                                className={cn(
                                    'flex size-8 items-center justify-center rounded-lg text-sm font-semibold transition-all',
                                    currentPage === p
                                        ? 'bg-[#2563eb] text-white'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                )}
                            >
                                {p}
                            </button>
                        ))}
                        <span className="px-1 text-muted-foreground">...</span>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            className={cn(
                                'flex size-8 items-center justify-center rounded-lg text-sm font-semibold transition-all',
                                currentPage === totalPages
                                    ? 'bg-[#2563eb] text-white'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                            )}
                        >
                            {totalPages}
                        </button>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                </div>
            </Card>

            {/* Detail Sheets */}
            {selectedActivity?.type === 'CV Matcher' && (
                <CvDetailSheet activity={selectedActivity} open={sheetOpen} onClose={handleClose} />
            )}
            {selectedActivity?.type === 'Interview Coach' && (
                <InterviewDetailSheet activity={selectedActivity} open={sheetOpen} onClose={handleClose} />
            )}
        </>
    );
}
