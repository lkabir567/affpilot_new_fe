import { ArrowUpRight, FileText, Users, Zap } from "lucide-react";

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: "Content Generated",
          value: "1,234",
          change: "+12%",
          icon: <FileText className="h-4 w-4" />,
          color: "violet",
        },
        {
          title: "Credits Used",
          value: "14,239",
          change: "+5%",
          icon: <Zap className="h-4 w-4" />,
          color: "emerald",
        },
        {
          title: "Active Projects",
          value: "23",
          change: "+2",
          icon: <Users className="h-4 w-4" />,
          color: "amber",
        },
      ].map((stat, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 flex flex-col"
        >
          <div className="flex items-center justify-between">
            <div
              className={`h-8 w-8 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center`}
            >
              <div
                className={`text-${stat.color}-600 dark:text-${stat.color}-400`}
              >
                {stat.icon}
              </div>
            </div>
            <div className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {stat.change}
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {stat.title}
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
