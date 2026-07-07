import { CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardActivity } from '../page';

interface Props {
    activity: DashboardActivity | null;
}

export function CvMatcherCard({ activity }: Props) {
    if (!activity) {
        return (
            <Card className="shadow-[0_4px_20px_rgba(37,99,235,0.08)] lg:col-span-7">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-xl font-bold">CV Matcher Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-xl bg-muted/50 p-6 text-center text-sm text-muted-foreground">
                        No CV match activity found yet. Start by uploading your resume in the CV Matcher page.
                    </div>
                </CardContent>
            </Card>
        );
    }

    const matchedSkills: string[] = activity.details?.skills_found || [];
    const missingSkills: string[] = activity.details?.skills_missing || [];
    const aiInsight = (activity.details?.recommendations && activity.details.recommendations.length > 0) 
        ? activity.details.recommendations[0] 
        : "Analyze your CV to find out how well you match with this role.";

    return (
        <Card className="shadow-[0_4px_20px_rgba(37,99,235,0.08)] lg:col-span-7">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-xl font-bold">CV Matcher Analysis</CardTitle>
                <Badge className="bg-[#2563eb] text-white hover:bg-[#2563eb]">
                    Recent Activity
                </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Job Info */}
                <div className="rounded-xl bg-muted/50 p-6">
                    <div className="mb-4 flex items-start justify-between">
                        <div>
                            <h4 className="text-lg font-bold text-foreground">
                                {activity.role}
                            </h4>
                            <p className="text-sm text-muted-foreground">Uploaded: {activity.created_at}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-extrabold text-[#004ac6]">{activity.match_value ?? 0}%</div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                Match Score
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Identified Skills */}
                        <div>
                            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                Identified Skills
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {matchedSkills.length > 0 ? matchedSkills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="flex items-center gap-1 rounded-lg bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600"
                                    >
                                        <CheckCircle className="size-4" />
                                        {skill}
                                    </span>
                                )) : (
                                    <span className="text-sm text-muted-foreground">No skills identified.</span>
                                )}
                            </div>
                        </div>

                        {/* Missing Skills */}
                        <div>
                            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                Missing Skills
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {missingSkills.length > 0 ? missingSkills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive"
                                    >
                                        <AlertTriangle className="size-4" />
                                        {skill}
                                    </span>
                                )) : (
                                    <span className="text-sm text-muted-foreground">No missing skills!</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Insight */}
                <div className="flex items-center gap-4 rounded-r-lg border-l-4 border-[#004ac6] bg-[#004ac6]/5 p-4">
                    <Lightbulb className="size-5 shrink-0 text-[#004ac6]" />
                    <p className="text-sm italic text-muted-foreground">
                        "{aiInsight}"
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
