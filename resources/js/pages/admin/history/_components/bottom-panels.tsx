import { ArrowRight, BarChart3, Download, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function BottomPanels() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Insights Panel */}
            <Card className="shadow-[0_2px_12px_rgba(37,99,235,0.04)]">
                <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                            <BarChart3 className="size-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground">AI Career Insights</h3>
                            <p className="text-xs text-muted-foreground">Based on your activity</p>
                        </div>
                    </div>
                    <div className="space-y-4 rounded-xl border border-border/50 bg-muted/30 p-5">
                        <div className="flex gap-3">
                            <TrendingUp className="mt-0.5 size-4 shrink-0 text-[#2563eb]" />
                            <p className="text-sm text-foreground">
                                Your average <span className="font-bold text-[#2563eb]">CV Match Score has improved by 12%</span> over the last month. Keep tailoring your resumes!
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <TrendingUp className="mt-0.5 size-4 shrink-0 text-orange-500" />
                            <p className="text-sm text-foreground">
                                In interviews, your <span className="font-bold text-orange-500">System Design explanations</span> are often flagged as too brief. Try to use more diagrams or structured approaches.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Export Panel */}
            <Card className="flex flex-col justify-center shadow-[0_2px_12px_rgba(37,99,235,0.04)]">
                <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                        <Download className="size-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">Export Activity Report</h3>
                    <p className="mb-6 max-w-[280px] text-sm text-muted-foreground">
                        Download a comprehensive CSV report of all your CV matches and interview performances for your records.
                    </p>
                    <a href="/admin/report/csv">
                        <Button className="w-full gap-2 bg-[#2563eb] text-white hover:bg-[#2563eb]/90 sm:w-auto">
                            <Download className="size-4" />
                            Download Report
                        </Button>
                    </a>
                </CardContent>
            </Card>
        </div>
    );
}
