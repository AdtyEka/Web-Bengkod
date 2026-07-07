import { router } from '@inertiajs/react';
import { FileText, MessageSquare, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ActivityItem, Pagination } from '../page';
import { CvDetailSheet } from './cv-detail-sheet';
import { InterviewDetailSheet } from './interview-detail-sheet';
import type { Activity } from './types';

type FilterType = 'All' | 'CV Matches' | 'Interviews';

const FILTER_MAP: Record<FilterType, string> = {
    All: 'all',
    'CV Matches': 'cv_match',
    Interviews: 'interview_coach',
};

interface Props {
    activities: ActivityItem[];
    pagination: Pagination;
    activeFilter: string;
}

function MatchResult({ value }: { value: number }) {
    const color = value >= 85 ? 'text-green-600' : value >= 70 ? 'text-orange-500' : 'text-red-500';
    const barColor = value >= 85 ? 'bg-green-500' : value >= 70 ? 'bg-orange-400' : 'bg-red-400';

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
            <span className="ml-1 text-sm font-bold text-foreground">{Number(value.toFixed(1))}/5</span>
        </div>
    );
}

const filters: FilterType[] = ['All', 'CV Matches', 'Interviews'];

export function ActivityTable({ activities, pagination, activeFilter }: Props) {
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const handleFilter = (f: FilterType) => {
        router.get(
            '/admin/history',
            { filter: FILTER_MAP[f], page: 1 },
            { preserveScroll: true },
        );
    };

    const handlePage = (page: number) => {
        router.get(
            '/admin/history',
            { filter: activeFilter, page },
            { preserveScroll: true },
        );
    };

    const handleViewDetails = (item: ActivityItem) => {
        const activity: Activity = {
            id: item.id,
            type: item.type === 'cv_match' ? 'CV Matcher' : 'Interview Coach',
            role: item.role,
            date: item.date,
            time: item.time,
            resultType: item.resultType,
            matchValue: item.matchValue,
            ratingValue: item.ratingValue,
            details: item.details,
        };
        setSelectedActivity(activity);
        setSheetOpen(true);
    };

    const handleClose = () => {
        setSheetOpen(false);
        setSelectedActivity(null);
    };

    const activeFilterLabel = (Object.entries(FILTER_MAP).find(([, v]) => v === activeFilter)?.[0] ?? 'All') as FilterType;

    const pageNumbers = Array.from({ length: Math.min(3, pagination.lastPage) }, (_, i) => i + 1);

    return (
        <>
            <Card className="overflow-hidden shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
                {/* Filter Tabs */}
                <div className="flex items-center justify-end gap-1 border-b border-border px-6 py-3">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => handleFilter(f)}
                            className={cn(
                                'rounded-lg px-4 py-1.5 text-sm font-semibold transition-all',
                                activeFilterLabel === f
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
                    {activities.length === 0 ? (
                        <div className="px-6 py-16 text-center text-sm text-muted-foreground">
                            No activities found. Start using CV Matcher or Interview Coach to see your history here.
                        </div>
                    ) : (
                        activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="grid grid-cols-[1.2fr_1.5fr_1.3fr_1.5fr_auto] items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/20"
                            >
                                {/* Type */}
                                <div className="flex items-center gap-3">
                                    <div
                                        className={cn(
                                            'flex size-9 shrink-0 items-center justify-center rounded-xl',
                                            activity.type === 'cv_match'
                                                ? 'bg-[#dbe1ff] text-[#2563eb]'
                                                : 'bg-purple-100 text-purple-600',
                                        )}
                                    >
                                        {activity.type === 'cv_match' ? (
                                            <FileText className="size-4" />
                                        ) : (
                                            <MessageSquare className="size-4" />
                                        )}
                                    </div>
                                    <span className="text-sm font-semibold leading-tight text-foreground">
                                        {activity.type === 'cv_match' ? 'CV Matcher' : 'Interview Coach'}
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
                                    View<br />Details
                                </Button>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-border bg-muted/10 px-6 py-4">
                    <p className="text-sm text-muted-foreground">
                        Showing{' '}
                        <span className="font-bold text-foreground">
                            {(pagination.currentPage - 1) * pagination.perPage + 1}–
                            {Math.min(pagination.currentPage * pagination.perPage, pagination.total)}
                        </span>{' '}
                        of <span className="font-bold text-foreground">{pagination.total}</span> results
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => handlePage(Math.max(1, pagination.currentPage - 1))}
                            disabled={pagination.currentPage === 1}
                            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
                        >
                            <ChevronLeft className="size-4" />
                        </button>
                        {pageNumbers.map((p) => (
                            <button
                                key={p}
                                onClick={() => handlePage(p)}
                                className={cn(
                                    'flex size-8 items-center justify-center rounded-lg text-sm font-semibold transition-all',
                                    pagination.currentPage === p
                                        ? 'bg-[#2563eb] text-white'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                )}
                            >
                                {p}
                            </button>
                        ))}
                        {pagination.lastPage > 3 && (
                            <>
                                <span className="px-1 text-muted-foreground">...</span>
                                <button
                                    onClick={() => handlePage(pagination.lastPage)}
                                    className={cn(
                                        'flex size-8 items-center justify-center rounded-lg text-sm font-semibold transition-all',
                                        pagination.currentPage === pagination.lastPage
                                            ? 'bg-[#2563eb] text-white'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                    )}
                                >
                                    {pagination.lastPage}
                                </button>
                            </>
                        )}
                        <button
                            onClick={() => handlePage(Math.min(pagination.lastPage, pagination.currentPage + 1))}
                            disabled={pagination.currentPage === pagination.lastPage}
                            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-40"
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
