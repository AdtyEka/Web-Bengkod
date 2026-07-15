import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { CVMatchResult } from '../page';

interface AnalysisResultsProps {
    result: CVMatchResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
    const { 
        match_score, 
        skills_found, 
        skills_missing, 
        breakdown 
    } = result;

    const scoreBreakdown = [
        { label: 'Technical Competency', value: breakdown.technical },
        { label: 'Experience Level Match', value: breakdown.experience },
        { label: 'Industry Specific Knowledge', value: breakdown.industry },
    ];

    // Determine badge styling based on match_score
    let badgeText = "POOR MATCH";
    let badgeColorClass = "text-red-600 bg-red-500/10 hover:bg-red-500/10";

    if (match_score >= 80) {
        badgeText = "STRONG MATCH";
        badgeColorClass = "text-green-600 bg-green-500/10 hover:bg-green-500/10";
    } else if (match_score >= 50) {
        badgeText = "FAIR MATCH";
        badgeColorClass = "text-[#0871E7] bg-[#0871E7]/10 hover:bg-[#0871E7]/10";
    }

    return (
        <Card className="flex-1 shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-2xl font-bold">Analysis Results</CardTitle>
                <Badge className={`gap-1.5 rounded-full px-3 py-1 text-xs font-bold border-none ${badgeColorClass}`}>
                    {match_score >= 80 ? (
                        <CheckCircle2 className="size-3.5" />
                    ) : match_score >= 50 ? (
                        <CheckCircle2 className="size-3.5 opacity-80" />
                    ) : (
                        <AlertCircle className="size-3.5" />
                    )}
                    {badgeText}
                </Badge>
            </CardHeader>

            <CardContent className="space-y-7 mt-4">
                {/* Score Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Match Score
                        </p>
                        <p className={`text-4xl font-extrabold ${match_score >= 80 ? 'text-[#004ac6]' : match_score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                            {match_score}{' '}
                            <span className="text-xl font-semibold text-muted-foreground">/100</span>
                        </p>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Skills Found
                        </p>
                        <p className="text-4xl font-extrabold text-green-600">
                            {skills_found.length}{' '}
                            <span className="text-xl font-semibold text-muted-foreground">tags</span>
                        </p>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Gap Analysis
                        </p>
                        <p className="text-4xl font-extrabold text-orange-500">
                            {skills_missing.length < 10 ? `0${skills_missing.length}` : skills_missing.length}{' '}
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
                        {skills_found.length > 0 ? (
                            skills_found.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="rounded-lg border border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-700"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <p className="text-sm italic text-muted-foreground">No matching skills found.</p>
                        )}
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
                        {skills_missing.length > 0 ? (
                            skills_missing.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <p className="text-sm italic text-muted-foreground">No missing skills detected!</p>
                        )}
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
