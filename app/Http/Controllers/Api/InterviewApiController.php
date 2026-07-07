<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class InterviewApiController extends Controller
{
    /**
     * Mendapatkan header default beserta API Key
     */
    private function getHeaders()
    {
        return [
            'X-Gemini-API-Key' => env('GEMINI_API_KEY'),
            'Accept' => 'application/json',
        ];
    }

    /**
     * Mendapatkan Base URL dari .env
     */
    private function getBaseUrl()
    {
        return env('AI_INTERVIEW_BASE_URL', 'https://ai-interview-coach-omega-eosin.vercel.app');
    }

    public function generateQuestions(Request $request)
    {
        $response = Http::withHeaders($this->getHeaders())
            ->post($this->getBaseUrl().'/interview/questions', $request->all());

        return response()->json($response->json(), $response->status());
    }

    public function submitFeedback(Request $request)
    {
        $response = Http::withHeaders($this->getHeaders())
            ->post($this->getBaseUrl().'/interview/feedback', $request->all());

        return response()->json($response->json(), $response->status());
    }

    public function getSummary($session_id)
    {
        $response = Http::withHeaders($this->getHeaders())
            ->get($this->getBaseUrl().'/interview/summary/'.$session_id);

        return response()->json($response->json(), $response->status());
    }

    public function saveSession(Request $request)
    {
        $validated = $request->validate([
            'role' => 'required|string',
            'evaluation' => 'required|array',
        ]);

        $evaluation = $validated['evaluation'];

        // Calculate overall rating out of 5 (assuming communication_score is out of 10 originally)
        $rawScore = $evaluation['overall_score'] ?? $evaluation['communication_score'] ?? 0;
        $ratingValue = min($rawScore / 2, 5); // Max 5

        $activity = Activity::create([
            'user_id' => $request->user()->id,
            'type' => 'interview_coach',
            'role' => $validated['role'],
            'company' => null,
            'result_type' => 'rating',
            'rating_value' => $ratingValue,
            'details' => $evaluation,
        ]);

        return response()->json(['success' => true, 'activity' => $activity]);
    }
}
