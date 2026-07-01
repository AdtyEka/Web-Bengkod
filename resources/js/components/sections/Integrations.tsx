import { Button } from "@/components/ui/button";

export default function Integrations() {
  const integrations = ["SLACK", "JIRA", "G SUITE", "NOTION", "TEAMS", "GITHUB"];

  return (
    <section id="solutions" className="py-24 bg-white dark:bg-zinc-900 transition-colors">
      <div className="px-6 max-w-7xl mx-auto text-center">
        <h2 className="font-extrabold text-3xl md:text-5xl text-zinc-900 dark:text-zinc-50 tracking-tight mb-6">
          Built To Power Your Entire Workplace
        </h2>
        <p className="text-base md:text-lg text-[#545f73] dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
          Seamlessly connect SkillSync AI with the tools your team already uses to
          maximize efficiency and data accuracy.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {integrations.map((item) => (
            <div
              key={item}
              className="p-6 bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-2xl flex items-center justify-center font-extrabold text-sm text-[#545f73] dark:text-zinc-300 hover:shadow-md dark:hover:shadow-zinc-950/20 transition-all cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="border-2 border-[#004ac6] text-[#004ac6] hover:bg-[#004ac6] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-zinc-950 font-bold px-8 py-5 rounded-xl transition-all"
        >
          See All Integrations
        </Button>
      </div>
    </section>
  );
}
