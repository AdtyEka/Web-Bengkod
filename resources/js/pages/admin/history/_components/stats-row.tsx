import { TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { HistoryStats } from '../page';

interface Props {
    stats: HistoryStats;
}

export function StatsRow({ stats }: Props) {
    const items = [
        {
            label: 'Total Activities',
            value: stats.totalActivities.toLocaleString(),
            badge: null,
        },
        {
            label: 'CV Matches',
            value: stats.cvMatchCount.toLocaleString(),
            badge: null,
        },
        {
            label: 'Interviews Hosted',
            value: stats.interviewCount.toLocaleString(),
            badge: 'All Time',
            badgePlain: true,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {items.map((stat) => (
                <Card key={stat.label} className="shadow-[0_2px_12px_rgba(37,99,235,0.06)]">
                    <CardContent className="p-5">
                        <p className="mb-1 text-xs text-muted-foreground">{stat.label}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-extrabold text-[#004ac6]">
                                {stat.value}
                            </span>
                            {stat.badge &&
                                (stat.badgePlain ? (
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {stat.badge}
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-0.5 text-xs font-bold text-green-600">
                                        <TrendingUp className="size-3" />
                                        {stat.badge}
                                    </span>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
