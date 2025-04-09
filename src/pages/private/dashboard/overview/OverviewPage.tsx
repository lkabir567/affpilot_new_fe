import {
  CreditsCard,
  RecentActivity,
  SearchBar,
  StatsCards,
  ToolsGrid,
  ToolsTabs,
} from "@/features/dashboard/overview";

const OverviewPage = () => {
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
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
