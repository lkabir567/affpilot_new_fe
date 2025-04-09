// src/features/activity/components/RecentActivity.tsx
// import { useActivityFeed } from "../hooks/useActivityFeed";

import { Button } from "@/components/ui/button";
import { activity } from "../types/activity.types";

interface ActivityItemProps {
  activity: activity;
}
export const RecentActivity = () => {
  //   const { activities } = useActivityFeed();

  const activities = [
    {
      id: 1,
      title: "New Project Created",
      description: "Project XYZ has been created.",
      timestamp: "Just now",
      icon: "🎉",
    },
    {
      id: 2,
      title: "Task Completed",
      description: "Task XYZ has been completed.",
      timestamp: "2 hours ago",
      icon: "✅",
    },
    {
      id: 3,
      title: "New Message Received",
      description: "You have a new message from John Doe.",
      timestamp: "1 day ago",
      icon: "📧",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 space-y-4">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Recent Activity
      </h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
      <Button className="w-full text-sm">View All Activity</Button>
    </div>
  );
};

const ActivityItem = ({ activity }: ActivityItemProps) => (
  <div className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
    <div className="h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
      <span className="text-violet-600 dark:text-violet-400 text-sm font-medium">
        {activity.icon}
      </span>
    </div>
    <div>
      <h3 className="text-sm font-medium text-slate-900 dark:text-white">
        {activity.title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {activity.description}
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
        {activity.timestamp}
      </p>
    </div>
  </div>
);
