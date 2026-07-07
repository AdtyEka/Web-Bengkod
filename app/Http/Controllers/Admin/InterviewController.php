<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InterviewController extends Controller
{
    public function index(Request $request): Response
    {
        // Ambil data cv_match terakhir untuk user ini
        $latestCvMatch = Activity::where('user_id', $request->user()->id)
            ->where('type', 'cv_match')
            ->latest()
            ->first();

        // Siapkan fallback default jika tidak ada riwayat CV match
        $cvMatchRole = 'Software Engineer';
        $skillsFound = [];
        $skillsMissing = [];

        if ($latestCvMatch) {
            $cvMatchRole = $latestCvMatch->role ?: 'Software Engineer';

            // Ekstrak skills_found dan skills_missing dari field details (JSON)
            $details = $latestCvMatch->details ?? [];
            if (isset($details['skills_found']) && is_array($details['skills_found'])) {
                $skillsFound = $details['skills_found'];
            }
            if (isset($details['skills_missing']) && is_array($details['skills_missing'])) {
                $skillsMissing = $details['skills_missing'];
            }
        }

        return Inertia::render('admin/interview/page', [
            'cvMatchRole' => $cvMatchRole,
            'skillsFound' => $skillsFound,
            'skillsMissing' => $skillsMissing,
        ]);
    }
}
