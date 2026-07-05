<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HistoryController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $filter = $request->query('filter', 'all');
        $page = max(1, (int) $request->query('page', 1));
        $perPage = 10;

        $query = Activity::where('user_id', $user->id)->latest();

        if ($filter === 'cv_match') {
            $query->where('type', 'cv_match');
        } elseif ($filter === 'interview_coach') {
            $query->where('type', 'interview_coach');
        }

        $paginator = $query->paginate($perPage);

        $activities = $paginator->getCollection()->map(fn (Activity $a) => [
            'id' => $a->id,
            'type' => $a->type,
            'role' => $a->role,
            'company' => $a->company,
            'date' => $a->created_at->format('M d, Y'),
            'time' => $a->created_at->format('g:i A'),
            'resultType' => $a->result_type,
            'matchValue' => $a->match_value,
            'ratingValue' => $a->rating_value !== null ? (float) $a->rating_value : null,
            'details' => $a->details,
        ]);

        $totalCount = Activity::where('user_id', $user->id)->count();
        $cvMatchCount = Activity::where('user_id', $user->id)->where('type', 'cv_match')->count();
        $interviewCount = Activity::where('user_id', $user->id)->where('type', 'interview_coach')->count();

        return Inertia::render('admin/history/page', [
            'activities' => $activities,
            'pagination' => [
                'currentPage' => $paginator->currentPage(),
                'lastPage' => $paginator->lastPage(),
                'total' => $paginator->total(),
                'perPage' => $perPage,
            ],
            'stats' => [
                'totalActivities' => $totalCount,
                'cvMatchCount' => $cvMatchCount,
                'interviewCount' => $interviewCount,
            ],
            'activeFilter' => $filter,
        ]);
    }
}
