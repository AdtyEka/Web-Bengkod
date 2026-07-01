import { TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
    {
        label: 'Total Activities',
        value: '1,284',
        badge: '+12%',
    },
    {
        label: 'Match Accuracy',
        value: '94.2%',
        badge: '+0.5%',
    },
    {
        label: 'Interviews Hosted',
        value: '452',
        badge: 'This Month',
        badgePlain: true,
    },
];

export function StatsRow() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
                <Card key={stat.label} className="shadow-[0_2px_12px_rgba(37,99,235,0.06)]">
                    <CardContent className="p-5">
                        <p className="mb-1 text-xs text-muted-foreground">{stat.label}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-extrabold text-[#004ac6]">
                                {stat.value}
                            </span>
                            {stat.badgePlain ? (
                                <span className="text-sm font-medium text-muted-foreground">
                                    {stat.badge}
                                </span>
                            ) : (
                                <span className="flex items-center gap-0.5 text-xs font-bold text-green-600">
                                    <TrendingUp className="size-3" />
                                    {stat.badge}
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
