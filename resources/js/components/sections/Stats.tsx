export default function Stats() {
  return (
    <div className="w-full">
      {/* Trust Badges */}
      <section className="py-12 bg-white dark:bg-zinc-900 border-y border-gray-100 dark:border-zinc-800 transition-colors">
        <div className="px-6 max-w-7xl mx-auto text-center">
          <p className="text-xs font-semibold text-[#545f73] dark:text-zinc-400 mb-8 uppercase tracking-widest">
            Powering the World's Best Careers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 dark:opacity-40 grayscale hover:grayscale-0 dark:hover:grayscale-0 dark:text-zinc-300 font-extrabold text-xl tracking-wider transition-all">
            <span>TECHCORP</span>
            <span>GLOBEX</span>
            <span>INNOCREATE</span>
            <span>VIRTUALSY</span>
            <span>NEXGEN</span>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gray-50/50 dark:bg-zinc-950/40 transition-colors">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/60 dark:border-zinc-800 hover:shadow-xl dark:hover:shadow-zinc-950/50 transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100/50 dark:bg-blue-950/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[#004ac6] dark:text-blue-400 text-3xl">
                  corporate_fare
                </span>
              </div>
              <h3 className="text-4xl font-extrabold text-[#004ac6] dark:text-blue-400 mb-2">
                5K+
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                Organizations Worldwide
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/60 dark:border-zinc-800 hover:shadow-xl dark:hover:shadow-zinc-950/50 transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-emerald-100/50 dark:bg-emerald-950/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-3xl">
                  speed
                </span>
              </div>
              <h3 className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-2">
                78%
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                Reduced Manual Work
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/60 dark:border-zinc-800 hover:shadow-xl dark:hover:shadow-zinc-950/50 transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-purple-100/50 dark:bg-purple-950/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[#632ecd] dark:text-purple-400 text-3xl">
                  chat
                </span>
              </div>
              <h3 className="text-4xl font-extrabold text-[#632ecd] dark:text-purple-400 mb-2">
                6M+
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                Feedback Sessions Shared
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
