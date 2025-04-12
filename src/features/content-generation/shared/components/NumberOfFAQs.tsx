import SelectInput from "@/components/shared/inputs/SelectInput";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { HelpCircle } from "lucide-react";
import { ContentGenCommonFormValues } from "../schema/schema.common";
import { Control } from "react-hook-form";
import { FC } from "react";

const noFaqOptions = [
  {
    label: "AI will determine (Recommended)",
    value: "AI will creatively think",
  },
  { label: "3 FAQs", value: "3" },
  { label: "5 FAQs", value: "5" },
  { label: "7 FAQs", value: "7" },
  { label: "10 FAQs", value: "10" },
];

type FaqOptions = {
  label: string;
  value: string;
};

interface NumberOfFAQsProps {
  control: Control<ContentGenCommonFormValues>;
  faqOptions?: FaqOptions[];
}

export const NumberOfFAQs: FC<NumberOfFAQsProps> = ({
  control,
  faqOptions = noFaqOptions,
}) => {
  return (
    <>
      <FormField
        control={control}
        name="faqs"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <SelectInput
              icon={<HelpCircle className="h-4 w-4 text-amber-500" />}
              label="Number of FAQs"
              field={field}
              selectItems={faqOptions}
              placeholder="Choose number of FAQs"
            />

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
