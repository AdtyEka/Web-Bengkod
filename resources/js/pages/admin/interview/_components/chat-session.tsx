import { useState, useRef, useEffect } from 'react';
import { Sparkles, Mic, Square, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type MessageRole = 'coach' | 'user';

interface Message {
    id: number;
    role: MessageRole;
    text: string;
}

const initialMessages: Message[] = [
    {
        id: 1,
        role: 'coach',
        text: 'Tell me about a time you resolved a conflict within a team.',
    },
    {
        id: 2,
        role: 'user',
        text: 'I used the STAR method to...',
    },
];

interface ChatSessionProps {
    onEndSession?: () => void;
}

export function ChatSession({ onEndSession }: ChatSessionProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [isRecording, setIsRecording] = useState(false);
    const [textInput, setTextInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const addCoachFollowUp = () => {
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    role: 'coach',
                    text: 'Great use of the STAR method! Can you elaborate on the specific outcome and what you learned from it?',
                },
            ]);
        }, 1000);
    };

    const handleRecord = () => {
        setIsRecording((prev) => !prev);

        if (isRecording) {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    role: 'user',
                    text: 'In that situation, I first listened to both sides before proposing a structured resolution.',
                },
            ]);
            addCoachFollowUp();
        }
    };

    const handleSendText = () => {
        const trimmed = textInput.trim();
        if (!trimmed) return;

        setMessages((prev) => [
            ...prev,
            { id: Date.now(), role: 'user', text: trimmed },
        ]);
        setTextInput('');
        addCoachFollowUp();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendText();
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
                        disabled={!textInput.trim()}
                        onClick={handleSendText}
                        className="size-11 shrink-0 rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] disabled:opacity-40"
                    >
                        <Send className="size-4" />
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
