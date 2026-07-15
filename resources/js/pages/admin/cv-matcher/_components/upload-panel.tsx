import { FileUp, Upload, Activity, RefreshCw } from 'lucide-react';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const formatCategory = (cat: string) => {
    return cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

interface UploadPanelProps {
    data: any;
    setData: (field: string, value: any) => void;
    processing: boolean;
    onSubmit: () => void;
    successProbability?: number;
    errors: Record<string, string>;
    categories?: string[];
}

export function UploadPanel({ data, setData, processing, onSubmit, successProbability, errors, categories = [] }: UploadPanelProps) {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const fileName = data.file?.name;

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];

        if (file && file.type === "application/pdf") {
            setData('file', file);
        } else if (file) {
            alert("Please upload a PDF file only.");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setData('file', file);
        }
    };

    // Circular progress for success prediction
    const radius = 48;
    const circumference = 2 * Math.PI * radius;
    // Show empty circle if no probability is provided yet
    const hasProbability = successProbability !== undefined && successProbability !== null;
    const safeProbability = hasProbability ? successProbability : 0;
    const offset = hasProbability ? circumference - (safeProbability / 100) * circumference : circumference;

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Target Position */}
            <Card>
                <CardContent className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            Target Position
                        </p>
                        {errors.target_position && <span className="text-xs text-red-500 font-medium">{errors.target_position}</span>}
                    </div>

                    <Select
                        value={data.target_position}
                        onValueChange={(val) => setData('target_position', val)}
                    >
                        <SelectTrigger className="w-full rounded-xl border-border">
                            <SelectValue placeholder="Select target role" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((pos) => (
                                <SelectItem key={pos} value={pos}>
                                    {formatCategory(pos)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Drag & Drop */}
            <Card
                className={`transition-all duration-200 ${isDragging ? 'border-[#2563eb] bg-[#2563eb]/5' : 'border-dashed'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-[#dbe1ff]">
                        <FileUp className="size-7 text-[#2563eb]" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-foreground">
                            {fileName ? fileName : 'Drag & Drop Resume'}
                        </p>
                        {!fileName && (
                            <p className="mt-1 text-sm text-muted-foreground">
                                Support for PDF (Max 10MB).
                                <br />
                                Our AI will parse your skills instantly.
                            </p>
                        )}
                        {errors.file && <p className="mt-2 text-xs text-red-500 font-medium">{errors.file}</p>}
                    </div>
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    <div className="flex flex-col w-full gap-2 mt-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full rounded-xl font-semibold"
                            onClick={() => inputRef.current?.click()}
                        >
                            <Upload className="size-4 mr-2" />
                            {fileName ? 'Change File' : 'Select File'}
                        </Button>
                        <Button
                            type="button"
                            className="w-full rounded-xl bg-[#004ac6] font-extrabold text-white hover:bg-blue-700"
                            onClick={onSubmit}
                            disabled={processing || !data.file || !data.job_description}
                        >
                            {processing ? (
                                <>
                                    <RefreshCw className="size-4 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Activity className="size-4 mr-2" />
                                    Analyze CV
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Success Prediction */}
            <Card>
                <CardContent className="flex flex-col items-center gap-4 p-6">
                    <p className="self-start text-xl font-bold text-foreground">
                        CV Match
                        <br />
                        Score
                    </p>
                    <div className="relative flex items-center justify-center">
                        <svg className="size-32 -rotate-90" viewBox="0 0 120 120">
                            {/* Track */}
                            <circle
                                cx="60"
                                cy="60"
                                r={radius}
                                fill="none"
                                stroke="#e2e8f0"
                                strokeWidth="10"
                            />
                            {/* Progress */}
                            <circle
                                cx="60"
                                cy="60"
                                r={radius}
                                fill="none"
                                stroke={hasProbability ? "#2563eb" : "transparent"}
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-2xl font-extrabold text-[#004ac6]">
                                {hasProbability ? `${Number(successProbability).toFixed(1)}%` : '--'}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                Probability
                            </span>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                        AI prediction of how well this CV matches the target position.
                    </p>
                    <div className="mt-4 flex justify-center">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            Model Training Accuracy: 74.42%
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
