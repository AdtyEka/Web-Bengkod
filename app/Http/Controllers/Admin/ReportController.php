<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportController extends Controller
{
    public function downloadCsv(Request $request): StreamedResponse
    {
        $activities = Activity::where('user_id', $request->user()->id)->latest()->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="activities_report.csv"',
        ];

        return response()->stream(function () use ($activities) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Type', 'Target Role', 'Company', 'Result Type', 'Match Score', 'Rating', 'Date']);

            foreach ($activities as $activity) {
                fputcsv($file, [
                    $activity->id,
                    $activity->type,
                    $activity->role,
                    $activity->company ?? '-',
                    $activity->result_type,
                    $activity->match_value ?? '-',
                    $activity->rating_value ?? '-',
                    $activity->created_at->format('Y-m-d H:i:s'),
                ]);
            }

            fclose($file);
        }, 200, $headers);
    }
}
