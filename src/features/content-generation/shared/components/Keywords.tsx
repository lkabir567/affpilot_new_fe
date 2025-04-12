import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ListChecks } from "lucide-react";
import { Control } from "react-hook-form";
import { FC } from "react";
import { ContentGenCommonFormValues } from "../schema/schema.common";

interface KeywordsProps {
  control: Control<ContentGenCommonFormValues>;
}

export const Keywords: FC<KeywordsProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="keywords"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="font-medium text-gray-700 flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-blue-500" />
              Keywords
            </FormLabel>
            <FormDescription className="text-sm mt-0 text-gray-500">
              Enter your target keywords, one per line. These will be used to
              optimize your content.
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder={`Example:
                            How to lose belly fat?
                            Can AI replace Artists?
                            What is Crypto currency?
                            Productivity tips for busy people`}
                className="min-h-32 text-base resize-y whitespace-pre-line placeholder:font-medium placeholder:text-md placeholder:text-gray-400"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
