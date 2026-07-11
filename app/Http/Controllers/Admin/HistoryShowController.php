<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HistoryShowController extends Controller
{
    public function __invoke(Request $request, Activity $activity): Response
    {
        /** Ensure the activity belongs to the authenticated user. */
        abort_if($activity->user_id !== $request->user()->id, 403);

        return Inertia::render('admin/history/detail/page', [
            'activity' => [
                'id' => $activity->id,
                'type' => $activity->type,
                'role' => $activity->role,
                'company' => $activity->company,
                'date' => $activity->created_at->format('M d, Y'),
                'time' => $activity->created_at->format('g:i A'),
                'resultType' => $activity->result_type,
                'matchValue' => $activity->match_value,
                'ratingValue' => $activity->rating_value !== null ? (float) $activity->rating_value : null,
                'details' => $activity->details,
            ],
        ]);
    }
}
