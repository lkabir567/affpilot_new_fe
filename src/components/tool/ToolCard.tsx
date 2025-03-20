import type React from "react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    isPopular?: boolean;
    isNew?: boolean;
  };
}

export function ToolCard({ tool }: ToolCardProps) {
  const colorMap = {
    violet: {
      bg: "bg-violet-50 dark:bg-violet-900/10",
      text: "text-violet-600 dark:text-violet-400",
      border: "border-violet-200 dark:border-violet-800",
      hover: "hover:border-violet-300 dark:hover:border-violet-700",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-900/10",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-200 dark:border-emerald-800",
      hover: "hover:border-emerald-300 dark:hover:border-emerald-700",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-900/10",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      hover: "hover:border-amber-300 dark:hover:border-amber-700",
    },
    rose: {
      bg: "bg-rose-50 dark:bg-rose-900/10",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-200 dark:border-rose-800",
      hover: "hover:border-rose-300 dark:hover:border-rose-700",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/10",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      hover: "hover:border-blue-300 dark:hover:border-blue-700",
    },
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-900/10",
      text: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-200 dark:border-indigo-800",
      hover: "hover:border-indigo-300 dark:hover:border-indigo-700",
    },
  };

  const colors = colorMap[tool.color as keyof typeof colorMap];

  return (
    <div
      className={cn(
        "group relative rounded-xl border bg-white dark:bg-slate-900 p-5 transition-all",
        colors.border,
        colors.hover,
        "hover:shadow-md"
      )}
    >
      {(tool.isPopular || tool.isNew) && (
        <div className="absolute -top-2 -right-2 rounded-full bg-primary text-white px-2.5 py-0.5 text-xs font-medium shadow-sm">
          {tool.isNew ? (
            <div className="rounded-full px-2.5 py-0.5">New</div>
          ) : (
            <div className="rounded-full px-2.5 py-0.5">Popular</div>
          )}
        </div>
      )}

      <div
        className={cn(
          "h-10 w-10 rounded-lg flex items-center justify-center",
          colors.bg
        )}
      >
        <div className={colors.text}>{tool.icon}</div>
      </div>

      <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
        {tool.title}
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {tool.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-slate-400 dark:text-slate-500">
          Tool #{tool.id}
        </div>
        <div className={cn("text-xs font-medium", colors.text)}>Use Tool →</div>
      </div>
    </div>
  );
}
