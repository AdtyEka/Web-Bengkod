import { ChevronDown, ChevronLeft, ChevronRight, Download, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

import { CvDetailSheet } from '@/pages/admin/history/_components/cv-detail-sheet';
import { InterviewDetailSheet } from '@/pages/admin/history/_components/interview-detail-sheet';
import type { Activity } from '@/pages/admin/history/_components/types';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

type ActivityType = 'CV MATCH' | 'COACHING';

interface ActivityRecord {
    id: number;
    type: ActivityType;
    action: string;
    company: string;
    date: string;
    time?: string;
    result: string;
    resultVariant: 'primary' | 'success' | 'error' | 'warning';
    matchValue?: number;
    ratingValue?: number;
    details?: any;
}

const resultColorMap: Record<ActivityRecord['resultVariant'], string> = {
    primary: 'text-[#004ac6]',
    success: 'text-green-600',
    error: 'text-destructive',
    warning: 'text-orange-500',
};

const typeStyleMap: Record<ActivityType, { badge: string; label: string }> = {
    'CV MATCH': {
        badge: 'border-[#004ac6]/20 bg-[#dbe1ff]/30 text-[#004ac6]',
        label: 'CV MATCH',
    },
    COACHING: {
        badge: 'border-[#632ecd]/20 bg-[#e9ddff]/30 text-[#632ecd]',
        label: 'COACHING',
    },
};

type FilterType = 'All' | 'CV MATCH' | 'COACHING';

/** Map a dashboard ActivityRecord to the shape expected by the detail sheets */
function toActivity(record: ActivityRecord): Activity {
    return {
        id: record.id,
        type: record.type === 'CV MATCH' ? 'CV Matcher' : 'Interview Coach',
        role: record.action,
        date: record.date,
        time: record.time || '—',
        resultType: record.type === 'CV MATCH' ? 'match' : 'rating',
        matchValue: record.matchValue,
        ratingValue: record.ratingValue,
        details: record.details,
    };
}

interface ActivityHistoryTableProps {
    activities: ActivityRecord[];
}

export function ActivityHistoryTable({ activities }: ActivityHistoryTableProps) {
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');
    const [sortOpen, setSortOpen] = useState(false);
    const [sortLabel, setSortLabel] = useState('Newest First');

    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [sheetType, setSheetType] = useState<'cv' | 'interview' | null>(null);

    const sortOptions = ['Newest First', 'Oldest First', 'Highest Score', 'Lowest Score'];

    const filtered = activeFilter === 'All' ? activities : activities.filter((a) => a.type === activeFilter);

    const filteredAndSorted = [...filtered].sort((a, b) => {
        if (sortLabel === 'Newest First') {
            // Assuming higher ID means newer if dates are same/formatted
            return b.id - a.id; 
        }
        if (sortLabel === 'Oldest First') {
            return a.id - b.id;
        }
        
        const scoreA = (a.matchValue ?? a.ratingValue) || 0;
        const scoreB = (b.matchValue ?? b.ratingValue) || 0;

        if (sortLabel === 'Highest Score') {
            return scoreB - scoreA;
        }
        if (sortLabel === 'Lowest Score') {
            return scoreA - scoreB;
        }
        return 0;
    });

    function handleViewDetail(record: ActivityRecord) {
        setSelectedActivity(toActivity(record));
        setSheetType(record.type === 'CV MATCH' ? 'cv' : 'interview');
    }

    function handleClose() {
        setSelectedActivity(null);
        setSheetType(null);
    }

    return (
        <>
            <Card className="overflow-hidden shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
                {/* Header */}
                <div className="border-b border-border px-8 py-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-foreground">Activity History</h2>
                        <div className="flex items-center gap-2">
                            {/* Sort dropdown */}
                            <div className="relative">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-1.5 rounded-lg px-3 text-xs font-semibold text-muted-foreground"
                                    onClick={() => setSortOpen((o) => !o)}
                                >
                                    <SlidersHorizontal className="size-3.5" />
                                    {sortLabel}
                                    <ChevronDown className="size-3" />
                                </Button>
                                {sortOpen && (
                                    <div className="absolute right-0 z-10 mt-1 w-40 overflow-hidden rounded-xl border border-border bg-white shadow-lg">
                                        {sortOptions.map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => {
                                                    setSortLabel(opt);
                                                    setSortOpen(false);
                                                }}
                                                className={cn(
                                                    'w-full px-3 py-2 text-left text-xs font-medium transition-colors hover:bg-muted/50',
                                                    opt === sortLabel ? 'font-bold text-[#2563eb]' : 'text-foreground',
                                                )}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Export CSV */}
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 gap-1.5 rounded-lg px-3 text-xs font-semibold text-muted-foreground"
                                asChild
                            >
                                <a href="/admin/report/csv" target="_blank" rel="noreferrer">
                                    <Download className="size-3.5" />
                                    Export CSV
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Filter tabs */}
                    <div className="mt-4 flex items-center gap-1.5">
                        {(['All', 'CV MATCH', 'COACHING'] as FilterType[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={cn(
                                    'rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all',
                                    activeFilter === f
                                        ? 'bg-[#2563eb] text-white shadow-sm'
                                        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground',
                                )}
                            >
                                {f === 'All' ? 'All Activities' : f === 'CV MATCH' ? 'CV Match' : 'Interview Coaching'}
                            </button>
                        ))}
                        <span className="ml-auto text-xs text-muted-foreground">
                            {filteredAndSorted.length} result{filteredAndSorted.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead className="px-8 text-xs font-bold uppercase tracking-wider">Type</TableHead>
                                <TableHead className="px-8 text-xs font-bold uppercase tracking-wider">Action / Role</TableHead>
                                <TableHead className="px-8 text-xs font-bold uppercase tracking-wider">Date</TableHead>
                                <TableHead className="px-8 text-xs font-bold uppercase tracking-wider">Result</TableHead>
                                <TableHead className="px-8 text-right text-xs font-bold uppercase tracking-wider">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAndSorted.map((activity) => (
                                <TableRow key={activity.id} className="transition-colors hover:bg-muted/30">
                                    <TableCell className="px-8 py-4">
                                        <Badge
                                            variant="outline"
                                            className={cn('text-[10px] font-bold', typeStyleMap[activity.type].badge)}
                                        >
                                            {typeStyleMap[activity.type].label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-8 py-4">
                                        <p className="text-sm font-bold text-foreground">{activity.action}</p>
                                        <p className="text-xs text-muted-foreground">{activity.company}</p>
                                    </TableCell>
                                    <TableCell className="px-8 py-4 text-sm text-muted-foreground">
                                        {activity.date}
                                    </TableCell>
                                    <TableCell className="px-8 py-4">
                                        <span className={cn('text-sm font-bold', resultColorMap[activity.resultVariant])}>
                                            {activity.result}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-8 py-4 text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleViewDetail(activity)}
                                            className="rounded-xl border-[#2563eb]/30 text-xs font-bold text-[#2563eb] hover:bg-[#2563eb]/10 hover:text-[#2563eb]"
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredAndSorted.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                                        No recent activities found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Footer Link to All History instead of fake pagination */}
                <div className="flex items-center justify-between border-t border-border bg-muted/20 px-8 py-4">
                    <p className="text-xs text-muted-foreground">Showing {filteredAndSorted.length} recent activity records</p>
                    <Button variant="link" className="text-xs font-bold text-[#2563eb] hover:text-[#1d4ed8] p-0 h-auto" asChild>
                        <a href="/admin/history">View All History &rarr;</a>
                    </Button>
                </div>
            </Card>

            {/* Detail Sheets */}
            <CvDetailSheet
                activity={selectedActivity}
                open={sheetType === 'cv'}
                onClose={handleClose}
            />
            <InterviewDetailSheet
                activity={selectedActivity}
                open={sheetType === 'interview'}
                onClose={handleClose}
            />
        </>
    );
}
