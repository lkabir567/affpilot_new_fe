import { Button } from "@/components/ui/button";
import { StatsCards } from "@/components/statsCard/StatsCard";
import { ToolsTabs } from "@/components/tool/ToolsTabs";
import { SearchBar } from "@/components/searchbar/SearchBar";
import { ToolsGrid } from "@/components/tool/ToolsGrid";
import { CreditsCard } from "@/components/creditsCard/CreditsCard";

const DashBoard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold bg-gradient-to-t from-primary to-secondary bg-clip-text text-transparent mb-4">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <StatsCards />
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6">
            <ToolsTabs />
            <div className="mt-6">
              <SearchBar />
            </div>
            <div className="mt-6">
              <ToolsGrid />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <CreditsCard />
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800"
                >
                  <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-violet-600 dark:text-violet-400 text-sm font-medium">
                      AI
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                      Article Generated
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      "How to optimize your website for SEO" - 1200 words
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      {i} hour{i > 1 ? "s" : ""} ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full text-sm">View All Activity</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
