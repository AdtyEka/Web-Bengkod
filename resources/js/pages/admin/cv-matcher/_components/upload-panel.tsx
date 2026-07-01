import { useState, useRef } from 'react';
import { FileUp, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const targetPositions = [
    'Senior Backend Developer',
    'Senior Frontend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Product Designer',
    'Data Scientist',
];

interface UploadPanelProps {
    successProbability?: number;
}

export function UploadPanel({ successProbability = 82 }: UploadPanelProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) setFileName(file.name);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setFileName(file.name);
    };

    // Circular progress for success prediction
    const radius = 48;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (successProbability / 100) * circumference;

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Target Position */}
            <Card>
                <CardContent className="p-5">
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Target Position
                    </p>
                    <Select defaultValue="Senior Backend Developer">
                        <SelectTrigger className="w-full rounded-xl border-border">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {targetPositions.map((pos) => (
                                <SelectItem key={pos} value={pos}>
                                    {pos}
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
                                Support for PDF, DOCX (Max 10MB).
                                <br />
                                Our AI will parse your skills instantly.
                            </p>
                        )}
                    </div>
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".pdf,.docx"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <Button
                        className="mt-1 w-full rounded-xl bg-[#2d3748] font-semibold text-white hover:bg-[#1a202c]"
                        onClick={() => inputRef.current?.click()}
                    >
                        <Upload className="size-4" />
                        Select Files
                    </Button>
                </CardContent>
            </Card>

            {/* Success Prediction */}
            <Card>
                <CardContent className="flex flex-col items-center gap-4 p-6">
                    <p className="self-start text-xl font-bold text-foreground">
                        Success
                        <br />
                        Prediction
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
                                stroke="#2563eb"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                className="transition-all duration-700"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-2xl font-extrabold text-[#004ac6]">
                                {successProbability}%
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                Probability
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
