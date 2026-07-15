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
                'time' => $a->created_at->format('g:i A'),
                'result' => $a->result_label,
                'resultVariant' => $a->result_variant,
                'matchValue' => $a->match_value,
                'ratingValue' => $a->rating_value !== null ? (float) $a->rating_value : null,
                'details' => $a->details,
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

        $lastCvMatch = Activity::where('user_id', $user->id)
            ->where('type', 'cv_match')
            ->latest()
            ->first();

        $lastInterview = Activity::where('user_id', $user->id)
            ->where('type', 'interview_coach')
            ->latest()
            ->first();

        $formatActivity = fn (?Activity $a) => $a ? [
            'id' => $a->id,
            'role' => $a->role,
            'company' => $a->company,
            'match_value' => $a->match_value,
            'rating_value' => $a->rating_value,
            'created_at' => $a->created_at->diffForHumans(),
            'details' => $a->details,
        ] : null;

        $startDate = now()->subDays(89)->startOfDay();
        $activities = Activity::where('user_id', $user->id)
            ->where('created_at', '>=', $startDate)
            ->get()
            ->groupBy(fn ($a) => $a->created_at->format('Y-m-d'));

        $chartData = [];
        $currentDate = now()->subDays(89)->startOfDay();
        for ($i = 0; $i < 90; $i++) {
            $dateString = $currentDate->format('Y-m-d');
            $dayActivities = $activities->get($dateString, collect());
            
            $cvMatches = $dayActivities->where('type', 'cv_match')->whereNotNull('match_value');
            $interviews = $dayActivities->where('type', 'interview_coach')->whereNotNull('rating_value');

            $desktop = $cvMatches->isNotEmpty() ? $cvMatches->avg('match_value') : 0;
            $mobile = $interviews->isNotEmpty() ? ($interviews->avg('rating_value') / 5) * 100 : 0;

            $chartData[] = [
                'date' => $dateString,
                'desktop' => round($desktop, 1),
                'mobile' => round($mobile, 1),
            ];
            
            $currentDate = $currentDate->addDay();
        }

        return Inertia::render('admin/dashboard/page', [
            'userName' => $user->name,
            'recentActivities' => $recentActivities,
            'stats' => [
                'cvMatchScore' => $avgCvMatch ? round($avgCvMatch).'%' : '—',
                'interviewsCompleted' => $interviewCount,
                'avgCommunication' => $avgRating ? number_format($avgRating, 1).'/5' : '—',
                'totalActivities' => $cvMatchCount + $interviewCount,
            ],
            'lastCvMatch' => $formatActivity($lastCvMatch),
            'lastInterview' => $formatActivity($lastInterview),
            'chartData' => $chartData,
        ]);
    }
}
