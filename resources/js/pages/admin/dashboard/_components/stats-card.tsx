import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    icon: LucideIcon;
    iconClassName?: string;
    iconBgClassName?: string;
    value: string;
    label: string;
    badge?: string;
    badgeClassName?: string;
}

export function StatsCard({
    icon: Icon,
    iconClassName,
    iconBgClassName,
    value,
    label,
    badge,
    badgeClassName,
}: StatsCardProps) {
    return (
        <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)] shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
            <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className={cn('rounded-lg p-2', iconBgClassName)}>
                        <Icon className={cn('size-5', iconClassName)} />
                    </div>
                    {badge && (
                        <span
                            className={cn(
                                'flex items-center gap-0.5 text-xs font-bold',
                                badgeClassName,
                            )}
                        >
                            {badge}
                        </span>
                    )}
                </div>
                <p className="text-3xl font-extrabold text-foreground">{value}</p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{label}</p>
            </CardContent>
        </Card>
    );
}
