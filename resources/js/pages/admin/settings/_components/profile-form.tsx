import { useRef, useState } from 'react';
import { Pencil } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ProfileForm() {
    const [avatarSrc, setAvatarSrc] = useState(
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDpBhAhzfZByqnP-3LMETetRQEQq0nSfHD5wm1bMarbBbPGyrvTSozG2DxZCUp3uPhOsv9iUZ2gcC0hUqBbnzZ7yg1Vkkd8yZUWDKQXhgulNwa10GL5Uu6JNZUGPAXBOB2FggNPSuCz6pJJ3c-2EwyBsflL4OAVcNXp9hEJh1saFWfCJRmb382kwZRf7oDVnmSiY0P3BqSqMrrKKa4hXJ46dm81sJ5lMLYy--y8-0vlizB4SUZ7c7DJ8A',
    );
    const fileRef = useRef<HTMLInputElement>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarSrc(URL.createObjectURL(file));
        }
    };

    return (
        <Card className="shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
            <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold">Profile Management</CardTitle>
                <CardDescription>
                    Update your personal identity and job role information.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
                    {/* Avatar */}
                    <div className="relative shrink-0 self-start">
                        <Avatar className="size-24 border-4 border-background shadow-md">
                            <AvatarImage src={avatarSrc} alt="Jane Doe" className="object-cover" />
                            <AvatarFallback className="bg-[#dbe1ff] text-2xl font-bold text-[#004ac6]">
                                JD
                            </AvatarFallback>
                        </Avatar>
                        <button
                            onClick={() => fileRef.current?.click()}
                            className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-md transition-transform hover:scale-110"
                        >
                            <Pencil className="size-3.5" />
                        </button>
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>

                    {/* Form Fields */}
                    <div className="flex-1 space-y-6">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    Full Name
                                </Label>
                                <Input
                                    defaultValue="Jane Doe"
                                    className="rounded-xl border-border focus-visible:ring-[#2563eb]/30"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    Email Address
                                </Label>
                                <Input
                                    type="email"
                                    defaultValue="jane.doe@example.com"
                                    className="rounded-xl border-border focus-visible:ring-[#2563eb]/30"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    New Password
                                </Label>
                                <Input
                                    type="password"
                                    defaultValue="password123"
                                    className="rounded-xl border-border focus-visible:ring-[#2563eb]/30"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    Confirm New Password
                                </Label>
                                <Input
                                    type="password"
                                    defaultValue="password123"
                                    className="rounded-xl border-border focus-visible:ring-[#2563eb]/30"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <Button
                                variant="outline"
                                className="rounded-xl font-semibold"
                            >
                                Update Password
                            </Button>
                            <Button className="rounded-xl bg-[#2563eb] font-semibold text-white hover:bg-[#1d4ed8]">
                                Save Profile Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
