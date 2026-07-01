import { Head } from '@inertiajs/react';
import AdminLayout from '@/components/layouts/admin-layout';
import { ProfileForm } from './_components/profile-form';

export default function Settings() {
    return (
        <AdminLayout title="Settings">
            <Head title="Account Settings" />

            <div className="space-y-8 p-6 md:p-10">
                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Account Settings
                    </h1>
                    <p className="mt-1 text-base text-muted-foreground">
                        Manage your profile, security, and preferences to optimize your SkillSync AI
                        experience.
                    </p>
                </div>

                {/* Profile Management */}
                <ProfileForm />
            </div>
        </AdminLayout>
    );
}
