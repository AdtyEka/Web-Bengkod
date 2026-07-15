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
        $query = Activity::where('user_id', $request->user()->id)->latest();

        $range = $request->query('range', 'all');
        if ($range === '1d') {
            $query->where('created_at', '>=', now()->subDay());
        } elseif ($range === '7d') {
            $query->where('created_at', '>=', now()->subDays(7));
        } elseif ($range === '30d') {
            $query->where('created_at', '>=', now()->subDays(30));
        }

        $activities = $query->get();

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
