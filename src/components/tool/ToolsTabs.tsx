import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "all", label: "All Tools" },
  { id: "info-articles", label: "Info Articles" },
  { id: "seo-tools", label: "SEO Tools", isNew: true },
  { id: "amazon-review", label: "Amazon Review" },
  { id: "more-tools", label: "More Tools" },
];

export function ToolsTabs() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="border-b border-slate-200 dark:border-slate-800">
      <div className="flex overflow-x-auto hide-scrollbar -mx-6 px-6">
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 pb-3 pt-3 mx-auto gap-2`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {tab.label}
              {tab.isNew && (
                <span className="absolute -top-1 -right-1 flex h-4 w-[30px] items-center justify-center rounded-md bg-primary text-[10px] text-white">
                  <span>New</span>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
