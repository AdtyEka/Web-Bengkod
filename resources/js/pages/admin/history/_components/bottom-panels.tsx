import { BarChart3, CalendarDays, FileDown, Table2, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { HistoryInsights } from '../page';

type ExportFormat = 'csv' | 'pdf';
type ExportRange = '1d' | '7d' | '30d' | 'all';

function CsvIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M6 0h22l12 12v30a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6z" fill="#e8f5e9" />
            <path d="M28 0l12 12H34a6 6 0 0 1-6-6V0z" fill="#a5d6a7" />
            <rect x="0" y="28" width="40" height="14" rx="3" fill="#2e7d32" />
            <text x="20" y="38.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">CSV</text>
            <path d="M10 14h12M10 20h8" stroke="#a5d6a7" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function PdfIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M6 0h22l12 12v30a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6z" fill="#fce4ec" />
            <path d="M28 0l12 12H34a6 6 0 0 1-6-6V0z" fill="#ef9a9a" />
            <rect x="0" y="28" width="40" height="14" rx="3" fill="#c62828" />
            <text x="20" y="38.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">PDF</text>
            <path d="M10 14h12M10 20h8" stroke="#ef9a9a" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

const FORMAT_OPTIONS: { value: ExportFormat; label: string }[] = [
    { value: 'csv', label: 'CSV' },
    { value: 'pdf', label: 'PDF' },
];

const RANGE_OPTIONS: { value: ExportRange; label: string; desc: string }[] = [
    { value: '1d', label: '1 Hari', desc: 'Hari ini' },
    { value: '7d', label: '1 Minggu', desc: '7 hari terakhir' },
    { value: '30d', label: '1 Bulan', desc: '30 hari terakhir' },
    { value: 'all', label: 'Semua', desc: 'Seluruh riwayat' },
];

function ExportPanel() {
    const [format, setFormat] = useState<ExportFormat>('csv');
    const [range, setRange] = useState<ExportRange>('30d');

    const handleDownload = () => {
        window.open(`/admin/report/${format}?range=${range}`, '_blank');
    };

    const rangeLabel = RANGE_OPTIONS.find((r) => r.value === range)?.desc ?? '';

    return (
        <Card className="shadow-[0_2px_12px_rgba(37,99,235,0.04)]">
            <CardContent className="p-6">
                {/* Header */}
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                        <FileDown className="size-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground">Export Activity Report</h3>
                        <p className="text-xs text-muted-foreground">Pilih format & rentang waktu</p>
                    </div>
                </div>

                {/* Format Picker */}
                <div className="mb-4">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <Table2 className="size-3.5" />
                        Format File
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {FORMAT_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setFormat(opt.value)}
                                className={cn(
                                    'flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition-all',
                                    format === opt.value
                                        ? 'border-[#2563eb] bg-[#2563eb]/5 text-[#2563eb] shadow-sm'
                                        : 'border-border bg-background text-muted-foreground hover:bg-muted/40 hover:text-foreground',
                                )}
                            >
                                {opt.value === 'csv' ? (
                                    <CsvIcon className="size-8 shrink-0" />
                                ) : (
                                    <PdfIcon className="size-8 shrink-0" />
                                )}
                                <span>{opt.label}</span>
                                {format === opt.value && (
                                    <span className="ml-auto flex size-4 items-center justify-center rounded-full border-2 border-[#2563eb] bg-[#2563eb]">
                                        <span className="block size-1.5 rounded-full bg-white" />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Range Picker */}
                <div className="mb-5">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <CalendarDays className="size-3.5" />
                        Rentang Waktu
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {RANGE_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setRange(opt.value)}
                                className={cn(
                                    'flex flex-col rounded-xl border px-3.5 py-2.5 text-left transition-all',
                                    range === opt.value
                                        ? 'border-[#2563eb] bg-[#2563eb]/5 shadow-sm'
                                        : 'border-border bg-background hover:bg-muted/40',
                                )}
                            >
                                <span
                                    className={cn(
                                        'text-sm font-bold leading-tight',
                                        range === opt.value ? 'text-[#2563eb]' : 'text-foreground',
                                    )}
                                >
                                    {opt.label}
                                </span>
                                <span className="mt-0.5 text-xs text-muted-foreground">{opt.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="mb-4 rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
                    <p className="text-xs text-muted-foreground">
                        Mengunduh laporan{' '}
                        <span className="font-semibold uppercase text-foreground">{format}</span>
                        {' '}untuk{' '}
                        <span className="font-semibold text-foreground">{rangeLabel}</span>
                    </p>
                </div>

                <Button
                    onClick={handleDownload}
                    className="w-full gap-2 bg-[#2563eb] text-white hover:bg-[#2563eb]/90"
                >
                    <FileDown className="size-4" />
                    Unduh Laporan
                </Button>
            </CardContent>
        </Card>
    );
}

export function BottomPanels({ insights }: { insights?: HistoryInsights }) {
    const cvScore = insights?.avgCvMatch;
    const interviewScore = insights?.avgInterviewScore;

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Insights Panel */}
            <Card className="shadow-[0_2px_12px_rgba(37,99,235,0.04)]">
                <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dbe1ff] text-[#0871E7]">
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
                                {cvScore !== undefined && cvScore !== null ? (
                                    <>Your average <span className="font-bold text-[#2563eb]">CV Match Score is {cvScore}%</span>. Keep tailoring your resumes for better results!</>
                                ) : (
                                    <>You haven't completed any <span className="font-bold text-[#2563eb]">CV Match tests</span> yet. Try it now!</>
                                )}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <TrendingUp className="mt-0.5 size-4 shrink-0 text-[#0871E7]" />
                            <p className="text-sm text-foreground">
                                {interviewScore !== undefined && interviewScore !== null ? (
                                    <>Your average <span className="font-bold text-[#0871E7]">Interview Rating is {Number(interviewScore.toFixed(1))}/5</span>. Keep practicing to boost your confidence!</>
                                ) : (
                                    <>You haven't completed any <span className="font-bold text-[#0871E7]">AI Mock Interviews</span> yet. Start practicing today!</>
                                )}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Export Panel */}
            <ExportPanel />
        </div>
    );
}
