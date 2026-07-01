import { Head } from '@inertiajs/react';
import { Share2, Sparkles, FileText } from 'lucide-react';
import AdminLayout from '@/components/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { UploadPanel } from './_components/upload-panel';
import { AnalysisResults } from './_components/analysis-results';
import { ImprovementRecommendations } from './_components/improvement-recommendations';

export default function CvMatcher() {
    return (
        <AdminLayout title="CV Matcher">
            <Head title="CV Matcher" />

            <div className="p-6 md:p-10 space-y-8">
                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            CV Job Matcher
                        </h1>
                        <p className="mt-1 text-base text-muted-foreground">
                            Upload your resume to see how well you match your target role.
                        </p>
                    </div>
                    <div className="flex shrink-0 gap-3">
                        <Button variant="outline" className="rounded-xl gap-2 font-semibold">
                            <Share2 className="size-4" />
                            Share Results
                        </Button>
                        <Button className="rounded-xl gap-2 bg-[#2563eb] font-semibold text-white hover:bg-[#1d4ed8]">
                            <Sparkles className="size-4" />
                            New Analysis
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    {/* Left — Upload Panel */}
                    <div className="w-full lg:w-72 shrink-0">
                        <UploadPanel successProbability={82} />
                    </div>

                    {/* Right — Job Description + Analysis Results */}
                    <div className="flex flex-1 min-w-0 flex-col gap-6">
                        {/* Job Description Textbox */}
                        <Card className="shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
                            <CardContent className="p-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <FileText className="size-4 text-[#2563eb]" />
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        Job Description
                                    </p>
                                </div>
                                <Textarea
                                    placeholder="Paste the job description here... Our AI will extract required skills and compare them with your resume."
                                    className="min-h-32 resize-none rounded-xl border-border text-sm leading-relaxed focus-visible:ring-[#2563eb]/30"
                                />
                            </CardContent>
                        </Card>

                        <AnalysisResults />

                        <ImprovementRecommendations />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
