import { Badge } from "@/components/ui/badge";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { FC, ReactNode } from "react";

interface SwitchInputProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  icon?: ReactNode;
  badgeText?: string;
  label?: string;
  tooltip?: string;
  description?: string;
}

const SwitchInput: FC<SwitchInputProps> = ({
  checked,
  onCheckedChange,
  badgeText = "AI",
  label = "AI Generated Title",
  tooltip = "Let AI generate an optimized title for your content based on your keywords.",
  description = "Generate SEO-optimized titles automatically",
  icon,
}) => {
  return (
    <FormItem className="flex flex-row items-center justify-between rounded-xl border p-5 shadow-sm hover:bg-gray-50 transition-colors duration-200 dark:hover:bg-primary/50">
      <div className="space-y-1">
        <FormLabel className="text-base flex items-center gap-2">
          <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 border-none">
            {badgeText}
          </Badge>
          <span>{icon}</span>
          {label}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="bg-white border shadow-md">
                <p className="w-64 text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </FormLabel>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <FormControl>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </FormControl>
    </FormItem>
  );
};

export default SwitchInput;
