<?php

namespace App\Http\Controllers\Admin;

use App\Models\Activity;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ReportPdfController
{
    /**
     * Download the activities report as a PDF file.
     */
    public function __invoke(Request $request): Response
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

        $pdf = Pdf::loadView('reports.activities', compact('activities', 'range'));

        return $pdf->download('activities_report.pdf');
    }
}
