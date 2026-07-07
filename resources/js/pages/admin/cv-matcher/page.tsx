import { Head, useForm } from '@inertiajs/react';
import { Share2, Sparkles, FileText, RefreshCw, Activity, AlertCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { AnalysisResults } from './_components/analysis-results';
import { ImprovementRecommendations } from './_components/improvement-recommendations';
import { UploadPanel } from './_components/upload-panel';

interface Breakdown {
    technical: number;
    experience: number;
    industry: number;
}

export interface CVMatchResult {
    match_score: number;
    skills_found: string[];
    skills_missing: string[];
    breakdown: Breakdown;
    recommendations: string[];
    ml_confidence: number;
    gemini_score: number;
}

interface PageProps {
    result?: CVMatchResult;
    inputs?: {
        target_position: string;
        job_description: string;
    };
    errors: Record<string, string>;
}

export default function CvMatcher({ result, inputs, errors }: PageProps) {
    const { data, setData, post, processing } = useForm({
        file: null as File | null,
        target_position: inputs?.target_position || 'Senior Backend Developer',
        job_description: inputs?.job_description || '',
    });

    const handleSubmit = () => {
        post('/admin/cv-matcher/analyze');
    };

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
                    </div>
                </div>

                {errors.api_error && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl flex gap-3 text-red-600 dark:text-red-400 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <div>
                            <span className="font-bold">Error:</span> {errors.api_error}
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    {/* Left — Upload Panel */}
                    <div className="w-full lg:w-72 shrink-0">
                        <UploadPanel
                            data={data}
                            setData={setData}
                            processing={processing}
                            onSubmit={handleSubmit}
                            successProbability={result ? result.ml_confidence : undefined}
                            errors={errors}
                        />
                    </div>

                    {/* Right — Job Description + Analysis Results */}
                    <div className="flex flex-1 min-w-0 flex-col gap-6">
                        {/* Job Description Textbox */}
                        <Card className="shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
                            <CardContent className="p-5">
                                <div className="mb-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileText className="size-4 text-[#2563eb]" />
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                            Job Description
                                        </p>
                                    </div>
                                    {errors.job_description && <span className="text-xs text-red-500 font-medium">{errors.job_description}</span>}
                                </div>
                                <Textarea
                                    placeholder="Paste the job description here... Our AI will extract required skills and compare them with your resume."
                                    className="min-h-32 resize-none rounded-xl border-border text-sm leading-relaxed focus-visible:ring-[#2563eb]/30"
                                    value={data.job_description}
                                    onChange={e => setData('job_description', e.target.value)}
                                />
                            </CardContent>
                        </Card>

                        {processing ? (
                            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center min-h-[300px] space-y-6">
                                <RefreshCw className="w-12 h-12 text-[#2563eb] animate-spin" />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Analyzing CV...</h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Please wait while our AI models process your resume.</p>
                                </div>
                            </div>
                        ) : result ? (
                            <>
                                <AnalysisResults result={result} />
                                <ImprovementRecommendations recommendations={result.recommendations} />
                            </>
                        ) : (
                            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center min-h-[300px] space-y-6">
                                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-full">
                                    <FileText className="w-16 h-16 text-zinc-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">No CV Evaluated Yet</h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                                        Upload your resume on the left, select the target role name, and paste the job description to run a hybrid compatibility score assessment.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
