import { Lightbulb, TrendingUp, BookOpen, Wrench, ArrowRight, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Priority = 'high' | 'medium' | 'low';

interface Recommendation {
    id: number;
    icon: React.ElementType;
    category: string;
    title: string;
    description: string;
    priority: Priority;
    impact: string;
}

const recommendations: Recommendation[] = [
    {
        id: 1,
        icon: BookOpen,
        category: 'Skill Gap',
        title: 'Learn Kubernetes Fundamentals',
        description:
            'Kubernetes appears in 78% of Senior Backend job postings. Complete a hands-on course (CKA certification recommended) to significantly boost your match score.',
        priority: 'high',
        impact: '+12% match score',
    },
    {
        id: 2,
        icon: Wrench,
        category: 'Skill Gap',
        title: 'Add Terraform to Your Stack',
        description:
            'Infrastructure-as-code is a key requirement. Build 1–2 personal projects using Terraform and document them on GitHub to demonstrate practical experience.',
        priority: 'high',
        impact: '+9% match score',
    },
    {
        id: 3,
        icon: TrendingUp,
        category: 'Experience',
        title: 'Highlight System Design Experience',
        description:
            'Your CV lacks explicit system design examples. Add a dedicated section describing architectures you have designed — include scale, decisions, and trade-offs.',
        priority: 'medium',
        impact: '+6% match score',
    },
    {
        id: 4,
        icon: Star,
        category: 'Soft Skills',
        title: 'Showcase Leadership & Mentoring',
        description:
            'Senior roles expect leadership signals. Mention team leads, code reviews you conducted, or junior developers you mentored — even informal examples count.',
        priority: 'medium',
        impact: '+4% match score',
    },
    {
        id: 5,
        icon: Lightbulb,
        category: 'CV Quality',
        title: 'Quantify Your Achievements',
        description:
            'Replace vague descriptions with measurable outcomes. E.g. "Reduced API response time by 40%" or "Scaled service to handle 10K concurrent users".',
        priority: 'low',
        impact: '+3% match score',
    },
];

const priorityConfig: Record<Priority, { label: string; badge: string; dot: string }> = {
    high: {
        label: 'High',
        badge: 'bg-red-50 text-red-600 border-red-200',
        dot: 'bg-red-500',
    },
    medium: {
        label: 'Medium',
        badge: 'bg-orange-50 text-orange-600 border-orange-200',
        dot: 'bg-orange-500',
    },
    low: {
        label: 'Low',
        badge: 'bg-blue-50 text-[#2563eb] border-blue-200',
        dot: 'bg-[#2563eb]',
    },
};

export function ImprovementRecommendations() {
    return (
        <Card className="shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-[#dbe1ff]">
                            <Lightbulb className="size-4 text-[#2563eb]" />
                        </div>
                        <CardTitle className="text-xl font-bold">
                            Improvement Recommendations
                        </CardTitle>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {recommendations.length} suggestions
                    </span>
                </div>
                <p className="text-sm text-muted-foreground">
                    Apply these recommendations to increase your match score from{' '}
                    <span className="font-bold text-[#004ac6]">87</span> to{' '}
                    <span className="font-bold text-green-600">~100</span>.
                </p>
            </CardHeader>

            <CardContent className="space-y-3 pt-2">
                {recommendations.map((rec) => {
                    const Icon = rec.icon;
                    const config = priorityConfig[rec.priority];
                    return (
                        <div
                            key={rec.id}
                            className="group flex gap-4 rounded-xl border border-border bg-muted/20 p-4 transition-all duration-200 hover:border-[#2563eb]/30 hover:bg-[#2563eb]/5 hover:shadow-sm"
                        >
                            {/* Icon */}
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background border border-border group-hover:border-[#2563eb]/30 group-hover:bg-[#dbe1ff]">
                                <Icon className="size-5 text-muted-foreground group-hover:text-[#2563eb] transition-colors" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="mb-1 flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-bold text-foreground">
                                        {rec.title}
                                    </span>
                                    <Badge
                                        variant="outline"
                                        className={cn('text-[10px] font-bold', config.badge)}
                                    >
                                        <span
                                            className={cn(
                                                'mr-1 inline-block size-1.5 rounded-full',
                                                config.dot,
                                            )}
                                        />
                                        {config.label} Priority
                                    </Badge>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                        {rec.category}
                                    </span>
                                </div>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {rec.description}
                                </p>
                            </div>

                            {/* Impact */}
                            <div className="flex shrink-0 flex-col items-end justify-between gap-2">
                                <span className="text-xs font-bold text-green-600 whitespace-nowrap">
                                    {rec.impact}
                                </span>
                                <ArrowRight className="size-4 text-muted-foreground/40 group-hover:text-[#2563eb] transition-colors" />
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
