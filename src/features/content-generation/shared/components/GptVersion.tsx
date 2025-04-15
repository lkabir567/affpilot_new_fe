import { Badge } from "@/components/ui/badge";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Info, Sparkles, Zap } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

const aiModel = [
  {
    value: "gpt-4o",
    label: "GPT-4o",
    description: "Best quality & latest data",
    badge: "Recommended",
    icon: <Sparkles className="h-5 w-5 text-amber-500" />,
  },
  {
    value: "gpt-4",
    label: "GPT-4",
    description: "High quality content",
    icon: <Sparkles className="h-5 w-5 text-blue-500" />,
  },
  {
    value: "gpt-4o-mini",
    label: "GPT-4o mini",
    description: "Faster & more affordable",
    icon: <Zap className="h-5 w-5 text-green-500" />,
  },
];

type AiModelOption = {
  value: string;
  label: string;
  description: string;
  badge?: string;
  icon?: React.ReactNode;
};

interface GptVersionProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  aiModelOptions?: AiModelOption[];
}

export const GptVersion = <T extends FieldValues>({
  control,
  aiModelOptions = aiModel,
  name,
}: GptVersionProps<T>) => {
  return (
    <>
      {/* GPT Version */}
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="font-medium text-gray-700 flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              AI Model
            </FormLabel>
            <FormDescription className="text-sm mt-0 text-gray-500">
              Choose the AI model that best fits your content needs and budget
            </FormDescription>

            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4"
            >
              {aiModelOptions?.map((option) => (
                <FormItem
                  key={option.value}
                  className="relative cursor-pointer"
                >
                  <FormControl>
                    <label
                      htmlFor={option.value}
                      className={cn(
                        "flex flex-col gap-3 p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md cursor-pointer",
                        field.value === option.value
                          ? "border-primary bg-blue-50 dark:bg-primary/50"
                          : "border-gray-200 hover:border-gray-300 "
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{option.icon}</div>
                        <div className="space-y-1">
                          <span className="text-base font-semibold flex items-center gap-1">
                            {option.label}
                            {option.badge && (
                              <Badge className="ml-1 text-xs bg-blue-100 text-primary border-none">
                                {option.badge}
                              </Badge>
                            )}
                          </span>
                          <p className="text-sm text-gray-500">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </label>
                  </FormControl>
                  <div className="absolute bottom-3 right-3">
                    <RadioGroupItem id={option.value} value={option.value} />
                  </div>
                </FormItem>
              ))}
            </RadioGroup>

            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1 mb-2">
              <span>Real-Time Data Available</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border shadow-md">
                    <p className="w-64 text-sm">
                      GPT models have access to real-time data to provide the
                      most up-to-date information in your content.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
