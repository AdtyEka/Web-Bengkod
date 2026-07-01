export default function FeatureGrid() {
  const cards = [
    {
      icon: "trending_up",
      title: "Performance Metrics",
      desc: "Real-time tracking of employee growth milestones and professional development velocity across entire departments.",
    },
    {
      icon: "schedule",
      title: "Time Optimization",
      desc: "Intelligent scheduling and learning path sequencing that minimizes disruption to daily workflows while maximizing retention.",
    },
    {
      icon: "groups",
      title: "HR Leader Toolkit",
      desc: "Centralized dashboards for recruitment managers to identify internal talent for high-impact promotion opportunities.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-zinc-950/60 transition-colors">
      <div className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:shadow-xl dark:hover:shadow-zinc-950/30 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/30 rounded-xl flex items-center justify-center mb-6 text-[#004ac6] dark:text-blue-400 group-hover:bg-[#004ac6] dark:group-hover:bg-blue-400 group-hover:text-white dark:group-hover:text-zinc-900 transition-all">
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
              <h4 className="font-bold text-xl mb-4 text-zinc-900 dark:text-zinc-50">
                {card.title}
              </h4>
              <p className="text-[#545f73] dark:text-zinc-400 text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
