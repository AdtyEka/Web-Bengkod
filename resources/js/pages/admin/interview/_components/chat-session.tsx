import { useState, useRef, useEffect } from 'react';
import { Sparkles, Mic, Square, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import axios from 'axios';

type MessageRole = 'coach' | 'user';

interface Message {
    id: number;
    role: MessageRole;
    text: string;
}

interface ChatSessionProps {
    role?: string;
    skillsFound?: string[];
    skillsMissing?: string[];
    onEndSession?: () => void;
    onFeedback?: (evaluation: any) => void;
    onSessionIdChange?: (sessionId: string) => void;
}

export function ChatSession({ role = 'Software Engineer', skillsFound = [], skillsMissing = [], onEndSession, onFeedback, onSessionIdChange }: ChatSessionProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
    
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const startSession = async () => {
            setIsLoading(true);
            try {
                // Combine skills to form the tech_stack context for the AI
                const allSkills = [...skillsFound, ...skillsMissing];
                const techStackString = allSkills.length > 0 ? allSkills.join(', ') : 'Umum (General Skills)';

                const response = await axios.post('/api/interview/questions', {
                    role: role,
                    level: "mid",
                    tech_stack: techStackString,
                    question_count: 5,
                    ratio_technical: 60,
                    language: "id"
                });

                // Assuming the response returns session_id and questions
                // Please adjust the response structure to match your actual API response
                const newSessionId = response.data?.session_id || response.data?.data?.session_id;
                const firstQuestion = response.data?.first_question || response.data?.data?.questions?.[0] || "Mari kita mulai interview-nya.";
                
                if (newSessionId) {
                    setSessionId(newSessionId);
                    if (onSessionIdChange) onSessionIdChange(newSessionId);
                }
                
                setMessages([
                    {
                        id: Date.now(),
                        role: 'coach',
                        text: firstQuestion,
                    }
                ]);
            } catch (error) {
                console.error("Failed to start session", error);
                setMessages([{ id: Date.now(), role: 'coach', text: "Gagal memulai sesi interview. Silakan coba lagi nanti." }]);
            } finally {
                setIsLoading(false);
            }
        };

        startSession();
    }, []);

    const handleRecord = () => {
        // Voice recording logic is out of scope for now, keep it as UI only
        setIsRecording((prev) => !prev);
    };

    const handleSendText = async () => {
        const trimmed = textInput.trim();
        if (!trimmed) return;

        // Add user message
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), role: 'user', text: trimmed },
        ]);
        setTextInput('');
        setIsLoading(true);

        try {
            // Post feedback/answer
            const response = await axios.post('/api/interview/feedback', {
                session_id: sessionId || 'default-session',
                question_id: currentQuestionId,
                user_answer: trimmed
            });

            // Pass evaluation to LiveFeedback component via props
            if (response.data?.evaluation && onFeedback) {
                onFeedback(response.data.evaluation);
            }

            // Membaca respons dari struktur JSON yang baru (interviewer_response)
            const interviewerResponse = response.data?.interviewer_response;
            let nextQuestion = "Terima kasih atas jawaban Anda.";
            
            if (interviewerResponse) {
                // Menggabungkan acknowledgment dan message_to_user jika keduanya ada
                nextQuestion = [interviewerResponse.acknowledgment, interviewerResponse.message_to_user]
                    .filter(Boolean) // Membuang string kosong/null
                    .join(' ');
                
                // Update question_id jika Vercel memberikan next_question_id (pindah pertanyaan)
                // Jika null (misal: "probe"), berarti masih di pertanyaan yang sama.
                if (interviewerResponse.next_question_id !== null && interviewerResponse.next_question_id !== undefined) {
                    setCurrentQuestionId(interviewerResponse.next_question_id);
                }
            } else if (response.data?.next_question) {
                nextQuestion = response.data.next_question;
                // Fallback increment jika struktur beda
                setCurrentQuestionId(prev => prev + 1);
            }

            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, role: 'coach', text: nextQuestion },
            ]);

        } catch (error) {
            console.error("Failed to send answer", error);
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, role: 'coach', text: "Maaf, terjadi kesalahan saat memproses jawaban Anda." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isLoading) {
                handleSendText();
            }
        }
    };

    return (
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
            {/* Message List */}
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            'flex max-w-[80%]',
                            msg.role === 'user' ? 'ml-auto justify-end' : 'justify-start',
                        )}
                    >
                        {msg.role === 'coach' && (
                            <div className="mr-2.5 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2563eb]">
                                <Sparkles className="size-4 text-white" />
                            </div>
                        )}
                        <div
                            className={cn(
                                'rounded-2xl px-4 py-3 text-sm leading-relaxed',
                                msg.role === 'coach'
                                    ? 'rounded-tl-sm bg-[#dbe1ff]/60 text-foreground'
                                    : 'rounded-tr-sm bg-muted text-foreground',
                            )}
                        >
                            {msg.role === 'coach' && (
                                <p className="mb-1 text-xs font-bold text-[#2563eb]">
                                    Coach Gemini
                                </p>
                            )}
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* Recording indicator */}
                {isRecording && (
                    <div className="flex justify-end">
                        <div className="flex items-center gap-2 rounded-2xl rounded-tr-sm bg-muted px-4 py-3 text-sm text-muted-foreground">
                            <span className="size-2 animate-pulse rounded-full bg-red-500" />
                            Recording...
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Action Bar */}
            <div className="flex flex-col gap-3 border-t border-border bg-background p-4">
                {/* Text Input Row */}
                <div className="flex items-end gap-2">
                    <Textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your answer here... (Enter to send, Shift+Enter for new line)"
                        className="min-h-[44px] max-h-32 resize-none rounded-xl border-border text-sm leading-relaxed focus-visible:ring-[#2563eb]/30"
                        rows={1}
                    />
                    <Button
                        size="icon"
                        disabled={!textInput.trim() || isLoading}
                        onClick={handleSendText}
                        className="size-11 shrink-0 rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] disabled:opacity-40"
                    >
                        {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                    </Button>
                </div>

                {/* Bottom Buttons Row */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="rounded-xl border-destructive/50 font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={onEndSession}
                    >
                        End Session
                    </Button>
                    <Button
                        className={cn(
                            'flex-1 gap-2 rounded-xl font-semibold transition-all',
                            isRecording
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]',
                        )}
                        onClick={handleRecord}
                    >
                        {isRecording ? (
                            <>
                                <Square className="size-4 fill-white" />
                                Stop Recording
                            </>
                        ) : (
                            <>
                                <Mic className="size-4" />
                                Record Answer
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
