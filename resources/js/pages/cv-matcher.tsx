import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Activity, 
  ChevronRight,
  RefreshCw,
  BookOpen
} from 'lucide-react';

interface Breakdown {
  technical: number;
  experience: number;
  industry: number;
}

interface CVMatchResult {
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

const LOADING_STEPS = [
  "Uploading CV PDF...",
  "Extracting resume text content...",
  "Running Random Forest Classifier...",
  "Calling Gemini semantic analyzer...",
  "Synthesizing fusion match score..."
];

export default function CvMatcher({ result, inputs, errors }: PageProps) {
  const { data, setData, post, processing, reset } = useForm({
    file: null as File | null,
    target_position: inputs?.target_position || '',
    job_description: inputs?.job_description || '',
  });

  const [loadingStep, setLoadingStep] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');

  // Handle loading steps animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (processing) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < LOADING_STEPS.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [processing]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setData('file', file);
        setFileName(file.name);
      } else {
        alert("Please upload a PDF file only.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('file', file);
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/cv-matcher/analyze');
  };

  // Get match score color class
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20';
    if (score >= 50) return 'text-amber-500 border-amber-500 bg-amber-50 dark:bg-amber-950/20';
    return 'text-red-500 border-red-500 bg-red-50 dark:bg-red-950/20';
  };

  const getScoreProgressColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <>
      <Head title="AI CV Job Matcher | SkillSync AI" />
      
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans pb-16">
        {/* Navigation */}
        <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-[#004ac6] dark:text-blue-400 font-bold hover:opacity-90 transition-opacity">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#004ac6] dark:text-blue-400" />
              <span className="font-extrabold text-lg tracking-tight">SkillSync AI</span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
              <div>
                <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50">CV Job Matcher</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                  Analyze how well your CV aligns with any target role. Powered by an ML Random Forest model (30%) & Gemini semantic intelligence (70%).
                </p>
              </div>

              {errors.api_error && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl flex gap-3 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <div>
                    <span className="font-bold">Error:</span> {errors.api_error}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* CV PDF Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">CV / Resume (PDF Only)</label>
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                      dragActive 
                        ? 'border-[#004ac6] dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/10' 
                        : 'border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700'
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="cv-upload-input"
                      required={!fileName}
                    />
                    <label htmlFor="cv-upload-input" className="cursor-pointer flex flex-col items-center">
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-[#004ac6] dark:text-blue-400 rounded-full mb-3">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-200">
                        {fileName ? fileName : 'Upload your resume'}
                      </span>
                      <span className="text-xs text-zinc-500 mt-1">
                        Drag and drop or click to browse
                      </span>
                    </label>
                  </div>
                  {errors.file && <span className="text-xs text-red-500 font-medium">{errors.file}</span>}
                </div>

                {/* Target Position */}
                <div className="space-y-2">
                  <label htmlFor="target_position" className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Target Position</label>
                  <input
                    type="text"
                    id="target_position"
                    placeholder="e.g. Senior Frontend Developer, IT Support"
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004ac6] text-sm"
                    value={data.target_position}
                    onChange={e => setData('target_position', e.target.value)}
                    required
                  />
                  {errors.target_position && <span className="text-xs text-red-500 font-medium">{errors.target_position}</span>}
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <label htmlFor="job_description" className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Job Description Requirements</label>
                  <textarea
                    id="job_description"
                    placeholder="Paste the job description, core duties, and skill requirements here..."
                    rows={6}
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004ac6] text-sm resize-none"
                    value={data.job_description}
                    onChange={e => setData('job_description', e.target.value)}
                    required
                  />
                  {errors.job_description && <span className="text-xs text-red-500 font-medium">{errors.job_description}</span>}
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 px-6 bg-[#004ac6] dark:bg-blue-600 text-white font-extrabold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {processing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Processing Match...</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5" />
                      <span>Evaluate Alignment</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7">
            {processing ? (
              /* Loading State Card */
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 shadow-sm flex flex-col items-center justify-center min-h-[550px]">
                <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-100 dark:border-blue-950/50" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#004ac6] dark:border-t-blue-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#004ac6] dark:text-blue-400 animate-pulse" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">Scanning CV & Matching Requirements</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-sm mb-6">
                  Extracting semantics, evaluating against the RF classification model, and computing LLM compatibility.
                </p>

                <div className="w-full max-w-md bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-4">
                  <div 
                    className="bg-[#004ac6] dark:bg-blue-500 h-full transition-all duration-1000 ease-out" 
                    style={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 text-[#004ac6] dark:text-blue-400 text-sm font-bold animate-pulse">
                  <span>{LOADING_STEPS[loadingStep]}</span>
                </div>
              </div>
            ) : result ? (
              /* Results Dashboard */
              <div className="space-y-6 animate-fade-in">
                {/* Master Match Score Card */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-8">
                  <div className={`w-32 h-32 rounded-full border-[10px] flex flex-col items-center justify-center shrink-0 ${getScoreColor(result.match_score)}`}>
                    <span className="text-4xl font-black">{result.match_score}%</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-85">Match Score</span>
                  </div>

                  <div className="space-y-2 text-center md:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/20 text-[#004ac6] dark:text-blue-400 rounded-full text-xs font-bold">
                      <Sparkles className="w-3 h-3" />
                      <span>Hybrid Fusion Logic</span>
                    </div>
                    <h3 className="text-xl font-extrabold">Requirement Suitability Evaluation</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      This score aggregates a <strong>30% weight</strong> from your custom ML model alignment (TF-IDF similarity, yielding <span className="font-semibold text-zinc-700 dark:text-zinc-300">{result.ml_confidence}%</span>) and a <strong>70% weight</strong> from Gemini's semantic understanding (<span className="font-semibold text-zinc-700 dark:text-zinc-300">{result.gemini_score}%</span>).
                    </p>
                  </div>
                </div>

                {/* Score Breakdown & Skills Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Performance Breakdown */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-5">
                    <h4 className="font-extrabold text-base flex items-center gap-2">
                      <Activity className="w-5 h-5 text-purple-500" />
                      <span>Dimension Analysis</span>
                    </h4>

                    <div className="space-y-4">
                      {/* Technical Fit */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-zinc-700 dark:text-zinc-300">Technical Competence</span>
                          <span className="font-extrabold">{result.breakdown.technical}%</span>
                        </div>
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getScoreProgressColor(result.breakdown.technical)}`}
                            style={{ width: `${result.breakdown.technical}%` }}
                          />
                        </div>
                      </div>

                      {/* Experience Fit */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-zinc-700 dark:text-zinc-300">Experience Alignment</span>
                          <span className="font-extrabold">{result.breakdown.experience}%</span>
                        </div>
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getScoreProgressColor(result.breakdown.experience)}`}
                            style={{ width: `${result.breakdown.experience}%` }}
                          />
                        </div>
                      </div>

                      {/* Industry Fit */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-zinc-700 dark:text-zinc-300">Industry Context</span>
                          <span className="font-extrabold">{result.breakdown.industry}%</span>
                        </div>
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getScoreProgressColor(result.breakdown.industry)}`}
                            style={{ width: `${result.breakdown.industry}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-5">
                    <h4 className="font-extrabold text-base flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-500" />
                      <span>Keywords & Skills Gap</span>
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold text-zinc-400 block mb-2">FOUND IN CV</span>
                        {result.skills_found.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {result.skills_found.map((skill, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-950 rounded-full text-xs font-semibold">
                                <CheckCircle2 className="w-3 h-3 shrink-0" />
                                {skill}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs italic text-zinc-500">No overlapping skills matching model vocabulary detected.</span>
                        )}
                      </div>

                      <div>
                        <span className="text-xs font-bold text-zinc-400 block mb-2">MISSING FROM CV</span>
                        {result.skills_missing.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {result.skills_missing.map((skill, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-950 rounded-full text-xs font-semibold">
                                <XCircle className="w-3 h-3 shrink-0" />
                                {skill}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs italic text-zinc-500">No missing critical skills parsed from the job description.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
                  <h4 className="font-extrabold text-base flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Improvement Recommendations</span>
                  </h4>
                  
                  {result.recommendations.length > 0 ? (
                    <ul className="space-y-3">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                          <ChevronRight className="w-4 h-4 text-[#004ac6] dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm italic text-zinc-500">No improvements needed. Your CV highly matches the job requirements!</p>
                  )}
                </div>
              </div>
            ) : (
              /* Idle / Instructions Dashboard */
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center min-h-[550px] space-y-6">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-full">
                  <FileText className="w-16 h-16 text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">No CV Evaluated Yet</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Upload your resume on the left, type the target role name, and paste the job description to run a hybrid compatibility score assessment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
