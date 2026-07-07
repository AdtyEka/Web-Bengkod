import { Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button";

export default function Features() {
  return (
    <section id="features" className="py-24 space-y-32 bg-white dark:bg-zinc-900 transition-colors">
      {/* AI 1 - CV Job Matcher */}
      <div className="px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 order-2 md:order-1">
          <div className="relative bg-white dark:bg-zinc-800/80 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-zinc-700/50">
            <div className="flex items-center gap-4 mb-6">
              <span className="material-symbols-outlined text-[#004ac6] dark:text-blue-400 text-4xl">
                description
              </span>
              <div>
                <h4 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">
                  Senior Frontend Architect.pdf
                </h4>
                <p className="text-xs text-[#545f73] dark:text-zinc-400">
                  Uploaded 2 minutes ago
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl flex items-center justify-between border border-blue-100/50 dark:border-blue-950/50">
                <span className="font-bold text-[#004ac6] dark:text-blue-400">
                  Job Matching Score
                </span>
                <span className="text-3xl font-black text-[#004ac6] dark:text-blue-400">
                  89%
                </span>
              </div>
              <div>
                <p className="text-zinc-900 dark:text-zinc-50 font-bold text-sm mb-2">
                  Identified Skill Gaps:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 rounded-full text-xs font-semibold">
                    GraphQL
                  </span>
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 rounded-full text-xs font-semibold">
                    Kubernetes
                  </span>
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold">
                    React 18
                  </span>
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold">
                    TypeScript
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 order-1 md:order-2">
          <span className="text-[#004ac6] dark:text-blue-400 font-bold tracking-widest uppercase text-xs mb-4 block">
            Feature 01: CV Job Matcher
          </span>
          <h2 className="font-extrabold text-3xl md:text-5xl text-zinc-900 dark:text-zinc-50 tracking-tight mb-6">
            Intelligent ML-Powered Resume Analysis
          </h2>
          <p className="text-base md:text-lg text-[#545f73] dark:text-zinc-400 mb-8 leading-relaxed">
            Stop guessing how well you fit a role. Our ML engine parses your PDF CV and compares it against real-time job requirements, providing a precise match score and actionable skill gap analysis.
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-500">
                check_circle
              </span>
              <span className="text-zinc-800 dark:text-zinc-300 font-medium">
                Automatic PDF parsing and structuring
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-500">
                check_circle
              </span>
              <span className="text-zinc-800 dark:text-zinc-300 font-medium">
                Semantic skill matching beyond keywords
              </span>
            </li>
          </ul>
          <Link href="/cv-matcher" className="inline-flex">
            <Button variant="link" className="text-[#004ac6] dark:text-blue-400 font-semibold p-0 flex items-center gap-2 group hover:no-underline">
              Try Matching Now{" "}
              <span className="material-symbols-outlined group-hover:translate-x-1.5 transition-transform">
                arrow_forward
              </span>
            </Button>
          </Link>
        </div>
      </div>

      {/* AI 2 - Interview Coach */}
      <div className="px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <span className="text-[#632ecd] dark:text-purple-400 font-bold tracking-widest uppercase text-xs mb-4 block">
            Feature 02: Interview Coach
          </span>
          <h2 className="font-extrabold text-3xl md:text-5xl text-zinc-900 dark:text-zinc-50 tracking-tight mb-6">
            Interactive Sessions with Gemini AI
          </h2>
          <p className="text-base md:text-lg text-[#545f73] dark:text-zinc-400 mb-8 leading-relaxed">
            Practice with our advanced LLM coach. Experience role-specific pressure, receive real-time communication scoring, and get personalized tips to improve your answers instantly.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
              <span className="material-symbols-outlined text-[#632ecd] dark:text-purple-400 mb-2">
                mic
              </span>
              <h5 className="font-bold text-zinc-800 dark:text-zinc-100">
                Communication
              </h5>
              <div className="w-full bg-gray-200 dark:bg-zinc-700 h-2 rounded-full mt-2">
                <div className="bg-[#632ecd] dark:bg-purple-500 h-2 rounded-full w-4/5" />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
              <span className="material-symbols-outlined text-[#632ecd] dark:text-purple-400 mb-2">
                psychology
              </span>
              <h5 className="font-bold text-zinc-800 dark:text-zinc-100">
                Content Accuracy
              </h5>
              <div className="w-full bg-gray-200 dark:bg-zinc-700 h-2 rounded-full mt-2">
                <div className="bg-[#632ecd] dark:bg-purple-500 h-2 rounded-full w-3/4" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-zinc-950 text-white rounded-3xl p-6 shadow-2xl border border-zinc-800">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800">
              <div className="w-10 h-10 rounded-full bg-purple-600 dark:bg-purple-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-white">
                  smart_toy
                </span>
              </div>
              <div>
                <p className="font-bold text-sm">Coach Gemini</p>
                <p className="text-xs text-zinc-400">
                  Role: Tech Lead Interviewer
                </p>
              </div>
            </div>
            <div className="space-y-4 h-64 overflow-y-auto mb-4 custom-scrollbar">
              <div className="bg-zinc-800/50 p-4 rounded-2xl rounded-tl-none max-w-[85%]">
                <p className="text-sm leading-relaxed text-zinc-200">
                  "Tell me about a time you handled a significant technical debt
                  during a product launch. How did you prioritize?"
                </p>
              </div>
              <div className="bg-blue-600/20 border border-blue-500/20 p-4 rounded-2xl rounded-tr-none ml-auto max-w-[85%]">
                <p className="text-sm leading-relaxed text-blue-100">
                  "At my last company, we had a legacy monolithic service that
                  was causing performance issues..."
                </p>
              </div>
              <div className="bg-zinc-800/30 p-4 rounded-2xl rounded-tl-none max-w-[85%]">
                <div className="flex gap-1 mb-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                  <div
                    className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <div
                    className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>
                <p className="text-xs italic text-zinc-400">
                  Analyzing communication tone...
                </p>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
              <span className="text-zinc-500 text-sm">Type your response...</span>
              <span className="material-symbols-outlined text-zinc-400 cursor-pointer hover:text-white transition-colors">
                send
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
