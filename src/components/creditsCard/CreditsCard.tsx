import { PlusCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function CreditsCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Credits
        </h2>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <RefreshCw className="h-4 w-4 text-slate-500" />
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            85,761
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Available Credits
          </p>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
          <span className="text-primary dark:text-primary text-lg font-bold">
            AI
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-400">
            Usage this month
          </span>
          <span className="font-medium text-slate-900 dark:text-white">
            14,239 / 100,000
          </span>
        </div>
        <Progress
          value={14}
          className="h-2 bg-slate-100 dark:bg-slate-800"
          //   indicatorClassName="bg-primary dark:bg-primary"
        />
      </div>

      <div className="pt-2">
        <Button className="w-full">
          <PlusCircle className="h-4 w-4 mr-2" /> Add Credits
        </Button>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
        Credits expire on 02 Jun 2025
      </p>
    </div>
  );
}
