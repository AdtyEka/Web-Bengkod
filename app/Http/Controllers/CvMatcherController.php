<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CvMatcherController extends Controller
{
    /**
     * Render the CV Matcher page.
     */
    public function index(): InertiaResponse
    {
        $aiServiceUrl = env('AI_SERVICE_URL', 'http://localhost:8000');
        $categories = [];
        try {
            $response = Http::timeout(2)->get("{$aiServiceUrl}/categories");
            if ($response->successful()) {
                $categories = $response->json('categories') ?? [];
            }
        } catch (\Exception $e) {
            // ignore if service is down, frontend handles empty categories
        }

        return Inertia::render('admin/cv-matcher/page', [
            'result' => session('cv_match_result'),
            'inputs' => session('cv_match_inputs'),
            'categories' => $categories
        ]);
    }

    /**
     * Analyze the uploaded CV PDF.
     */
    public function analyze(Request $request)
    {
        // Increase maximum execution time to 120 seconds for this request
        // because the Python AI Service might take a while to parse large PDFs.
        set_time_limit(120);

        $request->validate([
            'target_position' => 'required|string',
            'job_description' => 'required|string',
            'file' => 'required|file|mimes:pdf|max:10240', // Max 10MB
        ]);

        $aiServiceUrl = env('AI_SERVICE_URL', 'http://localhost:8000');

        try {
            // Forward the file and inputs to the FastAPI service
            $response = Http::timeout(120)->attach(
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

            // Store the result to Activity History
            if ($request->user()) {
                Activity::create([
                    'user_id' => $request->user()->id,
                    'type' => 'cv_match',
                    'role' => $request->target_position,
                    'company' => null,
                    'result_type' => 'match',
                    'match_value' => $result['match_score'] ?? 0,
                    'details' => $result,
                ]);
            }

            // Store result in session and redirect to the GET route
            return back()->with([
                'cv_match_result' => $result,
                'cv_match_inputs' => [
                    'target_position' => $request->target_position,
                    'job_description' => $request->job_description,
                ],
            ]);

        } catch (\Exception $e) {
            return back()->withErrors(['api_error' => 'Could not connect to the AI service: '.$e->getMessage()])->withInput();
        }
    }
}
