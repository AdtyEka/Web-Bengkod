import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

type ActivityType = 'CV MATCH' | 'COACHING';

interface ActivityRecord {
    id: number;
    type: ActivityType;
    action: string;
    company: string;
    date: string;
    result: string;
    resultVariant: 'primary' | 'success' | 'error' | 'warning';
}

const activities: ActivityRecord[] = [
    {
        id: 1,
        type: 'CV MATCH',
        action: 'Senior Frontend Developer',
        company: 'Tech Solutions Inc.',
        date: 'Oct 14, 2024',
        result: '85% Match',
        resultVariant: 'primary',
    },
    {
        id: 2,
        type: 'COACHING',
        action: 'Behavioral Round Simulation',
        company: 'AI Mock Interview',
        date: 'Oct 12, 2024',
        result: 'High Score (4.5/5)',
        resultVariant: 'success',
    },
    {
        id: 3,
        type: 'CV MATCH',
        action: 'Product Designer',
        company: 'Creative Corp',
        date: 'Oct 10, 2024',
        result: '62% Match',
        resultVariant: 'error',
    },
    {
        id: 4,
        type: 'COACHING',
        action: 'System Design Round',
        company: 'AI Mock Interview',
        date: 'Oct 08, 2024',
        result: 'Moderate (3.2/5)',
        resultVariant: 'warning',
    },
];

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

export function ActivityHistoryTable() {
    return (
        <Card className="overflow-hidden shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-8 py-6">
                <h2 className="text-xl font-bold text-foreground">Activity History</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                        Filter
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                        Download CSV
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/40 hover:bg-muted/40">
                            <TableHead className="px-8 text-xs font-bold uppercase tracking-wider">
                                Type
                            </TableHead>
                            <TableHead className="px-8 text-xs font-bold uppercase tracking-wider">
                                Action / Role
                            </TableHead>
                            <TableHead className="px-8 text-xs font-bold uppercase tracking-wider">
                                Date
                            </TableHead>
                            <TableHead className="px-8 text-xs font-bold uppercase tracking-wider">
                                Result
                            </TableHead>
                            <TableHead className="px-8 text-right text-xs font-bold uppercase tracking-wider">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activities.map((activity) => (
                            <TableRow
                                key={activity.id}
                                className="transition-colors hover:bg-muted/30"
                            >
                                <TableCell className="px-8 py-4">
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            'text-[10px] font-bold',
                                            typeStyleMap[activity.type].badge,
                                        )}
                                    >
                                        {typeStyleMap[activity.type].label}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-8 py-4">
                                    <p className="text-sm font-bold text-foreground">
                                        {activity.action}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {activity.company}
                                    </p>
                                </TableCell>
                                <TableCell className="px-8 py-4 text-sm text-muted-foreground">
                                    {activity.date}
                                </TableCell>
                                <TableCell className="px-8 py-4">
                                    <span
                                        className={cn(
                                            'text-sm font-bold',
                                            resultColorMap[activity.resultVariant],
                                        )}
                                    >
                                        {activity.result}
                                    </span>
                                </TableCell>
                                <TableCell className="px-8 py-4 text-right">
                                    <button className="text-muted-foreground transition-colors hover:text-[#004ac6]">
                                        <ExternalLink className="size-4" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-border bg-muted/20 px-8 py-4">
                <p className="text-xs text-muted-foreground">Showing 4 of 52 records</p>
                <div className="flex items-center gap-4">
                    <button className="text-muted-foreground transition-colors hover:text-foreground">
                        <ChevronLeft className="size-5" />
                    </button>
                    <span className="text-xs font-bold text-foreground">Page 1 of 13</span>
                    <button className="text-muted-foreground transition-colors hover:text-foreground">
                        <ChevronRight className="size-5" />
                    </button>
                </div>
            </div>
        </Card>
    );
}
