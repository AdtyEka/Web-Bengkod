import { useForm } from '@inertiajs/react';
import { Pencil, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useRef, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type User = {
    name: string;
    email: string;
    role: string;
    avatar?: string | null;
};

interface Props {
    user: User;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

export function ProfileForm({ user }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatar || null);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const profileForm = useForm({
        _method: 'patch',
        name: user.name,
        email: user.email,
        avatar: null as File | null,
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
            profileForm.setData('avatar', file);
        }
    };

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        profileForm.post('/admin/settings/profile', {
            preserveScroll: true,
        });
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        passwordForm.patch('/admin/settings/password', {
            preserveScroll: true,
            onSuccess: () => {
                passwordForm.reset();
            },
        });
    };

    return (
        <div className="space-y-6">
            {/* Profile Card */}
            <Card className="shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
                <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold">Profile Management</CardTitle>
                    <CardDescription>Update your personal identity and job role information.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleProfileSubmit}>
                        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
                            {/* Avatar */}
                            <div className="relative shrink-0 self-start">
                                <Avatar className="size-24 border-4 border-background shadow-md">
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt={user.name} className="size-full object-cover rounded-full" />
                                    ) : (
                                        <AvatarFallback className="bg-[#dbe1ff] text-2xl font-bold text-[#004ac6]">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                                <button
                                    type="button"
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
                            <div className="flex-1 space-y-5">
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                            Full Name
                                        </Label>
                                        <Input
                                            value={profileForm.data.name}
                                            onChange={(e) => profileForm.setData('name', e.target.value)}
                                            className="rounded-xl border-border focus-visible:ring-[#2563eb]/30"
                                        />
                                        {profileForm.errors.name && (
                                            <p className="flex items-center gap-1 text-xs text-destructive">
                                                <AlertCircle className="size-3" />
                                                {profileForm.errors.name}
                                            </p>
                                        )}
                                        {profileForm.errors.avatar && (
                                            <p className="flex items-center gap-1 text-xs text-destructive mt-1">
                                                <AlertCircle className="size-3" />
                                                {profileForm.errors.avatar}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                            Email Address
                                        </Label>
                                        <Input
                                            type="email"
                                            value={profileForm.data.email}
                                            onChange={(e) => profileForm.setData('email', e.target.value)}
                                            className="rounded-xl border-border focus-visible:ring-[#2563eb]/30"
                                        />
                                        {profileForm.errors.email && (
                                            <p className="flex items-center gap-1 text-xs text-destructive">
                                                <AlertCircle className="size-3" />
                                                {profileForm.errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {profileForm.wasSuccessful && (
                                    <p className="flex items-center gap-1.5 text-sm font-semibold text-green-600">
                                        <CheckCircle className="size-4" />
                                        Profile updated successfully.
                                    </p>
                                )}

                                <div className="flex justify-end pt-2">
                                    <Button
                                        type="submit"
                                        disabled={profileForm.processing}
                                        className="rounded-xl bg-[#2563eb] font-semibold text-white hover:bg-[#1d4ed8]"
                                    >
                                        {profileForm.processing ? 'Saving…' : 'Save Profile Changes'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Password Card */}
            <Card className="shadow-[0_4px_20px_rgba(37,99,235,0.08)]">
                <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
                    <CardDescription>Keep your account secure with a strong password.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="space-y-2 sm:col-span-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    Current Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        value={passwordForm.data.current_password}
                                        onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                        className="rounded-xl border-border pr-10 focus-visible:ring-[#2563eb]/30"
                                        placeholder="Enter your current password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        tabIndex={-1}
                                    >
                                        {showCurrentPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                                {passwordForm.errors.current_password && (
                                    <p className="flex items-center gap-1 text-xs text-destructive">
                                        <AlertCircle className="size-3" />
                                        {passwordForm.errors.current_password}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={passwordForm.data.password}
                                        onChange={(e) => passwordForm.setData('password', e.target.value)}
                                        className="rounded-xl border-border pr-10 focus-visible:ring-[#2563eb]/30"
                                        placeholder="Min. 8 characters"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        tabIndex={-1}
                                    >
                                        {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                                {passwordForm.errors.password && (
                                    <p className="flex items-center gap-1 text-xs text-destructive">
                                        <AlertCircle className="size-3" />
                                        {passwordForm.errors.password}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    Confirm New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={passwordForm.data.password_confirmation}
                                        onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                        className="rounded-xl border-border pr-10 focus-visible:ring-[#2563eb]/30"
                                        placeholder="Repeat new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {passwordForm.wasSuccessful && (
                            <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-green-600">
                                <CheckCircle className="size-4" />
                                Password updated successfully.
                            </p>
                        )}

                        <div className="mt-6 flex justify-end">
                            <Button
                                type="submit"
                                disabled={passwordForm.processing}
                                variant="outline"
                                className="rounded-xl font-semibold"
                            >
                                {passwordForm.processing ? 'Updating…' : 'Update Password'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
