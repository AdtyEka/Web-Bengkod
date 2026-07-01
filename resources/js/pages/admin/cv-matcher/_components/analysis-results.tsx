import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const identifiedSkills = [
    'Node.js',
    'PostgreSQL',
    'TypeScript',
    'Docker',
    'AWS S3',
    'GraphQL',
    'REST APIs',
    'Microservices',
    'Unit Testing',
    'Redis',
];

const missingSkills = ['Kubernetes', 'Terraform', 'System Design', 'Leadership'];

const scoreBreakdown = [
    { label: 'Technical Competency', value: 92 },
    { label: 'Experience Level Match', value: 78 },
    { label: 'Industry Specific Knowledge', value: 85 },
];

export function AnalysisResults() {
    return (
        <Card className="flex-1 shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-2xl font-bold">Analysis Results</CardTitle>
                <Badge className="gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-600 hover:bg-green-500/10">
                    <CheckCircle2 className="size-3.5" />
                    STRONG MATCH
                </Badge>
            </CardHeader>

            <CardContent className="space-y-7">
                {/* Score Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Match Score
                        </p>
                        <p className="text-4xl font-extrabold text-[#004ac6]">
                            87{' '}
                            <span className="text-xl font-semibold text-muted-foreground">/100</span>
                        </p>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Skills Found
                        </p>
                        <p className="text-4xl font-extrabold text-green-600">
                            24{' '}
                            <span className="text-xl font-semibold text-muted-foreground">tags</span>
                        </p>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Gap Analysis
                        </p>
                        <p className="text-4xl font-extrabold text-orange-500">
                            04{' '}
                            <span className="text-xl font-semibold text-muted-foreground">
                                missing
                            </span>
                        </p>
                    </div>
                </div>

                {/* Identified Skills */}
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-green-600" />
                        <p className="text-xs font-bold uppercase tracking-widest text-foreground">
                            Identified Skills
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {identifiedSkills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-lg border border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-700"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Missing Skills */}
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <AlertCircle className="size-4 text-orange-500" />
                        <p className="text-xs font-bold uppercase tracking-widest text-foreground">
                            Missing Skills (Target Role)
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {missingSkills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Score Breakdown */}
                <div>
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
                        Score Breakdown
                    </p>
                    <div className="space-y-4">
                        {scoreBreakdown.map((item) => (
                            <div key={item.label}>
                                <div className="mb-1.5 flex justify-between text-sm">
                                    <span className="font-medium text-foreground">{item.label}</span>
                                    <span className="font-bold text-[#004ac6]">{item.value}%</span>
                                </div>
                                <Progress
                                    value={item.value}
                                    className="h-2 bg-muted [&>div]:bg-[#2563eb]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
