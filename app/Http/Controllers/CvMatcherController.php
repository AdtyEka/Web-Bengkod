<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Illuminate\Http\JsonResponse;

class CvMatcherController extends Controller
{
    /**
     * Render the CV Matcher page.
     */
    public function index(): InertiaResponse
    {
        return Inertia::render('admin/cv-matcher/page', [
            'result' => session('cv_match_result'),
            'inputs' => session('cv_match_inputs')
        ]);
    }

    /**
     * Analyze the uploaded CV PDF.
     */
    public function analyze(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf|max:10240', // max 10MB PDF
            'target_position' => 'required|string|max:255',
            'job_description' => 'required|string|min:10',
        ]);

        $aiServiceUrl = env('AI_SERVICE_URL', 'http://localhost:8000');

        try {
            // Forward the file and inputs to the FastAPI service
            $response = Http::attach(
                'file',
                file_get_contents($request->file('file')->getRealPath()),
                $request->file('file')->getClientOriginalName()
            )->post("{$aiServiceUrl}/analyze-cv", [
                'target_position' => $request->target_position,
                'job_description' => $request->job_description,
            ]);

            if ($response->failed()) {
                $errorMsg = $response->json('detail') ?? 'AI service returned an error.';
                return back()->withErrors(['api_error' => $errorMsg])->withInput();
            }

            $result = $response->json();

            // Store result in session and redirect to the GET route
            return back()->with([
                'cv_match_result' => $result,
                'cv_match_inputs' => [
                    'target_position' => $request->target_position,
                    'job_description' => $request->job_description,
                ]
            ]);

        } catch (\Exception $e) {
            return back()->withErrors(['api_error' => 'Could not connect to the AI service: ' . $e->getMessage()])->withInput();
        }
    }
}
