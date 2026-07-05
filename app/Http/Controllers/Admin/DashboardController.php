<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        $recentActivities = Activity::where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get()
            ->map(fn (Activity $a) => [
                'id' => $a->id,
                'type' => $a->type === 'cv_match' ? 'CV MATCH' : 'COACHING',
                'action' => $a->role,
                'company' => $a->company ?? 'AI Mock Interview',
                'date' => $a->created_at->format('M d, Y'),
                'result' => $a->result_label,
                'resultVariant' => $a->result_variant,
            ]);

        $cvMatchCount = Activity::where('user_id', $user->id)
            ->where('type', 'cv_match')
            ->count();

        $interviewCount = Activity::where('user_id', $user->id)
            ->where('type', 'interview_coach')
            ->count();

        $avgCvMatch = Activity::where('user_id', $user->id)
            ->where('type', 'cv_match')
            ->whereNotNull('match_value')
            ->avg('match_value');

        $avgRating = Activity::where('user_id', $user->id)
            ->where('type', 'interview_coach')
            ->whereNotNull('rating_value')
            ->avg('rating_value');

        return Inertia::render('admin/dashboard/page', [
            'userName' => $user->name,
            'recentActivities' => $recentActivities,
            'stats' => [
                'cvMatchScore' => $avgCvMatch ? round($avgCvMatch).'%' : '—',
                'interviewsCompleted' => $interviewCount,
                'avgCommunication' => $avgRating ? number_format($avgRating, 1).'/5' : '—',
                'totalActivities' => $cvMatchCount + $interviewCount,
            ],
        ]);
    }
}
