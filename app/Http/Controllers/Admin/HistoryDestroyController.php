<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class HistoryDestroyController extends Controller
{
    public function __invoke(Request $request, Activity $activity): RedirectResponse
    {
        /** Ensure the activity belongs to the authenticated user. */
        abort_if($activity->user_id !== $request->user()->id, 403);

        $activity->delete();

        return redirect()->route('admin.history')->with('success', 'Activity deleted successfully.');
    }
}
